import { Link } from "@tanstack/react-router";

const LINKS = [
  { to: "/wake-windows", label: "Wake windows" },
  { to: "/diaper-cost", label: "Diaper cost" },
  { to: "/sleep-schedule", label: "Sleep by age" },
  { to: "/diapers-by-age", label: "Diapers by age" },
  { to: "/faq", label: "FAQ" },
  { to: "/ev-vs-hybrid", label: "EV vs hybrid" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-8 text-sm text-muted">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-1">
          {LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="inline-flex min-h-11 items-center">
              {link.label}
            </Link>
          ))}
        </nav>
        <p>
          These pages give estimates and general guidelines only. They are not medical advice, not a
          substitute for your pediatrician, and not a quote for a utility bill, an insurance policy, or a
          car. Wake windows are common parenting guidelines; babies vary. Diaper sizes differ by brand.
          Energy cost depends on your plan, when you charge, and the price at the pump.
        </p>
        <p>
          <a
            className="inline-flex min-h-11 items-center text-clay underline decoration-clay/40 underline-offset-4"
            href="https://buymeacoffee.com/ravenflock"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy me a coffee
          </a>
          <span className="text-faint"> if a 2 a.m. answer here saved you a search.</span>
        </p>
      </div>
    </footer>
  );
}
