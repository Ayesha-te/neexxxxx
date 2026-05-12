import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Bell,
  Coins,
  Gift,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { pageTitle } from "@/lib/brand";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest, formatCurrency, type AppUser } from "@/lib/api";
import { useAppAuth } from "@/lib/auth";

type DashboardResponse = {
  user: AppUser;
  stats: {
    totalInvestment: number;
    totalPoints: number;
    walletBalance: number;
    availableBalance: number;
    totalCommissionEarned: number;
    totalRewardValue: number;
    accountType: string;
  };
  investments: Array<{
    id: string;
    status: string;
    plan: {
      name: string;
      price: number;
      points: number;
    };
    metrics: {
      points: number;
    };
  }>;
  referralSummary: {
    level1: number;
    level2: number;
    level3: number;
  };
  referralRules: {
    level1Percent: number;
    level2Percent: number;
    level3Percent: number;
  };
  rewardProgress: {
    totalPoints: number;
    totalClaimedRewardValue: number;
    nextMilestone: {
      title: string;
      pointsRequired: number;
      rewardAmount: number;
      remainingPoints: number;
    } | null;
    claimableMilestones: Array<{
      title: string;
      pointsRequired: number;
      rewardAmount: number;
    }>;
  };
  announcements: Array<{
    id: string;
    title: string;
    message: string;
  }>;
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    createdAt: string;
  }>;
  recentTransactions: Array<{
    id: string;
    amount: number;
    direction: "credit" | "debit";
    type: string;
    description: string;
    createdAt: string;
  }>;
};

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: pageTitle("Dashboard") }] }),
  component: Dashboard,
});

