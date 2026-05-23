import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Sparkles, X } from "lucide-react";
import { TEMPLATES, CATEGORIES, type Category, type Template } from "@/lib/waitlist-types";
import { WaitlistPreview } from "@/components/WaitlistPreview";
import { createWaitlist } from "@/lib/waitlist-store";

export const Route = createFileRoute("/templates")({
  head: () => ({ meta: [
    { title: "Templates — Waitly" },
    { name: "description", content: "20+ hand-crafted waitlist templates for indie hackers, SaaS, AI tools and more." },
  ]}),
  component: Templates,
});

function Templates() {
  const nav = useNavigate();
  const [filter, setFilter] = useState<Category | "All">("All");
  const [picked, setPicked] = useState<Template | null>(null);

  const filtered = filter === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.category === filter);

  function handleCreate(brandName: string, category: Category) {
    if (!picked) return;
    const w = createWaitlist(picked.id, brandName, category, brandName);
    nav({ to: "/builder/$id", params: { id: w.id } });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <div className="flex items-center gap-2 font-semibold"><span className="text-primary text-xl">✦</span> Waitly</div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border border-border">
            <Sparkles className="h-3 w-3 text-primary" /> {TEMPLATES.length} premium templates
          </span>
          <h1 className="mt-4 font-display text-5xl md:text-6xl tracking-tight">Pick your starting point.</h1>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">Built for indie hackers, solo founders, and new launches. Every template is fully editable.</p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-1.5">
          {(["All", ...CATEGORIES] as const).map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              className={`text-xs px-3 py-1.5 rounded-full border ${filter === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-surface"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((t) => (
            <button key={t.id} onClick={() => setPicked(t)}
              className="group text-left rounded-2xl border border-border bg-surface overflow-hidden hover:border-primary/50 transition">
              <div className="aspect-[4/3] overflow-hidden border-b border-border bg-background relative">
                <div className="absolute inset-0 pointer-events-none"><WaitlistPreview config={t.config} scale={0.32} showBranding={false} /></div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.category}</div>
                </div>
                <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition">Use template</span>
              </div>
            </button>
          ))}
        </div>
      </main>

      {picked && <CreateModal template={picked} onClose={() => setPicked(null)} onCreate={handleCreate} />}
    </div>
  );
}

function CreateModal({ template, onClose, onCreate }: { template: Template; onClose: () => void; onCreate: (name: string, cat: Category) => void }) {
  const [name, setName] = useState(template.config.brandName);
  const [cat, setCat] = useState<Category>(template.category);

  return (
    <div className="fixed inset-0 z-50 bg-background/70 backdrop-blur flex items-center justify-center p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground"><X className="h-4 w-4" /></button>
        <div className="text-xs text-primary uppercase tracking-wider">{template.name}</div>
        <h3 className="mt-1 font-display text-3xl tracking-tight">Tell us about your project</h3>
        <p className="text-sm text-muted-foreground mt-1">We'll pre-fill your waitlist with your brand name.</p>
        <div className="mt-6 space-y-4">
          <label className="block">
            <div className="text-xs text-muted-foreground mb-1.5">Brand / project name</div>
            <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Asta, Linear, Notion"
              className="w-full px-3 py-2.5 rounded-lg bg-background border border-border outline-none focus:border-primary text-sm" />
          </label>
          <label className="block">
            <div className="text-xs text-muted-foreground mb-1.5">Category</div>
            <select value={cat} onChange={(e) => setCat(e.target.value as Category)}
              className="w-full px-3 py-2.5 rounded-lg bg-background border border-border outline-none focus:border-primary text-sm">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
        </div>
        <button onClick={() => name.trim() && onCreate(name.trim(), cat)}
          className="mt-6 w-full py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm">
          Create my waitlist →
        </button>
      </div>
    </div>
  );
}
