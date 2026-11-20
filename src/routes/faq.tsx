import { createFileRoute, Link } from "@tanstack/react-router";
import { OtherTools } from "@/components/other-tools";
import { Kicker, Lead, Page } from "@/components/ui";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Parent Tools FAQ · wake windows, diapers, and driving cost" },
      {
        name: "description",
        content:
          "Answers to common questions about the baby wake window calculator, diaper size and monthly cost, sleep schedules by age, and the Southern California EV vs hybrid cost comparison.",
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <Page>
      <Kicker>FAQ</Kicker>
      <h1 className="mt-2 font-serif text-4xl leading-tight font-medium tracking-tight">
        Questions parents actually ask
      </h1>
      <Lead>
        Short answers for the calculators and guides on this site. Each tool page also has its own notes.
        Nothing here is medical advice, a utility quote, or a reason to ignore what your baby is doing
        today.
      </Lead>

      <section className="mt-10 max-w-2xl space-y-4 text-muted">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-ink">Sleep</h2>
        <h3 className="pt-2 font-serif text-xl font-medium tracking-tight text-ink">What is a wake window?</h3>
        <p>
          It is the time a baby is awake between one sleep and the next, including feeding and a diaper
          change. It is not the length of the whole day. Windows usually get longer with age, and the first
          one of the morning is usually the shortest. The{" "}
          <Link to="/wake-windows" className="font-medium text-sage underline underline-offset-4">
            wake window calculator
          </Link>{" "}
          turns an age and a morning wake-up time into a sample day.
        </p>
        <h3 className="pt-2 font-serif text-xl font-medium tracking-tight text-ink">
          Why is there no clock schedule for newborns?
        </h3>
        <p>
          In the first couple of months, sleep is still irregular and driven by hunger. A repeating wake
          window of about 45 to 90 minutes is more useful than a bedtime on the clock. The{" "}
          <Link to="/sleep-schedule" className="font-medium text-sage underline underline-offset-4">
            sleep schedule by age
          </Link>{" "}
          starts with that rhythm and shows when naps usually drop later.
        </p>
        <h3 className="pt-2 font-serif text-xl font-medium tracking-tight text-ink">
          How many naps are typical?
        </h3>
        <p>
          Roughly: as many as a newborn needs, often four around three to four months, three around four to
          six months, two from the second half of the first year, and one somewhere between 12 and 18
          months. Some children stop napping between two and three. Babies do not change on their birthday.
          If the last nap keeps pushing bedtime late, that nap is often the one ready to drop.
        </p>
        <h3 className="pt-2 font-serif text-xl font-medium tracking-tight text-ink">
          Should I wake my baby to stay on the timeline?
        </h3>
        <p>
          No. The sample day is a sketch. A baby who is clearly tired earlier, or happily awake a bit longer,
          is giving you better information than the chart. Do ask your pediatrician if sleep, breathing,
          feeding, or weight gain worries you.
        </p>
      </section>

      <section className="mt-10 max-w-2xl space-y-4 text-muted">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-ink">Diapers</h2>
        <h3 className="pt-2 font-serif text-xl font-medium tracking-tight text-ink">
          How many diapers does a newborn use in a month?
        </h3>
        <p>
          Often 8 to 12 a day, which is about 240 to 365 in a month of 30.4 days. The count usually falls
          after the first months. The{" "}
          <Link to="/diapers-by-age" className="font-medium text-sage underline underline-offset-4">
            diapers-by-age guide
          </Link>{" "}
          lists ranges through age three. Those are common reports, not a quota.
        </p>
        <h3 className="pt-2 font-serif text-xl font-medium tracking-tight text-ink">
          Does age or weight pick the size?
        </h3>
        <p>
          Weight. Age is only a cross-check. Brand charts overlap, so two sizes can both fit the same
          weight. If the diaper leaks or leaves deep red marks, try the next size even if the chart still
          lists the current one. The{" "}
          <Link to="/diaper-cost" className="font-medium text-sage underline underline-offset-4">
            diaper calculator
          </Link>{" "}
          uses the weight you enter, then prices a month from diapers per day and the box in your cart.
        </p>
        <h3 className="pt-2 font-serif text-xl font-medium tracking-tight text-ink">
          Why is the register total higher than the monthly cost?
        </h3>
        <p>
          Stores sell whole boxes. “Cost of what you use” is the diapers you expect to use times the price
          per diaper. Buying a box that spills into next month costs more this month and leaves leftovers.
          That leftover is inventory, unless you are about to size up and the leftovers will not fit.
        </p>
      </section>

      <section className="mt-10 max-w-2xl space-y-4 text-muted">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-ink">Driving cost</h2>
        <h3 className="pt-2 font-serif text-xl font-medium tracking-tight text-ink">
          Why does the EV calculator start with a low electricity rate?
        </h3>
        <p>
          The default is a Southern California overnight EV rate, about 13¢ per kWh, because that is when a
          lot of home charging actually happens. A San Diego residential average is much higher, closer to
          45¢. Charging from 4 to 9pm can erase the savings. The{" "}
          <Link to="/ev-vs-hybrid" className="font-medium text-sage underline underline-offset-4">
            EV vs hybrid page
          </Link>{" "}
          has buttons for those cases. Gas is prefilled near a recent San Diego price so the page is useful
          before you type. It is not a live pump price.
        </p>
        <h3 className="pt-2 font-serif text-xl font-medium tracking-tight text-ink">What is left out?</h3>
        <p>
          Insurance, registration, loan interest, tax credits, public fast charging, and what the car is
          worth when you sell it. Break-even, if you enter a price gap, is only that gap divided by the
          yearly operating difference. It is a sketch, not a purchase recommendation.
        </p>
      </section>

      <section className="mt-10 max-w-2xl space-y-4 text-muted">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-ink">This site</h2>
        <p>
          Parent Tools is a small set of free pages for questions that show up at odd hours. The numbers
          update in the browser as you move a slider. Nothing you type is saved on a server. Figures are
          estimates and general guidelines. Wake windows vary by baby. Diaper sizes vary by brand. Energy
          cost depends on your plan, when you charge, and the price at the pump.
        </p>
        <p>
          If a page here saved you a search, there is a{" "}
          <a
            className="font-medium text-sage underline underline-offset-4"
            href="https://buymeacoffee.com/ravenflock"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy Me a Coffee
          </a>{" "}
          link in the footer. It is optional.
        </p>
      </section>
      <OtherTools current="/faq" />
    </Page>
  );
}
