import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { OtherTools } from "@/components/other-tools";
import { Faq, Field, Guide, Kicker, Lead, Note, NumberField, Page, Panel, RangeField } from "@/components/ui";
import { compareDriving, RATE_PRESETS, SDGE_AVERAGE_RATE } from "@/lib/driving";
import { money, trimNumber } from "@/lib/format";

export const Route = createFileRoute("/ev-vs-hybrid")({
  head: () => ({
    meta: [
      { title: "EV vs hybrid cost calculator for Southern California · Parent Tools" },
      {
        name: "description",
        content:
          "Compare EV and hybrid fuel cost in Southern California. Defaults use San Diego overnight EV electricity and a local gas price, with a simple break-even note.",
      },
    ],
  }),
  component: DrivingPage,
});

function DrivingPage() {
  const [miles, setMiles] = useState(12000);
  const [rate, setRate] = useState(0.13);
  const [gas, setGas] = useState(5.9);
  const [miPerKwh, setMiPerKwh] = useState(3.4);
  const [mpg, setMpg] = useState(48);
  const [years, setYears] = useState(5);
  const [maint, setMaint] = useState(250);
  const [premium, setPremium] = useState(0);
  const [includeLoss, setIncludeLoss] = useState(true);

  const result = useMemo(
    () =>
      compareDriving({
        miles,
        rate,
        gas,
        miPerKwh,
        mpg,
        years,
        maintPerYear: maint,
        premium,
        includeLoss,
      }),
    [miles, rate, gas, miPerKwh, mpg, years, maint, premium, includeLoss],
  );

  const activePreset = RATE_PRESETS.find((preset) => Math.abs(preset.rate - rate) < 0.001);

  return (
    <Page>
      <Kicker>Driving cost · Southern California</Kicker>
      <h1 className="mt-2 font-serif text-4xl leading-tight font-medium tracking-tight">
        EV vs hybrid cost calculator
      </h1>
      <Lead>
        Compare what you spend on electricity and gasoline. The starting numbers are San Diego area
        estimates for late 2026: overnight EV charging, not the 4–9pm peak, and a local pump price you
        should replace with today’s sign.
      </Lead>

      <Panel title="Your driving">
        <div className="grid gap-5">
          <RangeField
            label="Miles driven per year"
            value={miles}
            min={3000}
            max={25000}
            step={500}
            display={miles.toLocaleString("en-US")}
            onChange={setMiles}
          />
          <Field
            label="Electricity"
            hint={activePreset ? activePreset.detail : "Dollars per kilowatt-hour, for the hours you actually charge."}
          >
            <div className="flex flex-wrap gap-2">
              {RATE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  aria-pressed={activePreset?.id === preset.id}
                  onClick={() => setRate(preset.rate)}
                  className={`inline-flex min-h-11 items-center rounded-control border px-3 text-sm font-medium ${
                    activePreset?.id === preset.id
                      ? "border-sage bg-sage text-sage-ink"
                      : "border-line bg-bg text-ink"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <span className="mt-3 flex items-center gap-2">
              <input
                className="h-11 w-full rounded-control border border-line bg-bg px-3 text-base tabular-nums"
                type="number"
                inputMode="decimal"
                min={0}
                max={2}
                step={0.01}
                value={rate}
                onChange={(event) => setRate(clamp(Number(event.target.value), 0, 2))}
              />
              <span className="shrink-0 text-sm text-muted">$/kWh</span>
            </span>
          </Field>
          <NumberField
            label="Gasoline"
            hint="San Diego County regular was roughly $5.50–$6.20 a gallon in fall 2026."
            value={gas}
            min={2}
            max={12}
            step={0.01}
            suffix="$/gal"
            onChange={setGas}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <NumberField
              label="EV efficiency"
              hint="Miles per kWh on the dash."
              value={miPerKwh}
              min={2}
              max={5}
              step={0.1}
              suffix="mi/kWh"
              onChange={setMiPerKwh}
            />
            <NumberField
              label="Hybrid efficiency"
              value={mpg}
              min={25}
              max={70}
              step={1}
              suffix="mpg"
              onChange={setMpg}
            />
          </div>
          <label className="flex min-h-11 items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-1 size-4 accent-sage"
              checked={includeLoss}
              onChange={(event) => setIncludeLoss(event.target.checked)}
            />
            <span>
              Include about 10% lost while charging
              <span className="mt-0.5 block text-faint">
                Wall energy is a bit higher than the car’s mi/kWh reading.
              </span>
            </span>
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <NumberField label="Years of ownership" value={years} min={1} max={12} onChange={setYears} />
            <NumberField
              label="Yearly maintenance the EV saves"
              hint="Use 0 to compare energy only. $150–$400 is a common guess."
              value={maint}
              min={0}
              max={2000}
              step={25}
              suffix="$"
              onChange={setMaint}
            />
          </div>
          <NumberField
            label="EV costs this much more to buy"
            hint="Optional. Enter the sticker gap if you want a break-even year. Leave 0 to skip it."
            value={premium}
            min={0}
            max={80000}
            step={500}
            suffix="$"
            onChange={setPremium}
          />
        </div>
      </Panel>

      <section className="mt-8">
        <h2 className="font-serif text-2xl font-medium tracking-tight">Side by side</h2>
        <p className="mt-2 text-sm text-muted">{verdict(result.cheaper, result.annualSavings)}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <CostCard
            title="Electric vehicle"
            annual={result.evAnnual}
            perMile={result.evPerMile}
            detail={`${Math.round(result.evKwh).toLocaleString("en-US")} kWh a year`}
            lower={result.cheaper === "ev"}
          />
          <CostCard
            title="Hybrid"
            annual={result.hybridAnnual}
            perMile={result.hybridPerMile}
            detail={`${trimNumber(result.gallons, 0)} gallons a year`}
            lower={result.cheaper === "hybrid"}
          />
        </div>
        <dl className="mt-4 divide-y divide-line border-y border-line text-sm">
          <Row
            label={`Energy over ${result.years} ${result.years === 1 ? "year" : "years"}`}
            value={`${money(result.multiEv)} EV · ${money(result.multiHybrid)} hybrid`}
          />
          <Row
            label={`With maintenance, over ${result.years} ${result.years === 1 ? "year" : "years"}`}
            value={signed(result.multiSavings, "EV costs less", "hybrid costs less")}
          />
          <Row label="Break-even" value={breakEven(result.breakEvenYears, result.years, premium, result.annualSavings)} />
        </dl>
        {Math.abs(rate - SDGE_AVERAGE_RATE) > 0.02 ? (
          <Note>
            At the SDG&E residential average of about {money(SDGE_AVERAGE_RATE, 2)} per kWh, the same EV
            would spend about {money(result.atSdgeAverage)} a year on energy. When you charge matters as
            much as which car you buy.
          </Note>
        ) : null}
        <Note>
          Home charging only. Public fast charging is usually much more expensive. Insurance, registration,
          and resale are not in this comparison.
        </Note>
      </section>

      <Guide title="What this comparison includes">
        <p>
          This page compares the energy to drive the same miles in an electric car and a hybrid, using a
          home electricity rate and a gas price you can change. The defaults are Southern California on
          purpose: an overnight EV rate near 13¢ per kilowatt-hour, and regular gas near a recent San Diego
          price, so the page is useful before you type. Neither number is a live quote.
        </p>
        <p>
          When you charge matters as much as the car. San Diego’s overnight EV window is far cheaper than a
          typical residential average, and the 4 to 9pm window is expensive enough to flip the result. The
          preset buttons switch those cases without making you hunt for the rate on a bill. Southern
          California Edison is generally lower than SDG&E. If your plan is different, type the rate you
          actually pay while the car is plugged in.
        </p>
        <h3>What a year of driving is not</h3>
        <p>
          Miles per kilowatt-hour and miles per gallon should come from a window sticker or a trip computer,
          not the most optimistic lab number. The optional charging-loss toggle adds energy that never
          reaches the battery, which is normal for home charging. Public fast charging is usually much more
          expensive and is not in this math.
        </p>
        <p>
          Maintenance is a simple yearly gap you can edit. It is not a service schedule. If you enter how
          much more the EV costs to buy, break-even is that gap divided by the yearly operating difference.
          It ignores loan interest, tax credits, insurance, registration, and what each car is worth when
          you sell it. A result that says the EV is cheaper to run is not a reason to buy one, and a result
          that says the hybrid is cheaper is not a reason to avoid one. It is the fuel line of the budget,
          isolated so you can see it.
        </p>
        <p>
          The baby pages on this site — the{" "}
          <Link to="/wake-windows">wake window calculator</Link> and the{" "}
          <Link to="/diaper-cost">diaper cost calculator</Link> — are separate. Nothing you type here is
          saved.
        </p>
      </Guide>

      <section className="mt-8 max-w-2xl">
        <h2 className="font-serif text-2xl font-medium tracking-tight">How to use it</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted">
          <li>Pick the electricity rate that matches when you plug in. Overnight is the useful EV comparison.</li>
          <li>Replace the gas price with the number on a station you actually use.</li>
          <li>Use the window sticker or a trip computer for mi/kWh and mpg, not the best lab number.</li>
          <li>Add the purchase-price gap only if you are comparing two specific cars.</li>
        </ol>
      </section>

      <Faq
        items={[
          {
            q: "Why is the default electricity so much lower than my bill?",
            a: "San Diego Gas & Electric’s EV-TOU-5 plan is about 12–13¢ per kWh in the super off-peak window (overnight, and late morning on weekdays) and several times that from 4 to 9pm. The residential average is closer to 45¢. SCE is lower than SDG&E. The buttons switch among those cases.",
          },
          {
            q: "Where did the gas price come from?",
            a: "San Diego County regular gasoline was roughly $5.50 to $6.20 a gallon through fall 2026, depending on the week and the source. $5.90 is a midpoint so the page is useful before you type. It is not a live price.",
          },
          {
            q: "What does break-even mean here?",
            a: "If you enter how much more the EV costs to buy, break-even is that gap divided by the yearly operating savings. It ignores loan interest, tax credits, insurance, and what the cars are worth when you sell them.",
          },
        ]}
      />
      <OtherTools current="/ev-vs-hybrid" />
    </Page>
  );
}

function CostCard({
  title,
  annual,
  perMile,
  detail,
  lower,
}: {
  title: string;
  annual: number;
  perMile: number;
  detail: string;
  lower: boolean;
}) {
  return (
    <article className="rounded-card border border-line bg-elev p-4">
      <h3 className="font-medium">{title}</h3>
      <p className="mt-2 font-serif text-3xl font-medium tabular-nums">{money(annual)}</p>
      <p className="text-sm text-muted">per year in energy</p>
      <p className="mt-3 text-sm tabular-nums text-muted">
        {money(perMile, 3)} per mile · {detail}
      </p>
      {lower ? <p className="mt-3 text-sm font-medium text-sage">Lower energy cost</p> : null}
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-2 sm:gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium tabular-nums">{value}</dd>
    </div>
  );
}

function verdict(cheaper: "ev" | "hybrid" | "tie", savings: number): string {
  if (cheaper === "tie") return "Under these inputs, yearly cost is about the same.";
  if (cheaper === "ev") {
    return `The EV costs about ${money(Math.abs(savings))} less per year, including the maintenance figure.`;
  }
  return `The hybrid costs about ${money(Math.abs(savings))} less per year, including the maintenance figure.`;
}

function signed(amount: number, evLead: string, hybridLead: string): string {
  if (Math.abs(amount) < 5) return "About the same";
  if (amount > 0) return `${evLead} by ${money(amount)}`;
  return `${hybridLead} by ${money(Math.abs(amount))}`;
}

function breakEven(
  yearsToEven: number | null,
  ownership: number,
  premium: number,
  annualSavings: number,
): string {
  if (premium <= 0) {
    return annualSavings > 0
      ? "No purchase gap entered. On these running costs, the EV is ahead from the first year."
      : "No purchase gap entered. On these running costs, the hybrid is ahead.";
  }
  if (yearsToEven == null) {
    return "The EV does not catch up on running costs at this electricity rate.";
  }
  const yearsLabel = trimNumber(yearsToEven, 1);
  if (yearsToEven <= ownership) {
    return `About ${yearsLabel} years to earn back the $${premium.toLocaleString("en-US")} price gap, inside this ownership window.`;
  }
  return `About ${yearsLabel} years to earn back the price gap, which is longer than ${ownership} years of ownership.`;
}

function clamp(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}
