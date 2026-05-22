import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ExternalLink, Copy, Check, Monitor, Smartphone, Trash2, Plus, GripVertical } from "lucide-react";
import { getWaitlist, updateWaitlist, updateConfig, deleteWaitlist, exportCsv } from "@/lib/waitlist-store";
import type { SectionType, Waitlist, WaitlistConfig } from "@/lib/waitlist-types";
import { WaitlistPreview } from "@/components/WaitlistPreview";
import { toast } from "sonner";

export const Route = createFileRoute("/builder/$id")({
  head: () => ({ meta: [{ title: "Editor — Waitly" }] }),
  component: Builder,
});

const PRESETS: { name: string; theme: Partial<WaitlistConfig["theme"]> }[] = [
  { name: "Violet Aurora", theme: { bg: "oklch(0.14 0.015 270)", fg: "oklch(0.98 0.005 270)", surface: "oklch(0.20 0.020 270)", accent: "oklch(0.72 0.22 295)", aurora: true, grid: true, font: "sans" } },
  { name: "Clean Light", theme: { bg: "oklch(0.98 0.005 90)", fg: "oklch(0.15 0.01 270)", surface: "oklch(1 0 0)", accent: "oklch(0.20 0.02 270)", aurora: false, grid: false, font: "serif" } },
  { name: "Mint Neon", theme: { bg: "oklch(0.13 0.02 180)", fg: "oklch(0.98 0.005 180)", surface: "oklch(0.20 0.02 180)", accent: "oklch(0.82 0.18 165)", aurora: true, grid: true, font: "sans" } },
  { name: "Sunset", theme: { bg: "oklch(0.15 0.03 30)", fg: "oklch(0.98 0.005 30)", surface: "oklch(0.22 0.04 30)", accent: "oklch(0.74 0.20 35)", aurora: true, grid: false, font: "sans" } },
  { name: "Noir & Gold", theme: { bg: "oklch(0.10 0 0)", fg: "oklch(0.98 0 0)", surface: "oklch(0.18 0 0)", accent: "oklch(0.80 0.14 85)", aurora: false, grid: true, font: "serif" } },
  { name: "Brutalist", theme: { bg: "oklch(0.99 0 0)", fg: "oklch(0.10 0 0)", surface: "oklch(0.96 0 0)", accent: "oklch(0.65 0.25 25)", aurora: false, grid: true, font: "sans" } },
];

const ALL_SECTIONS: SectionType[] = ["hero", "form", "logos", "benefits", "testimonials", "faq", "footer"];

function Builder() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const [w, setW] = useState<Waitlist | undefined>();
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const found = getWaitlist(id);
    if (!found) { nav({ to: "/dashboard" }); return; }
    setW(found);
  }, [id, nav]);

  // Debounced persistence
  useEffect(() => {
    if (!w) return;
    const t = setTimeout(() => updateConfig(w.id, w.config), 350);
    return () => clearTimeout(t);
  }, [w?.config, w?.id]);

  if (!w) return null;
  const config = w.config;
  const set = (c: WaitlistConfig) => setW({ ...w, config: c });

  const publishedUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/w/${w.slug}`;

  function togglePublish() {
    updateWaitlist(w!.id, { published: !w!.published });
    setW({ ...w!, published: !w!.published });
    toast.success(w!.published ? "Unpublished" : "Published!", { description: w!.published ? "Page is now hidden" : publishedUrl });
  }
  function copy() {
    navigator.clipboard.writeText(publishedUrl);
    setCopied(true); setTimeout(() => setCopied(false), 1500);
    toast.success("Link copied");
  }
  function downloadCsv() {
    const blob = new Blob([exportCsv(w!)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${w!.slug}-signups.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top bar */}
      <header className="h-14 border-b border-border flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /></Link>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-primary">✦</span>
            <input
              value={w.title}
              onChange={(e) => { updateWaitlist(w.id, { title: e.target.value }); setW({ ...w, title: e.target.value }); }}
              className="bg-transparent outline-none font-medium hover:bg-surface px-2 py-1 rounded -mx-2"
            />
            <span className="text-xs text-muted-foreground">· {w.signups.length} signups</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-full bg-surface border border-border">
            <button onClick={() => setDevice("desktop")} className={`p-1.5 rounded-full ${device === "desktop" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
              <Monitor className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => setDevice("mobile")} className={`p-1.5 rounded-full ${device === "mobile" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
              <Smartphone className="h-3.5 w-3.5" />
            </button>
          </div>
          <button onClick={copy} className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-surface inline-flex items-center gap-1.5">
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />} {w.slug}
          </button>
          <Link to="/w/$slug" params={{ slug: w.slug }} className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-surface inline-flex items-center gap-1.5">
            <ExternalLink className="h-3 w-3" /> Preview
          </Link>
          <button onClick={togglePublish}
            className={`text-xs px-4 py-1.5 rounded-full font-medium ${w.published ? "bg-surface border border-border" : "bg-primary text-primary-foreground"}`}>
            {w.published ? "Unpublish" : "Publish"}
          </button>
        </div>
      </header>

      <div className="flex-1 flex min-h-0">
        {/* Left: sections */}
        <aside className="w-60 border-r border-border bg-surface/40 p-3 overflow-y-auto shrink-0">
          <div className="text-xs uppercase tracking-wider text-muted-foreground px-2 py-2">Sections</div>
          {ALL_SECTIONS.map((s) => {
            const active = config.sections.includes(s);
            return (
              <button key={s}
                onClick={() => set({ ...config, sections: active ? config.sections.filter(x => x !== s) : [...config.sections, s] })}
                className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm capitalize ${active ? "bg-surface text-foreground" : "text-muted-foreground hover:bg-surface/60"}`}>
                <GripVertical className="h-3.5 w-3.5 opacity-40" />
                <span className="flex-1 text-left">{s}</span>
                <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-primary" : "bg-muted-foreground/30"}`} />
              </button>
            );
          })}
          <div className="mt-6 border-t border-border pt-4 px-2 space-y-2 text-xs">
            <button onClick={downloadCsv} className="w-full text-left text-muted-foreground hover:text-foreground">Export signups (CSV)</button>
            <button onClick={() => { if (confirm("Delete this waitlist?")) { deleteWaitlist(w.id); nav({ to: "/dashboard" }); } }}
                    className="w-full text-left text-destructive/80 hover:text-destructive inline-flex items-center gap-1">
              <Trash2 className="h-3 w-3" /> Delete waitlist
            </button>
          </div>
        </aside>

        {/* Center: live preview */}
        <main className="flex-1 overflow-auto bg-background/40 p-6">
          <div className={`mx-auto rounded-2xl border border-border overflow-hidden glow-ring ${device === "mobile" ? "max-w-sm" : "max-w-5xl"}`}
               style={{ minHeight: "calc(100vh - 8rem)" }}>
            <WaitlistPreview config={config} showBranding={!w.published} />
          </div>
        </main>

        {/* Right: settings */}
        <aside className="w-80 border-l border-border bg-surface/40 overflow-y-auto shrink-0">
          <Settings config={config} onChange={set} />
        </aside>
      </div>
    </div>
  );
}

