import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Layers,
  Settings,
  TrendingUp,
  Ticket,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";
import { BrandLockup } from "@/components/BrandLockup";
import { useAppAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/join", label: "Join Options", icon: Trophy },
  { to: "/plans", label: "Investment Plans", icon: Layers },
  { to: "/lucky-draw", label: "Lucky Draw", icon: Ticket },
  { to: "/earnings", label: "Earning System", icon: TrendingUp },
  { to: "/rewards", label: "Rewards", icon: Wallet },
  { to: "/referrals", label: "Referrals", icon: Users },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppSidebar() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const { user } = useAppAuth();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-4 lg:flex">
      <Link to="/dashboard" className="mb-4 px-2 py-3">
        <BrandLockup
          imageClassName="size-12 rounded-[1.4rem]"
          titleClassName="text-base font-bold text-sidebar-foreground"
          subtitleClassName="tracking-[0.22em]"
        />
      </Link>
      <nav className="flex flex-col gap-1">
        {items.map((item) => {
          const active = path === item.to;
          const Icon = item.icon;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "gradient-primary text-primary-foreground glow"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="glass mt-auto rounded-xl p-4">
        <div className="mb-1 text-xs text-muted-foreground">Account Type</div>
        <div className="font-bold text-gradient-gold capitalize">
          {user?.accountType.replace("_", " ") ?? "Prospect"}
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          3-level commission chain: 48% / 18% / 10%.
        </div>
      </div>
    </aside>
  );
}
