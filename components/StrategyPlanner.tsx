"use client";

import { useMemo, useState } from "react";
import { z } from "zod";
import { Section } from "./Section";
import {
  StrategyRecommendation,
  generateCalendar,
  generateStrategy,
  growthInsights,
  strategySchema,
  type CalendarEntry
} from "@/lib/strategy";

const defaultGoals = [
  { id: "brandAwareness", label: "آگاهی از برند", selected: true },
  { id: "leadGeneration", label: "لیدگیری", selected: false },
  { id: "sales", label: "افزایش فروش", selected: false },
  { id: "community", label: "ساخت جامعه وفادار", selected: false }
];

const availablePillars = ["آموزشی", "الهام‌بخش", "پشت صحنه", "اثبات اجتماعی", "راهبردی"];

type FormState = z.infer<typeof strategySchema>;
type Goal = FormState["goals"][number];

export function StrategyPlanner() {
  const [formState, setFormState] = useState<FormState>({
    brandName: "",
    industry: "",
    audience: "",
    tone: "حرفه‌ای",
    goals: defaultGoals,
    contentPillars: ["آموزشی", "الهام‌بخش"],
    strengths: "",
    weaknesses: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const result = useMemo<{
    strategy: StrategyRecommendation | null;
    calendar: CalendarEntry[];
    insights: string[];
  }>(() => {
    try {
      const parsed = strategySchema.parse(formState);
      const strategy = generateStrategy(parsed);
      const calendar = generateCalendar(parsed);
      const insights = growthInsights(parsed);

      return { strategy, calendar, insights };
    } catch {
      return { strategy: null, calendar: [], insights: [] };
    }
  }, [formState]);

  function updateField<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    setFormState((prev: FormState) => ({ ...prev, [key]: value }));
  }

  function toggleGoal(id: string) {
    setFormState((prev: FormState) => ({
      ...prev,
      goals: prev.goals.map((goal: Goal) => (goal.id === id ? { ...goal, selected: !goal.selected } : goal))
    }));
  }

  function togglePillar(pillar: string) {
    setFormState((prev: FormState) => {
      const exists = prev.contentPillars.includes(pillar);
      if (exists && prev.contentPillars.length === 1) return prev;
      return {
        ...prev,
        contentPillars: exists
          ? prev.contentPillars.filter((item: string) => item !== pillar)
          : [...prev.contentPillars, pillar]
      };
    });
  }

  function handleBlur() {
    try {
      strategySchema.parse(formState);
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formatted = err.flatten().fieldErrors;
        setErrors(
          Object.entries(formatted).reduce<Record<string, string>>((acc, [field, messages]) => {
            if (messages?.[0]) acc[field] = messages[0];
            return acc;
          }, {})
        );
      }
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
      <div className="space-y-6">
        <Section
          title="تنظیمات برند"
          description="پروفایل برند را وارد کنید تا دستیار بتواند پیام، مخاطب و فرصت‌های رشد شما را شخصی‌سازی کند."
          highlight
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-xs uppercase tracking-wide text-slate-200">
              نام برند
              <input
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-500/40"
                value={formState.brandName}
                onChange={(event) => updateField("brandName", event.target.value)}
                onBlur={handleBlur}
                placeholder="مثلاً: برند فلان"
              />
              {errors.brandName ? <span className="text-xs text-red-300">{errors.brandName}</span> : null}
            </label>
            <label className="flex flex-col gap-2 text-xs uppercase tracking-wide text-slate-200">
              حوزه فعالیت
              <input
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-500/40"
                value={formState.industry}
                onChange={(event) => updateField("industry", event.target.value)}
                onBlur={handleBlur}
                placeholder="مثلاً: پوشاک ورزشی"
              />
              {errors.industry ? <span className="text-xs text-red-300">{errors.industry}</span> : null}
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-xs uppercase tracking-wide text-slate-200">
              مخاطب هدف
              <input
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-500/40"
                value={formState.audience}
                onChange={(event) => updateField("audience", event.target.value)}
                onBlur={handleBlur}
                placeholder="مثلاً: زن‌های ۲۵ تا ۳۴ تهران با سبک زندگی سالم"
              />
              {errors.audience ? <span className="text-xs text-red-300">{errors.audience}</span> : null}
            </label>
            <label className="flex flex-col gap-2 text-xs uppercase tracking-wide text-slate-200">
              لحن ارتباطی
              <select
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-500/40"
                value={formState.tone}
                onChange={(event) => updateField("tone", event.target.value)}
              >
                <option value="حرفه‌ای">حرفه‌ای</option>
                <option value="صمیمی">صمیمی</option>
                <option value="رسمی">رسمی</option>
                <option value="الهام‌بخش">الهام‌بخش</option>
              </select>
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-xs uppercase tracking-wide text-slate-200">
              مزیت رقابتی
              <textarea
                className="min-h-[96px] rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-500/40"
                value={formState.strengths}
                onChange={(event) => updateField("strengths", event.target.value)}
                placeholder="چرا مشتری باید شما را انتخاب کند؟"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs uppercase tracking-wide text-slate-200">
              چالش یا نقطه ضعف
              <textarea
                className="min-h-[96px] rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-500/40"
                value={formState.weaknesses}
                onChange={(event) => updateField("weaknesses", event.target.value)}
                placeholder="چه چیزی نیاز به بهبود دارد؟"
              />
            </label>
          </div>
        </Section>

        <Section
          title="اهداف و ستون‌های محتوایی"
          description="چالش‌های کلیدی را مشخص کنید و محتوا را حول ستون‌های اصلی بچینید."
        >
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-300">اهداف اصلی</p>
            <div className="flex flex-wrap gap-3">
              {formState.goals.map((goal: Goal) => (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => toggleGoal(goal.id)}
                  className={`rounded-full px-4 py-2 text-xs transition-all ${
                    goal.selected
                      ? "bg-brand-500 text-white shadow shadow-brand-500/40"
                      : "bg-white/5 text-slate-200 hover:bg-white/10"
                  }`}
                >
                  {goal.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-300">ستون‌های محتوا</p>
            <div className="flex flex-wrap gap-3">
              {availablePillars.map((pillar) => {
                const selected = formState.contentPillars.includes(pillar);
                return (
                  <button
                    key={pillar}
                    type="button"
                    onClick={() => togglePillar(pillar)}
                    className={`rounded-full px-4 py-2 text-xs transition-all ${
                      selected
                        ? "bg-brand-300 text-slate-900 shadow shadow-brand-300/40"
                        : "bg-white/5 text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    {pillar}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-slate-400">
              حداقل دو ستون فعال نیاز است. ترکیب آموزش + اثبات اجتماعی برای افزایش اعتماد توصیه می‌شود.
            </p>
          </div>
        </Section>
      </div>

      <div className="space-y-6">
        {result.strategy ? (
          <>
            <Section
              title="موقعیت‌یابی و پیام کلیدی"
              description="استخراج پیام برنده برای ارتباط شفافی که مخاطب در اولین برخورد درک می‌کند."
              highlight
            >
              <p className="text-base font-medium text-white">{result.strategy.positioning}</p>
              <ul className="space-y-2 text-sm text-slate-200">
                {result.strategy.audienceInsights.map((insight: string) => (
                  <li key={insight} className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-slate-100">
                    {insight}
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl border border-brand-500/40 bg-brand-500/10 px-4 py-3 text-sm text-brand-50">
                <p className="font-semibold text-brand-100">راهنمای لحن</p>
                <p>{result.strategy.toneGuidelines}</p>
              </div>
            </Section>

            <Section
              title="ایده‌های محتوایی بر اساس ستون‌ها"
              description="برای هر ستون، سه زاویه محتوا پیشنهاد می‌شود که به سرعت قابل اجرا است."
            >
              <div className="space-y-4">
                {(Object.entries(result.strategy.pillarSuggestions) as Array<[string, string[]]>).map(
                  ([pillar, ideas]) => (
                    <div
                      key={pillar}
                      className="rounded-2xl border border-white/5 bg-slate-900/80 px-4 py-4 shadow-inner shadow-black/40"
                    >
                      <p className="text-sm font-semibold text-brand-100">{pillar}</p>
                      <ul className="mt-3 space-y-2 text-slate-200">
                        {ideas.map((idea: string) => (
                          <li key={`${pillar}-${idea}`} className="rounded-xl bg-white/5 px-3 py-2">
                            {idea}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>
            </Section>

            <Section
              title="تقویم انتشار ۱۴ روز آینده"
              description="برنامه پیشنهادی با ترکیب فرمت‌های متنوع، هوک و CTA برای هر روز."
            >
              <div className="h-[360px] overflow-y-auto pr-1">
                <table className="w-full border-separate border-spacing-y-3 text-left text-xs text-slate-100">
                  <thead className="sticky top-0 bg-slate-950/90 text-slate-300 backdrop-blur">
                    <tr>
                      <th className="rounded-l-xl px-3 py-2 font-semibold">تاریخ</th>
                      <th className="px-3 py-2 font-semibold">ستون</th>
                      <th className="px-3 py-2 font-semibold">تم</th>
                      <th className="px-3 py-2 font-semibold">هوک</th>
                      <th className="px-3 py-2 font-semibold">CTA</th>
                      <th className="rounded-r-xl px-3 py-2 font-semibold">هشتگ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.calendar.map((entry) => (
                      <tr key={`${entry.date}-${entry.pillar}-${entry.theme}`} className="bg-white/5 text-xs">
                        <td className="rounded-l-xl px-3 py-2 font-medium text-brand-100">
                          <div>{entry.date}</div>
                          <div className="text-[10px] text-slate-400">فرمت: {entry.format}</div>
                        </td>
                        <td className="px-3 py-2 text-slate-200">{entry.pillar}</td>
                        <td className="px-3 py-2 text-slate-200">{entry.theme}</td>
                        <td className="px-3 py-2 text-slate-300">{entry.hook}</td>
                        <td className="px-3 py-2 text-slate-300">{entry.cta}</td>
                        <td className="rounded-r-xl px-3 py-2 text-slate-400">
                          {entry.hashtags.join(" ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section
              title="پیشنهاد کمپین و رویداد"
              description="یک برنامه سریع برای تقویت تعامل، جذب لید یا فروش طراحی شده است."
            >
              <ul className="space-y-2 text-sm text-slate-200">
                {result.strategy.campaignIdeas.map((idea: string) => (
                  <li key={idea} className="rounded-xl border border-white/5 bg-white/5 px-4 py-3">
                    {idea}
                  </li>
                ))}
              </ul>
              <div className="space-y-2 rounded-2xl border border-brand-500/30 bg-brand-500/10 px-4 py-4">
                <p className="text-sm font-semibold text-brand-100">نقشه اهداف</p>
                {(Object.entries(result.strategy.goalsPlan) as Array<[string, string[]]>).map(([goalId, steps]) => (
                  <div key={goalId} className="rounded-xl bg-white/5 px-3 py-3 text-xs text-slate-200">
                    <p className="mb-2 font-medium text-brand-50">
                      {defaultGoals.find((goal) => goal.id === goalId)?.label ?? goalId}
                    </p>
                    <ul className="space-y-1">
                      {steps.map((step: string) => (
                        <li key={`${goalId}-${step}`} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            <Section
              title="دستورات رشد ادامه‌دار"
              description="کارهای تکرارپذیری که تیم شما باید به صورت هفتگی اجرا کند."
            >
              <ul className="space-y-2 text-sm text-slate-100">
                {result.insights.map((insight) => (
                  <li
                    key={insight}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-slate-900/80 px-4 py-3"
                  >
                    <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-brand-300" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </>
        ) : (
          <Section
            title="برای شروع اطلاعات برند را تکمیل کنید"
            description="بلافاصله بعد از تکمیل فرم، گزارش اختصاصی شما آماده می‌شود. مراقب باشید هیچ فیلد اصلی خالی نماند."
            highlight
          >
            <div className="rounded-2xl border border-white/5 bg-white/5 px-4 py-6 text-center text-sm text-slate-300">
              <p>قدم اول را با تعریف واضح مخاطب، مزیت و اهداف بردارید.</p>
              <p className="mt-2 text-brand-100">
                دستیار پس از دریافت داده‌ها، تقویم، سناریوهای محتوا و توصیه‌های رشد را نمایش می‌دهد.
              </p>
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}
