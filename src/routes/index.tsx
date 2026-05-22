import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, Check, Zap, Palette, BarChart3 } from "lucide-react";
import { WaitlistPreview } from "@/components/WaitlistPreview";
import { TEMPLATES } from "@/lib/waitlist-types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Waitly — Build stunning waitlist pages in minutes" },
      { name: "description", content: "One-time $12. Unlimited beautiful waitlist pages, live preview editor, and signup analytics. Built for indie founders." },
      { property: "og:title", content: "Waitly — Stunning waitlist pages, one-time $12" },
      { property: "og:description", content: "The waitlist builder that feels like a trillion-dollar product." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute inset-0 bg-aurora" />

      <header className="relative z-10 mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <span className="text-primary text-xl">✦</span> Waitly
        </div>
        <nav className="flex items-center gap-3">
          <Link to="/templates" className="text-sm text-muted-foreground hover:text-foreground px-3 py-1.5">Templates</Link>
          <Link to="/dashboard" className="text-sm font-medium px-4 py-1.5 rounded-full bg-foreground text-background hover:opacity-90">
            Open app
          </Link>
        </nav>
      </header>

      <section className="relative z-10 mx-auto max-w-5xl px-6 pt-20 pb-16 text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border border-border bg-surface/60">
          <Sparkles className="h-3 w-3 text-primary" /> One-time $12 · Lifetime
        </span>
        <h1 className="mt-6 font-display text-6xl md:text-8xl font-medium tracking-tight leading-[1.02] text-gradient">
          Your waitlist page.<br />Live in 30 seconds.
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-lg text-muted-foreground">
          The waitlist builder that feels like Linear designed it. Pick a template, edit live, publish a link your investors will screenshot.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-primary text-primary-foreground font-medium glow-ring hover:scale-[1.02] transition">
            Start building free <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/templates" className="px-5 py-3 rounded-full border border-border hover:bg-surface text-sm font-medium">
            Browse templates
          </Link>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-2xl border border-border overflow-hidden glow-ring bg-surface">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-surface-elevated/50">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            <span className="ml-3 text-xs text-muted-foreground">waitly.com/w/asta</span>
          </div>
          <div className="h-[640px] overflow-hidden">
            <WaitlistPreview config={TEMPLATES[0].config} showBranding={false} />
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24 grid md:grid-cols-3 gap-4">
        {[
          { i: Zap, t: "Live preview editor", b: "Edit on the left, see it on the right. Pixel-perfect, debounced, magical." },
          { i: Palette, t: "12+ premium templates", b: "Hand-crafted, fully editable. Swap colors, fonts, sections in a click." },
          { i: BarChart3, t: "Signups & analytics", b: "Collect emails, export CSV, track views and conversion out of the box." },
        ].map(({ i: I, t, b }) => (
          <div key={t} className="p-6 rounded-2xl border border-border bg-surface">
            <I className="h-5 w-5 text-primary" />
            <h3 className="mt-3 font-semibold">{t}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{b}</p>
          </div>
        ))}
      </section>

      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-32 text-center">
        <div className="p-10 rounded-2xl border border-border bg-surface glow-ring">
          <h2 className="font-display text-4xl md:text-5xl tracking-tight">One price. Lifetime.</h2>
          <div className="mt-4 flex items-baseline justify-center gap-1">
            <span className="text-6xl font-semibold">$12</span>
            <span className="text-muted-foreground">/ once</span>
          </div>
          <ul className="mt-6 space-y-2 text-sm text-left max-w-xs mx-auto">
            {["Unlimited waitlists","All 12+ templates","Remove Waitly branding","Pro analytics","CSV export"].map((f) => (
              <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> {f}</li>
            ))}
          </ul>
          <Link to="/dashboard" className="mt-8 inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium">
            Get started free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
