import {
  Award,
  BookOpen,
  LayoutDashboard,
  Layers,
  Settings,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
  Building2,
} from "lucide-react";

export const appNavItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/plans", label: "Investment Plans", icon: Layers },
  { to: "/earnings", label: "Earning System", icon: TrendingUp },
  { to: "/rewards", label: "Rewards", icon: Award },
  { to: "/referrals", label: "Referrals", icon: Users },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/create-account", label: "New Account", icon: UserPlus },
  { to: "/owners", label: "Leadership", icon: Building2 },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;
