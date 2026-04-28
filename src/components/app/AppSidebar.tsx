import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Layers, TrendingUp, Gift, Users, Wallet, Settings, Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/plans", label: "Investment Plans", icon: Layers },
  { to: "/earnings", label: "Earning System", icon: TrendingUp },
  { to: "/rewards", label: "Rewards", icon: Gift },
  { to: "/referrals", label: "Referrals", icon: Users },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-4 sticky top-0 h-screen">
      <Link to="/dashboard" className="flex items-center gap-2 px-2 py-3 mb-4">
        <div className="size-9 rounded-xl gradient-primary grid place-items-center glow">
          <Sparkles className="size-5 text-primary-foreground" />
        </div>
        <div>
          <div className="font-bold text-sidebar-foreground leading-tight">Apex Invest</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Premium</div>
        </div>
      </Link>
      <nav className="flex flex-col gap-1">
        {items.map((it) => {
          const active = path === it.to;
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                active
                  ? "gradient-primary text-primary-foreground glow"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <Icon className="size-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-4 rounded-xl glass">
        <div className="text-xs text-muted-foreground mb-1">Current Plan</div>
        <div className="font-bold text-gradient-gold">Plan 5 · Gold</div>
        <div className="text-xs text-muted-foreground mt-2">Upgrade to unlock higher rewards.</div>
      </div>
    </aside>
  );
}
