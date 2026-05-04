import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as Card, a as CardContent } from "./card-DIV666p3.mjs";
import { B as Button } from "./button-TjZkfKyC.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { h as Sparkles, C as Check } from "../_libs/lucide-react.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
const plans = [{
  n: 1,
  p: 1e3,
  pts: 6,
  perks: ["Direct income access", "Basic dashboard"]
}, {
  n: 2,
  p: 2e3,
  pts: 12,
  perks: ["Direct income", "Level 2 unlock"]
}, {
  n: 3,
  p: 4e3,
  pts: 30,
  perks: ["3-level earnings", "Priority support"]
}, {
  n: 4,
  p: 6500,
  pts: 44,
  perks: ["3-level earnings", "Higher % rates"]
}, {
  n: 5,
  p: 9500,
  pts: 63,
  perks: ["Premium plan", "Gold tier", "Reward boost"],
  featured: true
}, {
  n: 6,
  p: 12e3,
  pts: 80,
  perks: ["Premium plan", "Higher rewards"]
}, {
  n: 7,
  p: 15e3,
  pts: 100,
  perks: ["VIP plan", "Maximum rewards", "Concierge"]
}];
function Plans() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Investment Plans" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Pick a plan to start earning across 3 levels. Higher plans = more points & higher %." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5", children: plans.map((pl) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `relative glass border-border/40 transition-all hover:-translate-y-1 hover:glow ${pl.featured ? "ring-2 ring-gold glow-gold" : ""}`, children: [
      pl.featured && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "absolute -top-3 left-1/2 -translate-x-1/2 gradient-gold text-gold-foreground border-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3 mr-1" }),
        " Recommended"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: [
            "Plan ",
            pl.n
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-3xl font-bold mt-1", children: [
            "₨ ",
            pl.p.toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gradient-gold font-semibold mt-1", children: [
            pl.pts,
            " Points"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm", children: pl.perks.map((perk) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4 text-success shrink-0 mt-0.5" }),
          " ",
          perk
        ] }, perk)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => toast.success(`Subscribed to Plan ${pl.n}!`), className: `w-full ${pl.featured ? "gradient-gold text-gold-foreground" : "gradient-primary text-primary-foreground"}`, children: "Subscribe" })
      ] })
    ] }, pl.n)) })
  ] });
}
export {
  Plans as component
};
