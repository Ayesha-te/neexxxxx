import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Layers, Gift, Users, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/plans", label: "Plans", icon: Layers },
  { to: "/rewards", label: "Rewards", icon: Gift },
  { to: "/referrals", label: "Refer", icon: Users },
  { to: "/wallet", label: "Wallet", icon: Wallet },
] as const;

export function MobileNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-border/50 px-2 py-2 grid grid-cols-5">
      {items.map((it) => {
        const Icon = it.icon;
        const active = path === it.to;
        return (
          <Link key={it.to} to={it.to}
            className={cn("flex flex-col items-center gap-1 py-1 rounded-lg text-[11px]",
              active ? "text-gold" : "text-muted-foreground")}>
            <Icon className="size-5" />
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
