import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const [notif, setNotif] = useState({ product: true, weekly: true, security: true, marketing: false });

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your workspace preferences and account.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workspace profile</CardTitle>
          <CardDescription>Public information about your workspace.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="wsname">Workspace name</Label>
              <Input id="wsname" defaultValue="ThePrem" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="wsurl">URL slug</Label>
              <Input id="wsurl" defaultValue="theprem" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">About</Label>
            <Textarea id="bio" rows={3} defaultValue="Building products people love." />
          </div>
          <div className="flex justify-end">
            <Button onClick={() => toast.success("Workspace updated")}>Save changes</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Choose what you want to hear about.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-1">
          {([
            ["product", "Product updates", "New features and improvements"],
            ["weekly", "Weekly digest", "Your weekly performance summary"],
            ["security", "Security alerts", "Sign-ins from new devices and locations"],
            ["marketing", "Marketing", "Occasional tips and offers"],
          ] as const).map(([key, label, desc]) => (
            <div key={key}>
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-medium">{label}</div>
                  <div className="text-xs text-muted-foreground">{desc}</div>
                </div>
                <Switch
                  checked={notif[key]}
                  onCheckedChange={(v) => setNotif((p) => ({ ...p, [key]: v }))}
                />
              </div>
              <Separator />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="text-destructive">Danger zone</CardTitle>
          <CardDescription>Irreversible actions for this workspace.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm">
            <div className="font-medium">Delete workspace</div>
            <div className="text-muted-foreground">This cannot be undone.</div>
          </div>
          <Button variant="destructive" onClick={() => toast.error("Deletion requires confirmation")}>
            Delete workspace
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}