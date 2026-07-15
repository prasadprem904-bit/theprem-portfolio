import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getAdminStats } from "@/lib/admin.functions";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDownRight,
  ArrowUpRight,
  Eye,
  Users,
  UserCheck,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/admin/")({
  component: DashboardPage,
});

const channels = [
  { c: "Organic", v: 42 }, { c: "Direct", v: 28 }, { c: "Referral", v: 18 },
  { c: "Social", v: 12 }, { c: "Email", v: 9 }, { c: "Ads", v: 7 },
];

const activity = [
  { name: "Aarav Sharma", action: "created a new project", time: "2m ago", initials: "AS" },
  { name: "Meera Iyer", action: "upgraded to Pro", time: "18m ago", initials: "MI" },
  { name: "Kabir Khan", action: "invited 3 teammates", time: "1h ago", initials: "KK" },
  { name: "Riya Patel", action: "closed an invoice", time: "3h ago", initials: "RP" },
  { name: "Ishaan Roy", action: "updated billing details", time: "6h ago", initials: "IR" },
];

function DashboardPage() {
  const fn = useServerFn(getAdminStats);
  const { data } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => fn(),
    refetchInterval: 30000,
  });

  const stats = [
    {
      label: "Total users",
      value: (data?.totalUsers ?? 0).toLocaleString(),
      delta: "signed up",
      positive: true,
      icon: Users,
    },
    {
      label: "Total page views",
      value: (data?.totalViews ?? 0).toLocaleString(),
      delta: "all time",
      positive: true,
      icon: Eye,
    },
    {
      label: "Unique visitors (30d)",
      value: (data?.uniqueVisitors30d ?? 0).toLocaleString(),
      delta: "last 30 days",
      positive: true,
      icon: UserCheck,
    },
    {
      label: "Uptime",
      value: "99.98%",
      delta: "+0.02%",
      positive: true,
      icon: Activity,
    },
  ];

  const trend = data?.trend ?? [];

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Live traffic and user metrics for theprem.io.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {s.label}
                </CardTitle>
                <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary">
                  <s.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold tracking-tight">{s.value}</div>
                <div className={`mt-1 flex items-center gap-1 text-xs ${s.positive ? "text-emerald-600" : "text-destructive"}`}>
                  {s.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {s.delta} vs last month
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Website visitors</CardTitle>
            <CardDescription>Page views per day, last 14 days</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ left: 0, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="d" tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} width={40} />
                <RTooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="v" stroke="var(--color-primary)" strokeWidth={2} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic sources</CardTitle>
            <CardDescription>Top acquisition channels</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channels} layout="vertical" margin={{ left: 8, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} />
                <YAxis dataKey="c" type="category" tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} width={60} />
                <RTooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="v" fill="var(--color-primary)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
          <CardDescription>Latest events across your workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {activity.map((a) => (
              <li key={a.name} className="flex items-center gap-3 py-3">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className="bg-muted text-xs">{a.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm">
                    <span className="font-medium">{a.name}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="shrink-0 text-[10px]">{a.time}</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}