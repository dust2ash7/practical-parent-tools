import { Link } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const LINKS = [
  { to: "/wake-windows", label: "Wake windows" },
  { to: "/diaper-cost", label: "Diaper cost" },
  { to: "/ev-vs-hybrid", label: "EV vs hybrid" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="font-serif text-lg font-medium tracking-tight text-ink">
            Practical Parent Tools
          </Link>
          <ThemeToggle />
        </div>
        <nav aria-label="Tools" className="flex flex-wrap gap-x-5 gap-y-1">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{
                className:
                  "inline-flex min-h-11 items-center text-sm font-medium text-sage underline decoration-sage underline-offset-8",
              }}
              inactiveProps={{
                className: "inline-flex min-h-11 items-center text-sm text-muted",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("ppt-theme", next ? "dark" : "light");
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex min-h-11 items-center gap-2 rounded-control px-2 text-sm text-muted"
      aria-label={dark ? "Switch to light colors" : "Switch to dark colors"}
    >
      {dark ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
      <span>{dark ? "Light" : "Dark"}</span>
    </button>
  );
}
