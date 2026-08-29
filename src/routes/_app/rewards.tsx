import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Gift, Target, Trophy } from "lucide-react";
import { toast } from "sonner";
import { pageTitle } from "@/lib/brand";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api";
import { useAppAuth } from "@/lib/auth";
import { useCurrency } from "@/lib/currency";

type RewardsResponse = {
  totalRiseCoins: number;
  totalClaimedRewardValue: number;
  milestones: Array<{
    riseCoinsRequired: number;
    rewardAmount: number;
    title: string;
    claimed: boolean;
    claimable: boolean;
    remainingRiseCoins: number;
  }>;
  claims: Array<{
    id: string;
    riseCoinsRequired: number;
    rewardAmount: number;
    claimedAt: string;
  }>;
  walletTransactions: Array<{
    id: string;
    amount: number;
    description: string;
    createdAt: string;
  }>;
};

export const Route = createFileRoute("/_app/rewards")({
  head: () => ({ meta: [{ title: pageTitle("Rewards") }] }),
  component: Rewards,
});

function Rewards() {
  const { token } = useAppAuth();
  const { format: formatCurrency } = useCurrency();
  const [data, setData] = useState<RewardsResponse | null>(null);
  const [claimingRiseCoins, setClaimingRiseCoins] = useState<number | null>(null);

  const loadData = async () => {
    if (!token) {
      return;
    }

    const response = await apiRequest<RewardsResponse>("/user/rewards", { token });
    setData(response);
  };

  useEffect(() => {
    void loadData();
  }, [token]);

  const claimableCount = useMemo(
    () => data?.milestones.filter((milestone) => milestone.claimable).length ?? 0,
    [data?.milestones],
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rise Coins & Rewards</h1>
        <p className="text-muted-foreground">
          Collect Rise Coins from approved plans, unlock rank milestones, and claim PKR rewards into
          your wallet.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard icon={Target} label="Total Rise Coins" value={String(data?.totalRiseCoins ?? 0)} />
        <SummaryCard icon={Gift} label="Claimable now" value={String(claimableCount)} />
        <SummaryCard
          icon={Trophy}
          label="Claimed reward value"
          value={formatCurrency(data?.totalClaimedRewardValue ?? 0)}
        />
      </div>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Reward Milestones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data?.milestones.map((milestone) => (
            <div
              key={milestone.riseCoinsRequired}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/40 bg-background/35 p-4"
            >
              <div>
                <div className="font-semibold">{milestone.title}</div>
                <div className="text-sm text-muted-foreground">
                  {milestone.riseCoinsRequired.toLocaleString()} Rise Coins for{" "}
                  {formatCurrency(milestone.rewardAmount)}
                </div>
                {!milestone.claimed ? (
                  <div className="mt-2 text-xs text-muted-foreground">
                    {milestone.remainingRiseCoins.toLocaleString()} Rise Coins remaining
                  </div>
                ) : null}
              </div>
              <div className="flex items-center gap-3">
                {milestone.claimed ? (
                  <Badge className="gradient-gold border-0 text-gold-foreground">Claimed</Badge>
                ) : milestone.rewardAmount === 0 ? (
                  <Badge variant="outline">Unlocked</Badge>
                ) : milestone.claimable ? (
                  <Button
                    disabled={claimingRiseCoins === milestone.riseCoinsRequired}
                    className="gradient-primary text-primary-foreground"
                    onClick={async () => {
                      if (!token) {
                        return;
                      }

                      setClaimingRiseCoins(milestone.riseCoinsRequired);
                      try {
                        await apiRequest("/user/rewards/claim", {
                          method: "POST",
                          token,
                          body: { riseCoinsRequired: milestone.riseCoinsRequired },
                        });
                        toast.success("Reward claimed successfully.");
                        await loadData();
                      } catch (error) {
                        toast.error(error instanceof Error ? error.message : "Unable to claim reward.");
                      } finally {
                        setClaimingRiseCoins(null);
                      }
                    }}
                  >
                    {claimingRiseCoins === milestone.riseCoinsRequired ? "Claiming..." : "Claim reward"}
                  </Button>
                ) : (
                  <Badge variant="outline">Locked</Badge>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>Claim History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data?.claims.length ? (
              data.claims.map((claim) => (
                <div
                  key={claim.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/40 bg-background/35 p-4"
                >
                  <div>
                    <div className="font-semibold">
                      {claim.riseCoinsRequired.toLocaleString()} Rise Coin milestone
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(claim.claimedAt).toLocaleString("en-PK", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </div>
                  </div>
                  <div className="text-lg font-bold text-success">
                    {formatCurrency(claim.rewardAmount)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">No rewards claimed yet.</div>
            )}
          </CardContent>
        </Card>

        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>Reward Wallet Credits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data?.walletTransactions.length ? (
              data.walletTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/40 bg-background/35 p-4"
                >
                  <div>
                    <div className="font-semibold">{transaction.description}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(transaction.createdAt).toLocaleString("en-PK", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </div>
                  </div>
                  <div className="text-lg font-bold text-success">
                    +{formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">No reward credits yet.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Trophy;
  label: string;
  value: string;
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
        </div>
      </CardContent>
    </Card>
  );
}
