import { createFileRoute } from "@tanstack/react-router";
import { OtherTools } from "@/components/other-tools";
import { Faq, Kicker, Lead, Note, NumberField, Page, Panel, RangeField, Stat } from "@/components/ui";
import { DIAPER_SIZES, estimateDiapers } from "@/lib/diapers";
import { money } from "@/lib/format";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/diaper-cost")({
  head: () => ({
    meta: [
      { title: "Diaper size and monthly cost calculator · Practical Parent Tools" },
      {
        name: "description",
        content:
          "Diaper size by weight from Newborn through Size 6, plus a monthly diaper cost from how many you use and the price per box.",
      },
    ],
  }),
  component: DiaperPage,
});

function DiaperPage() {
  const [pounds, setPounds] = useState(12);
  const [ageMonths, setAgeMonths] = useState(2);
  const [perDay, setPerDay] = useState(8);
  const [cost, setCost] = useState(54);
  const [perBox, setPerBox] = useState(168);

  const plan = useMemo(
    () => estimateDiapers({ pounds, ageMonths, perDay, costPerBox: cost, perBox }),
    [pounds, ageMonths, perDay, cost, perBox],
  );

  const also =
    plan.also.length > 0 ? plan.also.map((size) => size.name).join(" and ") : null;

  return (
    <Page>
      <Kicker>Diapers</Kicker>
      <h1 className="mt-2 font-serif text-4xl leading-tight font-medium tracking-tight">
        Diaper size and monthly cost
      </h1>
      <Lead>
        Weight chooses a size. Diapers per day, the price of a box, and how many are in it turn into a
        monthly cost. Age is only a cross-check.
      </Lead>

      <Panel title="Your numbers">
        <div className="grid gap-5">
          <RangeField
            label="Baby’s weight"
            value={pounds}
            min={4}
            max={45}
            step={0.5}
            display={`${trim(pounds)} lb`}
            onChange={setPounds}
          />
          <RangeField
            label="Age"
            hint="Used only to compare with the usual size for that age."
            value={ageMonths}
            min={0}
            max={36}
            step={1}
            display={ageMonths < 1 ? "Under 1 month" : ageMonths === 1 ? "1 month" : `${ageMonths} months`}
            onChange={setAgeMonths}
          />
          <NumberField label="Diapers per day" value={perDay} min={1} max={20} onChange={setPerDay} />
          <NumberField
            label="Price per box"
            value={cost}
            min={1}
            max={120}
            step={1}
            suffix="$"
            onChange={setCost}
          />
          <NumberField
            label="Diapers in the box"
            value={perBox}
            min={1}
            max={400}
            onChange={setPerBox}
          />
        </div>
      </Panel>

      <Panel title="Estimate">
        <Stat
          label="Recommended size"
          value={plan.primary.name}
          detail={
            also
              ? `${plan.primary.range}. ${also} also overlaps this weight. If the diaper leaks or leaves deep red marks, try the next size.`
              : `${plan.primary.range}. If it leaks or leaves deep red marks, try the next size up.`
          }
        />
        <Stat
          label="Diapers this month"
          value={String(Math.round(plan.diapersMonth))}
          detail={`${trim(perDay)} a day × 30.4 days.`}
        />
        <Stat
          label="Boxes you’ll use"
          value={trim(Math.round(plan.boxesExact * 10) / 10)}
          detail={`Buying whole boxes means ${plan.boxesToBuy} ${
            plan.boxesToBuy === 1 ? "box" : "boxes"
          }${plan.leftover > 1 ? `, with about ${Math.round(plan.leftover)} diapers left over` : ""}.`}
        />
        <Stat
          label="Cost of what you use"
          value={money(plan.usedCost)}
          detail={`${money(plan.perDiaper, 2)} per diaper. Buying ${plan.boxesToBuy} full ${
            plan.boxesToBuy === 1 ? "box" : "boxes"
          } would be ${money(plan.buyCost)} at the register.`}
        />
        {plan.ageNote ? <Note>{plan.ageNote}</Note> : null}
        <Note>
          Charts differ by brand. Pampers, Huggies, and store brands are close, not identical. When in
          doubt, trust the weight printed on the box you are buying.
        </Note>
      </Panel>

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-medium tracking-tight">Size by weight</h2>
        <table className="mt-4 w-full border-t border-line text-left text-sm">
          <thead>
            <tr className="border-b border-line text-muted">
              <th className="py-3 pr-3 font-medium">Size</th>
              <th className="py-3 font-medium">Typical weight</th>
            </tr>
          </thead>
          <tbody>
            {DIAPER_SIZES.map((size) => (
              <tr key={size.id} className={size.id === plan.primary.id ? "bg-nap" : undefined}>
                <th className="border-b border-line py-3 pr-3 font-medium">{size.name}</th>
                <td className="border-b border-line py-3">{size.range}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-8 max-w-2xl">
        <h2 className="font-serif text-2xl font-medium tracking-tight">How to use it</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted">
          <li>Set the current weight. That drives the size.</li>
          <li>Count a typical day, not a sick day. Many babies land around 6–10 diapers; newborns often more.</li>
          <li>Use the price and count from the box in your cart, not a remembered sale.</li>
          <li>Read “cost of what you use” as the real monthly burn. The register total is higher when a box spills into next month.</li>
        </ol>
      </section>

      <Faq
        items={[
          {
            q: "Why do two sizes fit the same weight?",
            a: "Brand charts overlap on purpose. A baby at the top of a range is often more comfortable in the next size, especially overnight.",
          },
          {
            q: "Does age pick the size?",
            a: "No. Age is a rough check. A big two-month-old and a small two-month-old do not wear the same diaper.",
          },
          {
            q: "What month length is this using?",
            a: "30.4 days, so a year of these months adds up to about 365 days.",
          },
        ]}
      />
      <OtherTools current="/diaper-cost" />
    </Page>
  );
}

function trim(n: number): string {
  const rounded = Math.round(n * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}
