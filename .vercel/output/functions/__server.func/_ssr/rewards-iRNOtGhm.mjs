import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { B as Button } from "./button-TjZkfKyC.mjs";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-DIV666p3.mjs";
import { P as Progress } from "./progress-BRG1z6ZI.mjs";
import { m as milestoneRewards, g as getLevelBenefit, f as getMilestoneReward, h as getMilestoneStatus, t as totalMilestoneRewards, T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, l as levelBenefits, e as TableCell } from "./rewards-system-CD7nypJq.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { b as getRewardTicketsForMember, g as getMembers, C as CURRENT_MEMBER_ID, e as ensureAdminSeedData, s as subscribeToAdminData, d as createRewardTicket } from "./admin-data-BGObWPJk.mjs";
import { h as Sparkles, i as Trophy, C as Check, j as Coins, k as Ticket, l as Send, U as Users, G as Gift, m as ArrowRight, n as Clock3 } from "../_libs/lucide-react.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-progress.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/tailwind-merge.mjs";
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const levelBadgePalette = ["from-emerald-400 to-green-600", "from-sky-400 to-blue-600", "from-violet-400 to-purple-600", "from-amber-300 to-orange-500", "from-orange-400 to-amber-600", "from-rose-400 to-red-600", "from-fuchsia-500 to-violet-700", "from-cyan-400 to-blue-700", "from-yellow-300 to-amber-500", "from-red-400 to-rose-700"];
function Rewards() {
  const [memberLevel, setMemberLevel] = reactExports.useState(1);
  const [selectedLevel, setSelectedLevel] = reactExports.useState(milestoneRewards[milestoneRewards.length - 1]?.level ?? 5);
  const [note, setNote] = reactExports.useState("");
  const [tickets, setTickets] = reactExports.useState([]);
  const refreshTickets = reactExports.useEffectEvent(() => {
    reactExports.startTransition(() => {
      setTickets(getRewardTicketsForMember(CURRENT_MEMBER_ID));
      const member = getMembers().find((entry) => entry.id === CURRENT_MEMBER_ID);
      setMemberLevel(member?.currentLevel ?? 1);
    });
  });
  reactExports.useEffect(() => {
    ensureAdminSeedData();
    refreshTickets();
    return subscribeToAdminData(refreshTickets);
  }, [refreshTickets]);
  reactExports.useEffect(() => {
    const highestUnlockedLevel = milestoneRewards.filter((reward) => reward.level <= memberLevel).at(-1)?.level ?? milestoneRewards[0]?.level ?? 2;
    setSelectedLevel((currentSelection) => {
      const canKeepSelection = milestoneRewards.some((reward) => reward.level === currentSelection && reward.level <= memberLevel);
      return canKeepSelection ? currentSelection : highestUnlockedLevel;
    });
  }, [memberLevel]);
  const summary = reactExports.useMemo(() => ({
    pending: tickets.filter((ticket) => ticket.status === "pending").length,
    reviewed: tickets.filter((ticket) => ticket.status === "in_review").length,
    rewarded: tickets.filter((ticket) => ticket.status === "rewarded").length
  }), [tickets]);
  const currentBenefit = reactExports.useMemo(() => getLevelBenefit(memberLevel), [memberLevel]);
  const selectedReward = reactExports.useMemo(() => getMilestoneReward(selectedLevel), [selectedLevel]);
  const selectedBenefit = reactExports.useMemo(() => getLevelBenefit(selectedLevel), [selectedLevel]);
  const completedMilestones = reactExports.useMemo(() => milestoneRewards.filter((reward) => getMilestoneStatus(memberLevel, reward.level) === "earned").length, [memberLevel]);
  const claimedRewards = reactExports.useMemo(() => milestoneRewards.reduce((total, reward) => {
    if (getMilestoneStatus(memberLevel, reward.level) === "earned") {
      return total + reward.amount;
    }
    return total;
  }, 0), [memberLevel]);
  const currentMilestone = reactExports.useMemo(() => milestoneRewards.find((reward) => getMilestoneStatus(memberLevel, reward.level) === "current") ?? null, [memberLevel]);
  const nextMilestone = reactExports.useMemo(() => milestoneRewards.find((reward) => reward.level > memberLevel) ?? null, [memberLevel]);
  const hasClaimableReward = memberLevel >= milestoneRewards[0].level;
  const progressValue = milestoneRewards.length > 0 ? completedMilestones / milestoneRewards.length * 100 : 0;
  if (!selectedReward) {
    return null;
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (memberLevel < selectedReward.level) {
      toast.error(`Reach level ${selectedReward.level} before claiming this reward.`);
      return;
    }
    const ticket = createRewardTicket({
      memberId: CURRENT_MEMBER_ID,
      rewardLevel: selectedLevel,
      requestedAmount: selectedReward.amount,
      note
    });
    toast.success(`Reward ticket ${ticket.id} for Rs ${ticket.requestedAmount.toLocaleString()} sent to admin.`);
    setNote("");
    refreshTickets();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glass overflow-hidden border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "relative grid gap-8 p-6 lg:grid-cols-[1.2fr,0.8fr] lg:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-1 gradient-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-16 -top-16 size-48 rounded-full bg-primary/20 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-12 left-10 size-40 rounded-full bg-gold/15 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "border-0 bg-primary/20 text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "mr-1 size-3.5" }),
          "Rewards System"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold tracking-tight sm:text-5xl", children: "Grow your team, earn more." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 max-w-2xl text-base text-muted-foreground", children: [
            "Higher levels unlock bigger direct, indirect, and team bonuses, plus one-time milestone cash rewards worth up to Rs ",
            totalMilestoneRewards.toLocaleString(),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HeroStat, { icon: Trophy, label: "Current level", value: `Level ${memberLevel}`, hint: `Direct bonus ${currentBenefit.directBonus}%` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(HeroStat, { icon: Check, label: "Milestones earned", value: `${completedMilestones} / ${milestoneRewards.length}`, hint: `Rs ${claimedRewards.toLocaleString()} already cleared` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(HeroStat, { icon: Coins, label: "Reward pool", value: `Rs ${totalMilestoneRewards.toLocaleString()}`, hint: currentMilestone ? `Level ${currentMilestone.level} is ready to claim` : nextMilestone ? `Next reward unlocks at level ${nextMilestone.level}` : "All milestone rewards are unlocked" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl border border-white/10 bg-background/55 p-5 backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.24em] text-muted-foreground", children: "Current benefit mix" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(QuickBenefit, { label: "Direct bonus", value: `${currentBenefit.directBonus}%` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(QuickBenefit, { label: "Indirect bonus", value: `${currentBenefit.indirectBonus}%` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(QuickBenefit, { label: "Team bonus", value: `${currentBenefit.teamBonus}%` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-2xl border border-primary/20 bg-primary/10 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.22em] text-primary/80", children: "Reward status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-bold", children: currentMilestone ? `Level ${currentMilestone.level} reward is live` : nextMilestone ? `Next cash reward at level ${nextMilestone.level}` : "Every milestone reward is unlocked" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm text-muted-foreground", children: currentMilestone ? `Submit your Rs ${currentMilestone.amount.toLocaleString()} claim below.` : nextMilestone ? `Keep building your network to unlock Rs ${nextMilestone.amount.toLocaleString()}.` : `You have reached the full Rs ${totalMilestoneRewards.toLocaleString()} reward ladder.` })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass border-border/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Your Progress" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex flex-wrap items-center justify-between gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            completedMilestones,
            " of ",
            milestoneRewards.length,
            " milestone rewards fully earned"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-gold", children: [
            "Rs ",
            claimedRewards.toLocaleString(),
            " confirmed"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progressValue, className: "h-3" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 xl:grid-cols-[1.15fr,0.85fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass border-border/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Level Benefits" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "overflow-x-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border/40 hover:bg-transparent", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Level" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-primary", children: "Direct Bonus" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-gold", children: "Indirect Bonus" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-success", children: "Team Bonus" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: levelBenefits.map((benefit) => {
              const rowStatus = benefit.level < memberLevel ? "earned" : benefit.level === memberLevel ? "current" : "locked";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: `border-border/30 ${benefit.level === memberLevel ? "bg-primary/10" : ""}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LevelBadge, { level: benefit.level }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                    "Level ",
                    benefit.level
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-semibold text-primary", children: [
                  benefit.directBonus,
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-semibold text-gold", children: [
                  benefit.indirectBonus,
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-semibold text-success", children: [
                  benefit.teamBonus,
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(RowStatus, { status: rowStatus }) })
              ] }, benefit.level);
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-sm text-muted-foreground", children: "Team bonus starts from level 3 and keeps increasing as your network grows stronger." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass border-border/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Cash Reward System" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Level achievement unlocks fixed one-time cash rewards." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: milestoneRewards.map((reward) => {
            const status = getMilestoneStatus(memberLevel, reward.level);
            const canSelect = status !== "locked";
            return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: !canSelect, onClick: () => setSelectedLevel(reward.level), className: `w-full rounded-3xl border p-4 text-left transition ${selectedLevel === reward.level ? "border-primary/50 bg-primary/10 shadow-[0_0_0_1px_rgba(168,85,247,0.15)]" : "border-border/40 bg-background/35"} ${canSelect ? "hover:border-primary/35" : "cursor-not-allowed opacity-70"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LevelBadge, { level: reward.level, small: true }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-[0.22em] text-muted-foreground", children: [
                      "Level ",
                      reward.level
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-2xl font-bold text-gradient-gold", children: [
                      "Rs ",
                      reward.amount.toLocaleString()
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RewardStatus, { status })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm text-muted-foreground", children: "One-time milestone cash reward" })
              ] })
            ] }) }, reward.level);
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl gradient-primary p-[1px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[calc(var(--radius-2xl)-1px)] bg-background/95 p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.24em] text-muted-foreground", children: "Total rewards" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-4xl font-bold text-gradient-gold", children: [
              "Rs ",
              totalMilestoneRewards.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm text-muted-foreground", children: "Level 2 to level 5 milestone rewards combined." })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 xl:grid-cols-[1.1fr,0.9fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass border-border/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "size-5 text-gold" }),
          "Claim milestone reward"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Reward level" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: milestoneRewards.map((reward) => {
              const locked = reward.level > memberLevel;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: selectedLevel === reward.level ? "default" : "outline", className: selectedLevel === reward.level ? "gradient-primary text-primary-foreground" : "", onClick: () => setSelectedLevel(reward.level), disabled: locked, children: [
                "Level ",
                reward.level
              ] }, reward.level);
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Only unlocked reward levels can be claimed." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 rounded-3xl border border-border/40 bg-background/35 p-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.22em] text-muted-foreground", children: "Reward amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-3xl font-bold text-gradient-gold", children: [
                "Rs ",
                selectedReward.amount.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm text-muted-foreground", children: "This amount follows the official milestone reward chart." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-center text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BonusChip, { label: "Direct", value: `${selectedBenefit.directBonus}%` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(BonusChip, { label: "Indirect", value: `${selectedBenefit.indirectBonus}%` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(BonusChip, { label: "Team", value: `${selectedBenefit.teamBonus}%` })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Message for admin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: note, onChange: (event) => setNote(event.target.value), placeholder: "Tell admin why this reward should be reviewed.", className: "min-h-28" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "gradient-primary text-primary-foreground", disabled: !hasClaimableReward, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4" }),
              "Send ticket"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Temporary setup: the request is stored locally and visible in the admin panel." })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass border-border/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Your submitted tickets" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryTile, { label: "Pending", value: summary.pending }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryTile, { label: "In review", value: summary.reviewed }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryTile, { label: "Rewarded", value: summary.rewarded })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: tickets.length ? tickets.map((ticket) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/40 bg-background/40 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: ticket.id }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                  "Level ",
                  ticket.rewardLevel,
                  " reward request"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TicketStatusBadge, { status: ticket.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-4 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Amount: Rs ",
                ticket.requestedAmount.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: new Date(ticket.requestedAt).toLocaleString() })
            ] }),
            ticket.note ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: ticket.note }) : null
          ] }, ticket.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-dashed border-border/50 p-8 text-center text-sm text-muted-foreground", children: "Your reward tickets will appear here after you submit the first request." }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass border-border/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "How It Works" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 lg:grid-cols-3", children: [{
        icon: Users,
        title: "Build your team",
        description: "Invite directly and keep your referral network active.",
        accent: "gradient-primary"
      }, {
        icon: Trophy,
        title: "Achieve higher levels",
        description: "Your direct, indirect, and team bonuses rise with each level.",
        accent: "gradient-gold"
      }, {
        icon: Gift,
        title: "Earn cash rewards",
        description: "Claim fixed milestone rewards when you hit levels 2, 3, 4, and 5.",
        accent: "bg-success"
      }].map((step, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl border border-border/40 bg-background/30 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid size-12 place-items-center rounded-2xl ${step.accent} text-primary-foreground`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(step.icon, { className: "size-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-lg font-semibold", children: step.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm text-muted-foreground", children: step.description }),
        index < 2 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "absolute right-4 top-6 hidden text-muted-foreground/50 lg:block" }) : null
      ] }, step.title)) }) })
    ] })
  ] });
}
function HeroStat({
  icon: Icon,
  label,
  value,
  hint
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl border border-border/40 bg-background/40 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid size-10 place-items-center rounded-2xl gradient-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.22em] text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-2xl font-bold", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: hint })
    ] })
  ] }) });
}
function QuickBenefit({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/40 bg-background/45 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.22em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-bold", children: value })
  ] });
}
function BonusChip({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/40 bg-background/55 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-lg font-bold", children: value })
  ] });
}
function SummaryTile({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/40 bg-background/40 p-4 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-bold", children: value })
  ] });
}
function LevelBadge({
  level,
  small
}) {
  const gradient = levelBadgePalette[(level - 1) % levelBadgePalette.length];
  const sizeClass = small ? "size-16 text-2xl" : "size-10 text-sm";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid ${sizeClass} place-items-center rounded-full border border-white/15 bg-gradient-to-br ${gradient} font-bold text-white shadow-[0_10px_30px_-18px_rgba(255,255,255,0.9)]`, children: level });
}
function RowStatus({
  status
}) {
  if (status === "earned") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(RewardStatus, { status: "earned", label: "Unlocked" });
  }
  if (status === "current") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(RewardStatus, { status: "current", label: "Current" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RewardStatus, { status: "locked", label: "Upcoming" });
}
function RewardStatus({
  status,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${status === "earned" ? "bg-success/20 text-success" : status === "current" ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`, children: label ?? (status === "earned" ? "Earned" : status === "current" ? "Ready now" : "Locked") });
}
function TicketStatusBadge({
  status
}) {
  if (status === "rewarded") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "border-0 bg-success/20 text-success", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-1 size-3" }),
      "Rewarded"
    ] });
  }
  if (status === "in_review") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "border-0 bg-gold/20 text-gold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { className: "mr-1 size-3" }),
      "In review"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "border-0 bg-primary/20 text-primary", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "mr-1 size-3" }),
    "Pending"
  ] });
}
export {
  Rewards as component
};
