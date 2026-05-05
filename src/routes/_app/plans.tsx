import { createFileRoute } from "@tanstack/react-router";
import { pageTitle } from "@/lib/brand";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Gift, TrendingUp, Users } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  levelBenefits,
  milestoneRewards,
  totalMilestoneRewards,
} from "@/lib/rewards-system";

export const Route = createFileRoute("/_app/plans")({
  head: () => ({ meta: [{ title: pageTitle("Investment Plans") }] }),
  component: Plans,
});

const plans = [
  { n: 1, p: 1000, pts: 6, queen: "Starter Queen", perks: ["Direct income access", "Basic dashboard"] },
  { n: 2, p: 2000, pts: 12, queen: "Vision Queen", perks: ["Direct income", "Level 2 unlock"] },
  { n: 3, p: 4000, pts: 30, queen: "Elevate Queen", perks: ["3-level earnings", "Priority support"] },
  { n: 4, p: 6500, pts: 44, queen: "Sapphire Queen", perks: ["3-level earnings", "Higher % rates"] },
  { n: 5, p: 9500, pts: 63, queen: "Ruby Queen", perks: ["Premium plan", "Gold tier", "Reward boost"], featured: true },
  { n: 6, p: 12000, pts: 80, queen: "Diamond Queen", perks: ["Premium plan", "Higher rewards"] },
  { n: 7, p: 15000, pts: 100, queen: "Platinum Queen", perks: ["VIP plan", "Maximum rewards", "Concierge"] },
  { n: 8, p: 18000, pts: 120, queen: "Elite Queen", perks: ["Elite status", "Priority rewards", "Personal support"] },
  { n: 9, p: 21000, pts: 140, queen: "Royal Queen", perks: ["Royal benefits", "Exclusive access", "VIP concierge"] },
  { n: 10, p: 25000, pts: 165, queen: "Imperial Queen", perks: ["Imperial status", "Maximum benefits", "Lifetime rewards"] },
];

function Plans() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Investment Plans</h1>
        <p className="text-muted-foreground">
          Pick a plan to start earning across 3 levels. Higher plans = more points & higher %.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {plans.map((pl) => (
          <Card
            key={pl.n}
            className={`relative glass border-border/40 transition-all hover:-translate-y-1 hover:glow ${pl.featured ? "ring-2 ring-gold glow-gold" : ""}`}
          >
            {pl.featured && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-gold text-gold-foreground border-0">
                <Sparkles className="size-3 mr-1" /> Recommended
              </Badge>
            )}
            <CardContent className="p-6 space-y-4">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Plan {pl.n}</div>
                <div className="text-lg font-bold text-gradient-gold uppercase mb-3">{pl.queen}</div>
                <div className="text-3xl font-bold mt-1">₨ {pl.p.toLocaleString()}</div>
                <div className="text-sm text-gradient-gold font-semibold mt-1">{pl.pts} Points</div>
              </div>
              <ul className="space-y-2 text-sm">
                {pl.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-muted-foreground">
                    <Check className="size-4 text-success shrink-0 mt-0.5" /> {perk}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => toast.success(`Subscribed to Plan ${pl.n}!`)}
                className={`w-full ${pl.featured ? "gradient-gold text-gold-foreground" : "gradient-primary text-primary-foreground"}`}
              >
                Subscribe
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rewards System Infographic */}
      <div className="mt-12 space-y-8 border-t border-border/40 pt-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-gradient-gold">REWARDS SYSTEM</h2>
          <p className="text-lg text-gold">NEXO WOMEN EMPOWERMENT</p>
          <p className="text-muted-foreground">GROW YOUR TEAM, EARN MORE! • HIGHER LEVELS • HIGHER REWARDS</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Level Benefits */}
          <div className="lg:col-span-2">
            <Card className="border-border/40 glass">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gradient-gold mb-6">LEVEL BENEFITS</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/40 hover:bg-transparent">
                        <TableHead>LEVEL</TableHead>
                        <TableHead className="text-gold">POINTS REQUIRED</TableHead>
                        <TableHead className="text-primary">DIRECT BONUS</TableHead>
                        <TableHead className="text-gold">INDIRECT BONUS</TableHead>
                        <TableHead className="text-success">TEAM BONUS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {levelBenefits.map((benefit) => (
                        <TableRow key={benefit.level} className="border-border/30">
                          <TableCell className="font-bold">
                            <div className="flex items-center gap-2">
                              <span>{benefit.level}</span>
                              <span className="text-sm uppercase">{benefit.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-bold text-gradient-gold">{benefit.pointsRequired} pts</TableCell>
                          <TableCell className="font-bold text-primary">{benefit.directBonus}%</TableCell>
                          <TableCell className="font-bold text-gold">{benefit.indirectBonus}%</TableCell>
                          <TableCell className="font-bold text-success">{benefit.teamBonus}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* How it works */}
            <Card className="border-border/40 glass mt-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gradient-gold mb-6 text-center">HOW IT WORKS?</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="size-6 text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">BUILD YOUR TEAM</p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                      <TrendingUp className="size-6 text-gold" />
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">ACHIEVE HIGHER LEVELS</p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                      <Gift className="size-6 text-success" />
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">EARN CASH REWARDS</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Cash Rewards */}
          <div>
            <Card className="border-border/40 glass h-full">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-gradient-gold text-center">CASH REWARD SYSTEM</h3>
                <p className="text-xs text-muted-foreground text-center uppercase">LEVEL ACHIEVEMENT PAR</p>
                <p className="text-lg font-bold text-gold text-center">ONE-TIME CASH REWARDS</p>

                <div className="space-y-2">
                  {milestoneRewards.map((reward) => (
                    <div
                      key={reward.level}
                      className="rounded-xl border border-gold/30 bg-background/50 p-3 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center text-sm font-bold text-gold">
                            {reward.level}
                          </div>
                          <span className="text-xs text-muted-foreground uppercase font-semibold">LEVEL</span>
                        </div>
                        <span className="text-xs text-muted-foreground uppercase font-semibold">REWARD</span>
                      </div>
                      <div className="text-xl font-bold text-gradient-gold">
                        {reward.amount.toLocaleString()} PKR
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border-2 border-gold/40 bg-gold/10 p-3 space-y-1 mt-4">
                  <p className="text-xs text-muted-foreground uppercase text-center font-semibold">Total Rewards</p>
                  <p className="text-3xl font-bold text-gradient-gold text-center">
                    {totalMilestoneRewards.toLocaleString()} PKR
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-2 py-6">
          <p className="text-gradient-gold font-bold uppercase tracking-wider">
            HIGHER LEVELS • BIGGER REWARDS • BETTER FUTURE!
          </p>
          <p className="text-muted-foreground text-sm">START TODAY, EARN TOMORROW!</p>
        </div>
      </div>
    </div>
  );
}
