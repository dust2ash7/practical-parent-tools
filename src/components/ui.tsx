import * as Slider from "@radix-ui/react-slider";
import type { ReactNode } from "react";

export function Page({ children }: { children: ReactNode }) {
  return <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:py-10">{children}</main>;
}

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="text-sm font-medium text-sage">{children}</p>;
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="mt-3 max-w-2xl text-muted">{children}</p>;
}

export function Panel({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <section className="mt-8 rounded-card border border-line bg-elev p-4">
      {title ? <h2 className="font-serif text-2xl font-medium tracking-tight">{title}</h2> : null}
      <div className={title ? "mt-4" : undefined}>{children}</div>
    </section>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      {hint ? <span className="mt-0.5 block text-sm text-faint">{hint}</span> : null}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

const controlClass =
  "h-11 w-full rounded-control border border-line bg-bg px-3 text-base text-ink tabular-nums";

export function NumberField({
  label,
  hint,
  value,
  min,
  max,
  step = 1,
  suffix,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <Field label={label} hint={hint}>
      <span className="flex items-center gap-2">
        <input
          className={controlClass}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(event) => onChange(readNumber(event.target.value, min, max))}
        />
        {suffix ? <span className="shrink-0 text-sm text-muted">{suffix}</span> : null}
      </span>
    </Field>
  );
}

export function RangeField({
  label,
  hint,
  value,
  min,
  max,
  step = 1,
  display,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  display: string;
  onChange: (value: number) => void;
}) {
  return (
    <Field label={label} hint={hint}>
      <span className="mb-1 flex items-baseline justify-between gap-3">
        <span className="font-serif text-2xl tabular-nums">{display}</span>
      </span>
      <Slider.Root
        className="relative flex h-11 touch-none items-center select-none"
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([next]) => onChange(next ?? min)}
        aria-label={label}
      >
        <Slider.Track className="relative h-1.5 grow rounded-full bg-subtle">
          <Slider.Range className="absolute h-full rounded-full bg-sage" />
        </Slider.Track>
        <Slider.Thumb className="block size-6 rounded-full border border-line bg-elev shadow-sm" />
      </Slider.Root>
    </Field>
  );
}

export function Stat({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="border-t border-line py-3">
      <div className="text-sm text-muted">{label}</div>
      <div className="mt-1 font-serif text-2xl leading-tight font-medium tabular-nums">{value}</div>
      {detail ? <p className="mt-1 text-sm text-muted">{detail}</p> : null}
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mt-8 border-t border-line">
      <h2 className="pt-8 font-serif text-2xl font-medium tracking-tight">Questions</h2>
      <div className="mt-2 divide-y divide-line border-b border-line">
        {items.map((item) => (
          <details key={item.q} className="group">
            <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 py-3 font-medium">
              {item.q}
              <span aria-hidden="true" className="plus text-xl leading-none text-faint">
                +
              </span>
            </summary>
            <p className="max-w-2xl pb-4 text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export function Guide({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="mt-10 max-w-2xl">
      <h2 className="font-serif text-2xl font-medium tracking-tight text-ink">{title}</h2>
      <div className="mt-4 space-y-4 text-muted [&_a]:font-medium [&_a]:text-sage [&_a]:underline [&_a]:underline-offset-4 [&_h3]:pt-2 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-medium [&_h3]:tracking-tight [&_h3]:text-ink">
        {children}
      </div>
    </article>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-sm text-muted">{children}</p>;
}

function readNumber(raw: string, min: number, max: number): number {
  if (raw.trim() === "") return min;
  const n = Number(raw);
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}
