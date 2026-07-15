import { Bell, Search, Moon, Sun, LogOut, User, CreditCard, Settings } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

const notifications = [
  { title: "New signup", body: "Aarav joined the workspace", time: "2m" },
  { title: "Payment received", body: "$1,240 from Acme Inc.", time: "1h" },
  { title: "Weekly report ready", body: "October analytics generated", time: "5h" },
];

export function TopBar() {
  const { theme, toggle } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const email = user?.email ?? "";
  const displayName =
    (user?.user_metadata as any)?.full_name ??
    (user?.user_metadata as any)?.name ??
    email.split("@")[0] ??
    "Admin";
  const initials = displayName
    .split(" ")
    .map((s: string) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const avatarUrl = (user?.user_metadata as any)?.avatar_url as string | undefined;

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/auth" });
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background/80 px-3 backdrop-blur sm:px-4">
      <SidebarTrigger className="shrink-0" />
      <Separator orientation="vertical" className="mx-1 h-6 hidden sm:block" />

      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search users, orders, docs…"
          className="h-9 pl-9"
        />
      </div>

      <div className="ml-auto flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          onClick={toggle}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div className="text-sm font-semibold">Notifications</div>
              <Badge variant="secondary" className="text-[10px]">{notifications.length} new</Badge>
            </div>
            <ul className="max-h-80 divide-y overflow-y-auto">
              {notifications.map((n) => (
                <li key={n.title} className="px-4 py-3 text-sm hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate font-medium">{n.title}</div>
                      <div className="truncate text-xs text-muted-foreground">{n.body}</div>
                    </div>
                    <span className="shrink-0 text-[10px] text-muted-foreground">{n.time}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t p-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => toast.success("All notifications marked as read")}
              >
                Mark all as read
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-1 h-9 gap-2 px-2">
              <Avatar className="h-7 w-7">
                {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {initials || "A"}
                </AvatarFallback>
              </Avatar>
              <span className="hidden max-w-[120px] truncate text-sm font-medium sm:inline">
                {displayName}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="truncate text-sm font-medium">{displayName}</div>
              <div className="truncate text-xs font-normal text-muted-foreground">{email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" /> Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onSelect={signOut}
            >
              <LogOut className="mr-2 h-4 w-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}