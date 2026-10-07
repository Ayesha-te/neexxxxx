import {
  Award,
  BookOpen,
  LayoutDashboard,
  Layers,
  Settings,
  TrendingUp,
  Trophy,
  UserPlus,
  Users,
  Wallet,
  Building2,
} from "lucide-react";

export const appNavItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/earnings", label: "Current Income", icon: TrendingUp },
  { to: "/rewards", label: "Reward Income", icon: Award },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/plans", label: "Investment Plans", icon: Layers },
  { to: "/total-investment", label: "Total Investment", icon: Wallet },
  { to: "/referrals", label: "Referrals", icon: Users },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/create-account", label: "New Account", icon: UserPlus },
  { to: "/owners", label: "Leadership", icon: Building2 },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;
