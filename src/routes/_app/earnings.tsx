import { createFileRoute } from "@tanstack/react-router";
import { Coins, Gift, Target, Wallet, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { pageTitle } from "@/lib/brand";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest, formatCurrency } from "@/lib/api";
import { useAppAuth } from "@/lib/auth";

type DashboardResponse = {
  stats: {
    totalInvestment: number;
    totalPoints: number;
    walletBalance: number;
    availableBalance: number;
    totalCommissionEarned: number;
    totalRewardValue: number;
  };
  investments: Array<{
    id: string;
    status: string;
    createdAt: string;
    activatedAt: string | null;
    plan: {
      name: string;
      price: number;
      points: number;
      level1Percent: number;
      level2Percent: number;
      level3Percent: number;
    } | null;
    metrics: {
      points: number;
    } | null;
  }>;
  rewardProgress: {
    totalPoints: number;
    totalClaimedRewardValue: number;
    nextMilestone: {
      title: string;
      pointsRequired: number;
      rewardAmount: number;
      remainingPoints: number;
    } | null;
  };
};

type JoinOptionsResponse = {
  settings: {
    referralRules: {
      level1Percent: number;
      level2Percent: number;
      level3Percent: number;
    };
    withdrawalRules: {
      minimumAmount: number;
      taxPercent: number;
      dailyLimitMin: number;
      dailyLimitMax: number;
      processingHoursMin: number;
      processingHoursMax: number;
    };
  };
};

type ReferralRankResponse = {
  totalPoints: number;
  tier: {
    title: string;
    pointsRequired: number;
    directPercent: number;
    indirectPercent: number;
    teamPercent: number;
  } | null;
  percents: {
    direct: number;
    indirect: number;
    team: number;
  };
};

export const Route = createFileRoute("/_app/earnings")({
  head: () => ({ meta: [{ title: pageTitle("Earning System") }] }),
  component: Earnings,
});

