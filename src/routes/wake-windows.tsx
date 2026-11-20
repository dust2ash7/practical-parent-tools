import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { OtherTools } from "@/components/other-tools";
import { Faq, Guide, Kicker, Lead, Note, Page, Panel, RangeField, Stat } from "@/components/ui";
import { clock, formatMinutes } from "@/lib/format";
import {
  ageLabel,
  bandForWeeks,
  bedtimeNote,
  buildDay,
  monthsFromWeeks,
  pickSchedule,
  SLEEP_BANDS,
  weeksFromMonths,
} from "@/lib/sleep";

export const Route = createFileRoute("/wake-windows")({
  head: () => ({
    meta: [
      { title: "Baby wake window calculator · Parent Tools" },
      {
        name: "description",
        content:
          "Baby wake window calculator with naps, a sample bedtime, and total sleep by age from 0 to 36 months. General guidelines, not medical advice.",
      },
    ],
  }),
  component: WakeWindowsPage,
});

function WakeWindowsPage() {
  const [unit, setUnit] = useState<"weeks" | "months">("months");
  const [weeks, setWeeks] = useState(16);
  const [wake, setWake] = useState("07:00");
  const [choice, setChoice] = useState<string | null>(null);

  const band = bandForWeeks(weeks);
  const schedule = pickSchedule(band, weeks, choice);
  const plan = useMemo(() => (schedule ? buildDay(wake, schedule) : null), [schedule, wake]);
  const months = monthsFromWeeks(weeks);

  return (
    <Page>
      <Kicker>Sleep</Kicker>
      <h1 className="mt-2 font-serif text-4xl leading-tight font-medium tracking-tight">
        Baby wake window calculator
      </h1>
      <Lead>
        A wake window is the stretch of awake time between sleeps. Enter an age and a morning wake-up
        time for a suggested range, nap count, sample day, bedtime, and 24-hour sleep.
      </Lead>

      <Panel title="Your baby">
        <div className="flex flex-wrap gap-2">
          <Segment
            pressed={unit === "months"}
            onClick={() => setUnit("months")}
            label="Months"
          />
          <Segment pressed={unit === "weeks"} onClick={() => setUnit("weeks")} label="Weeks" />
        </div>
        <div className="mt-5">
          {unit === "months" ? (
            <RangeField
              label="Age"
              value={months}
              min={0}
              max={36}
              step={0.5}
              display={ageLabel(weeks)}
              onChange={(value) => {
                setWeeks(weeksFromMonths(value));
                setChoice(null);
              }}
            />
          ) : (
            <RangeField
              label="Age"
              value={weeks}
              min={0}
              max={156}
              step={1}
              display={ageLabel(weeks)}
              onChange={(value) => {
                setWeeks(value);
                setChoice(null);
              }}
            />
          )}
        </div>
        <div className="mt-5">
          <p className="text-sm font-medium">Typical morning wake-up</p>
          <WakeTime value={wake} onChange={setWake} />
        </div>
        {band.schedules.length > 1 ? (
          <div className="mt-5">
            <p className="text-sm font-medium">Nap pattern</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {band.schedules.map((item) => (
                <Segment
                  key={item.id}
                  pressed={(schedule?.id ?? "") === item.id}
                  onClick={() => setChoice(item.id)}
                  label={item.label}
                />
              ))}
            </div>
          </div>
        ) : null}
      </Panel>

      <Panel title={`Guideline for ${band.label}`}>
        <p className="text-muted">{band.guidance}</p>
        <div className="mt-4">
          <Stat label="Wake window" value={band.wakeLabel} detail="Shorter after the morning wake, longer before bed." />
          <Stat label="Naps" value={band.napsLabel} />
          <Stat label="Night sleep" value={band.nightLabel} />
          <Stat label="Total in 24 hours" value={band.totalLabel} detail="Night sleep plus naps." />
        </div>
        {plan ? (
          <div className="mt-6">
            <h3 className="font-medium">Sample day</h3>
            <p className="mt-1 text-sm text-muted">
              About {formatMinutes(plan.nightMinutes)} at night and {formatMinutes(plan.napMinutes)} of
              naps ({formatMinutes(plan.totalMinutes)} total) if the day goes like this.
            </p>
            <ol className="mt-4">
              {plan.items.map((item) => (
                <li key={`${item.kind}-${item.startMin}`} className="border-t border-line py-3">
                  <p className="text-sm tabular-nums text-muted">
                    {item.endMin != null
                      ? `${clock(item.startMin)} – ${clock(item.endMin)}`
                      : clock(item.startMin)}
                  </p>
                  <p className="font-medium">{item.label}</p>
                  {item.kind === "nap" && item.endMin != null ? (
                    <p className="text-sm text-muted">about {formatMinutes(item.endMin - item.startMin)}</p>
                  ) : null}
                </li>
              ))}
            </ol>
            {bedtimeNote(plan.bedtimeCenter) ? (
              <Note>{bedtimeNote(plan.bedtimeCenter)}</Note>
            ) : null}
          </div>
        ) : (
          <div className="mt-6">
            <h3 className="font-medium">What to watch for</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
              <li>Looks away, stares, or loses interest</li>
              <li>Slows down or gets suddenly fussy</li>
              <li>Yawns or rubs at their face</li>
              <li>Hard crying usually means the wake window already ran long</li>
            </ul>
          </div>
        )}
        <Note>
          These are general age-based guidelines, not medical advice. Follow your baby’s cues. Ask your
          pediatrician if sleep, feeding, or weight gain worries you.
        </Note>
      </Panel>

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-medium tracking-tight">Wake windows by age</h2>
        <p className="mt-2 text-sm text-muted">
          Total sleep sits near commonly published pediatric ranges. Wake windows themselves are parenting
          guidelines, not a medical standard.
        </p>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {SLEEP_BANDS.map((row) => (
            <li key={row.id} className={row.id === band.id ? "bg-nap px-2" : undefined}>
              <p className="pt-3 font-medium">{row.label}</p>
              <p className="text-sm text-muted">Awake {row.wakeLabel}</p>
              <p className="text-sm text-muted">{row.napsLabel}</p>
              <p className="pb-3 text-sm text-muted">{row.totalLabel}</p>
            </li>
          ))}
        </ul>
      </section>

      <Guide title="What a wake window is">
        <p>
          A wake window is the stretch of time a baby is awake between one sleep and the next. It includes
          feeding, a diaper change, and whatever play or holding fits in that stretch. It is not the length
          of the whole day, and it is not a promise that the baby will sleep the moment the clock runs out.
        </p>
        <p>
          Most babies can stay awake a little longer as they get older. The first window of the morning is
          usually the shortest. The last one, before bedtime, is usually the longest. Naps tend to shorten
          through the day: a longer morning nap, then a shorter one, then a brief late-day nap that only
          exists to bridge to bedtime. When that last nap starts pushing bedtime late, it is often a sign the
          baby is ready to drop it.
        </p>
        <h3>Newborns are the exception</h3>
        <p>
          In the first six weeks, and often through twelve, sleep is still tied to hunger. A clock schedule
          with the same naps every day is not realistic. The useful idea is a short awake stretch — about 45
          to 90 minutes — and then help with sleep when cues show up. Cues that usually mean “soon” are
          looking away, a slower body, a sudden fuss, a yawn, or rubbing at the face. Hard crying often means
          the window already ran too long.
        </p>
        <h3>How the naps usually drop</h3>
        <p>
          Around three to four months, many families can sketch a day. Four naps is common. By four to six
          months, three naps is the usual pattern. Between six and nine months, a lot of babies drop the
          third nap. Two naps then hold through most of the first year. The move from two naps to one can
          happen anywhere from about twelve to eighteen months. A one-nap day needs a much longer morning
          before the child is tired enough to sleep. Between two and three years, some children stop napping.
          When the nap goes, bedtime usually moves earlier so the night covers the sleep that used to happen
          after lunch.
        </p>
        <p>
          These ranges sit next to commonly published totals for how much young children sleep in 24 hours.
          The wake windows themselves are parenting guidelines, not a diagnosis and not a rule your baby has
          to meet. A baby who is happy, fed, and gaining weight can sit a little outside the band. One who
          is miserable at the end of every window is telling you the band is too long for them today.
        </p>
        <p>
          Do not wake a baby just to protect the sample timeline. Short naps are normal for a long time. Read
          the{" "}
          <Link to="/sleep-schedule">sleep schedule by age</Link> if you want the full table without the
          clock, and ask your pediatrician if sleep, breathing, feeding, or weight gain worries you.
        </p>
      </Guide>

      <section className="mt-8 max-w-2xl">
        <h2 className="font-serif text-2xl font-medium tracking-tight">How to use it</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted">
          <li>Set the age in weeks or months. Under about two months, weeks are the clearer unit.</li>
          <li>Set the time your baby usually starts the day.</li>
          <li>If two nap patterns are offered, pick the one you are actually on.</li>
          <li>Treat the timeline as a sample, then move the next nap earlier if sleepy cues show up.</li>
        </ol>
      </section>

      <Faq
        items={[
          {
            q: "What is a wake window?",
            a: "It is the time a baby is awake between one sleep and the next, including feeding and play. It is not the whole day.",
          },
          {
            q: "Why isn’t there a clock schedule for newborns?",
            a: "In the first couple of months, sleep is still irregular and driven by hunger. A repeating wake window is more useful than a bedtime on the clock.",
          },
          {
            q: "Should I wake my baby to stay on this timeline?",
            a: "No. This is a planning sketch. A baby who is clearly tired earlier, or happily awake a bit longer, is giving you better information than the chart.",
          },
        ]}
      />
      <OtherTools current="/wake-windows" />
    </Page>
  );
}

