export type ScheduleOption = {
  id: string;
  label: string;
  windows: number[];
  naps: number[];
};

export type SleepBand = {
  id: string;
  minWeeks: number;
  maxWeeks: number;
  label: string;
  wakeLabel: string;
  wakeMin: number;
  wakeMax: number;
  napsLabel: string;
  totalLabel: string;
  nightLabel: string;
  guidance: string;
  schedules: ScheduleOption[];
  defaultSchedule: (weeks: number) => string;
};

export const SLEEP_BANDS: SleepBand[] = [
  {
    id: "0-6w",
    minWeeks: 0,
    maxWeeks: 6,
    label: "0–6 weeks",
    wakeLabel: "45–60 minutes",
    wakeMin: 45,
    wakeMax: 60,
    napsLabel: "As many as the baby needs, often 4–6 or more",
    totalLabel: "About 15–17 hours, sometimes closer to 18",
    nightLabel: "Broken into short stretches, with night feeds",
    guidance:
      "A clock schedule is not realistic yet. Offer sleep after a short wake window, or sooner if you see sleepy cues.",
    schedules: [],
    defaultSchedule: () => "",
  },
  {
    id: "6-12w",
    minWeeks: 6,
    maxWeeks: 13,
    label: "6–12 weeks",
    wakeLabel: "60–90 minutes",
    wakeMin: 60,
    wakeMax: 90,
    napsLabel: "Often 4–5",
    totalLabel: "About 14–17 hours",
    nightLabel: "Still broken up by feeds for most babies",
    guidance:
      "Days may start to feel more regular, but naps are still short and uneven. Watch the baby, not the minute.",
    schedules: [],
    defaultSchedule: () => "",
  },
  {
    id: "3-4m",
    minWeeks: 13,
    maxWeeks: 17,
    label: "3–4 months",
    wakeLabel: "1 hr 15 min–2 hours",
    wakeMin: 75,
    wakeMax: 120,
    napsLabel: "Usually 4, sometimes 3",
    totalLabel: "About 14–16 hours",
    nightLabel: "Often 10–12 hours, with 0–2 night feeds",
    guidance:
      "Wake windows usually grow longer toward evening. The first one of the day is the shortest.",
    schedules: [
      {
        id: "4",
        label: "4 naps",
        windows: [80, 95, 105, 115, 125],
        naps: [70, 60, 45, 30],
      },
    ],
    defaultSchedule: () => "4",
  },
  {
    id: "4-6m",
    minWeeks: 17,
    maxWeeks: 26,
    label: "4–6 months",
    wakeLabel: "1 hr 45 min–2 hr 45 min",
    wakeMin: 105,
    wakeMax: 165,
    napsLabel: "Usually 3",
    totalLabel: "About 13–15.5 hours",
    nightLabel: "Often 10–12 hours",
    guidance:
      "Many babies settle into three naps here. The last one is often a short bridge to bedtime.",
    schedules: [
      {
        id: "3",
        label: "3 naps",
        windows: [105, 125, 145, 165],
        naps: [80, 70, 35],
      },
    ],
    defaultSchedule: () => "3",
  },
  {
    id: "6-9m",
    minWeeks: 26,
    maxWeeks: 39,
    label: "6–9 months",
    wakeLabel: "2–3.5 hours",
    wakeMin: 120,
    wakeMax: 210,
    napsLabel: "2 or 3",
    totalLabel: "About 12.5–15 hours",
    nightLabel: "Often 10–12 hours",
    guidance:
      "This is the usual window for dropping the third nap. If the last nap pushes bedtime past 8pm, try two naps.",
    schedules: [
      {
        id: "3",
        label: "3 naps",
        windows: [120, 140, 155, 165],
        naps: [65, 60, 30],
      },
      {
        id: "2",
        label: "2 naps",
        windows: [165, 195, 210],
        naps: [80, 75],
      },
    ],
    defaultSchedule: (weeks) => (weeks < 32 ? "3" : "2"),
  },
  {
    id: "9-12m",
    minWeeks: 39,
    maxWeeks: 52,
    label: "9–12 months",
    wakeLabel: "3–3.5 hours",
    wakeMin: 180,
    wakeMax: 210,
    napsLabel: "Usually 2",
    totalLabel: "About 12.5–14.5 hours",
    nightLabel: "Often 10–12 hours",
    guidance:
      "Two naps is the common pattern. The morning wake window is shorter than the one before bed.",
    schedules: [
      {
        id: "2",
        label: "2 naps",
        windows: [180, 195, 210],
        naps: [70, 65],
      },
    ],
    defaultSchedule: () => "2",
  },
  {
    id: "12-15m",
    minWeeks: 52,
    maxWeeks: 65,
    label: "12–15 months",
    wakeLabel: "3–5.5 hours",
    wakeMin: 180,
    wakeMax: 330,
    napsLabel: "2, or moving to 1",
    totalLabel: "About 11–14 hours",
    nightLabel: "Often 10–12 hours",
    guidance:
      "Some children drop to one nap anywhere from 12 to 18 months. A one-nap day needs a longer morning wake window.",
    schedules: [
      {
        id: "2",
        label: "2 naps",
        windows: [180, 200, 220],
        naps: [70, 60],
      },
      {
        id: "1",
        label: "1 nap",
        windows: [300, 330],
        naps: [90],
      },
    ],
    defaultSchedule: (weeks) => (weeks < 60 ? "2" : "1"),
  },
  {
    id: "15-24m",
    minWeeks: 65,
    maxWeeks: 104,
    label: "15–24 months",
    wakeLabel: "5–6 hours",
    wakeMin: 300,
    wakeMax: 360,
    napsLabel: "Usually 1",
    totalLabel: "About 11–14 hours",
    nightLabel: "Often 10–12 hours",
    guidance:
      "One midday nap is typical. If the nap runs past mid-afternoon, bedtime often gets harder.",
    schedules: [
      {
        id: "1",
        label: "1 nap",
        windows: [300, 330],
        naps: [90],
      },
    ],
    defaultSchedule: () => "1",
  },
  {
    id: "2-3y",
    minWeeks: 104,
    maxWeeks: 157,
    label: "2–3 years",
    wakeLabel: "5–6 hours on nap days",
    wakeMin: 300,
    wakeMax: 360,
    napsLabel: "1 nap, or none",
    totalLabel: "About 11–14 hours",
    nightLabel: "Often 10–12 hours",
    guidance:
      "When the nap drops, bedtime usually moves earlier so the night can cover the lost daytime sleep.",
    schedules: [
      {
        id: "1",
        label: "1 nap",
        windows: [300, 360],
        naps: [75],
      },
      {
        id: "0",
        label: "No nap",
        windows: [12 * 60],
        naps: [],
      },
    ],
    defaultSchedule: () => "1",
  },
];

