import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Copy, Share2, Users } from "lucide-react";
import { toast } from "sonner";
import { pageTitle } from "@/lib/brand";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiRequest, formatCurrency, type AppUser } from "@/lib/api";
import { useAppAuth } from "@/lib/auth";

type ReferralsResponse = {
  user: AppUser;
  settings: {
    level1Percent: number;
    level2Percent: number;
    level3Percent: number;
  };
  rank: {
    totalPoints: number;
    personalPoints: number;
    referralPoints: number;
    referralBreakdown: {
      level1Points: number;
      level2Points: number;
      level3Points: number;
    };
    tier: {
      title: string;
      pointsRequired: number;
      directPercent: number;
      indirectPercent: number;
      teamPercent: number;
    };
    percents: {
      direct: number;
      indirect: number;
      team: number;
    };
  };
  summary: {
    level1: number;
    level2: number;
    level3: number;
    directUsers: Array<{
      id: string;
      name: string;
      email: string;
      accountType: string;
      joinedAt: string;
      totalPoints: number;
      activeInvestmentValue: number;
    }>;
  };
};

export const Route = createFileRoute("/_app/referrals")({
  head: () => ({ meta: [{ title: pageTitle("Referrals") }] }),
  component: Referrals,
});

function Referrals() {
  const { token } = useAppAuth();
  const [data, setData] = useState<ReferralsResponse | null>(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    void apiRequest<ReferralsResponse>("/user/referrals", { token }).then(setData);
  }, [token]);

  const copy = async () => {
    if (!data?.user.referralLinkEnabled || !data?.user.referralLink) {
      toast.error("Referral link is not available yet.");
      return;
    }

    await navigator.clipboard.writeText(data.user.referralLink);
    toast.success("Referral link copied!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Referral System</h1>
        <p className="text-muted-foreground">
          Build only three steps and earn {data?.rank.percents.direct ?? 30}% /
          {" "}
          {data?.rank.percents.indirect ?? 15}% / {data?.rank.percents.team ?? 5}% on approved
          team investments. Your current rank: {data?.rank.tier.title ?? "Starter"}.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="glass border-border/40">
          <CardContent className="space-y-1 p-5">
            <div className="text-xs uppercase text-muted-foreground">Total points</div>
            <div className="text-3xl font-bold">{(data?.rank.totalPoints ?? 0).toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="glass border-border/40">
          <CardContent className="space-y-1 p-5">
            <div className="text-xs uppercase text-muted-foreground">Your plan points</div>
            <div className="text-3xl font-bold">{(data?.rank.personalPoints ?? 0).toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="glass border-border/40">
          <CardContent className="space-y-1 p-5">
            <div className="text-xs uppercase text-muted-foreground">Referral points</div>
            <div className="text-3xl font-bold">{(data?.rank.referralPoints ?? 0).toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="glass border-border/40">
          <CardContent className="space-y-1 p-5">
            <div className="text-xs uppercase text-muted-foreground">Current rank</div>
            <div className="text-3xl font-bold">{data?.rank.tier.title ?? "Starter"}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Your referral link</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row">
          <Input
            readOnly
            value={
              data?.user.referralLinkEnabled
                ? (data?.user.referralLink ?? "Referral link unavailable")
                : "Referral unlocks after your first approved investment."
            }
            className="flex-1 bg-input/50"
          />
          <Button
            onClick={copy}
            disabled={!data?.user.referralLinkEnabled}
            className="gradient-primary text-primary-foreground disabled:opacity-60"
          >
            <Copy className="mr-2 size-4" /> Copy
          </Button>
          <Button
            variant="outline"
            disabled={!data?.user.referralLinkEnabled}
            onClick={() =>
              data?.user.referralLinkEnabled
                ? toast.success("Your referral link is ready to share.")
                : toast.error("Referral link unlocks after approved investment.")
            }
          >
            <Share2 className="mr-2 size-4" /> Share
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Step 1",
            count: data?.summary.level1 ?? 0,
            detail: `${data?.rank.percents.direct ?? 30}% commission`,
          },
          {
            label: "Step 2",
            count: data?.summary.level2 ?? 0,
            detail: `${data?.rank.percents.indirect ?? 15}% commission`,
          },
          {
            label: "Step 3",
            count: data?.summary.level3 ?? 0,
            detail: `${data?.rank.percents.team ?? 5}% commission`,
          },
        ].map((item) => (
          <Card key={item.label} className="glass border-border/40">
            <CardContent className="space-y-2 p-6">
              <div className="grid size-10 place-items-center rounded-xl gradient-primary text-primary-foreground">
                <Users className="size-5" />
              </div>
              <div className="text-xs uppercase text-muted-foreground">{item.label}</div>
              <div className="text-3xl font-bold">
                {item.count} <span className="text-sm font-normal text-muted-foreground">users</span>
              </div>
              <div className="text-sm text-muted-foreground">{item.detail}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Direct Referrals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data?.summary.directUsers.length ? (
            data.summary.directUsers.map((referral) => (
              <div
                key={referral.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/40 bg-background/35 p-4"
              >
                <div>
                  <div className="font-semibold">{referral.name}</div>
                  <div className="text-sm text-muted-foreground">{referral.email}</div>
                  <div className="mt-2 text-xs text-muted-foreground capitalize">
                    {referral.accountType.replace("_", " ")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">
                    {formatCurrency(referral.activeInvestmentValue)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {referral.totalPoints.toLocaleString()} points
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Joined{" "}
                    {new Date(referral.joinedAt).toLocaleDateString("en-PK", {
                      dateStyle: "medium",
                    })}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground">
              No direct referrals yet. Share your link to start building your team.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
