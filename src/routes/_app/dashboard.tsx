import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Bell, Coins, Gift, TrendingUp, Users, Wallet } from "lucide-react";
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
      accent: "text-primary",
    },
    {
      label: "Total Points",
      value: (data?.stats.totalPoints ?? 0).toLocaleString(),
      icon: TrendingUp,
      accent: "text-success",
    },
    {
      label: "Available Balance",
      value: formatCurrency(data?.stats.availableBalance ?? 0),
      icon: Gift,
      accent: "text-gold",
    },
    {
      label: "Referral Income",
      value: formatCurrency(data?.stats.totalCommissionEarned ?? 0),
      icon: Coins,
      accent: "text-secondary",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name ?? "Nexo member"}</h1>
          <p className="text-muted-foreground">
            Your plans, points, rank rewards, and 3-level network income are all synced from the
            backend here.
          </p>
        </div>
        <Badge className="gradient-gold border-0 px-3 py-1.5 text-gold-foreground capitalize">
          {(data?.stats.accountType ?? user?.accountType ?? "prospect").replace("_", " ")}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label} className="glass border-border/40">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div
                  className={`grid size-10 place-items-center rounded-xl bg-accent/40 ${card.accent}`}
                >
                  <card.icon className="size-5" />
                </div>
                <ArrowUpRight className="size-4 text-success" />
              </div>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{card.label}</div>
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
            <CardTitle>Reward Rank Progress</CardTitle>
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
                <div className="font-semibold">{data.rewardProgress.nextMilestone.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {data.rewardProgress.nextMilestone.pointsRequired.toLocaleString()} points for{" "}
                  {formatCurrency(data.rewardProgress.nextMilestone.rewardAmount)}
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
              type: "30% commission",
            },
            {
              label: "Level 2",
              count: data?.referralSummary.level2 ?? 0,
              type: "15% commission",
            },
            {
              label: "Level 3",
              count: data?.referralSummary.level3 ?? 0,
              type: "5% commission",
            },
          ].map((item) => (
            <div key={item.label} className="rounded-xl glass p-5 text-center">
              <div className="text-xs text-muted-foreground">{item.label}</div>
              <div className="mt-1 text-3xl font-bold text-gradient">{item.count}</div>
              <div className="mt-1 text-xs text-muted-foreground">{item.type}</div>
            </div>
          ))}
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