function Earnings() {
  const { token } = useAppAuth();
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [joinData, setJoinData] = useState<JoinOptionsResponse | null>(null);
  const [referralRank, setReferralRank] = useState<ReferralRankResponse | null>(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    void Promise.all([
      apiRequest<DashboardResponse>("/user/dashboard", { token }),
      apiRequest<JoinOptionsResponse>("/user/join-options", { token }),
      apiRequest<ReferralRankResponse>("/user/referral-rank", { token }),
    ]).then(([dashboardResponse, joinOptionsResponse, rankResponse]) => {
      setDashboard(dashboardResponse);
      setJoinData(joinOptionsResponse);
      setReferralRank(rankResponse);
    });
  }, [token]);

  const referralRules = joinData?.settings.referralRules;
  const withdrawalRules = joinData?.settings.withdrawalRules;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Earning System</h1>
        <p className="text-muted-foreground">
          Approved plans add fixed points, unlock 3-level referral income, and move you toward
          claimable reward milestones instead of ROI-based returns.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          icon={Wallet}
          label="Total invested"
          value={formatCurrency(dashboard?.stats.totalInvestment ?? 0)}
          hint="Approved plan value"
        />
        <StatCard
          icon={Target}
          label="Points collected"
          value={(dashboard?.stats.totalPoints ?? 0).toLocaleString()}
          hint="From active approved plans"
        />
        <StatCard
          icon={Coins}
          label="Referral income"
          value={formatCurrency(dashboard?.stats.totalCommissionEarned ?? 0)}
          hint="3-level team commissions"
        />
        <StatCard
          icon={Gift}
          label="Available balance"
          value={formatCurrency(dashboard?.stats.availableBalance ?? 0)}
          hint="Ready for withdrawal requests"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>How Your Income Works</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <RuleCard
              label="Plan activation"
              value="Every approved plan adds fixed points to your account."
            />
            <RuleCard
              label="Team commissions"
              value={
                referralRules
                  ? `${referralRules.level1Percent}% / ${referralRules.level2Percent}% / ${referralRules.level3Percent}% across 3 levels`
                  : "48% / 18% / 10% across 3 levels"
              }
            />
            <RuleCard
              label="Your referral rank"
              value={
                referralRank?.tier
                  ? `${referralRank.tier.title} • ${referralRank.totalPoints.toLocaleString()} points`
                  : `${(referralRank?.totalPoints ?? 0).toLocaleString()} points • Starter`
              }
            />
            <RuleCard
              label="Reward claims"
              value={`${formatCurrency(dashboard?.rewardProgress.totalClaimedRewardValue ?? 0)} already claimed into wallet`}
            />
            <RuleCard
              label="Withdrawal rules"
              value={
                withdrawalRules
                  ? `${formatCurrency(withdrawalRules.minimumAmount)} minimum | ${withdrawalRules.taxPercent}% tax | ${withdrawalRules.processingHoursMin}-${withdrawalRules.processingHoursMax} hours`
                    : "1000 minimum | 10% tax | 24-48 hours"
              }
            />
          </CardContent>
        </Card>

        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>Next Reward Target</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboard?.rewardProgress.nextMilestone ? (
              <>
                <div className="rounded-2xl border border-border/40 bg-background/35 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Next milestone
                  </div>
                  <div className="mt-2 text-2xl font-bold">
                    {dashboard.rewardProgress.nextMilestone.title}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {dashboard.rewardProgress.nextMilestone.pointsRequired.toLocaleString()} points
                    {" | "}
                    {formatCurrency(dashboard.rewardProgress.nextMilestone.rewardAmount)}
                  </div>
                </div>
                <div className="rounded-2xl border border-border/40 bg-background/30 p-4">
                  <div className="text-sm text-muted-foreground">
                    Remaining points to unlock this rank reward
                  </div>
                  <div className="mt-2 text-3xl font-bold">
                    {dashboard.rewardProgress.nextMilestone.remainingPoints.toLocaleString()}
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-border/40 bg-background/35 p-4 text-sm text-muted-foreground">
                All configured reward milestones are already unlocked.
              </div>
            )}

            {withdrawalRules ? (
              <div className="rounded-2xl border border-border/40 bg-background/30 p-4 text-sm text-muted-foreground">
                Daily withdrawal range: {formatCurrency(withdrawalRules.dailyLimitMin)} to{" "}
                {formatCurrency(withdrawalRules.dailyLimitMax)}.
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Your Plan Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {dashboard?.investments.length ? (
            dashboard.investments.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border/40 bg-background/35 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold">{item.plan?.name ?? "Plan"}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.plan
                        ? `${formatCurrency(item.plan.price)} | ${item.plan.points} points`
                        : "Plan details unavailable"}
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Submitted{" "}
                      {new Date(item.createdAt).toLocaleDateString("en-PK", {
                        dateStyle: "medium",
                      })}
                    </div>
                    {item.activatedAt ? (
                      <div className="mt-1 text-xs text-muted-foreground">
                        Activated{" "}
                        {new Date(item.activatedAt).toLocaleDateString("en-PK", {
                          dateStyle: "medium",
                        })}
                      </div>
                    ) : null}
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {item.status}
                  </Badge>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <Metric
                    label="Plan points"
                    value={String(item.metrics?.points ?? item.plan?.points ?? 0)}
                  />
                  <Metric
                    label="Referral unlock"
                    value={
                      item.plan
                        ? `${item.plan.level1Percent}% / ${item.plan.level2Percent}% / ${item.plan.level3Percent}%`
                        : referralRank?.percents
                          ? `${referralRank.percents.direct}% / ${referralRank.percents.indirect}% / ${referralRank.percents.team}%`
                        : referralRules
                          ? `${referralRules.level1Percent}% / ${referralRules.level2Percent}% / ${referralRules.level3Percent}%`
                            : "48% / 18% / 10%"
                    }
                  />
                  <Metric
                    label="Reward impact"
                    value={`${(item.metrics?.points ?? item.plan?.points ?? 0).toLocaleString()} points added`}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground">
              No plan activity yet. Approving a plan is what starts the points and referral-income
              journey.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <Card className="glass border-border/40">
      <CardContent className="flex items-start gap-4 p-5">
        <div className="grid size-11 place-items-center rounded-2xl gradient-primary text-primary-foreground">
          <Icon className="size-5" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
          <div className="mt-1 text-2xl font-bold">{value}</div>
          <div className="mt-1 text-sm text-muted-foreground">{hint}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function RuleCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-background/30 p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="mt-2 text-sm font-semibold">{value}</div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-background/30 p-3">
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
}
