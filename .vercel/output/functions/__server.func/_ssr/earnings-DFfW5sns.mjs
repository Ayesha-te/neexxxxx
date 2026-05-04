import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-DIV666p3.mjs";
import { g as getLevelBenefit, t as totalMilestoneRewards, T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, l as levelBenefits, h as getMilestoneStatus, e as TableCell, m as milestoneRewards } from "./rewards-system-CD7nypJq.mjs";
import { i as Trophy, j as Coins, G as Gift, U as Users, T as TrendingUp, m as ArrowRight } from "../_libs/lucide-react.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const currentLevel = 5;
function Earnings() {
  const currentBenefit = getLevelBenefit(currentLevel);
  const steps = [{
    icon: Users,
    title: "Build your team",
    description: "Direct invitations unlock stronger bonus percentages as your network grows.",
    accent: "gradient-primary"
  }, {
    icon: TrendingUp,
    title: "Achieve higher levels",
    description: "Each level increases your direct, indirect, and team earning power.",
    accent: "gradient-gold"
  }, {
    icon: Gift,
    title: "Earn cash rewards",
    description: "Hit levels 2 to 5 to unlock one-time milestone payouts on top of bonuses.",
    accent: "bg-success"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Earning System" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "A transparent reward model with rising level bonuses and milestone cash rewards." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Trophy, label: "Current level", value: `Level ${currentLevel}`, hint: `Direct bonus ${currentBenefit.directBonus}%` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Coins, label: "Indirect bonus", value: `${currentBenefit.indirectBonus}%`, hint: `Team bonus ${currentBenefit.teamBonus}%` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Gift, label: "Reward pool", value: `Rs ${totalMilestoneRewards.toLocaleString()}`, hint: "Level 2 to 5 one-time cash rewards" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 lg:grid-cols-3", children: steps.map((step, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glass relative overflow-hidden border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid size-12 place-items-center rounded-xl ${step.accent} text-primary-foreground glow`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(step.icon, { className: "size-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold", children: step.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: step.description }),
      index < 2 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "absolute right-2 top-1/2 hidden -translate-y-1/2 text-muted-foreground/40 lg:block" }) : null
    ] }) }, step.title)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass border-border/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Level Benefits" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border/40 hover:bg-transparent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Level" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-primary", children: "Direct Bonus" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-gold", children: "Indirect Bonus" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-success", children: "Team Bonus" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: levelBenefits.map((benefit) => {
          const status = getMilestoneStatus(currentLevel, benefit.level);
          const reached = benefit.level <= currentLevel;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: `border-border/30 ${benefit.level === currentLevel ? "bg-primary/10" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-bold", children: [
              "L",
              benefit.level
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { pct: benefit.directBonus, color: "bg-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { pct: benefit.indirectBonus, color: "bg-gold" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { pct: benefit.teamBonus, color: "bg-success" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: status === "current" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full px-2 py-1 text-xs font-semibold gradient-gold text-gold-foreground", children: "Current" }) : reached ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-success/20 px-2 py-1 text-xs text-success", children: "Unlocked" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground", children: "Locked" }) })
          ] }, benefit.level);
        }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 lg:grid-cols-4", children: milestoneRewards.map((reward) => {
      const status = getMilestoneStatus(currentLevel, reward.level);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glass border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-[0.22em] text-muted-foreground", children: [
          "Level ",
          reward.level
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-3xl font-bold text-gradient-gold", children: [
          "Rs ",
          reward.amount.toLocaleString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "One-time milestone reward" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status === "earned" ? "bg-success/20 text-success" : status === "current" ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`, children: status === "earned" ? "Earned" : status === "current" ? "Ready now" : "Locked" })
      ] }) }, reward.level);
    }) })
  ] });
}
function StatCard({
  icon: Icon,
  label,
  value,
  hint
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glass border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-start gap-4 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid size-11 place-items-center rounded-2xl gradient-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.22em] text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-2xl font-bold", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: hint })
    ] })
  ] }) });
}
function Bar({
  pct,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-20 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full ${color}`, style: {
      width: `${Math.max(8, Math.min(100, pct * 2))}%`
    } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "w-10 text-sm font-medium", children: [
      pct,
      "%"
    ] })
  ] });
}
export {
  Earnings as component
};