function Dashboard() {
  const { token, user } = useAppAuth();
  const [data, setData] = useState<DashboardResponse | null>(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    void apiRequest<DashboardResponse>("/user/dashboard", { token }).then(setData);
  }, [token]);

  const cards = [
    {
      label: "Total Investment",
      value: formatCurrency(data?.stats.totalInvestment ?? 0),
      icon: Wallet,
      iconTint: "text-primary",
      cardClass: "bg-[linear-gradient(135deg,oklch(0.97_0.035_338),oklch(0.93_0.05_325))]",
    },
    {
      label: "Total Points",
      value: (data?.stats.totalPoints ?? 0).toLocaleString(),
      icon: TrendingUp,
      iconTint: "text-success",
      cardClass: "bg-[linear-gradient(135deg,oklch(0.96_0.04_150),oklch(0.91_0.06_155))]",
    },
    {
      label: "Available Balance",
      value: formatCurrency(data?.stats.availableBalance ?? 0),
      icon: Gift,
      iconTint: "text-gold",
      cardClass: "bg-[linear-gradient(135deg,oklch(0.98_0.035_85),oklch(0.93_0.055_74))]",
    },
    {
      label: "Referral Income",
      value: formatCurrency(data?.stats.totalCommissionEarned ?? 0),
      icon: Coins,
      iconTint: "text-secondary",
      cardClass: "bg-[linear-gradient(135deg,oklch(0.97_0.03_320),oklch(0.92_0.045_300))]",
    },
  ];

  const referralTotal =
    (data?.referralSummary.level1 ?? 0) +
    (data?.referralSummary.level2 ?? 0) +
    (data?.referralSummary.level3 ?? 0);
  const nextMilestone = data?.rewardProgress.nextMilestone;
  const milestoneProgress = nextMilestone
    ? Math.max(
        0,
        Math.min(
          100,
          ((nextMilestone.pointsRequired - nextMilestone.remainingPoints) /
            nextMilestone.pointsRequired) *
            100,
        ),
      )
    : 100;

  return (
    <div className="space-y-6 pb-2">
      <Card className="relative overflow-hidden border-0 bg-[linear-gradient(135deg,oklch(0.53_0.2_333),oklch(0.41_0.17_308))] text-primary-foreground shadow-[0_28px_60px_-32px_oklch(0.33_0.14_320/0.8)]">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-gold/25 blur-3xl" />
        <CardContent className="relative p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium">
                <Sparkles className="size-3.5" /> Live dashboard
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Welcome back, {user?.name ?? "Nexo member"}
              </h1>
              <p className="mt-2 text-primary-foreground/85 sm:text-base">
                Track your growth journey with live points, balance movement, milestones, and
                referrals all in one view.
              </p>
            </div>
            <Badge className="gradient-gold border-0 px-3 py-1.5 text-gold-foreground capitalize shadow-[0_14px_30px_-18px_oklch(0.83_0.15_80)]">
              {(data?.stats.accountType ?? user?.accountType ?? "prospect").replace("_", " ")}
            </Badge>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
            <div className="rounded-xl border border-white/20 bg-white/10 p-3">
              <div className="text-[11px] uppercase tracking-[0.18em] text-primary-foreground/70">
                Approved plans
              </div>
              <div className="mt-1 text-xl font-bold">{data?.investments.length ?? 0}</div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-3">
              <div className="text-[11px] uppercase tracking-[0.18em] text-primary-foreground/70">
                Team size
              </div>
              <div className="mt-1 text-xl font-bold">{referralTotal}</div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-3">
              <div className="text-[11px] uppercase tracking-[0.18em] text-primary-foreground/70">
                Claimable rewards
              </div>
              <div className="mt-1 text-xl font-bold">
                {data?.rewardProgress.claimableMilestones.length ?? 0}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <Card
            key={card.label}
            className={`group relative overflow-hidden border border-border/40 transition-transform duration-300 hover:-translate-y-1 ${card.cardClass}`}
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/35 blur-2xl" />
            <CardContent className="relative p-5">
              <div className="mb-3 flex items-center justify-between">
                <div
                  className={`grid size-10 place-items-center rounded-xl bg-white/55 backdrop-blur ${card.iconTint}`}
                >
                  <card.icon className="size-5" />
                </div>
                <ArrowUpRight className="size-4 text-foreground/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <div className="text-2xl font-extrabold tracking-tight text-foreground">{card.value}</div>
              <div className="mt-1 text-xs font-medium text-foreground/70">{card.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>Approved Plans</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data?.investments.length ? (
              data.investments.map((investment) => (
                <div
                  key={investment.id}
                  className="rounded-2xl border border-border/40 bg-background/35 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold">{investment.plan.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrency(investment.plan.price)} • {investment.plan.points} points
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {investment.status}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-border/40 p-6 text-sm text-muted-foreground">
                No approved plan yet. Submit your first investment to start collecting points.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="size-5 text-gold" /> Reward Rank Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-border/40 bg-background/35 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Current points
              </div>
              <div className="mt-2 text-4xl font-bold">{data?.rewardProgress.totalPoints ?? 0}</div>
              <div className="mt-2 text-sm text-muted-foreground">
                Claimed reward value:{" "}
                {formatCurrency(data?.rewardProgress.totalClaimedRewardValue ?? 0)}
              </div>
            </div>
            {data?.rewardProgress.nextMilestone ? (
              <div className="rounded-2xl border border-border/40 bg-background/30 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold">{data.rewardProgress.nextMilestone.title}</div>
                  <div className="text-xs font-medium text-muted-foreground">
                    {milestoneProgress.toFixed(0)}% complete
                  </div>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {data.rewardProgress.nextMilestone.pointsRequired.toLocaleString()} points for{" "}
                  {formatCurrency(data.rewardProgress.nextMilestone.rewardAmount)}
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-accent/80">
                  <div
                    className="h-full gradient-primary"
                    style={{ width: `${milestoneProgress}%` }}
                    aria-label="Milestone progress"
                  />
                </div>
                <div className="mt-3 text-sm font-medium text-gold">
                  {data.rewardProgress.nextMilestone.remainingPoints.toLocaleString()} points to go
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-border/40 bg-background/30 p-4 text-sm text-muted-foreground">
                All configured milestones have already been claimed.
              </div>
            )}
            <div className="rounded-2xl border border-border/40 bg-background/30 p-4 text-sm text-muted-foreground">
              Claimable milestones right now: {data?.rewardProgress.claimableMilestones.length ?? 0}
            </div>
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
            {
              label: "Level 1",
              count: data?.referralSummary.level1 ?? 0,
              type: `${data?.referralRules.level1Percent ?? 0}% commission`,
            },
            {
              label: "Level 2",
              count: data?.referralSummary.level2 ?? 0,
              type: `${data?.referralRules.level2Percent ?? 0}% commission`,
            },
            {
              label: "Level 3",
              count: data?.referralSummary.level3 ?? 0,
              type: `${data?.referralRules.level3Percent ?? 0}% commission`,
            },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border/40 bg-background/35 p-5 text-center">
              <div className="text-xs font-medium text-muted-foreground">{item.label}</div>
              <div className="mt-1 text-3xl font-bold text-gradient">{item.count}</div>
              <div className="mt-1 text-xs text-muted-foreground">{item.type}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="glass border-border/40">
        <CardContent className="grid gap-4 p-4 sm:grid-cols-3 sm:p-5">
          <div className="rounded-2xl border border-border/40 bg-background/40 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <Target className="size-4" /> Next target
            </div>
            <div className="mt-2 text-lg font-semibold">
              {nextMilestone?.title ?? "All milestones complete"}
            </div>
          </div>
          <div className="rounded-2xl border border-border/40 bg-background/40 p-4">
            <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Wallet value</div>
            <div className="mt-2 text-lg font-semibold">
              {formatCurrency(data?.stats.walletBalance ?? 0)}
            </div>
          </div>
          <div className="rounded-2xl border border-border/40 bg-background/40 p-4">
            <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Rewards unlocked
            </div>
            <div className="mt-2 text-lg font-semibold">
              {data?.rewardProgress.claimableMilestones.length ?? 0} ready to claim
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>Recent Wallet Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data?.recentTransactions.length ? (
              data.recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="rounded-2xl border border-border/40 bg-background/35 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold">{transaction.description}</div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {new Date(transaction.createdAt).toLocaleString("en-PK", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </div>
                    </div>
                    <div
                      className={`text-lg font-bold ${
                        transaction.direction === "debit" ? "text-destructive" : "text-success"
                      }`}
                    >
                      {transaction.direction === "debit" ? "-" : "+"}
                      {formatCurrency(transaction.amount)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">No wallet activity yet.</div>
            )}
          </CardContent>
        </Card>

        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data?.announcements.length ? (
              data.announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="rounded-2xl border border-border/40 bg-background/35 p-4"
                >
                  <div className="font-semibold">{announcement.title}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{announcement.message}</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">No announcements right now.</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="size-5" />
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data?.notifications.length ? (
            data.notifications.map((notification) => (
              <div
                key={notification.id}
                className="rounded-2xl border border-border/40 bg-background/35 p-4"
              >
                <div className="font-semibold">{notification.title}</div>
                <div className="mt-2 text-sm text-muted-foreground">{notification.message}</div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {new Date(notification.createdAt).toLocaleString("en-PK", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground">No notifications yet.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