function Settings({ config, onChange }: { config: WaitlistConfig; onChange: (c: WaitlistConfig) => void }) {
  const update = (patch: Partial<WaitlistConfig>) => onChange({ ...config, ...patch });
  const updateTheme = (patch: Partial<WaitlistConfig["theme"]>) => onChange({ ...config, theme: { ...config.theme, ...patch } });

  return (
    <div className="p-4 space-y-6">
      <Group title="Theme">
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((p) => (
            <button key={p.name} onClick={() => updateTheme(p.theme)}
              className="text-left p-2 rounded-lg border border-border hover:border-primary/50 text-xs">
              <div className="flex gap-1 mb-1.5">
                {[p.theme.bg, p.theme.surface, p.theme.accent].map((c, i) => (
                  <div key={i} className="h-4 w-4 rounded-full border border-border" style={{ backgroundColor: c }} />
                ))}
              </div>
              {p.name}
            </button>
          ))}
        </div>
        <Field label="Accent color">
          <input type="color" value={oklchToHexFallback(config.theme.accent)} onChange={(e) => updateTheme({ accent: e.target.value })} className="w-full h-9 rounded-lg bg-transparent" />
        </Field>
        <Field label="Background">
          <input type="color" value={oklchToHexFallback(config.theme.bg)} onChange={(e) => updateTheme({ bg: e.target.value })} className="w-full h-9 rounded-lg bg-transparent" />
        </Field>
        <Field label="Font">
          <select value={config.theme.font} onChange={(e) => updateTheme({ font: e.target.value as "sans" | "serif" })} className="input">
            <option value="sans">Inter (Sans)</option>
            <option value="serif">Instrument Serif</option>
          </select>
        </Field>
        <Field label="Corner radius">
          <input type="range" min={0} max={24} step={1} value={parseFloat(config.theme.radius) * 16}
            onChange={(e) => updateTheme({ radius: `${Number(e.target.value) / 16}rem` })} className="w-full" />
        </Field>
        <div className="flex items-center gap-3 text-xs">
          <label className="flex items-center gap-1.5"><input type="checkbox" checked={config.theme.aurora} onChange={(e) => updateTheme({ aurora: e.target.checked })} /> Aurora glow</label>
          <label className="flex items-center gap-1.5"><input type="checkbox" checked={config.theme.grid} onChange={(e) => updateTheme({ grid: e.target.checked })} /> Grid bg</label>
        </div>
      </Group>

      <Group title="Brand">
        <Field label="Brand name"><input className="input" value={config.brandName} onChange={(e) => update({ brandName: e.target.value })} /></Field>
        <Field label="Logo (emoji/char)"><input className="input" value={config.logoEmoji} onChange={(e) => update({ logoEmoji: e.target.value })} /></Field>
        <Field label="Badge"><input className="input" value={config.badge} onChange={(e) => update({ badge: e.target.value })} /></Field>
      </Group>

      <Group title="Hero">
        <Field label="Headline"><textarea className="input min-h-[70px]" value={config.headline} onChange={(e) => update({ headline: e.target.value })} /></Field>
        <Field label="Subheadline"><textarea className="input min-h-[70px]" value={config.subheadline} onChange={(e) => update({ subheadline: e.target.value })} /></Field>
        <Field label="CTA label"><input className="input" value={config.ctaLabel} onChange={(e) => update({ ctaLabel: e.target.value })} /></Field>
        <Field label="Email placeholder"><input className="input" value={config.emailPlaceholder} onChange={(e) => update({ emailPlaceholder: e.target.value })} /></Field>
        <Field label="Social proof text"><input className="input" value={config.socialProof} onChange={(e) => update({ socialProof: e.target.value })} /></Field>
      </Group>

      <Group title="Logos (social proof)">
        <ListEditor items={config.logos} onChange={(logos) => update({ logos })} placeholder="Company name" />
      </Group>

      <Group title="Benefits">
        {config.benefits.map((b, i) => (
          <div key={i} className="p-2 rounded-lg border border-border space-y-1.5">
            <div className="flex gap-1.5">
              <input className="input flex-1" value={b.icon} onChange={(e) => {
                const arr = [...config.benefits]; arr[i] = { ...b, icon: e.target.value }; update({ benefits: arr });
              }} placeholder="Icon (Lock, Gift, Award, Zap, Star...)" />
              <button onClick={() => update({ benefits: config.benefits.filter((_, x) => x !== i) })} className="text-destructive/70 px-2"><Trash2 className="h-3 w-3" /></button>
            </div>
            <input className="input" value={b.title} onChange={(e) => {
              const arr = [...config.benefits]; arr[i] = { ...b, title: e.target.value }; update({ benefits: arr });
            }} placeholder="Title" />
            <textarea className="input min-h-[50px]" value={b.body} onChange={(e) => {
              const arr = [...config.benefits]; arr[i] = { ...b, body: e.target.value }; update({ benefits: arr });
            }} placeholder="Description" />
          </div>
        ))}
        <button onClick={() => update({ benefits: [...config.benefits, { icon: "Star", title: "New benefit", body: "Description here." }] })}
                className="w-full text-xs py-2 rounded-lg border border-dashed border-border hover:border-primary/50 inline-flex items-center justify-center gap-1">
          <Plus className="h-3 w-3" /> Add benefit
        </button>
      </Group>

      <Group title="FAQ">
        {config.faq.map((f, i) => (
          <div key={i} className="p-2 rounded-lg border border-border space-y-1.5">
            <div className="flex gap-1.5">
              <input className="input flex-1" value={f.q} onChange={(e) => {
                const arr = [...config.faq]; arr[i] = { ...f, q: e.target.value }; update({ faq: arr });
              }} placeholder="Question" />
              <button onClick={() => update({ faq: config.faq.filter((_, x) => x !== i) })} className="text-destructive/70 px-2"><Trash2 className="h-3 w-3" /></button>
            </div>
            <textarea className="input min-h-[50px]" value={f.a} onChange={(e) => {
              const arr = [...config.faq]; arr[i] = { ...f, a: e.target.value }; update({ faq: arr });
            }} placeholder="Answer" />
          </div>
        ))}
        <button onClick={() => update({ faq: [...config.faq, { q: "New question?", a: "Answer." }] })}
                className="w-full text-xs py-2 rounded-lg border border-dashed border-border hover:border-primary/50 inline-flex items-center justify-center gap-1">
          <Plus className="h-3 w-3" /> Add question
        </button>
      </Group>

      <style>{`
        .input { width: 100%; padding: 0.5rem 0.625rem; font-size: 0.8125rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 0.5rem; color: var(--color-foreground); outline: none; }
        .input:focus { border-color: var(--color-primary); }
      `}</style>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 px-1">{title}</div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[11px] text-muted-foreground mb-1">{label}</div>
      {children}
    </label>
  );
}
function ListEditor({ items, onChange, placeholder }: { items: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  return (
    <div className="space-y-1.5">
      {items.map((v, i) => (
        <div key={i} className="flex gap-1.5">
          <input className="input flex-1" value={v} placeholder={placeholder}
                 onChange={(e) => { const arr = [...items]; arr[i] = e.target.value; onChange(arr); }} />
          <button onClick={() => onChange(items.filter((_, x) => x !== i))} className="text-destructive/70 px-2"><Trash2 className="h-3 w-3" /></button>
        </div>
      ))}
      <button onClick={() => onChange([...items, ""])} className="w-full text-xs py-1.5 rounded-lg border border-dashed border-border hover:border-primary/50 inline-flex items-center justify-center gap-1">
        <Plus className="h-3 w-3" /> Add
      </button>
    </div>
  );
}

// Tolerate either hex or oklch in the color inputs (color picker returns hex; we accept either)
function oklchToHexFallback(c: string): string {
  if (c.startsWith("#")) return c;
  // crude fallback hex so the <input type=color> shows something
  return "#7c3aed";
}
