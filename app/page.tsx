import { Hero } from "@/components/Hero";
import { StrategyPlanner } from "@/components/StrategyPlanner";

export default function HomePage() {
  return (
    <main className="relative isolate overflow-hidden pb-24 pt-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(63,65,255,0.35),_transparent_50%)]" />
      <div className="absolute inset-x-0 top-0 -z-20 h-[480px] bg-gradient-to-b from-brand-900/60 via-slate-950 to-slate-950" />
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <Hero />
        <StrategyPlanner />
      </div>
    </main>
  );
}
