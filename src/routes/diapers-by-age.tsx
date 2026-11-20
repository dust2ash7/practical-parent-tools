import { createFileRoute, Link } from "@tanstack/react-router";
import { OtherTools } from "@/components/other-tools";
import { Kicker, Lead, Page } from "@/components/ui";
import { DIAPER_AGE_GUIDE, DIAPER_SIZES } from "@/lib/diapers";

export const Route = createFileRoute("/diapers-by-age")({
  head: () => ({
    meta: [
      { title: "How many diapers per month by age · Parent Tools" },
      {
        name: "description",
        content:
          "How many diapers per month by age, from newborn through age 3, with typical diapers per day and the usual size. Estimates for planning, not a rule for your baby.",
      },
    ],
  }),
  component: DiapersByAgePage,
});

function DiapersByAgePage() {
  return (
    <Page>
      <Kicker>Guide</Kicker>
      <h1 className="mt-2 font-serif text-4xl leading-tight font-medium tracking-tight">
        How many diapers per month by age
      </h1>
      <Lead>
        Common daily counts, turned into a month of about 30.4 days, plus the size families often buy at
        that age. Weight still decides the size. If you know a real day and a real box price, the{" "}
        <Link to="/diaper-cost" className="font-medium text-sage underline underline-offset-4">
          diaper cost calculator
        </Link>{" "}
        is the better number.
      </Lead>

      <div className="mt-8 hidden sm:block">
        <table className="w-full border-t border-line text-left text-sm">
          <thead>
            <tr className="border-b border-line text-muted">
              <th className="py-3 pr-3 font-medium">Age</th>
              <th className="py-3 pr-3 font-medium">Per day</th>
              <th className="py-3 pr-3 font-medium">Per month</th>
              <th className="py-3 font-medium">Usual size</th>
            </tr>
          </thead>
          <tbody>
            {DIAPER_AGE_GUIDE.map((row) => (
              <tr key={row.age}>
                <th className="border-b border-line py-3 pr-3 font-medium">{row.age}</th>
                <td className="border-b border-line py-3 pr-3">{row.perDay}</td>
                <td className="border-b border-line py-3 pr-3">{row.perMonth}</td>
                <td className="border-b border-line py-3">{row.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-8 divide-y divide-line border-y border-line sm:hidden">
        {DIAPER_AGE_GUIDE.map((row) => (
          <li key={row.age} className="py-3">
            <p className="font-medium">{row.age}</p>
            <p className="text-sm text-muted">
              {row.perDay} a day · about {row.perMonth} a month
            </p>
            <p className="text-sm text-muted">Usual size: {row.size}</p>
          </li>
        ))}
      </ul>

      <article className="mt-10 max-w-2xl space-y-4 text-muted">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-ink">Why the count falls</h2>
        <p>
          Newborns are the expensive end. A change with every feed, including nights, often means 8 to 12
          diapers a day, and some days more. That is roughly 240 to 365 diapers in a month. By one to three
          months the day usually settles a little, often 7 to 10. From three to six months, 6 to 8 is a
          common calm-week range. After solids start, many babies need fewer changes, closer to 5 to 7 in
          the second half of the first year.
        </p>
        <p>
          After the first birthday the number often drifts toward 4 to 6 a day, then toward 4 or 5 in the
          second year. From two to three, 3 to 5 is typical until potty training actually sticks. A child in
          underwear most of the day will not match this chart. Neither will a family using cloth part of the
          time. Count disposable diapers you throw away, not changes you wash.
        </p>
        <h3 className="pt-2 font-serif text-xl font-medium tracking-tight text-ink">Size still follows weight</h3>
        <p>
          The “usual size” column is what many babies wear at that age, not what your baby should wear. A
          big two-month-old and a small two-month-old do not fit the same diaper. Brand charts overlap, so
          two sizes can both list the same weight. If a diaper leaks at the legs, feels tight, or leaves deep
          red marks, try the next size. If it gaps at the thighs and leaks while looking roomy, it may be too
          big. Overnight diapers are often cut roomier than daytime ones from the same brand.
        </p>
        <p>
          Pampers, Huggies, and store brands are close, not identical. Trust the weight printed on the box
          you are buying. Buying a giant box the week you are about to size up is the usual waste. A few
          leftover diapers from a box that lasts into next month are just inventory.
        </p>
        <h3 className="pt-2 font-serif text-xl font-medium tracking-tight text-ink">Turning a range into a budget</h3>
        <p>
          These monthly figures use the same 30.4-day month as the calculator, so twelve of them land near a
          365-day year. Pick the middle of the daily range if you have not counted a real day yet. Eight a
          day is about 243 diapers a month. At 32 cents a diaper, that is about $78. At 20 cents, about $49.
          The price per diaper is the box price divided by how many are in the box. A cheap-looking small box
          is often the expensive one.
        </p>
        <p>
          Sick days, travel, and a run of blowouts will not match a calm week. Use a typical day for the
          budget, and keep a spare box for the bad week. The{" "}
          <Link to="/diaper-cost" className="font-medium text-sage underline underline-offset-4">
            diaper size and cost calculator
          </Link>{" "}
          takes weight, diapers per day, and the price on your box, and splits “what you use” from “what you
          pay at the register.”
        </p>
        <p>
          These are planning ranges parents commonly report. They are not medical advice and not a rule for
          how often you must change a diaper. A baby who is wet or soiled needs a change whether or not the
          day has hit a quota.
        </p>
      </article>

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-medium tracking-tight">Size by weight</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Use this when you know the weight and do not care about the birthday.
        </p>
        <table className="mt-4 w-full border-t border-line text-left text-sm">
          <thead>
            <tr className="border-b border-line text-muted">
              <th className="py-3 pr-3 font-medium">Size</th>
              <th className="py-3 font-medium">Typical weight</th>
            </tr>
          </thead>
          <tbody>
            {DIAPER_SIZES.map((size) => (
              <tr key={size.id}>
                <th className="border-b border-line py-3 pr-3 font-medium">{size.name}</th>
                <td className="border-b border-line py-3">{size.range}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <OtherTools current="/diapers-by-age" />
    </Page>
  );
}
