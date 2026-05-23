import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, Check, Zap, Palette, BarChart3, Mail, Globe, Smartphone, Layers, Rocket, Star, Users, Lock, ChevronDown } from "lucide-react";
import { WaitlistPreview } from "@/components/WaitlistPreview";
import { TEMPLATES } from "@/lib/waitlist-types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Waitly — Stunning waitlist pages for indie founders ($12 lifetime)" },
      { name: "description", content: "Launch a beautiful waitlist in 60 seconds. 20+ premium templates, live editor, email collection, CSV export. One-time $12, lifetime access." },
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

      {/* NAV */}
      <header className="relative z-10 mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-lg"><span className="text-primary text-xl">✦</span> Waitly</div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#templates" className="hover:text-foreground">Templates</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/templates" className="text-sm text-muted-foreground hover:text-foreground px-3 py-1.5 hidden sm:block">Templates</Link>
          <Link to="/dashboard" className="text-sm font-medium px-4 py-1.5 rounded-full bg-foreground text-background hover:opacity-90">Open app</Link>
        </div>
      </header>

      {/* 1. HERO */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pt-16 pb-12 text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border border-border bg-surface/60">
          <Sparkles className="h-3 w-3 text-primary" /> Built for indie hackers · One-time $12 · Lifetime
        </span>
        <h1 className="mt-6 font-display text-6xl md:text-8xl font-medium tracking-tight leading-[1.02] text-gradient">
          Your waitlist page.<br />Live in 30 seconds.
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-lg text-muted-foreground">
          The waitlist builder that feels like Linear designed it. Pick a template, edit live, publish a link your investors will screenshot.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <Link to="/templates" className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-primary text-primary-foreground font-medium glow-ring hover:scale-[1.02] transition">
            Start building free <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/templates" className="px-5 py-3 rounded-full border border-border hover:bg-surface text-sm font-medium">Browse 20+ templates</Link>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <div className="flex -space-x-2">
            {["#f472b6","#60a5fa","#fbbf24","#34d399","#a78bfa"].map((c, i) => (
              <div key={i} className="h-6 w-6 rounded-full border-2 border-background" style={{ backgroundColor: c }} />
            ))}
          </div>
          1,200+ founders shipping with Waitly
        </div>
      </section>

      {/* 2. PRODUCT SHOT */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
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

      {/* 3. SOCIAL PROOF / LOGOS */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-20">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">Trusted by builders shipping at</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
          {["Vortex", "Quantum", "Synergy", "Echo", "Evolve", "Nexus", "Buildspace"].map((l) => (
            <span key={l} className="text-lg font-semibold tracking-tight">{l}</span>
          ))}
        </div>
      </section>

      {/* 4. FEATURES GRID */}
      <section id="features" className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="text-center mb-12">
          <span className="text-xs px-3 py-1 rounded-full border border-border bg-surface/60">Features</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight">Everything you need to launch.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { i: Zap, t: "Live preview editor", b: "Edit on the left, see it on the right. Pixel-perfect, debounced, magical." },
            { i: Palette, t: "20+ premium templates", b: "Indie hacker, SaaS, AI tool, newsletter — every category covered." },
            { i: Mail, t: "Email collection", b: "Built-in form captures emails. View subscribers per page in your dashboard." },
            { i: BarChart3, t: "Analytics built-in", b: "Track page views, signups, and conversion. Export to CSV in one click." },
            { i: Globe, t: "Custom share links", b: "Get a /w/your-brand URL the moment you publish. Share anywhere." },
            { i: Layers, t: "4 hero layouts", b: "Centered, split, minimal, or big-type. Switch with a single click." },
            { i: Smartphone, t: "Mobile-perfect", b: "Every template is responsive. Preview desktop and mobile side-by-side." },
            { i: Lock, t: "Logo upload", b: "Drop in your PNG or SVG. Or pick from hundreds of emoji marks." },
            { i: Rocket, t: "Publish instantly", b: "One toggle and your page is live. No DNS, no deploys, no waiting." },
          ].map(({ i: I, t, b }) => (
            <div key={t} className="p-6 rounded-2xl border border-border bg-surface">
              <I className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-semibold">{t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TEMPLATE GALLERY */}
      <section id="templates" className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <div className="text-center mb-12">
          <span className="text-xs px-3 py-1 rounded-full border border-border bg-surface/60">{TEMPLATES.length} templates</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight">A template for every launch.</h2>
          <p className="mt-3 text-muted-foreground">Indie hackers. SaaS. AI tools. Newsletters. Events. Drops.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEMPLATES.slice(0, 8).map((t) => (
            <Link key={t.id} to="/templates" className="group rounded-2xl border border-border bg-surface overflow-hidden hover:border-primary/40 transition">
              <div className="aspect-[4/3] overflow-hidden border-b border-border bg-background relative">
                <div className="absolute inset-0 pointer-events-none"><WaitlistPreview config={t.config} scale={0.28} showBranding={false} /></div>
              </div>
              <div className="p-3">
                <div className="text-sm font-semibold truncate">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.category}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/templates" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-border hover:bg-surface text-sm font-medium">
            See all {TEMPLATES.length} templates <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24">
        <div className="text-center mb-12">
          <span className="text-xs px-3 py-1 rounded-full border border-border bg-surface/60">How it works</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight">Three steps. Sixty seconds.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { n: "01", t: "Pick a template", b: "Browse 20+ designs hand-crafted for indie hackers and SaaS founders." },
            { n: "02", t: "Customize live", b: "Edit copy, colors, logo, sections — everything updates in real time." },
            { n: "03", t: "Publish & share", b: "Toggle live. Get a /w/your-brand URL. Start collecting emails." },
          ].map((s) => (
            <div key={s.n} className="p-6 rounded-2xl border border-border bg-surface">
              <div className="text-xs font-mono text-primary">{s.n}</div>
              <h3 className="mt-3 font-semibold text-lg">{s.t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. WHO IT'S FOR */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="text-center mb-12">
          <span className="text-xs px-3 py-1 rounded-full border border-border bg-surface/60">Who it's for</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight">Built for the builders.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { i: Rocket, t: "Indie hackers", b: "Launch your side project with a page that doesn't look like a side project." },
            { i: Users, t: "Solo founders", b: "Validate demand before you write a single line of code." },
            { i: Star, t: "New launches", b: "Pre-launch a Product Hunt drop, an iOS app, or your next big idea." },
          ].map((x) => (
            <div key={x.t} className="p-6 rounded-2xl border border-border bg-surface">
              <x.i className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-semibold text-lg">{x.t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{x.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="text-center mb-12">
          <span className="text-xs px-3 py-1 rounded-full border border-border bg-surface/60">Loved by founders</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight">"This is genuinely one of the best."</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { n: "Sarah Mitchell", r: "Founder, Taskflow", q: "Launched my waitlist in under an hour. Looked more professional than anything I could have built from scratch." },
            { n: "James Okafor", r: "Indie Maker", q: "I've bought a lot of templates. This is genuinely one of the best. The attention to detail is next level." },
            { n: "Tom Brecker", r: "Solo Founder, Sheetflow", q: "Most templates look like templates. This actually looks like a real product." },
            { n: "Lena Hoffmann", r: "Founder, Arcflow", q: "It's not just a template, it's a full launch strategy packed into one clean design." },
            { n: "Marc Diaz", r: "iOS Dev", q: "Got 400 signups in 48 hours after launching my Waitly page. Zero design skills required." },
            { n: "Priya Shah", r: "Building solo", q: "The live editor feels like Figma but for marketing pages. Genuinely magical." },
          ].map((t) => (
            <div key={t.n} className="p-6 rounded-2xl border border-border bg-surface">
              <p className="text-sm">"{t.q}"</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/30" />
                <div><div className="text-sm font-semibold">{t.n}</div><div className="text-xs text-muted-foreground">{t.r}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. STATS */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { v: "1,247", l: "Active founders" },
            { v: "20+", l: "Premium templates" },
            { v: "60s", l: "Avg launch time" },
            { v: "$12", l: "Lifetime price" },
          ].map((s) => (
            <div key={s.l} className="p-6 rounded-2xl border border-border bg-surface text-center">
              <div className="font-display text-4xl">{s.v}</div>
              <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. PRICING */}
      <section id="pricing" className="relative z-10 mx-auto max-w-3xl px-6 pb-24 text-center">
        <div className="p-10 rounded-2xl border border-border bg-surface glow-ring">
          <span className="text-xs px-3 py-1 rounded-full border border-border">Pricing</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight">One price. Lifetime.</h2>
          <div className="mt-4 flex items-baseline justify-center gap-1">
            <span className="text-6xl font-semibold">$12</span><span className="text-muted-foreground">/ once</span>
          </div>
          <ul className="mt-6 space-y-2 text-sm text-left max-w-xs mx-auto">
            {["Unlimited waitlists", "All 20+ templates", "Remove Waitly branding", "Email collection & CSV export", "Analytics & conversion tracking", "Logo upload & custom branding", "4 hero layout variants", "Lifetime updates"].map((f) => (
              <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> {f}</li>
            ))}
          </ul>
          <Link to="/dashboard" className="mt-8 inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium">
            Get started free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 11. FAQ */}
      <section id="faq" className="relative z-10 mx-auto max-w-3xl px-6 pb-24">
        <div className="text-center mb-10">
          <span className="text-xs px-3 py-1 rounded-full border border-border bg-surface/60">FAQ</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight">Questions, answered.</h2>
        </div>
        <div className="space-y-3">
          {[
            { q: "How is this different from Launchrock or Mailchimp?", a: "Launchrock shut down. Most others charge $20–60/month. Waitly is one-time $12 — and the design quality is in a different league." },
            { q: "Can I use my own domain?", a: "You get a beautiful /w/your-brand URL out of the box. Custom domains are on the roadmap." },
            { q: "Where are signups stored?", a: "Securely in your dashboard. Export them as CSV anytime — they're yours." },
            { q: "Can I edit everything?", a: "Yes — copy, colors, fonts, logo, sections, hero layout, even custom benefits and FAQ." },
            { q: "Is it really $12 forever?", a: "Yes. No subscription. No upsells. One payment, lifetime access, all future templates included." },
          ].map((f, i) => (
            <details key={i} className="group p-5 rounded-2xl border border-border bg-surface cursor-pointer">
              <summary className="flex items-center justify-between font-medium list-none">
                {f.q}<ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 12. FINAL CTA */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pb-32 text-center">
        <h2 className="font-display text-5xl md:text-7xl tracking-tight text-gradient">Ship your waitlist tonight.</h2>
        <p className="mt-4 text-muted-foreground max-w-lg mx-auto">Pick a template, customize live, publish a link your investors will screenshot.</p>
        <Link to="/templates" className="mt-8 inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium glow-ring">
          Start building free <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* FOOTER + huge watermark */}
      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm"><span className="text-primary text-lg">✦</span> Waitly · © {new Date().getFullYear()}</div>
          <div className="text-xs text-muted-foreground">Built for indie hackers with love.</div>
        </div>
        <div className="overflow-hidden">
          <div className="select-none font-display tracking-tight text-center opacity-[0.06] leading-none pointer-events-none" style={{ fontSize: "clamp(6rem, 22vw, 22rem)" }}>
            WAITLY
          </div>
        </div>
      </footer>
    </div>
  );
}
