import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/reports")({
  component: ReportsPage,
});

const reports = [
  { name: "Q4 revenue summary", size: "412 KB", updated: "2 days ago" },
  { name: "User retention – October", size: "168 KB", updated: "1 week ago" },
  { name: "Payment reconciliation", size: "2.1 MB", updated: "2 weeks ago" },
  { name: "Audit log export", size: "890 KB", updated: "1 month ago" },
];

function ReportsPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Reports</h1>
        <p className="text-sm text-muted-foreground">Generated exports and scheduled reports.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {reports.map((r) => (
          <Card key={r.name}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="truncate text-base">{r.name}</CardTitle>
                  <CardDescription>{r.size} • Updated {r.updated}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" /> Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}