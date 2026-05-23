import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, ArrowRight, Trash2, ExternalLink, BarChart3, Users, Eye, TrendingUp } from "lucide-react";
import { listWaitlists, deleteWaitlist } from "@/lib/waitlist-store";
import { WaitlistPreview } from "@/components/WaitlistPreview";
import type { Waitlist } from "@/lib/waitlist-types";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Waitly" }, { name: "description", content: "Manage your waitlist pages and signups." }] }),
  component: Dashboard,
});

function Dashboard() {
  const [items, setItems] = useState<Waitlist[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    const refresh = () => setItems(listWaitlists());
    refresh();
    window.addEventListener("waitly:changed", refresh);
    return () => window.removeEventListener("waitly:changed", refresh);
  }, []);

  const totalSignups = items.reduce((a, w) => a + w.signups.length, 0);
  const totalViews = items.reduce((a, w) => a + w.views, 0);
  const avgConv = totalViews > 0 ? ((totalSignups / totalViews) * 100).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold"><span className="text-primary text-xl">✦</span> Waitly</Link>
          <div className="flex items-center gap-2">
            <Link to="/templates" className="px-4 py-2 rounded-full border border-border text-sm hover:bg-surface">Templates</Link>
            <Link to="/templates" className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium inline-flex items-center gap-1.5">
              <Plus className="h-4 w-4" /> New waitlist
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-5xl tracking-tight">Your waitlists</h1>
            <p className="mt-2 text-muted-foreground">{items.length} {items.length === 1 ? "page" : "pages"}</p>
          </div>
          {items.length > 0 && (
            <div className="flex gap-3">
              <Stat i={Users} label="Signups" value={totalSignups.toLocaleString()} />
              <Stat i={Eye} label="Views" value={totalViews.toLocaleString()} />
              <Stat i={TrendingUp} label="Conv" value={`${avgConv}%`} />
            </div>
          )}
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-16 text-center bg-surface/40">
            <div className="mx-auto h-14 w-14 rounded-full bg-primary/15 text-primary flex items-center justify-center"><Plus className="h-6 w-6" /></div>
            <h2 className="mt-4 text-xl font-semibold">Spin up your first page</h2>
            <p className="mt-1 text-sm text-muted-foreground">Pick a template, edit it live, ship a link in under a minute.</p>
            <Link to="/templates" className="mt-6 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
              Browse templates <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((w) => {
              const conv = w.views > 0 ? ((w.signups.length / w.views) * 100).toFixed(1) : "0.0";
              return (
                <div key={w.id} className="group rounded-2xl border border-border bg-surface overflow-hidden hover:border-primary/40 transition">
                  <Link to="/builder/$id" params={{ id: w.id }} className="block">
                    <div className="aspect-video overflow-hidden border-b border-border bg-background relative">
                      <div className="absolute inset-0 pointer-events-none"><WaitlistPreview config={w.config} scale={0.32} showBranding={false} /></div>
                    </div>
                  </Link>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <div className="font-semibold truncate">{w.title}</div>
                        <div className="text-xs text-muted-foreground truncate">/w/{w.slug} · {w.category ?? "Other"}</div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${w.published ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                        {w.published ? "Live" : "Draft"}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                      <div><div className="text-muted-foreground">Signups</div><div className="font-semibold">{w.signups.length}</div></div>
                      <div><div className="text-muted-foreground">Views</div><div className="font-semibold">{w.views}</div></div>
                      <div><div className="text-muted-foreground">Conv</div><div className="font-semibold">{conv}%</div></div>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5">
                      <Link to="/builder/$id" params={{ id: w.id }} className="flex-1 text-center text-xs font-medium py-2 rounded-lg bg-foreground/10 hover:bg-foreground/20">Edit</Link>
                      <Link to="/signups/$id" params={{ id: w.id }} className="text-xs font-medium py-2 px-3 rounded-lg bg-foreground/10 hover:bg-foreground/20 inline-flex items-center gap-1">
                        <Users className="h-3 w-3" />
                      </Link>
                      <Link to="/w/$slug" params={{ slug: w.slug }} className="text-xs font-medium py-2 px-3 rounded-lg bg-foreground/10 hover:bg-foreground/20 inline-flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                      <button onClick={() => { if (confirm("Delete this waitlist?")) deleteWaitlist(w.id); }}
                              className="text-xs py-2 px-3 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-10 p-5 rounded-2xl border border-border bg-surface/50 flex items-center gap-4">
            <BarChart3 className="h-5 w-5 text-primary" />
            <div className="flex-1 text-sm">
              <div className="font-medium">Total reach</div>
              <div className="text-muted-foreground">{totalSignups} signups · {totalViews} views · {avgConv}% conversion across {items.length} pages</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Stat({ i: I, label, value }: { i: typeof Users; label: string; value: string }) {
  return (
    <div className="px-4 py-2.5 rounded-xl border border-border bg-surface">
      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-wider"><I className="h-3 w-3" /> {label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}
