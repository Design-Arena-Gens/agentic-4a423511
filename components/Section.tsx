import { ReactNode } from "react";
import clsx from "clsx";

interface SectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  highlight?: boolean;
}

export function Section({ title, description, children, highlight }: SectionProps) {
  return (
    <section
      className={clsx(
        "rounded-3xl border border-white/10 px-6 py-8 shadow-lg shadow-black/30",
        highlight
          ? "bg-white/10 backdrop-blur"
          : "bg-slate-900/80 backdrop-blur-sm"
      )}
    >
      <div className="mb-6 space-y-3">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        {description ? (
          <p className="text-sm leading-relaxed text-slate-300">{description}</p>
        ) : null}
      </div>
      <div className="space-y-6 text-sm text-slate-200">{children}</div>
    </section>
  );
}
