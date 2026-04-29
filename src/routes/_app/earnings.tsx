import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight, Coins, Gift, TrendingUp, Trophy, Users, type LucideIcon } from "lucide-react";
import {
  getLevelBenefit,
  getMilestoneStatus,
  levelBenefits,
  milestoneRewards,
  totalMilestoneRewards,
} from "@/lib/rewards-system";

export const Route = createFileRoute("/_app/earnings")({
  head: () => ({ meta: [{ title: "Earning System - Apex Invest" }] }),
  component: Earnings,
});

const currentLevel = 5;

function Earnings() {
  const currentBenefit = getLevelBenefit(currentLevel);
  const steps = [
    {
      icon: Users,
      title: "Build your team",
      description: "Direct invitations unlock stronger bonus percentages as your network grows.",
      accent: "gradient-primary",
    },
    {
      icon: TrendingUp,
      title: "Achieve higher levels",
      description: "Each level increases your direct, indirect, and team earning power.",
      accent: "gradient-gold",
    },
    {
      icon: Gift,
      title: "Earn cash rewards",
      description: "Hit levels 2 to 5 to unlock one-time milestone payouts on top of bonuses.",
      accent: "bg-success",
    },
  ] satisfies {
    icon: LucideIcon;
    title: string;
    description: string;
    accent: string;
  }[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Earning System</h1>
        <p className="text-muted-foreground">
          A transparent reward model with rising level bonuses and milestone cash rewards.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          icon={Trophy}
          label="Current level"
          value={`Level ${currentLevel}`}
          hint={`Direct bonus ${currentBenefit.directBonus}%`}
        />
        <StatCard
          icon={Coins}
          label="Indirect bonus"
          value={`${currentBenefit.indirectBonus}%`}
          hint={`Team bonus ${currentBenefit.teamBonus}%`}
        />
        <StatCard
          icon={Gift}
          label="Reward pool"
          value={`Rs ${totalMilestoneRewards.toLocaleString()}`}
          hint="Level 2 to 5 one-time cash rewards"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {steps.map((step, index) => (
          <Card key={step.title} className="glass relative overflow-hidden border-border/40">
            <CardContent className="space-y-3 p-6">
              <div
                className={`grid size-12 place-items-center rounded-xl ${step.accent} text-primary-foreground glow`}
              >
                <step.icon className="size-6" />
              </div>
              <div className="text-lg font-semibold">{step.title}</div>
              <div className="text-sm text-muted-foreground">{step.description}</div>
              {index < 2 ? (
                <ArrowRight className="absolute right-2 top-1/2 hidden -translate-y-1/2 text-muted-foreground/40 lg:block" />
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Level Benefits</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/40 hover:bg-transparent">
                <TableHead>Level</TableHead>
                <TableHead className="text-primary">Direct Bonus</TableHead>
                <TableHead className="text-gold">Indirect Bonus</TableHead>
                <TableHead className="text-success">Team Bonus</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {levelBenefits.map((benefit) => {
                const status = getMilestoneStatus(currentLevel, benefit.level);
                const reached = benefit.level <= currentLevel;

                return (
                  <TableRow
                    key={benefit.level}
                    className={`border-border/30 ${
                      benefit.level === currentLevel ? "bg-primary/10" : ""
                    }`}
                  >
                    <TableCell className="font-bold">L{benefit.level}</TableCell>
                    <TableCell>
                      <Bar pct={benefit.directBonus} color="bg-primary" />
                    </TableCell>
                    <TableCell>
                      <Bar pct={benefit.indirectBonus} color="bg-gold" />
                    </TableCell>
                    <TableCell>
                      <Bar pct={benefit.teamBonus} color="bg-success" />
                    </TableCell>
                    <TableCell>
                      {status === "current" ? (
                        <span className="rounded-full px-2 py-1 text-xs font-semibold gradient-gold text-gold-foreground">
                          Current
                        </span>
                      ) : reached ? (
                        <span className="rounded-full bg-success/20 px-2 py-1 text-xs text-success">
                          Unlocked
                        </span>
                      ) : (
                        <span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                          Locked
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-4">
        {milestoneRewards.map((reward) => {
          const status = getMilestoneStatus(currentLevel, reward.level);

          return (
            <Card key={reward.level} className="glass border-border/40">
              <CardContent className="space-y-2 p-5">
                <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Level {reward.level}
                </div>
                <div className="text-3xl font-bold text-gradient-gold">
                  Rs {reward.amount.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">One-time milestone reward</div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    status === "earned"
                      ? "bg-success/20 text-success"
                      : status === "current"
                        ? "gradient-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {status === "earned" ? "Earned" : status === "current" ? "Ready now" : "Locked"}
                </span>
              </CardContent>
            </Card>
          );
        })}
      </div>
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

function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full ${color}`}
          style={{ width: `${Math.max(8, Math.min(100, pct * 2))}%` }}
        />
      </div>
      <span className="w-10 text-sm font-medium">{pct}%</span>
    </div>
  );
}