function WakeTime({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  const parsed = parseWake(value);
  const selectClass = "h-11 w-full rounded-control border border-line bg-bg px-2 text-base";
  return (
    <div className="mt-2 grid grid-cols-3 gap-2">
      <select
        aria-label="Hour"
        className={selectClass}
        value={parsed.hour12}
        onChange={(event) =>
          onChange(toHHMM(Number(event.target.value), parsed.minute, parsed.ampm))
        }
      >
        {HOURS.map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </select>
      <select
        aria-label="Minute"
        className={selectClass}
        value={parsed.minute}
        onChange={(event) =>
          onChange(toHHMM(parsed.hour12, Number(event.target.value), parsed.ampm))
        }
      >
        {MINUTES.map((minute) => (
          <option key={minute} value={minute}>
            {minute.toString().padStart(2, "0")}
          </option>
        ))}
      </select>
      <select
        aria-label="AM or PM"
        className={selectClass}
        value={parsed.ampm}
        onChange={(event) =>
          onChange(toHHMM(parsed.hour12, parsed.minute, event.target.value === "pm" ? "pm" : "am"))
        }
      >
        <option value="am">am</option>
        <option value="pm">pm</option>
      </select>
    </div>
  );
}

const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

function parseWake(value: string): { hour12: number; minute: number; ampm: "am" | "pm" } {
  const [hRaw, mRaw] = value.split(":");
  const h = Number(hRaw);
  const m = Number(mRaw);
  const hour = Number.isFinite(h) ? Math.min(23, Math.max(0, h)) : 7;
  const minute = Number.isFinite(m) ? MINUTES.reduce((best, item) => (Math.abs(item - m) < Math.abs(best - m) ? item : best)) : 0;
  const ampm = hour >= 12 ? "pm" : "am";
  return { hour12: hour % 12 || 12, minute, ampm };
}

function toHHMM(hour12: number, minute: number, ampm: "am" | "pm"): string {
  let hour = hour12 % 12;
  if (ampm === "pm") hour += 12;
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
}

function Segment({
  pressed,
  onClick,
  label,
}: {
  pressed: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center rounded-control border px-3 text-sm font-medium ${
        pressed ? "border-sage bg-sage text-sage-ink" : "border-line bg-bg text-ink"
      }`}
    >
      {label}
    </button>
  );
}
