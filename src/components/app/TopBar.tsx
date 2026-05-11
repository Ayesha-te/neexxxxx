import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { appNavItems } from "@/components/app/appNavItems";
import { useAppAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export function TopBar() {
  const [dark, setDark] = useState(false);
  const path = useRouterState({ select: (state) => state.location.pathname });
  const { user, logout } = useAppAuth();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-30 glass border-b border-border/50 px-4 py-3 lg:px-8 flex items-center gap-3">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation menu">
            <Menu className="size-5" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[85vh] px-4 pb-6">
          <DrawerHeader className="px-0 text-left">
            <DrawerTitle>Navigation</DrawerTitle>
            <DrawerDescription>Jump to any part of the workspace.</DrawerDescription>
          </DrawerHeader>
          <nav className="mt-2 grid gap-2 overflow-y-auto pb-2">
            {appNavItems.map((item) => {
              const Icon = item.icon;
              const active = path === item.to;

              return (
                <DrawerClose key={item.to} asChild>
                  <Link
                    to={item.to}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-3 py-3 text-sm font-medium transition-colors",
                      active
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-border/60 bg-background/60 text-foreground hover:bg-accent",
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </DrawerClose>
              );
            })}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-border/60 pt-4">
            <Button variant="outline" onClick={logout} className="justify-start">
              Logout
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
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
