import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as createRouter, u as useRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts, O as Outlet, L as Link } from "../_libs/tanstack__react-router.mjs";
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
const BRAND_NAME = "Nexo Women Empowerment";
const BRAND_SHORT_NAME = "Nexo";
const BRAND_TAGLINE = "Women Empowerment";
const BRAND_DESCRIPTION = "A community-first platform designed to help women grow confidence, earnings, and impact together.";
function pageTitle(page) {
  return `${page} - ${BRAND_NAME}`;
}
const appCss = "/assets/styles-CUMmiSfZ.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
const Route$c = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: BRAND_NAME },
      { name: "description", content: BRAND_DESCRIPTION },
      { name: "author", content: BRAND_NAME },
      { property: "og:title", content: BRAND_NAME },
      { property: "og:description", content: BRAND_DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: BRAND_NAME }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
}
const $$splitComponentImporter$b = () => import("./signup-B9K8AHqx.mjs");
const Route$b = createFileRoute("/signup")({
  head: () => ({
    meta: [{
      title: pageTitle("Sign up")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./login-BCJhWyX4.mjs");
const Route$a = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: pageTitle("Login")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./forgot-password-B0nSM_eH.mjs");
const Route$9 = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [{
      title: pageTitle("Forgot password")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("../_app-C6ba5xN-.mjs");
const Route$8 = createFileRoute("/_app")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./index-Cecjpyuf.mjs");
const Route$7 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: BRAND_NAME
    }, {
      name: "description",
      content: BRAND_DESCRIPTION
    }, {
      property: "og:title",
      content: BRAND_NAME
    }, {
      property: "og:description",
      content: BRAND_DESCRIPTION
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./wallet-DfCyAARo.mjs");
const Route$6 = createFileRoute("/_app/wallet")({
  head: () => ({
    meta: [{
      title: pageTitle("Wallet")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./settings-CuowQELk.mjs");
const Route$5 = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [{
      title: pageTitle("Settings")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./rewards-iRNOtGhm.mjs");
const Route$4 = createFileRoute("/_app/rewards")({
  head: () => ({
    meta: [{
      title: pageTitle("Rewards")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./referrals-DDJdlpW5.mjs");
const Route$3 = createFileRoute("/_app/referrals")({
  head: () => ({
    meta: [{
      title: pageTitle("Referrals")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./plans-B5MVfn3f.mjs");
const Route$2 = createFileRoute("/_app/plans")({
  head: () => ({
    meta: [{
      title: pageTitle("Investment Plans")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./earnings-DFfW5sns.mjs");
const Route$1 = createFileRoute("/_app/earnings")({
  head: () => ({
    meta: [{
      title: pageTitle("Earning System")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./dashboard-DaxkE8Ww.mjs");
const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [{
      title: pageTitle("Dashboard")
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SignupRoute = Route$b.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$c
});
const LoginRoute = Route$a.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$c
});
const ForgotPasswordRoute = Route$9.update({
  id: "/forgot-password",
  path: "/forgot-password",
  getParentRoute: () => Route$c
});
const AppRoute = Route$8.update({
  id: "/_app",
  getParentRoute: () => Route$c
});
const IndexRoute = Route$7.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$c
});
const AppWalletRoute = Route$6.update({
  id: "/wallet",
  path: "/wallet",
  getParentRoute: () => AppRoute
});
const AppSettingsRoute = Route$5.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AppRoute
});
const AppRewardsRoute = Route$4.update({
  id: "/rewards",
  path: "/rewards",
  getParentRoute: () => AppRoute
});
const AppReferralsRoute = Route$3.update({
  id: "/referrals",
  path: "/referrals",
  getParentRoute: () => AppRoute
});
const AppPlansRoute = Route$2.update({
  id: "/plans",
  path: "/plans",
  getParentRoute: () => AppRoute
});
const AppEarningsRoute = Route$1.update({
  id: "/earnings",
  path: "/earnings",
  getParentRoute: () => AppRoute
});
const AppDashboardRoute = Route.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AppRoute
});
const AppRouteChildren = {
  AppDashboardRoute,
  AppEarningsRoute,
  AppPlansRoute,
  AppReferralsRoute,
  AppRewardsRoute,
  AppSettingsRoute,
  AppWalletRoute
};
const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AppRoute: AppRouteWithChildren,
  ForgotPasswordRoute,
  LoginRoute,
  SignupRoute
};
const routeTree = Route$c._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  BRAND_NAME as B,
  BRAND_SHORT_NAME as a,
  BRAND_TAGLINE as b,
  router as r
};
