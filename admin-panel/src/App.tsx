import {
  startTransition,
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import {
  ArrowUpRight,
  BadgeDollarSign,
  CheckCircle2,
  Clock3,
  LayoutDashboard,
  LogOut,
  Search,
  ShieldCheck,
  Sparkles,
  Ticket,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  ensureAdminSeedData,
  getAdminSnapshot,
  processRewardTicket,
  subscribeToAdminData,
  type AdminSnapshot,
  type Member,
  type RewardPayout,
  type RewardTicket,
} from "@/lib/admin-data";
import { cn } from "@/lib/utils";

type AdminView = "dashboard" | "members" | "rewards" | "payouts";

interface AdminSession {
  identifier: string;
  loggedInAt: string;
}

const ADMIN_SESSION_KEY = "levelup-admin-session-v1";

const currencyFormatter = new Intl.NumberFormat("en-PK", {
  maximumFractionDigits: 0,
});

const navigationItems: Array<{
  id: AdminView;
  label: string;
  icon: typeof LayoutDashboard;
}> = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "members", label: "Members", icon: Users },
  { id: "rewards", label: "Reward Tickets", icon: Ticket },
  { id: "payouts", label: "Payouts", icon: BadgeDollarSign },
];

export default function App() {
  const [session, setSession] = useState<AdminSession | null>(() => readAdminSession());

  const handleLogin = (identifier: string) => {
    const nextSession = {
      identifier,
      loggedInAt: new Date().toISOString(),
    };

    writeAdminSession(nextSession);
    setSession(nextSession);
    toast.success("Admin session started.");
  };

  const handleLogout = () => {
    writeAdminSession(null);
    setSession(null);
    toast.success("Admin logged out.");
  };

  if (!session) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <AdminWorkspace session={session} onLogout={handleLogout} />;
}

