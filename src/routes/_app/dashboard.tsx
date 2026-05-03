import { createFileRoute } from "@tanstack/react-router";
import { pageTitle } from "@/lib/brand";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Wallet, TrendingUp, Trophy, Star, Users, ArrowUpRight } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: pageTitle("Dashboard") }] }),
  component: Dashboard,
});

const data = [
  { d: "Mon", v: 1200 },
  { d: "Tue", v: 1900 },
  { d: "Wed", v: 1700 },
  { d: "Thu", v: 2400 },
  { d: "Fri", v: 2200 },
  { d: "Sat", v: 3100 },
  { d: "Sun", v: 3600 },
];

const stats = [
  { label: "Total Investment", value: "₨ 9,500", icon: Wallet, accent: "text-primary" },
  { label: "Total Earnings", value: "₨ 24,820", icon: TrendingUp, accent: "text-success" },
  { label: "Current Level", value: "Level 5", icon: Trophy, accent: "text-gold" },
  { label: "Total Points", value: "63 pts", icon: Star, accent: "text-secondary" },
];

const breakdown = [
  { label: "Direct Income (L1)", val: "₨ 14,200", pct: 60, color: "gradient-primary" },
  { label: "Second Step (L2)", val: "₨ 7,820", pct: 32, color: "gradient-gold" },
  { label: "Third Step (L3)", val: "₨ 2,800", pct: 8, color: "bg-success" },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Ali 👋</h1>
          <p className="text-muted-foreground">Here's how your portfolio is performing today.</p>
        </div>
        <Badge className="gradient-gold text-gold-foreground border-0 px-3 py-1.5">
          Active Plan · Plan 5
        </Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="glass border-border/40">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`size-10 rounded-xl bg-accent/40 grid place-items-center ${s.accent}`}
                >
                  <s.icon className="size-5" />
                </div>
                <ArrowUpRight className="size-4 text-success" />
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="glass border-border/40 lg:col-span-2">
          <CardHeader>
            <CardTitle>Earnings Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.62 0.22 285)" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="oklch(0.62 0.22 285)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.05)" />
                <XAxis dataKey="d" stroke="oklch(0.72 0.03 280)" fontSize={12} />
                <YAxis stroke="oklch(0.72 0.03 280)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.23 0.05 280)",
                    border: "1px solid oklch(0.32 0.05 280)",
                    borderRadius: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="oklch(0.83 0.16 85)"
                  strokeWidth={2.5}
                  fill="url(#g)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>Earnings Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {breakdown.map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-muted-foreground">{b.label}</span>
                  <span className="font-semibold">{b.val}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full ${b.color}`} style={{ width: `${b.pct}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-5" /> Referral Network
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          {[
            { l: "Level 1", n: 12, t: "Direct" },
            { l: "Level 2", n: 38, t: "Second step" },
            { l: "Level 3", n: 96, t: "Third step" },
          ].map((r) => (
            <div key={r.l} className="rounded-xl glass p-5 text-center">
              <div className="text-xs text-muted-foreground">{r.l}</div>
              <div className="text-3xl font-bold text-gradient mt-1">{r.n}</div>
              <div className="text-xs text-muted-foreground mt-1">{r.t}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Progress to next level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-sm mb-2">
            <span>Level 5 → Level 6</span>
            <span className="text-gold font-semibold">63 / 100 pts</span>
          </div>
          <Progress value={63} className="h-3" />
          <p className="text-xs text-muted-foreground mt-3">
            Earn 37 more points to unlock Level 6 and a ₨ 35,000 reward.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
