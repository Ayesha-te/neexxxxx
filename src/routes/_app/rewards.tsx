import {
  startTransition,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import { createFileRoute } from "@tanstack/react-router";
import { pageTitle } from "@/lib/brand";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Check,
  Clock3,
  Coins,
  Gift,
  Send,
  Sparkles,
  Ticket,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { LevelBadge } from "@/components/LevelBadgeIcon";
import {
  CURRENT_MEMBER_ID,
  createRewardTicket,
  ensureAdminSeedData,
  getMembers,
  getRewardTicketsForMember,
  subscribeToAdminData,
  type RewardTicket,
} from "@/lib/admin-data";
import {
  getLevelBenefit,
  getMilestoneReward,
  getMilestoneStatus,
  levelBenefits,
  milestoneRewards,
  totalMilestoneRewards,
  type MilestoneStatus,
} from "@/lib/rewards-system";

export const Route = createFileRoute("/_app/rewards")({
  head: () => ({ meta: [{ title: pageTitle("Rewards") }] }),
  component: Rewards,
});

function Rewards() {
  const [memberLevel, setMemberLevel] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState(
    milestoneRewards[milestoneRewards.length - 1]?.level ?? 5,
  );
  const [note, setNote] = useState("");
  const [tickets, setTickets] = useState<RewardTicket[]>([]);

  const refreshTickets = useEffectEvent(() => {
    startTransition(() => {
      setTickets(getRewardTicketsForMember(CURRENT_MEMBER_ID));
      const member = getMembers().find((entry) => entry.id === CURRENT_MEMBER_ID);
      setMemberLevel(member?.currentLevel ?? 1);
    });
  });

  useEffect(() => {
    ensureAdminSeedData();
    refreshTickets();
    return subscribeToAdminData(refreshTickets);
  }, [refreshTickets]);

  useEffect(() => {
    const highestUnlockedLevel =
      milestoneRewards.filter((reward) => reward.level <= memberLevel).at(-1)?.level ??
      milestoneRewards[0]?.level ??
      2;

    setSelectedLevel((currentSelection) => {
      const canKeepSelection = milestoneRewards.some(
        (reward) => reward.level === currentSelection && reward.level <= memberLevel,
      );

      return canKeepSelection ? currentSelection : highestUnlockedLevel;
    });
  }, [memberLevel]);

  const summary = useMemo(
    () => ({
      pending: tickets.filter((ticket) => ticket.status === "pending").length,
      reviewed: tickets.filter((ticket) => ticket.status === "in_review").length,
      rewarded: tickets.filter((ticket) => ticket.status === "rewarded").length,
    }),
    [tickets],
  );
  const currentBenefit = useMemo(() => getLevelBenefit(memberLevel), [memberLevel]);
  const selectedReward = useMemo(() => getMilestoneReward(selectedLevel), [selectedLevel]);
  const selectedBenefit = useMemo(() => getLevelBenefit(selectedLevel), [selectedLevel]);
  const completedMilestones = useMemo(
    () =>
      milestoneRewards.filter(
        (reward) => getMilestoneStatus(memberLevel, reward.level) === "earned",
      ).length,
    [memberLevel],
  );
  const claimedRewards = useMemo(
    () =>
      milestoneRewards.reduce((total, reward) => {
        if (getMilestoneStatus(memberLevel, reward.level) === "earned") {
          return total + reward.amount;
        }

        return total;
      }, 0),
    [memberLevel],
  );
  const currentMilestone = useMemo(
    () =>
      milestoneRewards.find(
        (reward) => getMilestoneStatus(memberLevel, reward.level) === "current",
      ) ?? null,
    [memberLevel],
  );
  const nextMilestone = useMemo(
    () => milestoneRewards.find((reward) => reward.level > memberLevel) ?? null,
    [memberLevel],
  );
  const hasClaimableReward = memberLevel >= milestoneRewards[0].level;
  const progressValue =
    milestoneRewards.length > 0 ? (completedMilestones / milestoneRewards.length) * 100 : 0;

  if (!selectedReward) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (memberLevel < selectedReward.level) {
      toast.error(`Reach level ${selectedReward.level} before claiming this reward.`);
      return;
    }

    const ticket = createRewardTicket({
      memberId: CURRENT_MEMBER_ID,
      rewardLevel: selectedLevel,
      requestedAmount: selectedReward.amount,
      note,
    });

    toast.success(
      `Reward ticket ${ticket.id} for Rs ${ticket.requestedAmount.toLocaleString()} sent to admin.`,
    );
    setNote("");
    refreshTickets();
  };

  return (
    <div className="space-y-8">
      <Card className="glass overflow-hidden border-border/40">
        <CardContent className="relative grid gap-8 p-6 lg:grid-cols-[1.2fr,0.8fr] lg:p-8">
          <div className="absolute inset-x-0 top-0 h-1 gradient-primary" />
          <div className="absolute -right-16 -top-16 size-48 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-12 left-10 size-40 rounded-full bg-gold/15 blur-3xl" />

          <div className="relative space-y-5">
            <Badge className="border-0 bg-primary/20 text-primary">
              <Sparkles className="mr-1 size-3.5" />
              Rewards System
            </Badge>
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Grow your team, earn more.
              </h1>
              <p className="mt-3 max-w-2xl text-base text-muted-foreground">
                Higher levels unlock bigger direct, indirect, and team bonuses, plus one-time
                milestone cash rewards worth up to Rs {totalMilestoneRewards.toLocaleString()}.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <HeroStat
                icon={Trophy}
                label="Current level"
                value={`Level ${memberLevel}`}
                hint={`Direct bonus ${currentBenefit.directBonus}%`}
              />
              <HeroStat
                icon={Check}
                label="Milestones earned"
                value={`${completedMilestones} / ${milestoneRewards.length}`}
                hint={`Rs ${claimedRewards.toLocaleString()} already cleared`}
              />
              <HeroStat
                icon={Coins}
                label="Reward pool"
                value={`Rs ${totalMilestoneRewards.toLocaleString()}`}
                hint={
                  currentMilestone
                    ? `Level ${currentMilestone.level} is ready to claim`
                    : nextMilestone
                      ? `Next reward unlocks at level ${nextMilestone.level}`
                      : "All milestone rewards are unlocked"
                }
              />
            </div>
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-background/55 p-5 backdrop-blur-sm">
            <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Current benefit mix
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <QuickBenefit label="Direct bonus" value={`${currentBenefit.directBonus}%`} />
              <QuickBenefit label="Indirect bonus" value={`${currentBenefit.indirectBonus}%`} />
              <QuickBenefit label="Team bonus" value={`${currentBenefit.teamBonus}%`} />
            </div>

            <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/10 p-4">
              <div className="text-xs uppercase tracking-[0.22em] text-primary/80">
                Reward status
              </div>
              <div className="mt-2 text-2xl font-bold">
                {currentMilestone
                  ? `Level ${currentMilestone.level} reward is live`
                  : nextMilestone
                    ? `Next cash reward at level ${nextMilestone.level}`
                    : "Every milestone reward is unlocked"}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {currentMilestone
                  ? `Submit your Rs ${currentMilestone.amount.toLocaleString()} claim below.`
                  : nextMilestone
                    ? `Keep building your network to unlock Rs ${nextMilestone.amount.toLocaleString()}.`
                    : `You have reached the full Rs ${totalMilestoneRewards.toLocaleString()} reward ladder.`}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-3 text-sm">
            <span>
              {completedMilestones} of {milestoneRewards.length} milestone rewards fully earned
            </span>
            <span className="font-semibold text-gold">
              Rs {claimedRewards.toLocaleString()} confirmed
            </span>
          </div>
          <Progress value={progressValue} className="h-3" />
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>Level Benefits</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/40 hover:bg-transparent">
                  <TableHead>Level</TableHead>
                  <TableHead className="text-gold">Points Required</TableHead>
                  <TableHead className="text-primary">Direct Bonus</TableHead>
                  <TableHead className="text-gold">Indirect Bonus</TableHead>
                  <TableHead className="text-success">Team Bonus</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {levelBenefits.map((benefit) => {
                  const rowStatus =
                    benefit.level < memberLevel
                      ? "earned"
                      : benefit.level === memberLevel
                        ? "current"
                        : "locked";

                  return (
                    <TableRow
                      key={benefit.level}
                      className={`border-border/30 ${
                        benefit.level === memberLevel ? "bg-primary/10" : ""
                      }`}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <LevelBadge level={benefit.level} />
                          <span className="font-semibold">{benefit.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-gradient-gold">
                        {benefit.pointsRequired} pts
                      </TableCell>
                      <TableCell className="font-semibold text-primary">
                        {benefit.directBonus}%
                      </TableCell>
                      <TableCell className="font-semibold text-gold">
                        {benefit.indirectBonus}%
                      </TableCell>
                      <TableCell className="font-semibold text-success">
                        {benefit.teamBonus}%
                      </TableCell>
                      <TableCell>
                        <RowStatus status={rowStatus} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className="mt-4 text-sm text-muted-foreground">
              Team bonus starts from level 3 and keeps increasing as your network grows stronger.
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>Cash Reward System</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Level achievement unlocks fixed one-time cash rewards.
            </div>

            <div className="space-y-3">
              {milestoneRewards.map((reward) => {
                const status = getMilestoneStatus(memberLevel, reward.level);
                const canSelect = status !== "locked";
                const levelName = levelBenefits.find(b => b.level === reward.level)?.name || `Level ${reward.level}`;

                return (
                  <button
                    key={reward.level}
                    type="button"
                    disabled={!canSelect}
                    onClick={() => setSelectedLevel(reward.level)}
                    className={`w-full rounded-3xl border p-4 text-left transition ${
                      selectedLevel === reward.level
                        ? "border-primary/50 bg-primary/10 shadow-[0_0_0_1px_rgba(168,85,247,0.15)]"
                        : "border-border/40 bg-background/35"
                    } ${canSelect ? "hover:border-primary/35" : "cursor-not-allowed opacity-70"}`}
                  >
                    <div className="flex items-center gap-4">
                      <LevelBadge level={reward.level} small />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                              {levelName}
                            </div>
                            <div className="mt-1 text-2xl font-bold text-gradient-gold">
                              Rs {reward.amount.toLocaleString()}
                            </div>
                          </div>
                          <RewardStatus status={status} />
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          One-time milestone cash reward
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="rounded-3xl gradient-primary p-[1px]">
              <div className="rounded-[calc(var(--radius-2xl)-1px)] bg-background/95 p-5">
                <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Total rewards
                </div>
                <div className="mt-2 text-4xl font-bold text-gradient-gold">
                  Rs {totalMilestoneRewards.toLocaleString()}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Level 2 to level 5 milestone rewards combined.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="size-5 text-gold" />
              Claim milestone reward
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <div className="text-sm font-medium">Reward level</div>
                <div className="flex flex-wrap gap-2">
                  {milestoneRewards.map((reward) => {
                    const locked = reward.level > memberLevel;

                    return (
                      <Button
                        key={reward.level}
                        type="button"
                        variant={selectedLevel === reward.level ? "default" : "outline"}
                        className={
                          selectedLevel === reward.level
                            ? "gradient-primary text-primary-foreground"
                            : ""
                        }
                        onClick={() => setSelectedLevel(reward.level)}
                        disabled={locked}
                      >
                        Level {reward.level}
                      </Button>
                    );
                  })}
                </div>
                <div className="text-xs text-muted-foreground">
                  Only unlocked reward levels can be claimed.
                </div>
              </div>

              <div className="grid gap-4 rounded-3xl border border-border/40 bg-background/35 p-4 md:grid-cols-2">
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    Reward amount
                  </div>
                  <div className="mt-2 text-3xl font-bold text-gradient-gold">
                    Rs {selectedReward.amount.toLocaleString()}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    This amount follows the official milestone reward chart.
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <BonusChip label="Direct" value={`${selectedBenefit.directBonus}%`} />
                  <BonusChip label="Indirect" value={`${selectedBenefit.indirectBonus}%`} />
                  <BonusChip label="Team" value={`${selectedBenefit.teamBonus}%`} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Message for admin</div>
                <Textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Tell admin why this reward should be reviewed."
                  className="min-h-28"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  type="submit"
                  className="gradient-primary text-primary-foreground"
                  disabled={!hasClaimableReward}
                >
                  <Send className="size-4" />
                  Send ticket
                </Button>
                <div className="text-sm text-muted-foreground">
                  Temporary setup: the request is stored locally and visible in the admin panel.
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle>Your submitted tickets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <SummaryTile label="Pending" value={summary.pending} />
              <SummaryTile label="In review" value={summary.reviewed} />
              <SummaryTile label="Rewarded" value={summary.rewarded} />
            </div>

            <div className="space-y-3">
              {tickets.length ? (
                tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="rounded-2xl border border-border/40 bg-background/40 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">{ticket.id}</div>
                        <div className="text-xs text-muted-foreground">
                          Level {ticket.rewardLevel} reward request
                        </div>
                      </div>
                      <TicketStatusBadge status={ticket.status} />
                    </div>

                    <div className="mt-3 flex flex-wrap gap-4 text-sm">
                      <span>Amount: Rs {ticket.requestedAmount.toLocaleString()}</span>
                      <span className="text-muted-foreground">
                        {new Date(ticket.requestedAt).toLocaleString()}
                      </span>
                    </div>

                    {ticket.note ? (
                      <p className="mt-3 text-sm text-muted-foreground">{ticket.note}</p>
                    ) : null}
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-border/50 p-8 text-center text-sm text-muted-foreground">
                  Your reward tickets will appear here after you submit the first request.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Build your team",
                description: "Invite directly and keep your referral network active.",
                accent: "gradient-primary",
              },
              {
                icon: Trophy,
                title: "Achieve higher levels",
                description: "Your direct, indirect, and team bonuses rise with each level.",
                accent: "gradient-gold",
              },
              {
                icon: Gift,
                title: "Earn cash rewards",
                description: "Claim fixed milestone rewards when you hit levels 2, 3, 4, and 5.",
                accent: "bg-success",
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-3xl border border-border/40 bg-background/30 p-5"
              >
                <div
                  className={`grid size-12 place-items-center rounded-2xl ${step.accent} text-primary-foreground`}
                >
                  <step.icon className="size-5" />
                </div>
                <div className="mt-4 text-lg font-semibold">{step.title}</div>
                <div className="mt-2 text-sm text-muted-foreground">{step.description}</div>
                {index < 2 ? (
                  <ArrowRight className="absolute right-4 top-6 hidden text-muted-foreground/50 lg:block" />
                ) : null}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function HeroStat({
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
    <div className="rounded-3xl border border-border/40 bg-background/40 p-4">
      <div className="flex items-start gap-3">
        <div className="grid size-10 place-items-center rounded-2xl gradient-primary text-primary-foreground">
          <Icon className="size-5" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
          <div className="mt-1 text-2xl font-bold">{value}</div>
          <div className="mt-1 text-sm text-muted-foreground">{hint}</div>
        </div>
      </div>
    </div>
  );
}

function QuickBenefit({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-background/45 p-4">
      <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  );
}

function BonusChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-background/55 p-3">
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg font-bold">{value}</div>
    </div>
  );
}

function SummaryTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-background/40 p-4 text-center">
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  );
}

function LevelBadgeOld({ level, small }: { level: number; small?: boolean }) {
  const sizeClass = small ? "size-16 text-2xl" : "size-10 text-sm";
  return <LevelBadge level={level} size={small ? "lg" : "md"} />;
}

function RowStatus({ status }: { status: MilestoneStatus }) {
  if (status === "earned") {
    return <RewardStatus status="earned" label="Unlocked" />;
  }

  if (status === "current") {
    return <RewardStatus status="current" label="Current" />;
  }

  return <RewardStatus status="locked" label="Upcoming" />;
}

function RewardStatus({ status, label }: { status: MilestoneStatus; label?: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
        status === "earned"
          ? "bg-success/20 text-success"
          : status === "current"
            ? "gradient-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
      }`}
    >
      {label ?? (status === "earned" ? "Earned" : status === "current" ? "Ready now" : "Locked")}
    </span>
  );
}

function TicketStatusBadge({ status }: { status: RewardTicket["status"] }) {
  if (status === "rewarded") {
    return (
      <Badge className="border-0 bg-success/20 text-success">
        <Check className="mr-1 size-3" />
        Rewarded
      </Badge>
    );
  }

  if (status === "in_review") {
    return (
      <Badge className="border-0 bg-gold/20 text-gold">
        <Clock3 className="mr-1 size-3" />
        In review
      </Badge>
    );
  }

  return (
    <Badge className="border-0 bg-primary/20 text-primary">
      <Ticket className="mr-1 size-3" />
      Pending
    </Badge>
  );
}
