import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Coins, Gift, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { apiRequest, formatCurrency, type AppUser } from "@/lib/api";
import { pageTitle } from "@/lib/brand";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppAuth } from "@/lib/auth";

type JoinOptionsResponse = {
  user: AppUser;
  plans: Array<{
    id: string;
    name: string;
    price: number;
    points: number;
    benefits: string[];
    featured?: boolean;
  }>;
  settings: {
    paymentDetails: {
      accountName: string;
      accountNumber: string;
      bankName: string;
      instructions: string;
    };
    referralRules: {
      level1Percent: number;
      level2Percent: number;
      level3Percent: number;
    };
    rewardMilestones: Array<{
      pointsRequired: number;
      rewardAmount: number;
      title: string;
    }>;
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

export const Route = createFileRoute("/_app/join")({
  head: () => ({ meta: [{ title: pageTitle("Join Options") }] }),
  component: JoinOptionsPage,
});

function JoinOptionsPage() {
  const { token } = useAppAuth();
  const [data, setData] = useState<JoinOptionsResponse | null>(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    void apiRequest<JoinOptionsResponse>("/user/join-options", { token }).then(setData);
  }, [token]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Join Nexo Women Earning System</h1>
          <p className="text-muted-foreground">
            Start with an investment plan, earn fixed points, unlock reward ranks, and build your
            team with a 3-step referral structure.
          </p>
        </div>
        <Badge className="gradient-gold border-0 px-3 py-1.5 text-gold-foreground capitalize">
          {data?.user.accountType.replace("_", " ") ?? "Prospect"}
        </Badge>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5 text-primary" />
              Investment Plans
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-muted-foreground">
              Every approved plan adds points to your rank journey and activates team income on the
              {` ${data?.settings.referralRules.level1Percent ?? 30}% / ${data?.settings.referralRules.level2Percent ?? 15}% / ${data?.settings.referralRules.level3Percent ?? 5}% `}
              structure.
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {data?.plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-2xl border border-border/40 bg-background/35 p-4 ${
                    plan.featured ? "ring-1 ring-gold/60" : ""
                  }`}
                >
                  <div className="font-semibold">{plan.name}</div>
                  <div className="mt-1 text-xl font-bold">{formatCurrency(plan.price)}</div>
                  <div className="text-sm font-semibold text-gold">{plan.points} points</div>
                </div>
              ))}
            </div>
            <Link to="/plans">
              <Button className="gradient-primary text-primary-foreground">
                Open investment flow
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="size-5 text-gold" />
              Referral Income
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-muted-foreground">
              Three steps only. Total commission equals 50% across your network.
            </div>
            <div className="grid gap-3">
              <MiniRule
                icon={Users}
                label="Step 1"
                value={`${data?.settings.referralRules.level1Percent ?? 0}%`}
              />
              <MiniRule
                icon={Coins}
                label="Step 2"
                value={`${data?.settings.referralRules.level2Percent ?? 0}%`}
              />
              <MiniRule
                icon={ShieldCheck}
                label="Step 3"
                value={`${data?.settings.referralRules.level3Percent ?? 0}%`}
              />
            </div>
            <Link to="/referrals">
              <Button variant="outline" className="w-full">
                Open referral center
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="size-5 text-gold" />
              Rank Rewards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(data?.settings.rewardMilestones ?? []).map((milestone) => (
              <div
                key={milestone.pointsRequired}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border/40 bg-background/35 p-4"
              >
                <div>
                  <div className="font-semibold">{milestone.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {milestone.pointsRequired.toLocaleString()} points
                  </div>
                </div>
                <div className="text-lg font-bold text-success">
                  {formatCurrency(milestone.rewardAmount)}
                </div>
              </div>
            ))}
            <Link to="/rewards">
              <Button variant="outline" className="w-full">
                View all milestones
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>Withdrawal Rules</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <Info
              label="Minimum"
              value={formatCurrency(data?.settings.withdrawalRules.minimumAmount ?? 0)}
            />
            <Info
              label="Tax"
              value={`${data?.settings.withdrawalRules.taxPercent ?? 0}%`}
            />
            <Info
              label="Daily limit"
              value={`${formatCurrency(data?.settings.withdrawalRules.dailyLimitMin ?? 0)} - ${formatCurrency(data?.settings.withdrawalRules.dailyLimitMax ?? 0)}`}
            />
            <Info
              label="Processing"
              value={`${data?.settings.withdrawalRules.processingHoursMin ?? 0}-${data?.settings.withdrawalRules.processingHoursMax ?? 0} hours`}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Manual Payment Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <Info label="Account title" value={data?.settings.paymentDetails.accountName ?? "-"} />
          <Info
            label="Account number"
            value={data?.settings.paymentDetails.accountNumber ?? "-"}
          />
          <Info label="Bank name" value={data?.settings.paymentDetails.bankName ?? "-"} />
          <Info label="Instructions" value={data?.settings.paymentDetails.instructions ?? "-"} />
        </CardContent>
      </Card>
    </div>
  );
}

function MiniRule({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border/40 bg-background/35 p-4">
      <div className="grid size-10 place-items-center rounded-2xl gradient-primary text-primary-foreground">
        <Icon className="size-4" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
        <div className="mt-1 text-base font-semibold">{value}</div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-background/35 p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="mt-2 text-sm font-semibold">{value}</div>
    </div>
  );
}
