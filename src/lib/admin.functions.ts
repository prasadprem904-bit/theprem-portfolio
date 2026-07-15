import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

async function assertAdmin(ctx: { supabase: any; userId: string }) {
  const { data, error } = await ctx.supabase.rpc("has_role", {
    _user_id: ctx.userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin only");
}

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (error) throw new Error(error.message);
    return { isAdmin: !!data, userId: context.userId };
  });

export const getAdminStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const [{ count: totalUsers }, { count: totalViews }, { data: recentViews }] =
      await Promise.all([
        supabaseAdmin.from("profiles").select("*", { count: "exact", head: true }),
        supabaseAdmin.from("page_views").select("*", { count: "exact", head: true }),
        supabaseAdmin
          .from("page_views")
          .select("session_id, created_at, path")
          .gte(
            "created_at",
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          )
          .limit(10000),
      ]);

    const uniqueSessions = new Set(
      (recentViews ?? []).map((r: any) => r.session_id).filter(Boolean),
    ).size;

    // daily buckets (last 14 days)
    const days: Record<string, number> = {};
    const now = Date.now();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now - i * 86400000);
      days[d.toISOString().slice(0, 10)] = 0;
    }
    for (const v of recentViews ?? []) {
      const k = new Date(v.created_at).toISOString().slice(0, 10);
      if (k in days) days[k]++;
    }
    const trend = Object.entries(days).map(([d, v]) => ({
      d: d.slice(5),
      v,
    }));

    return {
      totalUsers: totalUsers ?? 0,
      totalViews: totalViews ?? 0,
      uniqueVisitors30d: uniqueSessions,
      trend,
    };
  });

export const listUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: profiles, error } = await supabaseAdmin
      .from("profiles")
      .select("id, email, display_name, avatar_url, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    const { data: roles } = await supabaseAdmin
      .from("user_roles")
      .select("user_id, role");
    const roleMap = new Map<string, string[]>();
    for (const r of roles ?? []) {
      const arr = roleMap.get(r.user_id) ?? [];
      arr.push(r.role);
      roleMap.set(r.user_id, arr);
    }
    return (profiles ?? []).map((p: any) => ({
      ...p,
      roles: roleMap.get(p.id) ?? ["user"],
    }));
  });

export const updateUserRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { userId: string; role: "admin" | "moderator" | "user"; grant: boolean }) =>
    z
      .object({
        userId: z.string().uuid(),
        role: z.enum(["admin", "moderator", "user"]),
        grant: z.boolean(),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if (data.grant) {
      const { error } = await supabaseAdmin
        .from("user_roles")
        .upsert(
          { user_id: data.userId, role: data.role },
          { onConflict: "user_id,role" },
        );
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin
        .from("user_roles")
        .delete()
        .eq("user_id", data.userId)
        .eq("role", data.role);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const deleteUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { userId: string }) =>
    z.object({ userId: z.string().uuid() }).parse(d),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    if (data.userId === context.userId) throw new Error("Can't delete yourself");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const updateProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { userId: string; display_name?: string; avatar_url?: string }) =>
    z
      .object({
        userId: z.string().uuid(),
        display_name: z.string().max(80).optional(),
        avatar_url: z.string().url().max(1024).optional(),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const patch: any = { updated_at: new Date().toISOString() };
    if (data.display_name !== undefined) patch.display_name = data.display_name;
    if (data.avatar_url !== undefined) patch.avatar_url = data.avatar_url;
    const { error } = await supabaseAdmin
      .from("profiles")
      .update(patch)
      .eq("id", data.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });