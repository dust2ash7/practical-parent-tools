export type RatePreset = {
  id: string;
  label: string;
  detail: string;
  rate: number;
};

export const RATE_PRESETS: RatePreset[] = [
  {
    id: "sdge-ev",
    label: "SDG&E overnight",
    detail: "EV-TOU-5 super off-peak is about 12–13¢",
    rate: 0.13,
  },
  {
    id: "sdge-avg",
    label: "SDG&E average",
    detail: "Residential average was about 45¢ in mid-2026",
    rate: 0.45,
  },
  {
    id: "sce",
    label: "SCE average",
    detail: "A typical Southern California Edison comparison, about 34¢",
    rate: 0.34,
  },
  {
    id: "peak",
    label: "SDG&E peak",
    detail: "4–9pm on EV-TOU-5 is often 50–80¢",
    rate: 0.71,
  },
];

export const SDGE_AVERAGE_RATE = 0.45;

export type DrivingInput = {
  miles: number;
  rate: number;
  gas: number;
  miPerKwh: number;
  mpg: number;
  years: number;
  maintPerYear: number;
  premium: number;
  includeLoss: boolean;
};

export type DrivingResult = {
  evKwh: number;
  evAnnual: number;
  gallons: number;
  hybridAnnual: number;
  energySavings: number;
  annualSavings: number;
  evPerMile: number;
  hybridPerMile: number;
  years: number;
  multiEv: number;
  multiHybrid: number;
  multiSavings: number;
  breakEvenYears: number | null;
  atSdgeAverage: number;
  cheaper: "ev" | "hybrid" | "tie";
};

export function compareDriving(input: DrivingInput): DrivingResult {
  const miles = clamp(input.miles, 0, 100000);
  const rate = clamp(input.rate, 0, 2);
  const gas = clamp(input.gas, 0, 20);
  const miPerKwh = clamp(input.miPerKwh, 0.5, 8);
  const mpg = clamp(input.mpg, 5, 120);
  const years = clamp(input.years, 1, 15);
  const wall = input.includeLoss ? miPerKwh * 0.9 : miPerKwh;
  const evKwh = miles / wall;
  const evAnnual = evKwh * rate;
  const gallons = miles / mpg;
  const hybridAnnual = gallons * gas;
  const energySavings = hybridAnnual - evAnnual;
  const annualSavings = energySavings + input.maintPerYear;
  const premium = Math.max(0, input.premium);
  let breakEvenYears: number | null = null;
  if (premium <= 0) breakEvenYears = 0;
  else if (annualSavings > 1) breakEvenYears = premium / annualSavings;
  const cheaper: DrivingResult["cheaper"] =
    Math.abs(annualSavings) < 5 ? "tie" : annualSavings > 0 ? "ev" : "hybrid";
  return {
    evKwh,
    evAnnual,
    gallons,
    hybridAnnual,
    energySavings,
    annualSavings,
    evPerMile: miles > 0 ? evAnnual / miles : 0,
    hybridPerMile: miles > 0 ? hybridAnnual / miles : 0,
    years,
    multiEv: evAnnual * years,
    multiHybrid: hybridAnnual * years,
    multiSavings: annualSavings * years,
    breakEvenYears,
    atSdgeAverage: evKwh * SDGE_AVERAGE_RATE,
    cheaper,
  };
}

function clamp(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}
