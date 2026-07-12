import { createFileRoute } from "@tanstack/react-router";
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/admin/analytics")({
  component: AnalyticsPage,
});

const traffic = Array.from({ length: 14 }, (_, i) => ({
  d: `Day ${i + 1}`,
  visits: 1200 + Math.round(Math.sin(i / 2) * 400 + i * 90),
  signups: 80 + Math.round(Math.cos(i / 2) * 30 + i * 6),
}));

const cohorts = [
  { name: "Free", w1: 100, w2: 62, w3: 41, w4: 32 },
  { name: "Pro", w1: 100, w2: 88, w3: 79, w4: 72 },
  { name: "Team", w1: 100, w2: 94, w3: 90, w4: 86 },
];

function AnalyticsPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Analytics</h1>
        <p className="text-sm text-muted-foreground">Deep-dive into traffic, conversion, and retention.</p>
      </div>

      <Tabs defaultValue="traffic" className="w-full">
        <TabsList>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Visits & signups</CardTitle>
              <CardDescription>Last 14 days</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={traffic}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="d" tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} />
                  <RTooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="visits" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="signups" stroke="var(--color-foreground)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Cohort retention</CardTitle>
              <CardDescription>Weekly retention by plan</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cohorts}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" axisLine={false} tickLine={false} />
                  <RTooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="w1" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="w2" fill="color-mix(in oklab, var(--color-primary) 75%, transparent)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="w3" fill="color-mix(in oklab, var(--color-primary) 50%, transparent)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="w4" fill="color-mix(in oklab, var(--color-primary) 30%, transparent)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}