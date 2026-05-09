import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppAuth } from "@/lib/auth";

export function TopBar() {
  const [dark, setDark] = useState(false);
  const { user, logout } = useAppAuth();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-30 glass border-b border-border/50 px-4 py-3 lg:px-8 flex items-center gap-3">
      <Button variant="ghost" size="icon" className="lg:hidden">
        <Menu className="size-5" />
      </Button>
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search plans, rewards, or circles..."
          className="bg-input/70 pl-9 border-border/60"
        />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDark((value) => !value)}
          aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
        >
          {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-gold" />
        </Button>
        <Button variant="ghost" className="hidden sm:inline-flex" onClick={logout}>
          Logout
        </Button>
        <div className="flex items-center gap-2 pl-2">
          <Avatar className="size-9 ring-2 ring-primary/40">
            <AvatarFallback className="gradient-primary text-primary-foreground font-semibold">
              {user?.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() ?? "NX"}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold leading-tight">{user?.name ?? "Nexo User"}</div>
            <div className="text-xs text-muted-foreground capitalize">
              {(user?.accountType ?? "prospect").replace("_", " ")}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
