import { createFileRoute, Link } from "@tanstack/react-router";
import { Kicker, Lead, Page } from "@/components/ui";
import { OtherTools } from "@/components/other-tools";
import { SLEEP_BANDS } from "@/lib/sleep";

export const Route = createFileRoute("/sleep-schedule")({
  head: () => ({
    meta: [
      { title: "Baby sleep schedule by age · Parent Tools" },
      {
        name: "description",
        content:
          "Baby sleep schedule by age from newborn to 3 years: typical wake windows, number of naps, night sleep, and total sleep in 24 hours. General guidelines, not medical advice.",
      },
    ],
  }),
  component: SleepSchedulePage,
});

function SleepSchedulePage() {
  return (
    <Page>
      <Kicker>Guide</Kicker>
      <h1 className="mt-2 font-serif text-4xl leading-tight font-medium tracking-tight">
        Baby sleep schedule by age
      </h1>
      <Lead>
        A plain table of how long babies usually stay awake, how many naps are common, and how much sleep
        fits in a day from the first weeks through age three. Use it to see the shape of a day. Use the{" "}
        <Link to="/wake-windows" className="font-medium text-sage underline underline-offset-4">
          wake window calculator
        </Link>{" "}
        if you want those ranges turned into a sample clock from your morning wake-up time.
      </Lead>

      <div className="mt-8 hidden sm:block">
        <table className="w-full border-t border-line text-left text-sm">
          <thead>
            <tr className="border-b border-line text-muted">
              <th className="py-3 pr-3 font-medium">Age</th>
              <th className="py-3 pr-3 font-medium">Wake window</th>
              <th className="py-3 pr-3 font-medium">Naps</th>
              <th className="py-3 font-medium">Total sleep</th>
            </tr>
          </thead>
          <tbody>
            {SLEEP_BANDS.map((row) => (
              <tr key={row.id}>
                <th className="border-b border-line py-3 pr-3 font-medium">{row.label}</th>
                <td className="border-b border-line py-3 pr-3">{row.wakeLabel}</td>
                <td className="border-b border-line py-3 pr-3">{row.napsLabel}</td>
                <td className="border-b border-line py-3">{row.totalLabel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-8 divide-y divide-line border-y border-line sm:hidden">
        {SLEEP_BANDS.map((row) => (
          <li key={row.id} className="py-3">
            <p className="font-medium">{row.label}</p>
            <p className="text-sm text-muted">Awake {row.wakeLabel}</p>
            <p className="text-sm text-muted">{row.napsLabel}</p>
            <p className="text-sm text-muted">{row.totalLabel}</p>
          </li>
        ))}
      </ul>

      <article className="mt-10 max-w-2xl space-y-4 text-muted">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-ink">How a day usually changes</h2>
        <p>
          Sleep in the first three years is mostly a story of longer awake stretches and fewer naps. Total
          sleep in 24 hours also comes down, but not as dramatically as the nap count. A newborn may sleep
          15 to 17 hours, broken into many pieces. A two-year-old may sleep 11 to 14 hours, with most of it
          at night and one nap after lunch.
        </p>
        <p>
          In the first six weeks, and often through twelve, a clock schedule is the wrong tool. Hunger still
          runs the day. The useful number is a short wake window, about 45 to 90 minutes, and then sleep when
          the baby shows it. Looking away, slowing down, a sudden fuss, a yawn, or rubbing at the face usually
          means the window is ending. Hard crying usually means it already ended.
        </p>
        <h3 className="pt-2 font-serif text-xl font-medium tracking-tight text-ink">From four naps to one</h3>
        <p>
          Around three to four months, many families can sketch a day. Four naps is common, and the first
          wake window of the morning is the shortest. By four to six months, three naps is the usual pattern.
          The last one is often a short bridge so bedtime does not land in the late afternoon.
        </p>
        <p>
          Between six and nine months, a lot of babies drop that third nap. If the last nap keeps pushing
          bedtime past about 8pm, two naps is worth trying. Two naps then hold for most of the rest of the
          first year. The morning window stays shorter than the one before bed.
        </p>
        <p>
          The move from two naps to one can happen anywhere from about 12 to 18 months. A one-nap day needs a
          much longer morning before the child is tired enough to sleep. Forcing the nap too early just moves
          the problem to a 4pm second nap and a late bedtime. Between two and three years, some children stop
          napping. When the nap goes, bedtime usually needs to move earlier so the night covers the sleep that
          used to happen after lunch.
        </p>
        <h3 className="pt-2 font-serif text-xl font-medium tracking-tight text-ink">What this table is not</h3>
        <p>
          Wake windows are parenting guidelines gathered from commonly used sleep ranges. They are not a
          medical standard, and a baby does not have to hit the middle of the band. Night sleep in the table’s
          older rows is often about 10 to 12 hours, with night feeds still normal for many younger babies.
          One child who is happy, fed, and gaining weight can sit a little outside the range. One who is
          miserable at the end of every window is telling you today’s window is too long.
        </p>
        <p>
          Do not wake a baby just to stay on a sample timeline. Short naps are normal for a long time. A
          schedule that only works if every nap is 90 minutes will frustrate you before it helps the baby.
          If sleep, breathing, feeding, or weight gain worries you, ask your pediatrician. This page is a
          planning sketch.
        </p>
        <p>
          The{" "}
          <Link to="/wake-windows" className="font-medium text-sage underline underline-offset-4">
            wake window calculator
          </Link>{" "}
          takes an age and a morning wake-up time and lays out one sample day, including a bedtime range.
          Where two nap patterns are common, you can switch between them.
        </p>
      </article>
      <OtherTools current="/sleep-schedule" />
    </Page>
  );
}
