export function money(value: number, digits = 0): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatMinutes(mins: number): string {
  const rounded = Math.max(0, Math.round(mins));
  const h = Math.floor(rounded / 60);
  const m = rounded % 60;
  if (h <= 0) return `${m} min`;
  if (m === 0) return h === 1 ? "1 hour" : `${h} hours`;
  return `${h} hr ${m} min`;
}

export function clock(mins: number): string {
  const m = ((Math.round(mins) % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const min = m % 60;
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 || 12;
  return `${h12}:${min.toString().padStart(2, "0")} ${suffix}`;
}

export function trimNumber(value: number, digits = 1): string {
  const n = Number(value.toFixed(digits));
  return Number.isInteger(n) ? String(n) : String(n);
}
