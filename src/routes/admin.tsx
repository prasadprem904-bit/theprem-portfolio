import { useEffect, useState } from "react";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { TopBar } from "@/components/admin/TopBar";
import { supabase } from "@/integrations/supabase/client";
import { checkIsAdmin } from "@/lib/admin.functions";
import { Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Console — ThePrem" },
      { name: "description", content: "Enterprise admin dashboard for ThePrem — analytics, users, orders, and settings." },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const check = useServerFn(checkIsAdmin);
  const [state, setState] = useState<"loading" | "admin" | "forbidden" | "signedout">("loading");

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      if (!data.session) {
        setState("signedout");
        navigate({ to: "/auth" });
        return;
      }
      try {
        const res = await check();
        if (!active) return;
        setState(res.isAdmin ? "admin" : "forbidden");
      } catch {
        if (!active) return;
        setState("forbidden");
      }
    })();
    return () => {
      active = false;
    };
  }, [check, navigate]);

  if (state === "loading" || state === "signedout") {
    return (
      <div className="grid min-h-screen place-items-center bg-muted/30">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading admin console…
        </div>
      </div>
    );
  }

  if (state === "forbidden") {
    return (
      <div className="grid min-h-screen place-items-center bg-muted/30 px-4">
        <div className="max-w-md rounded-xl border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-destructive/10 text-destructive">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-xl font-semibold">Admin access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account doesn't have admin privileges. If this is a mistake, contact prasadprem904@gmail.com.
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <Button variant="outline" onClick={() => navigate({ to: "/" })}>Go home</Button>
            <Button
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/auth" });
              }}
            >
              Sign out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        <AdminSidebar />
        <SidebarInset className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
      <Toaster richColors position="top-right" />
    </SidebarProvider>
  );
}