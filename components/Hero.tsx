export function Hero() {
  return (
    <div className="mx-auto max-w-5xl rounded-3xl border border-white/20 bg-gradient-to-br from-brand-500/50 via-slate-900 to-slate-950 px-8 py-12 shadow-2xl shadow-black/40">
      <p className="text-sm font-medium tracking-wide text-brand-100">دستیار استراتژیست اینستاگرام</p>
      <h1 className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl">
        نقشه راه حرفه‌ای برای رشد اینستاگرام برند شما
      </h1>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-200">
        فقط با چند ورودی ساده، استراتژی کامل محتوا، تقویم انتشار دو هفته‌ای، پیشنهاد کمپین و توصیه‌های رشد جامعه مخاطبان
        را به زبان فارسی دریافت کنید. بهینه‌سازی شده برای برندهای ایرانی با تمرکز بر افزایش تعامل و تبدیل.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 text-xs text-brand-50">
        <span className="rounded-full bg-white/10 px-4 py-2">تحلیل مخاطب و پیام برند</span>
        <span className="rounded-full bg-white/10 px-4 py-2">تقویم انتشار هوشمند</span>
        <span className="rounded-full bg-white/10 px-4 py-2">آماده‌سازی KPI و گزارش</span>
        <span className="rounded-full bg-white/10 px-4 py-2">پیشنهاد هشتگ هدفمند</span>
      </div>
    </div>
  );
}
