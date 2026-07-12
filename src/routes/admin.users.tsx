import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MoreHorizontal, Plus, Search, Trash2, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users")({
  component: UsersPage,
});

type Role = "Admin" | "Editor" | "Viewer";
type Status = "Active" | "Invited" | "Suspended";
type User = { id: string; name: string; email: string; role: Role; status: Status; joined: string };

const seed: User[] = [
  { id: "1", name: "Aarav Sharma", email: "aarav@theprem.io", role: "Admin", status: "Active", joined: "Jan 12, 2025" },
  { id: "2", name: "Meera Iyer", email: "meera@theprem.io", role: "Editor", status: "Active", joined: "Feb 03, 2025" },
  { id: "3", name: "Kabir Khan", email: "kabir@theprem.io", role: "Viewer", status: "Invited", joined: "Mar 21, 2025" },
  { id: "4", name: "Riya Patel", email: "riya@theprem.io", role: "Editor", status: "Active", joined: "Apr 09, 2025" },
  { id: "5", name: "Ishaan Roy", email: "ishaan@theprem.io", role: "Viewer", status: "Suspended", joined: "May 17, 2025" },
  { id: "6", name: "Sara Ahmed", email: "sara@theprem.io", role: "Admin", status: "Active", joined: "Jun 02, 2025" },
  { id: "7", name: "Yash Verma", email: "yash@theprem.io", role: "Viewer", status: "Active", joined: "Jul 14, 2025" },
];

const statusStyles: Record<Status, string> = {
  Active: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Invited: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Suspended: "bg-destructive/10 text-destructive border-destructive/20",
};

function initialsOf(name: string) {
  return name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
}

function UsersPage() {
  const [users, setUsers] = useState<User[]>(seed);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<{ name: string; email: string; role: Role }>({
    name: "", email: "", role: "Viewer",
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q),
    );
  }, [users, query]);

  const addUser = () => {
    if (!form.name || !form.email) {
      toast.error("Name and email are required");
      return;
    }
    const u: User = {
      id: crypto.randomUUID(),
      name: form.name,
      email: form.email,
      role: form.role,
      status: "Invited",
      joined: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    };
    setUsers((p) => [u, ...p]);
    setForm({ name: "", email: "", role: "Viewer" });
    setOpen(false);
    toast.success(`Invitation sent to ${u.email}`);
  };

  const removeUser = (id: string) => {
    setUsers((p) => p.filter((u) => u.id !== id));
    toast("User removed");
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Users</h1>
          <p className="text-sm text-muted-foreground">Manage team members, roles, and access.</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Invite user
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite a new user</DialogTitle>
              <DialogDescription>They'll receive an email to join your workspace.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@company.com" />
              </div>
              <div className="grid gap-2">
                <Label>Role</Label>
                <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as Role })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={addUser}>Send invite</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-base">All members ({filtered.length})</CardTitle>
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name, email, role…" className="h-9 pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-muted text-xs">{initialsOf(u.name)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium">{u.name}</div>
                          <div className="truncate text-xs text-muted-foreground">{u.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="secondary">{u.role}</Badge></TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${statusStyles[u.status]}`}>
                        {u.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{u.joined}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label="Row actions">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onSelect={() => removeUser(u.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                      No users match your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}