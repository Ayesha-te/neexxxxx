import {
  Award,
  BookOpen,
  LayoutDashboard,
  Layers,
  Settings,
  TrendingUp,
  Ticket,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";

export const appNavItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/join", label: "Join Options", icon: Trophy },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/plans", label: "Investment Plans", icon: Layers },
  { to: "/lucky-draw", label: "Lucky Draw", icon: Ticket },
  { to: "/earnings", label: "Earning System", icon: TrendingUp },
  { to: "/rewards", label: "Rewards", icon: Award },
  { to: "/referrals", label: "Referrals", icon: Users },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;