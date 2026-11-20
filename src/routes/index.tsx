import { createFileRoute, Link } from "@tanstack/react-router";
import { Kicker, Lead, Page } from "@/components/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Practical Parent Tools — wake windows, diapers, EV vs hybrid" },
      {
        name: "description",
        content:
          "A quiet website with three calculators parents actually search for: a baby wake window calculator, a diaper size and monthly cost calculator, and an EV vs hybrid cost calculator for Southern California.",
      },
    ],
  }),
  component: Home,
});

const TOOLS = [
  {
    href: "/wake-windows",
    title: "Baby wake window calculator",
    text: "Age from newborn to 3 years, a morning wake-up time, and a plain sample day: wake windows, naps, bedtime range, and total sleep.",
  },
  {
    href: "/diaper-cost",
    title: "Diaper size and cost calculator",
    text: "Weight picks a size from Newborn through Size 6. Daily use and the price on the box turn into a monthly cost.",
  },
  {
    href: "/ev-vs-hybrid",
    title: "EV vs hybrid cost calculator",
    text: "Southern California defaults for electricity and gas, then a side-by-side of yearly energy cost and a simple break-even note.",
  },
] as const;

function Home() {
  return (
    <Page>
      <Kicker>Free, no account</Kicker>
      <h1 className="mt-2 font-serif text-4xl leading-tight font-medium tracking-tight sm:text-5xl">
        Practical Parent Tools
      </h1>
      <Lead>
        Three calculators for questions that show up at odd hours: how long a baby can stay awake, what
        diapers will cost this month, and whether an electric car costs less to run than a hybrid in
        Southern California.
      </Lead>
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {TOOLS.map((tool) => (
          <li key={tool.href}>
            <Link to={tool.href} className="block py-5">
              <h2 className="font-serif text-2xl font-medium tracking-tight">{tool.title}</h2>
              <p className="mt-2 max-w-2xl text-muted">{tool.text}</p>
              <span className="mt-3 inline-flex min-h-11 items-center font-medium text-sage">
                Open this page
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <section className="mt-8 max-w-2xl">
        <h2 className="font-serif text-2xl font-medium tracking-tight">How to use this site</h2>
        <p className="mt-3 text-muted">
          Each tool is its own page. Change a number and the result updates immediately. Nothing is
          saved on a server. Figures are estimates and general guidelines, not personal advice.
        </p>
      </section>
    </Page>
  );
}
