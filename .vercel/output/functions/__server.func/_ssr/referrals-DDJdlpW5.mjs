import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-DIV666p3.mjs";
import { B as Button } from "./button-TjZkfKyC.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { o as Copy, p as Share2, U as Users } from "../_libs/lucide-react.mjs";
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
const link = "https://nexo-women.app/r/NEXO-1234";
function Referrals() {
  const copy = async () => {
    await navigator.clipboard.writeText(link);
    toast.success("Referral link copied!");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Referral System" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Invite friends. Earn from 3 levels of their network." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass border-border/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Your referral link" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { readOnly: true, value: link, className: "flex-1 bg-input/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: copy, className: "gradient-primary text-primary-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "size-4 mr-2" }),
          " Copy"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => toast.success("Share dialog opened"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "size-4 mr-2" }),
          " Share"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-4", children: [{
      l: "Level 1",
      n: 12,
      e: 14200,
      c: "gradient-primary"
    }, {
      l: "Level 2",
      n: 38,
      e: 7820,
      c: "gradient-gold"
    }, {
      l: "Level 3",
      n: 96,
      e: 2800,
      c: "bg-success"
    }].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glass border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `size-10 rounded-xl ${r.c} grid place-items-center text-primary-foreground`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground uppercase", children: r.l }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-3xl font-bold", children: [
        r.n,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "people" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gradient-gold font-semibold", children: [
        "Earned ₨ ",
        r.e.toLocaleString()
      ] })
    ] }) }, r.l)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass border-border/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Your downline tree" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Node, { label: "You", big: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-px bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-6", children: ["Sara", "Bilal", "Hina"].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Node, { label: n }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-px bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Node, { label: "L2", small: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Node, { label: "L2", small: true })
          ] })
        ] }, n)) })
      ] }) })
    ] })
  ] });
}
function Node({
  label,
  big,
  small
}) {
  const size = big ? "size-16 text-base" : small ? "size-10 text-xs" : "size-12 text-sm";
  const cls = big ? "gradient-gold text-gold-foreground glow-gold" : "glass text-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${size} ${cls} rounded-full grid place-items-center font-semibold`, children: label });
}
export {
  Referrals as component
};
