import { useState, type CSSProperties } from "react";
import { Lock, Gift, Award, Check, ArrowRight, Sparkles, Zap, Shield, Heart, Star, Rocket } from "lucide-react";
import type { WaitlistConfig } from "@/lib/waitlist-types";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Lock, Gift, Award, Check, Sparkles, Zap, Shield, Heart, Star, Rocket,
};

export interface WaitlistPreviewProps {
  config: WaitlistConfig;
  onSubmit?: (email: string, name?: string) => Promise<boolean> | boolean;
  showBranding?: boolean;
  scale?: number; // for thumbnails
}

export function WaitlistPreview({ config, onSubmit, showBranding = true, scale }: WaitlistPreviewProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "err">("idle");

  const { theme } = config;
  const style: CSSProperties = {
    ["--pv-bg" as never]: theme.bg,
    ["--pv-fg" as never]: theme.fg,
    ["--pv-surface" as never]: theme.surface,
    ["--pv-accent" as never]: theme.accent,
    ["--pv-radius" as never]: theme.radius,
    backgroundColor: theme.bg,
    color: theme.fg,
    fontFamily: theme.font === "serif" ? "'Instrument Serif', Georgia, serif" : "Inter, system-ui, sans-serif",
  };
  if (scale) {
    style.transform = `scale(${scale})`;
    style.transformOrigin = "top left";
    style.width = `${100 / scale}%`;
    style.height = `${100 / scale}%`;
  }

  const surface = { backgroundColor: theme.surface, borderRadius: theme.radius };
  const accentBtn: CSSProperties = {
    backgroundColor: theme.accent,
    color: theme.bg,
    borderRadius: theme.radius,
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !onSubmit) {
      if (!onSubmit) { setState("done"); return; }
      return;
    }
    setState("loading");
    const ok = await onSubmit(email, name || undefined);
    setState(ok ? "done" : "err");
  }

  return (
    <div style={style} className="relative w-full min-h-full overflow-hidden">
      {theme.aurora && (
        <div className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(900px 480px at 50% -10%, color-mix(in oklab, ${theme.accent} 55%, transparent), transparent 70%),
                         radial-gradient(700px 380px at 50% 100%, color-mix(in oklab, ${theme.accent} 35%, transparent), transparent 70%)`,
          }} />
      )}
      {theme.grid && (
        <div className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              `linear-gradient(to right, color-mix(in oklab, ${theme.fg} 10%, transparent) 1px, transparent 1px),
               linear-gradient(to bottom, color-mix(in oklab, ${theme.fg} 10%, transparent) 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }} />
      )}

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8">
        {/* Nav */}
        <header className="flex items-center justify-between rounded-full px-5 py-3 border"
          style={{ borderColor: `color-mix(in oklab, ${theme.fg} 12%, transparent)`,
                   backgroundColor: `color-mix(in oklab, ${theme.surface} 70%, transparent)` }}>
          <div className="flex items-center gap-2 font-semibold text-lg">
            <span style={{ color: theme.accent }} className="text-xl">{config.logoEmoji}</span>
            {config.brandName}
          </div>
          <button className="text-sm font-medium px-4 py-1.5 rounded-full" style={accentBtn}>
            {config.ctaLabel}
          </button>
        </header>

        {/* Hero */}
        {config.sections.includes("hero") && (
          <section className="text-center pt-20 pb-16">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border"
              style={{ borderColor: `color-mix(in oklab, ${theme.fg} 20%, transparent)`,
                       color: `color-mix(in oklab, ${theme.fg} 75%, transparent)` }}>
              <Sparkles className="h-3 w-3" /> {config.badge}
            </span>
            <h1 className="mt-6 text-5xl md:text-7xl font-medium tracking-tight max-w-4xl mx-auto leading-[1.05]">
              {config.headline}
            </h1>
            <p className="mt-6 max-w-xl mx-auto text-base md:text-lg" style={{ color: `color-mix(in oklab, ${theme.fg} 70%, transparent)` }}>
              {config.subheadline}
            </p>

            {config.sections.includes("form") && (
              <form onSubmit={handleSubmit} className="mt-10 max-w-md mx-auto">
                {state === "done" ? (
                  <div className="p-5 text-center" style={{ ...surface }}>
                    <div className="mx-auto h-10 w-10 rounded-full flex items-center justify-center"
                         style={{ backgroundColor: theme.accent, color: theme.bg }}>
                      <Check className="h-5 w-5" />
                    </div>
                    <p className="mt-3 font-medium">You're on the list.</p>
                    <p className="text-sm" style={{ color: `color-mix(in oklab, ${theme.fg} 65%, transparent)` }}>
                      We'll be in touch the moment we launch.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-1.5 border"
                       style={{ ...surface, borderColor: `color-mix(in oklab, ${theme.fg} 14%, transparent)` }}>
                    <input
                      type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder={config.emailPlaceholder}
                      className="flex-1 bg-transparent px-4 py-2.5 outline-none text-sm placeholder:opacity-50"
                      style={{ color: theme.fg }}
                    />
                    <button type="submit" disabled={state === "loading"}
                      className="px-5 py-2.5 text-sm font-medium inline-flex items-center gap-1.5 disabled:opacity-60"
                      style={accentBtn}>
                      {state === "loading" ? "..." : config.ctaLabel}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </form>
            )}

            <div className="mt-6 flex items-center justify-center gap-3 text-xs"
                 style={{ color: `color-mix(in oklab, ${theme.fg} 60%, transparent)` }}>
              <div className="flex -space-x-2">
                {["#f472b6","#60a5fa","#fbbf24","#34d399"].map((c, i) => (
                  <div key={i} className="h-6 w-6 rounded-full border-2" style={{ backgroundColor: c, borderColor: theme.bg }} />
                ))}
              </div>
              {config.socialProof.replace("1,000+", config.signupCount.toLocaleString())}
            </div>
          </section>
        )}

        {/* Logos */}
        {config.sections.includes("logos") && config.logos.length > 0 && (
          <section className="py-10 border-y" style={{ borderColor: `color-mix(in oklab, ${theme.fg} 10%, transparent)` }}>
            <p className="text-center text-xs uppercase tracking-widest mb-6"
               style={{ color: `color-mix(in oklab, ${theme.fg} 50%, transparent)` }}>
              Backed by builders from
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
              {config.logos.map((l) => (
                <span key={l} className="text-lg font-semibold tracking-tight">{l}</span>
              ))}
            </div>
          </section>
        )}

        {/* Benefits */}
        {config.sections.includes("benefits") && (
          <section className="py-20">
            <div className="text-center mb-12">
              <span className="text-xs px-3 py-1 rounded-full border"
                    style={{ borderColor: `color-mix(in oklab, ${theme.fg} 20%, transparent)` }}>
                Early access benefits
              </span>
              <h2 className="mt-4 text-3xl md:text-5xl font-medium tracking-tight">
                Everything you need to get<br />started, on us.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {config.benefits.map((b, i) => {
                const I = ICONS[b.icon] ?? Sparkles;
                return (
                  <div key={i} className="p-6 border"
                       style={{ ...surface, borderColor: `color-mix(in oklab, ${theme.fg} 10%, transparent)` }}>
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center mb-4"
                         style={{ backgroundColor: `color-mix(in oklab, ${theme.accent} 18%, transparent)`, color: theme.accent }}>
                      <I className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-lg">{b.title}</h3>
                    <p className="mt-1.5 text-sm" style={{ color: `color-mix(in oklab, ${theme.fg} 65%, transparent)` }}>{b.body}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Testimonials */}
        {config.sections.includes("testimonials") && (
          <section className="py-20">
            <div className="text-center mb-12">
              <span className="text-xs px-3 py-1 rounded-full border"
                    style={{ borderColor: `color-mix(in oklab, ${theme.fg} 20%, transparent)` }}>
                Testimonials
              </span>
              <h2 className="mt-4 text-3xl md:text-5xl font-medium tracking-tight">Real founders. Real results.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {config.testimonials.map((t, i) => (
                <div key={i} className="p-6 border"
                     style={{ ...surface, borderColor: `color-mix(in oklab, ${theme.fg} 10%, transparent)` }}>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full" style={{ backgroundColor: `color-mix(in oklab, ${theme.accent} 30%, transparent)` }} />
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs" style={{ color: `color-mix(in oklab, ${theme.fg} 60%, transparent)` }}>{t.role}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: `color-mix(in oklab, ${theme.fg} 80%, transparent)` }}>
                    {t.quote}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {config.sections.includes("faq") && (
          <section className="py-20 max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs px-3 py-1 rounded-full border"
                    style={{ borderColor: `color-mix(in oklab, ${theme.fg} 20%, transparent)` }}>FAQ</span>
              <h2 className="mt-4 text-3xl md:text-5xl font-medium tracking-tight">We've addressed your queries.</h2>
            </div>
            <div className="space-y-3">
              {config.faq.map((f, i) => (
                <details key={i} className="group p-5 border cursor-pointer"
                  style={{ ...surface, borderColor: `color-mix(in oklab, ${theme.fg} 10%, transparent)` }}>
                  <summary className="flex items-center justify-between font-medium list-none">
                    {f.q}
                    <span className="transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                  </summary>
                  <p className="mt-3 text-sm" style={{ color: `color-mix(in oklab, ${theme.fg} 70%, transparent)` }}>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        {config.sections.includes("footer") && (
          <footer className="pt-16 pb-8 text-center text-xs" style={{ color: `color-mix(in oklab, ${theme.fg} 50%, transparent)` }}>
            © {new Date().getFullYear()} {config.brandName} — All rights reserved
            {showBranding && (
              <div className="mt-3">
                <a href="/" className="inline-flex items-center gap-1 opacity-70 hover:opacity-100">
                  Built with <span style={{ color: theme.accent }}>Waitly</span>
                </a>
              </div>
            )}
          </footer>
        )}
      </div>
    </div>
  );
}
