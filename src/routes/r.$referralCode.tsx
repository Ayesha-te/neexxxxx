import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Gift, ShieldCheck, Users, Wallet } from "lucide-react";
import { apiRequest, formatCurrency } from "@/lib/api";
import { BrandLockup } from "@/components/BrandLockup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pageTitle } from "@/lib/brand";

type ReferralPreviewResponse = {
  sponsor: {
    id: string;
    name: string;
    referralCode: string;
    accountType: string;
  };
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
  plans: Array<{
    id: string;
    name: string;
    price: number;
    points: number;
    benefits: string[];
    featured?: boolean;
  }>;
  announcements: Array<{
    id: string;
    title: string;
    message: string;
  }>;
};

export const Route = createFileRoute("/r/$referralCode")({
  head: () => ({ meta: [{ title: pageTitle("Referral Preview") }] }),
  component: ReferralPreviewPage,
});

function ReferralPreviewPage() {
  const { referralCode } = Route.useParams();
  const [data, setData] = useState<ReferralPreviewResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    void apiRequest<ReferralPreviewResponse>(`/public/referrals/${referralCode}/preview`)
      .then((response) => {
        if (!active) {
          return;
        }
        setData(response);
      })
      .catch((reason) => {
        if (!active) {
          return;
        }
        setError(reason instanceof Error ? reason.message : "Unable to load referral preview.");
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [referralCode]);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center gradient-hero">
        <div className="text-center">
          <div className="mx-auto size-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="mt-4 text-sm text-muted-foreground">Loading referral preview...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="grid min-h-screen place-items-center gradient-hero p-6">
        <Card className="glass max-w-xl border-border/40">
          <CardContent className="space-y-4 p-8 text-center">
            <h1 className="text-3xl font-bold">Referral link not available</h1>
            <p className="text-muted-foreground">{error || "This referral link could not be found."}</p>
            <Link to="/">
              <Button className="gradient-primary text-primary-foreground">Go home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero">
      <header className="border-b border-border/40 glass">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <BrandLockup titleClassName="text-lg font-bold" subtitleClassName="tracking-[0.22em]" />
          <Link to={`/signup?ref=${data.sponsor.referralCode}`}>
            <Button className="gradient-primary text-primary-foreground">Join Now</Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-12 lg:px-12">
        <Card className="glass border-border/40">
          <CardContent className="grid gap-6 p-8 lg:grid-cols-[1.2fr,0.8fr]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1 text-xs font-semibold text-gold">
                <ShieldCheck className="size-4" />
                Referral preview
              </div>
              <h1 className="text-4xl font-bold tracking-tight">
                You were invited by <span className="text-gradient">{data.sponsor.name}</span>
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                Join the NEXO Women Earning System to start with a fixed plan, build a 3-level team,
                collect points, and unlock milestone rewards in your wallet.
              </p>
              <Link to={`/signup?ref=${data.sponsor.referralCode}`}>
                <Button size="lg" className="gradient-gold text-gold-foreground">
                  Continue with referral
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>

            <div className="rounded-3xl border border-border/40 bg-background/35 p-6">
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Referral details
              </div>
              <div className="mt-3 text-2xl font-bold">{data.sponsor.referralCode}</div>
              <div className="mt-2 text-sm text-muted-foreground capitalize">
                Sponsor account type: {data.sponsor.accountType.replace("_", " ")}
              </div>
              <div className="mt-6 grid gap-3 text-sm">
                <PreviewStat
                  icon={Users}
                  label="Level 1 income"
                  value={`${data.settings.referralRules.level1Percent}%`}
                />
                <PreviewStat
                  icon={Gift}
                  label="Level 2 income"
                  value={`${data.settings.referralRules.level2Percent}%`}
                />
                <PreviewStat
                  icon={Wallet}
                  label="Level 3 income"
                  value={`${data.settings.referralRules.level3Percent}%`}
                />
              </div>
              <div className="mt-4 rounded-2xl border border-border/40 bg-background/30 p-4 text-sm text-muted-foreground">
                Total team commission:{" "}
                <span className="font-semibold text-foreground">
                  {data.settings.referralRules.level1Percent +
                    data.settings.referralRules.level2Percent +
                    data.settings.referralRules.level3Percent}
                  %
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {data.plans.map((plan) => (
            <Card key={plan.id} className="glass border-border/40">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-3xl font-bold">{formatCurrency(plan.price)}</div>
                <div className="text-sm font-semibold text-gold">{plan.points} points on approval</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {plan.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-success" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <Card className="glass border-border/40">
            <CardHeader>
              <CardTitle>Points & Rank Rewards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.settings.rewardMilestones.map((milestone) => (
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
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="glass border-border/40">
              <CardHeader>
                <CardTitle>Withdrawal Rules</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                <Info
                  label="Minimum"
                  value={formatCurrency(data.settings.withdrawalRules.minimumAmount)}
                />
                <Info
                  label="Tax"
                  value={`${data.settings.withdrawalRules.taxPercent}%`}
                />
                <Info
                  label="Daily limit"
                  value={`${formatCurrency(data.settings.withdrawalRules.dailyLimitMin)} - ${formatCurrency(data.settings.withdrawalRules.dailyLimitMax)}`}
                />
                <Info
                  label="Processing"
                  value={`${data.settings.withdrawalRules.processingHoursMin}-${data.settings.withdrawalRules.processingHoursMax} hours`}
                />
              </CardContent>
            </Card>

            <Card className="glass border-border/40">
              <CardHeader>
                <CardTitle>Manual Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Info label="Account title" value={data.settings.paymentDetails.accountName} />
                <Info label="Account number" value={data.settings.paymentDetails.accountNumber} />
                <Info label="Bank name" value={data.settings.paymentDetails.bankName} />
                <Info label="Instructions" value={data.settings.paymentDetails.instructions} />
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.announcements.length ? (
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
      </main>
    </div>
  );
}

function PreviewStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border/40 bg-background/35 p-3">
      <div className="grid size-10 place-items-center rounded-2xl gradient-primary text-primary-foreground">
        <Icon className="size-4" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
        <div className="mt-1 text-sm font-semibold">{value}</div>
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
