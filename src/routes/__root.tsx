import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteFooter } from "../components/SiteFooter";
import { supabase } from "@/integrations/supabase/client";
import { checkAdminSession } from "@/lib/admin-gate.functions";

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

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AI Business Systems Training for South African Community Businesses | kasiAIhub" },
      { name: "description", content: "Helping community businesses build real systems with AI. In a practical 3-day programme, leave with working websites, marketing assistants, and business workflows — not notes." },
      { name: "author", content: "kasiAIhub" },
      { property: "og:site_name", content: "kasiAIhub" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "AI Business Systems Training for South African Community Businesses | kasiAIhub" },
      { name: "twitter:title", content: "AI Business Systems Training for South African Community Businesses | kasiAIhub" },
      { property: "og:description", content: "Helping community businesses build real systems with AI. In a practical 3-day programme, leave with working websites, marketing assistants, and business workflows — not notes." },
      { name: "twitter:description", content: "Helping community businesses build real systems with AI. In a practical 3-day programme, leave with working websites, marketing assistants, and business workflows — not notes." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/58e55d3a-6cb7-4337-9b76-dcaec7789952" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/58e55d3a-6cb7-4337-9b76-dcaec7789952" },
      { name: "google-site-verification", content: "f6XRVio5fShWyT0Yb-EXrf-UPMXG-3oNKgKM50qxsWE" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "kasiAIhub",
          description: "Helping Community Businesses Build Real Systems With AI",
          url: "/",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const isKasiMove = useRouterState({ select: (state) => state.location.pathname.replace(/\/$/, "") === "/kasi-move" });
  const checkAdmin = useServerFn(checkAdminSession);

  // Magic links whose redirect fell back to the site root still carry auth
  // tokens in the URL. Capture that before Supabase strips the hash so we can
  // send the user to their account instead of leaving them on the homepage.
  const landedFromEmailLink = useRef(false);
  if (typeof window !== "undefined" && !landedFromEmailLink.current) {
    const h = window.location.hash;
    const s = window.location.search;
    landedFromEmailLink.current =
      h.includes("access_token=") ||
      h.includes("type=magiclink") ||
      h.includes("type=signup") ||
      s.includes("token_hash=") ||
      s.includes("code=");
  }

  useEffect(() => {
    async function routeEmailLanding() {
      if (!landedFromEmailLink.current) return;
      landedFromEmailLink.current = false;
      const path = window.location.pathname;
      let isStaff = false;
      try {
        const result = await checkAdmin();
        isStaff = result.unlocked;
      } catch (error) {
        console.error("[auth] staff redirect check failed", error);
      }

      if (isStaff && path !== "/admin") {
        router.navigate({ to: "/admin", replace: true });
        return;
      }
      if (!isStaff && path !== "/account") {
        router.navigate({ to: "/account", replace: true });
      }
    }

    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "INITIAL_SESSION" && event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();

      if (event === "INITIAL_SESSION" || event === "SIGNED_IN") {
        void routeEmailLanding();
      }
    });
    return () => data.subscription.unsubscribe();
  }, [router, queryClient, checkAdmin]);

  // The SIGNED_IN event can fire before the listener above is attached, so also
  // check once on mount: signed in + arrived from an email link + parked on a
  // page that isn't the account view means we send them to /account.
  useEffect(() => {
    if (!landedFromEmailLink.current) return;
    let cancelled = false;
    supabase.auth.getUser().then(async ({ data }) => {
      if (cancelled || !data.user) return;
      landedFromEmailLink.current = false;
      const path = window.location.pathname;
      let isStaff = false;
      try {
        const result = await checkAdmin();
        isStaff = result.unlocked;
      } catch (error) {
        console.error("[auth] staff redirect check failed", error);
      }
      if (cancelled) return;
      if (isStaff && path !== "/admin") {
        router.navigate({ to: "/admin", replace: true });
        return;
      }
      if (!isStaff && path !== "/account") {
        router.navigate({ to: "/account", replace: true });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [router, checkAdmin]);




  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      {!isKasiMove && <SiteFooter />}
    </QueryClientProvider>
  );
}
