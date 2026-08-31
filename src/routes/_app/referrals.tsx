import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Copy, KeyRound, Users } from "lucide-react";
import { toast } from "sonner";
import { pageTitle } from "@/lib/brand";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { apiRequest, type AppUser } from "@/lib/api";
import { useAppAuth } from "@/lib/auth";
import { useCurrency } from "@/lib/currency";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  accountType: string;
  joinedAt: string;
  totalRiseCoins: number;
  activeInvestmentValue: number;
  rankTitle?: string;
  status?: "active" | "inactive";
};

type ReferralsResponse = {
  user: AppUser;
  settings: {
    level1Percent: number;
    level2Percent: number;
    level3Percent: number;
  };
  rank: {
    totalRiseCoins: number;
    personalRiseCoins: number;
    referralRiseCoins: number;
    referralBreakdown: {
      level1RiseCoins: number;
      level2RiseCoins: number;
      level3RiseCoins: number;
    };
    tier: {
      title: string;
      riseCoinsRequired: number;
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
    directUsers: TeamMember[];
    level2Users?: TeamMember[];
    level3Users?: TeamMember[];
    indirectUsers?: TeamMember[];
  };
};

export const Route = createFileRoute("/_app/referrals")({
  head: () => ({ meta: [{ title: pageTitle("Referrals") }] }),
  component: Referrals,
});

function Referrals() {
  const { token } = useAppAuth();
  const { format: formatCurrency } = useCurrency();
  const [data, setData] = useState<ReferralsResponse | null>(null);
  const [teamView, setTeamView] = useState<"direct" | "indirect">("direct");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }

    void apiRequest<ReferralsResponse>("/user/referrals", { token }).then(setData);
  }, [token]);

  const copyCode = async () => {
    if (!data?.user.referralCode) {
      toast.error("Referral code is not available yet.");
      return;
    }

    await navigator.clipboard.writeText(data.user.referralCode);
    toast.success("Referral code copied!");
  };

  const indirectUsers =
    data?.summary.indirectUsers ??
    [...(data?.summary.level2Users ?? []), ...(data?.summary.level3Users ?? [])];
  const activeTeamList = teamView === "direct" ? data?.summary.directUsers ?? [] : indirectUsers;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Referral System</h1>
        <p className="text-muted-foreground">
          Build your three-step referral team and earn income on approved team investments. Your current rank: {data?.rank.tier.title ?? "Starter"}.
        </p>
      </div>

      <Card className="relative overflow-hidden border-0 bg-[linear-gradient(135deg,oklch(0.53_0.2_333),oklch(0.41_0.17_308))] text-primary-foreground shadow-[0_28px_60px_-32px_oklch(0.33_0.14_320/0.8)]">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
        <CardContent className="relative flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium">
              <KeyRound className="size-3.5" /> Your Referral Code
            </div>
            <div className="mt-3 text-4xl font-black tracking-[0.08em]">
              {data?.user.referralCode ?? "-----"}
            </div>
            <p className="mt-2 text-sm text-primary-foreground/85">
              Share this code with friends so they can join under you directly.
            </p>
          </div>
          <Button
            onClick={copyCode}
            className="gradient-gold border-0 text-gold-foreground shadow-[0_14px_30px_-18px_oklch(0.83_0.15_80)]"
          >
            <Copy className="mr-2 size-4" /> Copy Code
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="glass border-border/40">
          <CardContent className="space-y-1 p-5">
            <div className="text-xs uppercase text-muted-foreground">Total Rise Coins</div>
            <div className="text-3xl font-bold">{(data?.rank.totalRiseCoins ?? 0).toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="glass border-border/40">
          <CardContent className="space-y-1 p-5">
            <div className="text-xs uppercase text-muted-foreground">Your plan Rise Coins</div>
            <div className="text-3xl font-bold">{(data?.rank.personalRiseCoins ?? 0).toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="glass border-border/40">
          <CardContent className="space-y-1 p-5">
            <div className="text-xs uppercase text-muted-foreground">Referral Rise Coins</div>
            <div className="text-3xl font-bold">{(data?.rank.referralRiseCoins ?? 0).toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="glass border-border/40">
          <CardContent className="space-y-1 p-5">
            <div className="text-xs uppercase text-muted-foreground">Current rank</div>
            <div className="text-3xl font-bold">{data?.rank.tier.title ?? "Starter"}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Step 1",
            count: data?.summary.level1 ?? 0,
            detail: "Direct referral income",
          },
          {
            label: "Step 2",
            count: data?.summary.level2 ?? 0,
            detail: "Level 2 referral income",
          },
          {
            label: "Step 3",
            count: data?.summary.level3 ?? 0,
            detail: "Level 3 referral income",
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
        <CardHeader
          className="cursor-pointer select-none"
          onClick={() => setExpanded((value) => !value)}
        >
          <div className="flex items-center justify-between">
            <CardTitle>All Team</CardTitle>
            <ChevronDown
              className={`size-5 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </div>
        </CardHeader>
        {expanded ? (
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                type="button"
                variant={teamView === "direct" ? "default" : "outline"}
                size="sm"
                className={teamView === "direct" ? "gradient-primary text-primary-foreground" : ""}
                onClick={() => setTeamView("direct")}
              >
                Direct Team ({data?.summary.level1 ?? 0})
              </Button>
              <Button
                type="button"
                variant={teamView === "indirect" ? "default" : "outline"}
                size="sm"
                className={teamView === "indirect" ? "gradient-primary text-primary-foreground" : ""}
                onClick={() => setTeamView("indirect")}
              >
                Indirect Team ({(data?.summary.level2 ?? 0) + (data?.summary.level3 ?? 0)})
              </Button>
            </div>

            <div className="space-y-3">
              {activeTeamList.length ? (
                activeTeamList.map((referral) => (
                  <div
                    key={referral.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/40 bg-background/35 p-4"
                  >
                    <div>
                      <div className="font-semibold">{referral.name}</div>
                      <div className="text-sm text-muted-foreground">{referral.email}</div>
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="capitalize">{referral.rankTitle ?? "Starter"}</span>
                        {referral.status ? (
                          <Badge
                            variant="outline"
                            className={`capitalize ${
                              referral.status === "active"
                                ? "border-success/30 text-success"
                                : "border-muted-foreground/30"
                            }`}
                          >
                            {referral.status}
                          </Badge>
                        ) : null}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">
                        {formatCurrency(referral.activeInvestmentValue)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {referral.totalRiseCoins.toLocaleString()} Rise Coins
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
                  {teamView === "direct"
                    ? "No direct referrals yet. Share your link to start building your team."
                    : "No indirect (level 2/3) team members yet."}
                </div>
              )}
            </div>
          </CardContent>
        ) : null}
      </Card>
    </div>
  );
}
