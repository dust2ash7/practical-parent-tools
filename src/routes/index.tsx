import { createFileRoute, Link } from "@tanstack/react-router";
import { Kicker, Lead, Page } from "@/components/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Parent Tools — baby wake windows, diaper cost, and sleep guides" },
      {
        name: "description",
        content:
          "Free parent tools: a baby wake window calculator, a diaper size and monthly cost calculator, sleep schedules by age, and how many diapers a month from newborn to age 3.",
      },
    ],
  }),
  component: Home,
});

const TOOLS = [
  {
    href: "/wake-windows",
    title: "Baby wake window calculator",
    text: "Age from newborn to 3 years and a morning wake-up time. You get a wake-window range, nap count, a sample day, a bedtime range, and total sleep.",
  },
  {
    href: "/diaper-cost",
    title: "Diaper size and monthly cost",
    text: "Weight picks a size from Newborn through Size 6. Diapers per day and the price on the box turn into a monthly cost, including leftover diapers in a whole box.",
  },
  {
    href: "/ev-vs-hybrid",
    title: "EV vs hybrid driving cost",
    text: "Southern California defaults for electricity and gas, then a side-by-side of yearly energy cost. Useful if a car is the other big household bill.",
  },
] as const;

const GUIDES = [
  {
    href: "/sleep-schedule",
    title: "Baby sleep schedule by age",
    text: "One table from the first weeks through age three: wake windows, naps, and how much sleep fits in a day.",
  },
  {
    href: "/diapers-by-age",
    title: "How many diapers per month by age",
    text: "Typical diapers per day and per month, plus the size families often buy, from newborn to age 3.",
  },
  {
    href: "/faq",
    title: "FAQ",
    text: "What a wake window is, why newborns do not get a clock schedule, and why the diaper receipt is higher than the monthly cost.",
  },
] as const;

function Home() {
  return (
    <Page>
      <Kicker>Free guides and calculators</Kicker>
      <h1 className="mt-2 font-serif text-4xl leading-tight font-medium tracking-tight sm:text-5xl">
        Parent Tools
      </h1>
      <Lead>
        A quiet set of pages for the searches that show up with a new baby: how long they can stay awake,
        what a month of diapers costs, and the age ranges behind both answers. Each tool is its own page.
        Change a number and the result updates immediately. Nothing is saved on a server.
      </Lead>

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-medium tracking-tight">Calculators</h2>
        <p className="mt-2 max-w-2xl text-muted">
          The two baby calculators are the ones most people open first. The driving page is there for the
          other monthly bill, with Southern California electricity and gas already filled in.
        </p>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {TOOLS.map((tool) => (
            <li key={tool.href}>
              <Link to={tool.href} className="block py-5">
                <h3 className="font-serif text-2xl font-medium tracking-tight">{tool.title}</h3>
                <p className="mt-2 max-w-2xl text-muted">{tool.text}</p>
                <span className="mt-3 inline-flex min-h-11 items-center font-medium text-sage">
                  Open this page
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-medium tracking-tight">Guides</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Longer pages if you want the table without moving a slider. The same ranges feed the calculators,
          so the numbers do not argue with each other.
        </p>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {GUIDES.map((guide) => (
            <li key={guide.href}>
              <Link to={guide.href} className="block py-5">
                <h3 className="font-serif text-2xl font-medium tracking-tight">{guide.title}</h3>
                <p className="mt-2 max-w-2xl text-muted">{guide.text}</p>
                <span className="mt-3 inline-flex min-h-11 items-center font-medium text-sage">
                  Read the guide
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 max-w-2xl space-y-4 text-muted">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-ink">What these pages will not do</h2>
        <p>
          They will not tell you your baby is behind, and they will not pick a car. Wake windows are general
          age-based guidelines. Follow sleepy cues, and ask your pediatrician if sleep, feeding, or weight
          gain worries you. Diaper sizes differ by brand. Energy cost depends on when you charge and the
          price at the pump.
        </p>
        <p>
          Start with the{" "}
          <Link to="/wake-windows" className="font-medium text-sage underline underline-offset-4">
            wake window calculator
          </Link>{" "}
          if nights are the question, or the{" "}
          <Link to="/diaper-cost" className="font-medium text-sage underline underline-offset-4">
            diaper cost calculator
          </Link>{" "}
          if you are staring at a box in a cart.
        </p>
      </section>
    </Page>
  );
}
