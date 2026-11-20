import { Link } from "@tanstack/react-router";

const ALL = [
  { to: "/wake-windows", label: "Wake windows", text: "Age-based sleep rhythm and a sample day." },
  { to: "/diaper-cost", label: "Diaper cost", text: "Size by weight, and what a month of boxes costs." },
  { to: "/ev-vs-hybrid", label: "EV vs hybrid", text: "Southern California fuel and electricity cost." },
] as const;

export function OtherTools({ current }: { current: (typeof ALL)[number]["to"] }) {
  const rest = ALL.filter((item) => item.to !== current);
  return (
    <nav aria-label="Other tools" className="mt-10">
      <h2 className="font-serif text-2xl font-medium tracking-tight">Also on this site</h2>
      <ul className="mt-3 divide-y divide-line border-y border-line">
        {rest.map((item) => (
          <li key={item.to}>
            <Link to={item.to} className="flex min-h-11 flex-col justify-center py-3">
              <span className="font-medium text-sage">{item.label}</span>
              <span className="text-sm text-muted">{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
