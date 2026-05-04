import { j as jsxRuntimeExports, r as reactExports } from "./_libs/react.mjs";
import { O as Outlet, e as useRouterState, L as Link } from "./_libs/tanstack__react-router.mjs";
import { B as BrandLockup } from "./_ssr/BrandLockup-yxNron_f.mjs";
import { c as cn } from "./_ssr/utils-H80jjgLf.mjs";
import { A as Avatar, a as AvatarFallback } from "./_ssr/avatar-BJDbbUeP.mjs";
import { B as Button } from "./_ssr/button-TjZkfKyC.mjs";
import { I as Input } from "./_ssr/input-C0QjszdI.mjs";
import { T as Toaster$1 } from "./_libs/sonner.mjs";
import { L as LayoutDashboard, a as Layers, T as TrendingUp, G as Gift, U as Users, W as Wallet, S as Settings, M as Menu, b as Search, c as Sun, d as Moon, B as Bell } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "./_ssr/router-BRGvJkPm.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/radix-ui__react-avatar.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "./_libs/use-sync-external-store.mjs";
import "./_libs/class-variance-authority.mjs";
const items$1 = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/plans", label: "Investment Plans", icon: Layers },
  { to: "/earnings", label: "Earning System", icon: TrendingUp },
  { to: "/rewards", label: "Rewards", icon: Gift },
  { to: "/referrals", label: "Referrals", icon: Users },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/settings", label: "Settings", icon: Settings }
];
function AppSidebar() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-4 lg:flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "mb-4 px-2 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      BrandLockup,
      {
        imageClassName: "size-12 rounded-[1.4rem]",
        titleClassName: "text-base font-bold text-sidebar-foreground",
        subtitleClassName: "tracking-[0.22em]"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col gap-1", children: items$1.map((item) => {
      const active = path === item.to;
      const Icon = item.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: item.to,
          className: cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
            active ? "gradient-primary text-primary-foreground glow" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4" }),
            item.label
          ]
        },
        item.to
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass mt-auto rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 text-xs text-muted-foreground", children: "Current Plan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-gradient-gold", children: "Plan 5 - Gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs text-muted-foreground", children: "Upgrade to unlock higher rewards." })
    ] })
  ] });
}
function TopBar() {
  const [dark, setDark] = reactExports.useState(false);
  reactExports.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 glass border-b border-border/50 px-4 py-3 lg:px-8 flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "size-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search plans, rewards, or circles...",
          className: "bg-input/70 pl-9 border-border/60"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: () => setDark((value) => !value),
          "aria-label": dark ? "Switch to light theme" : "Switch to dark theme",
          children: dark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "size-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "size-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "icon", className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "size-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2 size-2 rounded-full bg-gold" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pl-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "size-9 ring-2 ring-primary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "gradient-primary text-primary-foreground font-semibold", children: "AK" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold leading-tight", children: "Ali Khan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Level 5 - Gold" })
        ] })
      ] })
    ] })
  ] });
}
const items = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/plans", label: "Plans", icon: Layers },
  { to: "/rewards", label: "Rewards", icon: Gift },
  { to: "/referrals", label: "Refer", icon: Users },
  { to: "/wallet", label: "Wallet", icon: Wallet }
];
function MobileNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "lg:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-border/50 px-2 py-2 grid grid-cols-5", children: items.map((it) => {
    const Icon = it.icon;
    const active = path === it.to;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: it.to,
        className: cn(
          "flex flex-col items-center gap-1 py-1 rounded-lg text-[11px]",
          active ? "text-gold" : "text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5" }),
          it.label
        ]
      },
      it.to
    );
  }) });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function AppLayout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppSidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TopBar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-4 lg:p-8 pb-24 lg:pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, theme: "light", position: "top-right" })
  ] });
}
export {
  AppLayout as component
};
