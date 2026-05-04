import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as BrandLockup, b as brandLogo } from "./BrandLockup-yxNron_f.mjs";
import { B as Button } from "./button-TjZkfKyC.mjs";
import { B as BRAND_NAME } from "./router-BRGvJkPm.mjs";
import { M as Menu, T as TrendingUp, U as Users, e as ShieldCheck } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
function Landing() {
  const [open, setOpen] = reactExports.useState(false);
  const navLinks = [{
    label: "Plans",
    to: "/plans"
  }, {
    label: "Earnings",
    to: "/earnings"
  }, {
    label: "Rewards",
    to: "/rewards"
  }, {
    label: "Referrals",
    to: "/referrals"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen gradient-hero", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 glass border-b border-border/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrandLockup, { titleClassName: "text-lg font-bold", subtitleClassName: "tracking-[0.22em]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-1 md:flex", children: navLinks.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: link.to, className: "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground", children: link.label }, link.to)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "hidden sm:inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", children: "Login" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "gradient-primary text-primary-foreground glow", children: "Get Started" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "md:hidden", onClick: () => setOpen((value) => !value), "aria-label": "Menu", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "size-5" }) })
        ] })
      ] }),
      open ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 border-t border-border/40 px-6 py-3 md:hidden", children: [
        navLinks.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: link.to, onClick: () => setOpen(false), className: "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent/40 hover:text-foreground", children: link.label }, link.to)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", onClick: () => setOpen(false), className: "rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent/40 sm:hidden", children: "Login" })
      ] }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center lg:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-gold animate-pulse" }),
            "Built for confidence, community, and growth"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl font-bold leading-[1.02] tracking-tight lg:text-7xl", children: [
            "Rise together with ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: BRAND_NAME }),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-2xl text-lg text-muted-foreground lg:max-w-xl", children: "Explore earning plans, referral rewards, and progress milestones in a warm, community-first experience inspired by your new brand identity." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", className: "gradient-primary h-12 px-8 text-base text-primary-foreground glow", children: "Join Nexo" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "outline", className: "h-12 border-border/60 bg-white/40 px-8 text-base", children: "Explore Dashboard" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-4 sm:grid-cols-3", children: [{
            icon: TrendingUp,
            title: "Growth Paths",
            subtitle: "Plans, referrals, and rewards in one place"
          }, {
            icon: Users,
            title: "Women-First",
            subtitle: "A brand story centered on collective progress"
          }, {
            icon: ShieldCheck,
            title: "Clear Tracking",
            subtitle: "Beautiful visibility into every milestone"
          }].map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5 text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(feature.icon, { className: "mb-3 size-6 text-gold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-gradient", children: feature.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: feature.subtitle })
          ] }, feature.subtitle)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto w-full max-w-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-12 top-8 h-44 rounded-full bg-primary/20 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-6 right-8 h-32 w-32 rounded-full bg-gold/20 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass relative overflow-hidden rounded-[2rem] p-5 lg:p-7", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-[1.75rem] bg-white/80 p-4 shadow-[0_28px_60px_-40px_var(--color-primary)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: brandLogo, alt: `${BRAND_NAME} logo`, className: "w-full rounded-[1.4rem] object-cover" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] bg-background/80 px-5 py-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BrandLockup, { imageClassName: "size-12 rounded-[1.4rem]", titleClassName: "text-lg font-bold", subtitleClassName: "tracking-[0.2em]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-gradient-gold", children: "Signature Plum + Gold" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Elegant branding carried across every screen" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3", children: [{
        icon: TrendingUp,
        title: "Up to 48%",
        subtitle: "Income visibility"
      }, {
        icon: Users,
        title: "3 Levels",
        subtitle: "Referral support"
      }, {
        icon: ShieldCheck,
        title: "Always Clear",
        subtitle: "Dashboard-first tracking"
      }].map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(feature.icon, { className: "mb-3 size-6 text-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-gradient", children: feature.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: feature.subtitle })
      ] }, feature.subtitle)) })
    ] })
  ] });
}
export {
  Landing as component
};
