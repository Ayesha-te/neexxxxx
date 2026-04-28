import {
  startTransition,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Check, Clock3, Lock, Send, Ticket, Trophy } from "lucide-react";
import { toast } from "sonner";
import {
  CURRENT_MEMBER_ID,
  createRewardTicket,
  ensureAdminSeedData,
  getRewardTicketsForMember,
  subscribeToAdminData,
  type RewardTicket,
} from "@/lib/admin-data";

export const Route = createFileRoute("/_app/rewards")({
  head: () => ({ meta: [{ title: "Rewards - Apex Invest" }] }),
  component: Rewards,
});

const rewards = [
  { lvl: 2, amt: 5000, status: "earned" as const },
  { lvl: 3, amt: 12000, status: "earned" as const },
  { lvl: 4, amt: 20000, status: "earned" as const },
  { lvl: 5, amt: 35000, status: "current" as const },
];

const rewardLevels = [2, 3, 4, 5, 6, 7];

function Rewards() {
  const [selectedLevel, setSelectedLevel] = useState(5);
  const [requestedAmount, setRequestedAmount] = useState("35000");
  const [note, setNote] = useState("");
  const [tickets, setTickets] = useState<RewardTicket[]>([]);

  const refreshTickets = useEffectEvent(() => {
    startTransition(() => {
      setTickets(getRewardTicketsForMember(CURRENT_MEMBER_ID));
    });
  });

  useEffect(() => {
    ensureAdminSeedData();
    refreshTickets();
    return subscribeToAdminData(refreshTickets);
  }, [refreshTickets]);

  const summary = useMemo(
    () => ({
      pending: tickets.filter((ticket) => ticket.status === "pending").length,
      reviewed: tickets.filter((ticket) => ticket.status === "in_review").length,
      rewarded: tickets.filter((ticket) => ticket.status === "rewarded").length,
    }),
    [tickets],
  );

  const totalUnlocked = rewards.reduce((sum, reward) => {
    if (reward.status === "earned") {
      return sum + reward.amt;
    }

    return sum;
  }, 0);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const amount = Number(requestedAmount);

    if (!Number.isFinite(amount) || amount <= 0) {
      toast.error("Enter a valid reward amount.");
      return;
    }

    const ticket = createRewardTicket({
      memberId: CURRENT_MEMBER_ID,
      rewardLevel: selectedLevel,
      requestedAmount: amount,
      note,
    });

    toast.success(`Reward ticket ${ticket.id} sent to admin.`);
    setNote("");
    refreshTickets();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Milestone Rewards</h1>
        <p className="text-muted-foreground">
          Hit levels, earn cash bonuses, and send your reward claim straight to admin.
        </p>
      </div>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex justify-between text-sm">
            <span>3 of 4 milestones earned</span>
            <span className="font-semibold text-gold">
              Rs {totalUnlocked.toLocaleString()} unlocked
            </span>
          </div>
          <Progress value={75} className="h-3" />
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <Card className="glass border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="size-5 text-gold" />
              Generate reward ticket
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <div className="text-sm font-medium">Reward level</div>
                <div className="flex flex-wrap gap-2">
                  {rewardLevels.map((level) => (
                    <Button
                      key={level}
                      type="button"
                      variant={selectedLevel === level ? "default" : "outline"}
                      className={
                        selectedLevel === level ? "gradient-primary text-primary-foreground" : ""
                      }
                      onClick={() => setSelectedLevel(level)}
                    >
                      Level {level}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Requested amount</div>
                <Input
                  type="number"
                  min="1"
                  value={requestedAmount}
                  onChange={(event) => setRequestedAmount(event.target.value)}
                  placeholder="35000"
                />
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
                <Button type="submit" className="gradient-primary text-primary-foreground">
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

      <div className="relative">
        <div className="absolute bottom-4 left-6 top-4 w-0.5 bg-border/60" />
        <div className="space-y-5">
          {rewards.map((reward) => {
            const earned = reward.status === "earned";
            const current = reward.status === "current";

            return (
              <div key={reward.lvl} className="relative pl-16">
                <div
                  className={`absolute left-0 top-1 grid size-12 place-items-center rounded-full ${
                    earned
                      ? "gradient-gold glow-gold"
                      : current
                        ? "gradient-primary glow"
                        : "bg-muted"
                  }`}
                >
                  {earned ? (
                    <Check className="size-5 text-gold-foreground" />
                  ) : current ? (
                    <Trophy className="size-5 text-primary-foreground" />
                  ) : (
                    <Lock className="size-5 text-muted-foreground" />
                  )}
                </div>
                <Card className="glass border-border/40">
                  <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        Level {reward.lvl} reward
                      </div>
                      <div className="mt-1 text-2xl font-bold text-gradient-gold">
                        Rs {reward.amt.toLocaleString()}
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        earned
                          ? "bg-success/20 text-success"
                          : current
                            ? "gradient-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {earned ? "Earned" : current ? "In progress" : "Locked"}
                    </span>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
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