export type TimelineItem = {
  kind: "wake" | "nap" | "bed";
  label: string;
  startMin: number;
  endMin?: number;
};

export type DayPlan = {
  items: TimelineItem[];
  napMinutes: number;
  nightMinutes: number;
  totalMinutes: number;
  bedtimeCenter: number;
};

export function bandForWeeks(weeks: number): SleepBand {
  const w = clamp(weeks, 0, 156);
  return (
    SLEEP_BANDS.find((band) => w >= band.minWeeks && w < band.maxWeeks) ??
    SLEEP_BANDS[SLEEP_BANDS.length - 1]
  );
}

export function ageLabel(weeks: number): string {
  const w = clamp(weeks, 0, 156);
  const months = w / 4.345;
  if (w < 8) return w === 1 ? "1 week" : `${Math.round(w)} weeks`;
  if (months < 24) {
    const m = Math.round(months * 2) / 2;
    const monthText = m === 1 ? "1 month" : `${trim(m)} months`;
    return `${monthText} · ${Math.round(w)} weeks`;
  }
  const years = Math.floor(months / 12);
  const rem = Math.round(months - years * 12);
  if (rem <= 0) return years === 1 ? "1 year" : `${years} years`;
  return `${years} yr ${rem} mo`;
}

export function weeksFromMonths(months: number): number {
  return clamp(Math.round(months * 4.345), 0, 156);
}

export function monthsFromWeeks(weeks: number): number {
  return Math.round((clamp(weeks, 0, 156) / 4.345) * 2) / 2;
}

export function pickSchedule(band: SleepBand, weeks: number, choice: string | null): ScheduleOption | null {
  if (band.schedules.length === 0) return null;
  const wanted = choice && band.schedules.some((item) => item.id === choice)
    ? choice
    : band.defaultSchedule(weeks);
  return band.schedules.find((item) => item.id === wanted) ?? band.schedules[0];
}

export function buildDay(wakeHHMM: string, schedule: ScheduleOption): DayPlan {
  let t = parseTime(wakeHHMM);
  const wake = t;
  const items: TimelineItem[] = [
    { kind: "wake", label: "Morning wake", startMin: t },
  ];
  schedule.naps.forEach((dur, index) => {
    t += schedule.windows[index] ?? 0;
    const start = t;
    t += dur;
    items.push({
      kind: "nap",
      label: `Nap ${index + 1}`,
      startMin: start,
      endMin: t,
    });
  });
  const lastWindow = schedule.windows[schedule.windows.length - 1] ?? 0;
  t += lastWindow;
  items.push({
    kind: "bed",
    label: schedule.naps.length === 0 ? "Bedtime (no nap)" : "Likely bedtime",
    startMin: t - 20,
    endMin: t + 20,
  });
  const napMinutes = schedule.naps.reduce((sum, n) => sum + n, 0);
  const span = t - wake;
  const nightMinutes = (1440 - span + 1440) % 1440;
  return {
    items,
    napMinutes,
    nightMinutes,
    totalMinutes: nightMinutes + napMinutes,
    bedtimeCenter: t,
  };
}

export function bedtimeNote(centerMin: number): string | null {
  const m = ((Math.round(centerMin) % 1440) + 1440) % 1440;
  if (m >= 20 * 60 + 30) {
    return "This sample lands late. An earlier wake-up, or a shorter last nap, usually brings bedtime forward.";
  }
  if (m < 18 * 60) {
    return "This sample lands early. Many babies need a longer last wake window before they are ready for bed.";
  }
  return null;
}

function parseTime(value: string): number {
  const [hRaw, mRaw] = value.split(":");
  const h = Number(hRaw);
  const m = Number(mRaw);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return 7 * 60;
  return clamp(h, 0, 23) * 60 + clamp(m, 0, 59);
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function trim(n: number): string {
  return Number.isInteger(n) ? String(n) : String(n);
}
