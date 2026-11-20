export type DiaperSize = {
  id: string;
  name: string;
  minLb: number;
  maxLb: number | null;
  range: string;
};

export const DIAPER_SIZES: DiaperSize[] = [
  { id: "NB", name: "Newborn", minLb: 0, maxLb: 10, range: "Up to 10 lb" },
  { id: "1", name: "Size 1", minLb: 8, maxLb: 14, range: "8–14 lb" },
  { id: "2", name: "Size 2", minLb: 12, maxLb: 18, range: "12–18 lb" },
  { id: "3", name: "Size 3", minLb: 16, maxLb: 28, range: "16–28 lb" },
  { id: "4", name: "Size 4", minLb: 22, maxLb: 37, range: "22–37 lb" },
  { id: "5", name: "Size 5", minLb: 27, maxLb: 41, range: "27 lb and up" },
  { id: "6", name: "Size 6", minLb: 35, maxLb: null, range: "35 lb and up" },
];

export type DiaperPlan = {
  primary: DiaperSize;
  also: DiaperSize[];
  ageNote: string | null;
  diapersMonth: number;
  boxesExact: number;
  boxesToBuy: number;
  usedCost: number;
  buyCost: number;
  perDiaper: number;
  leftover: number;
};

const DAYS = 30.4;

export function estimateDiapers(input: {
  pounds: number;
  ageMonths: number;
  perDay: number;
  costPerBox: number;
  perBox: number;
}): DiaperPlan {
  const pounds = clamp(input.pounds, 4, 45);
  const matches = DIAPER_SIZES.filter((size) => fits(size, pounds));
  const pool = matches.length > 0 ? matches : [DIAPER_SIZES[DIAPER_SIZES.length - 1]];
  const primary = pool.slice().sort((a, b) => score(a, pounds) - score(b, pounds))[0];
  const also = pool.filter((size) => size.id !== primary.id);
  const diapersMonth = Math.max(0, input.perDay) * DAYS;
  const perBox = Math.max(0, input.perBox);
  const cost = Math.max(0, input.costPerBox);
  const boxesExact = perBox > 0 ? diapersMonth / perBox : 0;
  const boxesToBuy = perBox > 0 ? Math.ceil(boxesExact - 1e-9) : 0;
  const leftover = Math.max(0, boxesToBuy * perBox - diapersMonth);
  return {
    primary,
    also,
    ageNote: ageNote(input.ageMonths, primary),
    diapersMonth,
    boxesExact,
    boxesToBuy,
    usedCost: boxesExact * cost,
    buyCost: boxesToBuy * cost,
    perDiaper: perBox > 0 ? cost / perBox : 0,
    leftover,
  };
}

export const DIAPER_AGE_GUIDE = [
  { age: "0–4 weeks", perDay: "8–12", perMonth: "240–365", size: "Newborn" },
  { age: "1–3 months", perDay: "7–10", perMonth: "210–300", size: "Size 1" },
  { age: "3–6 months", perDay: "6–8", perMonth: "180–245", size: "Size 2" },
  { age: "6–12 months", perDay: "5–7", perMonth: "150–215", size: "Size 3, then 4" },
  { age: "12–18 months", perDay: "4–6", perMonth: "120–180", size: "Size 4 or 5" },
  { age: "18–24 months", perDay: "4–5", perMonth: "120–150", size: "Size 5" },
  { age: "2–3 years", perDay: "3–5", perMonth: "90–150", size: "Size 5 or 6" },
] as const;

export function typicalSizeForAge(months: number): string {
  if (months < 1) return "Newborn or Size 1";
  if (months < 3) return "Size 1";
  if (months < 5) return "Size 2";
  if (months < 9) return "Size 3";
  if (months < 18) return "Size 4";
  if (months < 30) return "Size 5";
  return "Size 6";
}

function fits(size: DiaperSize, pounds: number): boolean {
  if (pounds < size.minLb) return false;
  if (size.maxLb == null) return true;
  return pounds <= size.maxLb;
}

function score(size: DiaperSize, pounds: number): number {
  if (size.maxLb == null) return Math.abs(pounds - Math.max(size.minLb + 6, 40));
  const mid = (size.minLb + size.maxLb) / 2;
  return Math.abs(pounds - mid);
}

function ageNote(months: number, primary: DiaperSize): string | null {
  const typical = typicalSizeForAge(months);
  if (typical.includes(primary.name) || (primary.id === "NB" && typical.includes("Newborn"))) {
    return null;
  }
  return `Weight is the better guide. Babies around ${formatMonths(months)} are often in ${typical}, but a ${trimLb(primary)} fit follows the scale, not the birthday.`;
}

function formatMonths(months: number): string {
  const m = Math.round(months * 2) / 2;
  if (m < 1) return "under 1 month";
  return m === 1 ? "1 month" : `${m} months`;
}

function trimLb(size: DiaperSize): string {
  return size.name;
}

function clamp(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}