function LoginScreen({ onLogin }: { onLogin: (identifier: string) => void }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!identifier.trim() || !password.trim()) {
      toast.error("Enter any username and password to continue.");
      return;
    }

    onLogin(identifier.trim());
  };

  return (
    <div className="panel-grid min-h-screen px-4 py-8 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-stretch gap-6 lg:grid-cols-[1.05fr,0.95fr]">
        <div className="glass hidden rounded-[2rem] p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-2xl gradient-primary shadow-[var(--shadow-glow)]">
              <ShieldCheck className="size-6 text-primary-foreground" />
            </div>
            <div>
              <div className="text-lg font-semibold">LevelUp Admin</div>
              <div className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                Reward Control Center
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <Badge className="border-0 bg-gold/20 text-gold">Separate admin app</Badge>
            <h1 className="max-w-lg text-5xl font-semibold leading-tight">
              Review members, approve reward tickets, and manage payouts from one place.
            </h1>
            <p className="max-w-lg text-base text-muted-foreground">
              This login is intentionally open for now. Any username and password will take you into
              the admin panel until a real auth flow is added.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "Live members", value: "8+" },
              { label: "Pending tickets", value: "Queue ready" },
              { label: "Flexible payouts", value: "Per-user amount" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border/40 bg-background/35 p-4"
              >
                <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {item.label}
                </div>
                <div className="mt-3 text-2xl font-semibold">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass flex items-center rounded-[2rem] p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-6">
            <div className="space-y-3">
              <Badge className="border-0 bg-primary/20 text-primary">Temporary access</Badge>
              <h2 className="text-3xl font-semibold">Admin login</h2>
              <p className="text-sm text-muted-foreground">
                Use anything for now. This is a placeholder login screen for the separate admin
                panel.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="admin-identifier" className="text-sm font-medium">
                Username or email
              </label>
              <Input
                id="admin-identifier"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                placeholder="admin@levelup.app"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="admin-password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Type anything"
              />
            </div>

            <Button type="submit" className="h-11 w-full gradient-primary text-primary-foreground">
              <ShieldCheck className="size-4" />
              Enter admin panel
            </Button>

            <div className="rounded-2xl border border-border/40 bg-background/35 p-4 text-sm text-muted-foreground">
              Temporary note: this panel uses local mock data and local browser storage until you
              connect a real backend.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function AdminWorkspace({ session, onLogout }: { session: AdminSession; onLogout: () => void }) {
  const [activeView, setActiveView] = useState<AdminView>("dashboard");
  const [snapshot, setSnapshot] = useState<AdminSnapshot>(() => getAdminSnapshot());

  const refreshSnapshot = useEffectEvent(() => {
    startTransition(() => {
      setSnapshot(getAdminSnapshot());
    });
  });

  useEffect(() => {
    ensureAdminSeedData();
    refreshSnapshot();
    return subscribeToAdminData(refreshSnapshot);
  }, [refreshSnapshot]);

  const pendingTicketCount = snapshot.rewardTickets.filter(
    (ticket) => ticket.status === "pending",
  ).length;

  return (
    <div className="panel-grid min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-[1500px] gap-6 lg:grid-cols-[260px,1fr]">
        <aside className="glass flex flex-col rounded-[2rem] p-4">
          <div className="flex items-center gap-3 border-b border-border/50 px-2 pb-5">
            <div className="grid size-12 place-items-center rounded-2xl gradient-primary shadow-[var(--shadow-glow)]">
              <Sparkles className="size-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-semibold">LevelUp Admin</div>
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Separate control app
              </div>
            </div>
          </div>

          <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = activeView === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveView(item.id)}
                  className={cn(
                    "flex min-w-fit items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all",
                    active
                      ? "gradient-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                      : "bg-background/30 text-foreground/80 hover:bg-accent",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                  {item.id === "rewards" && pendingTicketCount ? (
                    <span className="ml-auto rounded-full bg-background/25 px-2 py-0.5 text-xs text-primary-foreground">
                      {pendingTicketCount}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto space-y-4 rounded-[1.5rem] border border-border/40 bg-background/30 p-4">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Logged in as
              </div>
              <div className="mt-2 font-semibold">{session.identifier}</div>
            </div>
            <div className="text-sm text-muted-foreground">
              Open login is enabled right now. Replace it with real auth whenever your backend is
              ready.
            </div>
            <Button variant="outline" className="w-full justify-start" onClick={onLogout}>
              <LogOut className="size-4" />
              Logout
            </Button>
          </div>
        </aside>

        <main className="space-y-6 rounded-[2rem]">
          <header className="glass flex flex-col gap-4 rounded-[2rem] px-6 py-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.26em] text-muted-foreground">
                Admin panel
              </div>
              <h1 className="mt-2 text-3xl font-semibold">
                {activeView === "dashboard" && "Reward operations overview"}
                {activeView === "members" && "All members and account details"}
                {activeView === "rewards" && "Reward tickets and distribution"}
                {activeView === "payouts" && "Processed reward history"}
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
                Manage member data, review incoming reward requests, and assign custom payout
                amounts to as many users as you want from this separate admin app.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <QuickMetric
                label="Members"
                value={snapshot.members.length}
                accent="text-primary"
                icon={Users}
              />
              <QuickMetric
                label="Open tickets"
                value={
                  snapshot.rewardTickets.filter((ticket) => ticket.status !== "rewarded").length
                }
                accent="text-gold"
                icon={Ticket}
              />
              <QuickMetric
                label="Total payouts"
                value={formatCurrency(
                  snapshot.rewardPayouts.reduce((sum, payout) => sum + payout.amount, 0),
                )}
                accent="text-success"
                icon={Wallet}
              />
            </div>
          </header>

          {activeView === "dashboard" ? (
            <DashboardPage snapshot={snapshot} setActiveView={setActiveView} />
          ) : null}

          {activeView === "members" ? (
            <MembersPage
              members={snapshot.members}
              rewardTickets={snapshot.rewardTickets}
              rewardPayouts={snapshot.rewardPayouts}
            />
          ) : null}

          {activeView === "rewards" ? (
            <RewardsPage
              members={snapshot.members}
              rewardTickets={snapshot.rewardTickets}
              adminIdentifier={session.identifier}
            />
          ) : null}

          {activeView === "payouts" ? (
            <PayoutsPage rewardPayouts={snapshot.rewardPayouts} members={snapshot.members} />
          ) : null}
        </main>
      </div>
    </div>
  );
}

function DashboardPage({
  snapshot,
  setActiveView,
}: {
  snapshot: AdminSnapshot;
  setActiveView: (view: AdminView) => void;
}) {
  const pendingTickets = snapshot.rewardTickets.filter((ticket) => ticket.status === "pending");
  const rewardedTickets = snapshot.rewardTickets.filter((ticket) => ticket.status === "rewarded");
  const averageSpend = snapshot.members.length
    ? Math.round(
        snapshot.members.reduce((sum, member) => sum + member.totalSpent, 0) /
          snapshot.members.length,
      )
    : 0;
  const activeMembers = snapshot.members.filter((member) => member.status === "active").length;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Active members"
          value={activeMembers}
          detail={`${snapshot.members.length - activeMembers} members need review or are paused`}
          icon={Users}
          accent="text-primary"
        />
        <StatCard
          title="Average user cost"
          value={formatCurrency(averageSpend)}
          detail="Based on member total spend"
          icon={TrendingUp}
          accent="text-gold"
        />
        <StatCard
          title="Pending tickets"
          value={pendingTickets.length}
          detail="Ready for admin decision"
          icon={Ticket}
          accent="text-secondary"
        />
        <StatCard
          title="Rewarded tickets"
          value={rewardedTickets.length}
          detail="Already distributed"
          icon={CheckCircle2}
          accent="text-success"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <Card className="glass border-border/40">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>High-value members</CardTitle>
              <CardDescription>
                Quick view of the users with the largest total cost.
              </CardDescription>
            </div>
            <Button variant="outline" onClick={() => setActiveView("members")}>
              Open members
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {snapshot.members
                .slice()
                .sort((left, right) => right.totalSpent - left.totalSpent)
                .slice(0, 5)
                .map((member) => (
                  <div
                    key={member.id}
                    className="flex flex-col gap-3 rounded-2xl border border-border/40 bg-background/35 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="font-semibold">{member.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {member.activePlan} . Level {member.currentLevel} . {member.city}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-6 text-sm">
                      <MetricStack label="Spent" value={formatCurrency(member.totalSpent)} />
                      <MetricStack label="Earned" value={formatCurrency(member.totalEarned)} />
                      <MetricStack label="Referrals" value={member.referrals} />
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/40">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>Reward queue</CardTitle>
              <CardDescription>Latest tickets created by users.</CardDescription>
            </div>
            <Button variant="outline" onClick={() => setActiveView("rewards")}>
              Review tickets
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {snapshot.rewardTickets.slice(0, 5).map((ticket) => (
              <div
                key={ticket.id}
                className="rounded-2xl border border-border/40 bg-background/35 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold">{ticket.memberName}</div>
                    <div className="text-sm text-muted-foreground">
                      Level {ticket.rewardLevel} request . {formatCurrency(ticket.requestedAmount)}
                    </div>
                  </div>
                  <TicketStatusBadge status={ticket.status} />
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  Requested {formatDateTime(ticket.requestedAt)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function MembersPage({
  members,
  rewardTickets,
  rewardPayouts,
}: {
  members: Member[];
  rewardTickets: RewardTicket[];
  rewardPayouts: RewardPayout[];
}) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filteredMembers = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return members;
    }

    return members.filter((member) =>
      [member.name, member.email, member.city, member.activePlan].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [deferredQuery, members]);

  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.id ?? "");

  useEffect(() => {
    if (!filteredMembers.some((member) => member.id === selectedMemberId)) {
      setSelectedMemberId(filteredMembers[0]?.id ?? "");
    }
  }, [filteredMembers, selectedMemberId]);

  const selectedMember =
    filteredMembers.find((member) => member.id === selectedMemberId) ??
    members.find((member) => member.id === selectedMemberId) ??
    null;

  const selectedTickets = rewardTickets.filter((ticket) => ticket.memberId === selectedMember?.id);
  const selectedPayouts = rewardPayouts.filter((payout) => payout.memberId === selectedMember?.id);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.35fr,0.95fr]">
      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Members directory</CardTitle>
          <CardDescription>
            Search by member name, plan, city, or email to inspect user level and cost data.
          </CardDescription>
          <div className="relative mt-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search members"
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/40 hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Total cost</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow
                  key={member.id}
                  onClick={() => setSelectedMemberId(member.id)}
                  className={cn(
                    "cursor-pointer border-border/30",
                    member.id === selectedMember?.id && "bg-accent/65",
                  )}
                >
                  <TableCell>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-xs text-muted-foreground">{member.email}</div>
                  </TableCell>
                  <TableCell>Level {member.currentLevel}</TableCell>
                  <TableCell>{member.activePlan}</TableCell>
                  <TableCell>{formatCurrency(member.totalSpent)}</TableCell>
                  <TableCell>
                    <MemberStatusBadge status={member.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>{selectedMember?.name ?? "Select a member"}</CardTitle>
          <CardDescription>
            {selectedMember
              ? `${selectedMember.email} . ${selectedMember.phone}`
              : "Choose a member from the list to inspect details."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {selectedMember ? (
            <>
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard label="Current level" value={`Level ${selectedMember.currentLevel}`} />
                <InfoCard label="Points" value={selectedMember.points} />
                <InfoCard label="Referrals" value={selectedMember.referrals} />
                <InfoCard label="Total earned" value={formatCurrency(selectedMember.totalEarned)} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Level progress</span>
                  <span>{selectedMember.points} / 120 pts</span>
                </div>
                <Progress value={Math.min(100, Math.round((selectedMember.points / 120) * 100))} />
              </div>

              <div className="rounded-2xl border border-border/40 bg-background/35 p-4 text-sm">
                <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Notes
                </div>
                <p className="mt-3 text-muted-foreground">{selectedMember.notes}</p>
              </div>

              <div>
                <div className="text-sm font-medium">Recent tickets</div>
                <div className="mt-3 space-y-3">
                  {selectedTickets.length ? (
                    selectedTickets.slice(0, 3).map((ticket) => (
                      <div
                        key={ticket.id}
                        className="rounded-2xl border border-border/40 bg-background/35 p-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-medium">{ticket.id}</div>
                          <TicketStatusBadge status={ticket.status} />
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          Requested {formatDateTime(ticket.requestedAt)} for{" "}
                          {formatCurrency(ticket.requestedAmount)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <EmptyState copy="No reward tickets for this member yet." />
                  )}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium">Recent payouts</div>
                <div className="mt-3 space-y-3">
                  {selectedPayouts.length ? (
                    selectedPayouts.slice(0, 3).map((payout) => (
                      <div
                        key={payout.id}
                        className="rounded-2xl border border-border/40 bg-background/35 p-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-medium">{formatCurrency(payout.amount)}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatDateTime(payout.processedAt)}
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          From ticket {payout.ticketId} approved by {payout.processedBy}
                        </div>
                      </div>
                    ))
                  ) : (
                    <EmptyState copy="No payouts have been recorded for this member." />
                  )}
                </div>
              </div>
            </>
          ) : (
            <EmptyState copy="Select a member on the left to see complete details." padded />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function RewardsPage({
  members,
  rewardTickets,
  adminIdentifier,
}: {
  members: Member[];
  rewardTickets: RewardTicket[];
  adminIdentifier: string;
}) {
  const actionableTickets = rewardTickets.filter((ticket) => ticket.status !== "rewarded");
  const [selectedTicketId, setSelectedTicketId] = useState(
    actionableTickets[0]?.id ?? rewardTickets[0]?.id ?? "",
  );
  const [recipientAmounts, setRecipientAmounts] = useState<Record<string, string>>({});
  const [adminNote, setAdminNote] = useState("");

  useEffect(() => {
    if (!rewardTickets.some((ticket) => ticket.id === selectedTicketId)) {
      setSelectedTicketId(actionableTickets[0]?.id ?? rewardTickets[0]?.id ?? "");
    }
  }, [actionableTickets, rewardTickets, selectedTicketId]);

  const selectedTicket =
    rewardTickets.find((ticket) => ticket.id === selectedTicketId) ??
    actionableTickets[0] ??
    rewardTickets[0] ??
    null;

  useEffect(() => {
    if (!selectedTicket) {
      setRecipientAmounts({});
      return;
    }

    setRecipientAmounts({
      [selectedTicket.memberId]: String(selectedTicket.requestedAmount),
    });
    setAdminNote(
      selectedTicket.note
        ? `Processed after reviewing: ${selectedTicket.note}`
        : "Reward approved by admin.",
    );
  }, [selectedTicket]);

  const selectedRecipients = Object.entries(recipientAmounts)
    .map(([memberId, amount]) => ({
      memberId,
      amount: Number(amount),
      member: members.find((entry) => entry.id === memberId) ?? null,
    }))
    .filter((entry) => entry.member);

  const totalAmount = selectedRecipients.reduce(
    (sum, recipient) => sum + (Number.isFinite(recipient.amount) ? recipient.amount : 0),
    0,
  );

  const handleToggleRecipient = (memberId: string) => {
    setRecipientAmounts((current) => {
      if (current[memberId]) {
        const next = { ...current };
        delete next[memberId];
        return next;
      }

      return {
        ...current,
        [memberId]:
          memberId === selectedTicket?.memberId ? String(selectedTicket.requestedAmount) : "5000",
      };
    });
  };

  const handleReward = () => {
    if (!selectedTicket) {
      toast.error("Select a reward ticket first.");
      return;
    }

    const allocations = selectedRecipients
      .map((recipient) => ({
        memberId: recipient.memberId,
        amount: Number(recipient.amount),
      }))
      .filter((recipient) => Number.isFinite(recipient.amount) && recipient.amount > 0);

    if (!allocations.length) {
      toast.error("Select at least one user and enter a valid amount.");
      return;
    }

    try {
      processRewardTicket({
        ticketId: selectedTicket.id,
        allocations,
        processedBy: adminIdentifier,
      });
      toast.success(
        `Rewarded ${allocations.length} user${allocations.length > 1 ? "s" : ""} from ticket ${selectedTicket.id}.`,
      );
      setAdminNote("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to process this ticket.");
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.92fr,1.08fr]">
      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Incoming reward tickets</CardTitle>
          <CardDescription>
            Tickets generated by users now appear here for admin review.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {rewardTickets.length ? (
            rewardTickets.map((ticket) => (
              <button
                key={ticket.id}
                type="button"
                onClick={() => setSelectedTicketId(ticket.id)}
                className={cn(
                  "w-full rounded-2xl border border-border/40 bg-background/35 p-4 text-left transition-colors hover:bg-accent/40",
                  ticket.id === selectedTicket?.id && "bg-accent/65",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold">{ticket.memberName}</div>
                    <div className="text-sm text-muted-foreground">
                      Ticket {ticket.id} . Level {ticket.rewardLevel}
                    </div>
                  </div>
                  <TicketStatusBadge status={ticket.status} />
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  <span>{formatCurrency(ticket.requestedAmount)}</span>
                  <span className="text-muted-foreground">
                    {formatDateTime(ticket.requestedAt)}
                  </span>
                </div>
                {ticket.rewardedCount ? (
                  <div className="mt-2 text-xs text-success">
                    Rewarded {ticket.rewardedCount} user(s) for{" "}
                    {formatCurrency(ticket.distributedAmount ?? 0)}
                  </div>
                ) : null}
              </button>
            ))
          ) : (
            <EmptyState copy="No reward tickets available yet." padded />
          )}
        </CardContent>
      </Card>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Reward distribution</CardTitle>
          <CardDescription>
            Choose how many users you want to reward and type a custom amount for each one.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {selectedTicket ? (
            <>
              <div className="rounded-[1.5rem] border border-border/40 bg-background/35 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      Selected ticket
                    </div>
                    <div className="mt-2 text-xl font-semibold">{selectedTicket.id}</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Requested by {selectedTicket.memberName} for{" "}
                      {formatCurrency(selectedTicket.requestedAmount)}
                    </div>
                  </div>
                  <TicketStatusBadge status={selectedTicket.status} />
                </div>
                {selectedTicket.note ? (
                  <p className="mt-4 text-sm text-muted-foreground">{selectedTicket.note}</p>
                ) : null}
              </div>

              <div>
                <div className="text-sm font-medium">Select members to reward</div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {members.map((member) => {
                    const selected = member.id in recipientAmounts;

                    return (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => handleToggleRecipient(member.id)}
                        className={cn(
                          "rounded-2xl border p-4 text-left transition-colors",
                          selected
                            ? "border-primary bg-primary/12"
                            : "border-border/40 bg-background/30 hover:bg-accent/40",
                        )}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">
                              Level {member.currentLevel} . {member.activePlan}
                            </div>
                          </div>
                          {selected ? (
                            <CheckCircle2 className="size-5 text-success" />
                          ) : (
                            <Users className="size-5 text-muted-foreground" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium">Amount per selected user</div>
                {selectedRecipients.length ? (
                  selectedRecipients.map((recipient) => (
                    <div
                      key={recipient.memberId}
                      className="rounded-2xl border border-border/40 bg-background/30 p-4"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="font-medium">{recipient.member?.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {recipient.member?.email}
                          </div>
                        </div>
                        <Input
                          type="number"
                          min="1"
                          value={recipientAmounts[recipient.memberId] ?? ""}
                          onChange={(event) =>
                            setRecipientAmounts((current) => ({
                              ...current,
                              [recipient.memberId]: event.target.value,
                            }))
                          }
                          className="sm:max-w-[220px]"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState copy="Select one or more users to add payout amounts." padded />
                )}
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Admin note</div>
                <Textarea
                  value={adminNote}
                  onChange={(event) => setAdminNote(event.target.value)}
                  placeholder="Optional internal note for this payout."
                  className="min-h-28"
                />
              </div>

              <div className="flex flex-col gap-4 rounded-[1.5rem] border border-border/40 bg-background/35 p-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    Distribution summary
                  </div>
                  <div className="mt-2 text-2xl font-semibold">{formatCurrency(totalAmount)}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {selectedRecipients.length} selected user(s)
                  </div>
                </div>
                <Button
                  onClick={handleReward}
                  disabled={selectedTicket.status === "rewarded"}
                  className="h-11 gradient-primary text-primary-foreground"
                >
                  <BadgeDollarSign className="size-4" />
                  Reward selected users
                </Button>
              </div>
            </>
          ) : (
            <EmptyState copy="Select a ticket from the left to start rewarding users." padded />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function PayoutsPage({
  rewardPayouts,
  members,
}: {
  rewardPayouts: RewardPayout[];
  members: Member[];
}) {
  const topRecipients = useMemo(() => {
    const totals = new Map<string, number>();

    for (const payout of rewardPayouts) {
      totals.set(payout.memberId, (totals.get(payout.memberId) ?? 0) + payout.amount);
    }

    return members
      .map((member) => ({
        member,
        total: totals.get(member.id) ?? 0,
      }))
      .filter((entry) => entry.total > 0)
      .sort((left, right) => right.total - left.total)
      .slice(0, 4);
  }, [members, rewardPayouts]);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Payout history</CardTitle>
          <CardDescription>Every rewarded user and amount processed by admin.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/40 hover:bg-transparent">
                <TableHead>User</TableHead>
                <TableHead>Ticket</TableHead>
                <TableHead>Processed by</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rewardPayouts.length ? (
                rewardPayouts.map((payout) => (
                  <TableRow key={payout.id} className="border-border/30">
                    <TableCell>
                      <div className="font-medium">{payout.memberName}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatDateTime(payout.processedAt)}
                      </div>
                    </TableCell>
                    <TableCell>{payout.ticketId}</TableCell>
                    <TableCell>{payout.processedBy}</TableCell>
                    <TableCell className="text-right font-semibold text-success">
                      {formatCurrency(payout.amount)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="border-border/30">
                  <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                    No payouts have been processed yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="glass border-border/40">
        <CardHeader>
          <CardTitle>Top rewarded users</CardTitle>
          <CardDescription>Who has received the biggest reward totals so far.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {topRecipients.length ? (
            topRecipients.map((entry, index) => (
              <div
                key={entry.member.id}
                className="rounded-2xl border border-border/40 bg-background/35 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold">
                      {index + 1}. {entry.member.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Level {entry.member.currentLevel} . {entry.member.activePlan}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-success">{formatCurrency(entry.total)}</div>
                    <div className="text-xs text-muted-foreground">Total rewarded</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <EmptyState copy="Top recipients will appear after the first payout." padded />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function QuickMetric({
  label,
  value,
  accent,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  accent: string;
  icon: typeof Users;
}) {
  return (
    <div className="rounded-2xl border border-border/40 bg-background/35 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className={cn("grid size-10 place-items-center rounded-2xl bg-accent/40", accent)}>
          <Icon className="size-5" />
        </div>
        <ArrowUpRight className="size-4 text-success" />
      </div>
      <div className="mt-4 text-2xl font-semibold">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
    </div>
  );
}

function StatCard({
  title,
  value,
  detail,
  icon: Icon,
  accent,
}: {
  title: string;
  value: number | string;
  detail: string;
  icon: typeof Users;
  accent: string;
}) {
  return (
    <Card className="glass border-border/40">
      <CardContent className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div className={cn("grid size-11 place-items-center rounded-2xl bg-accent/45", accent)}>
            <Icon className="size-5" />
          </div>
          <ArrowUpRight className="size-4 text-success" />
        </div>
        <div className="mt-4 text-3xl font-semibold">{value}</div>
        <div className="mt-1 text-sm font-medium">{title}</div>
        <div className="mt-2 text-sm text-muted-foreground">{detail}</div>
      </CardContent>
    </Card>
  );
}

function MetricStack({ label, value }: { label: string; value: number | string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="mt-1 font-semibold">{value}</div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-background/30 p-4">
      <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
      <div className="mt-3 text-xl font-semibold">{value}</div>
    </div>
  );
}

function EmptyState({ copy, padded }: { copy: string; padded?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-border/50 text-center text-sm text-muted-foreground",
        padded ? "p-8" : "p-5",
      )}
    >
      {copy}
    </div>
  );
}

function TicketStatusBadge({ status }: { status: RewardTicket["status"] }) {
  if (status === "rewarded") {
    return <Badge className="border-0 bg-success/20 text-success">Rewarded</Badge>;
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

function MemberStatusBadge({ status }: { status: Member["status"] }) {
  if (status === "active") {
    return <Badge className="border-0 bg-success/20 text-success">Active</Badge>;
  }

  if (status === "watch") {
    return <Badge className="border-0 bg-gold/20 text-gold">Watch</Badge>;
  }

  return <Badge className="border-0 bg-muted text-muted-foreground">Paused</Badge>;
}

function formatCurrency(value: number) {
  return `Rs ${currencyFormatter.format(value)}`;
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function readAdminSession() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(ADMIN_SESSION_KEY);
    return rawValue ? (JSON.parse(rawValue) as AdminSession) : null;
  } catch {
    return null;
  }
}

function writeAdminSession(session: AdminSession | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (!session) {
    window.localStorage.removeItem(ADMIN_SESSION_KEY);
    return;
  }

  window.localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
}
