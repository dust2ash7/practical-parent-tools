import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import appCss from "../styles.css?url";

const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("ppt-theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Practical Parent Tools" },
      {
        name: "description",
        content:
          "Free calculators for baby wake windows, diaper size and monthly cost, and EV versus hybrid driving cost in Southern California.",
      },
      { name: "theme-color", content: "#141A17" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}

function NotFound() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16">
      <h1 className="font-serif text-4xl font-medium tracking-tight">Page not found</h1>
      <p className="mt-3 text-muted">That address is not on this site.</p>
      <Link to="/" className="mt-6 inline-flex min-h-11 items-center font-medium text-sage">
        Back to the overview
      </Link>
    </main>
  );
}
