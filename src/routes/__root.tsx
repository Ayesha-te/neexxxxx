import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { BRAND_DESCRIPTION, BRAND_NAME } from "@/lib/brand";

import appCss from "../styles.css?url";

const PRE_HYDRATION_EXTENSION_CLEANUP_SCRIPT = String.raw`
  (() => {
    const attributeNames = new Set([
      "bis_register",
      "bis_skin_checked",
      "bis_use",
      "cz-shortcut-listen",
      "data-bis-config",
      "data-dynamic-id",
      "data-gr-ext-installed",
      "data-lt-installed",
      "data-new-gr-c-s-check-loaded",
    ]);

    const attributePrefixes = ["__processed_", "bis_"];
    const extensionProtocols = ["chrome-extension://", "moz-extension://", "safari-extension://"];

    const shouldRemove = (name) =>
      attributeNames.has(name) || attributePrefixes.some((prefix) => name.startsWith(prefix));

    const cleanAttributes = (element) => {
      if (!element) {
        return;
      }

      for (const attribute of Array.from(element.attributes)) {
        if (shouldRemove(attribute.name)) {
          element.removeAttribute(attribute.name);
        }
      }
    };

    const shouldRemoveNode = (element) => {
      if (!element) {
        return false;
      }

      const source = element.getAttribute("src") || element.getAttribute("href") || "";
      return (
        extensionProtocols.some((protocol) => source.startsWith(protocol)) ||
        element.hasAttribute("data-bis-config")
      );
    };

    const cleanElement = (element) => {
      if (!element) {
        return false;
      }

      if (shouldRemoveNode(element)) {
        element.remove();
        return true;
      }

      cleanAttributes(element);
      return false;
    };

    const cleanTree = (root) => {
      if (!(root instanceof Element)) {
        return;
      }

      if (cleanElement(root)) {
        return;
      }

      for (const element of root.querySelectorAll("*")) {
        cleanElement(element);
      }
    };

    cleanTree(document.documentElement);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes") {
          cleanElement(mutation.target);
          continue;
        }

        for (const node of mutation.addedNodes) {
          cleanTree(node);
        }
      }
    });

    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
    });

    window.addEventListener(
      "load",
      () => {
        observer.disconnect();
      },
      { once: true },
    );
  })();
`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
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
      { name: "twitter:title", content: BRAND_NAME },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: PRE_HYDRATION_EXTENSION_CLEANUP_SCRIPT }}
        />
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
