import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import { TEMPLATES } from "@/lib/waitlist-types";
import { WaitlistPreview } from "@/components/WaitlistPreview";
import { createWaitlist } from "@/lib/waitlist-store";

export const Route = createFileRoute("/templates")({
  head: () => ({ meta: [
    { title: "Templates — Waitly" },
    { name: "description", content: "12+ hand-crafted waitlist templates. Pick one and ship in minutes." },
  ]}),
  component: Templates,
});

function Templates() {
  const nav = useNavigate();
  function use(id: string) {
    const w = createWaitlist(id);
    nav({ to: "/builder/$id", params: { id: w.id } });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-primary text-xl">✦</span> Waitly
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border border-border">
            <Sparkles className="h-3 w-3 text-primary" /> {TEMPLATES.length} templates
          </span>
          <h1 className="mt-4 font-display text-5xl md:text-6xl tracking-tight">Pick your starting point.</h1>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">Every template is fully editable. Swap colors, fonts, and copy in the live editor.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEMPLATES.map((t) => (
            <button key={t.id} onClick={() => use(t.id)}
              className="group text-left rounded-2xl border border-border bg-surface overflow-hidden hover:border-primary/50 transition">
              <div className="aspect-[4/3] overflow-hidden border-b border-border bg-background relative">
                <div className="absolute inset-0 pointer-events-none">
                  <WaitlistPreview config={t.config} scale={0.32} showBranding={false} />
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.category}</div>
                </div>
                <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition">
                  Use template
                </span>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
