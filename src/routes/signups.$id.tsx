import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Download, Mail, Eye, TrendingUp, Users, Search } from "lucide-react";
import { getWaitlist, exportCsv } from "@/lib/waitlist-store";
import type { Waitlist } from "@/lib/waitlist-types";

export const Route = createFileRoute("/signups/$id")({
  head: () => ({ meta: [{ title: "Signups — Waitly" }] }),
  component: Signups,
});

function Signups() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const [w, setW] = useState<Waitlist | undefined>();
  const [q, setQ] = useState("");

  useEffect(() => {
    const refresh = () => {
      const found = getWaitlist(id);
      if (!found) { nav({ to: "/dashboard" }); return; }
      setW(found);
    };
    refresh();
    window.addEventListener("waitly:changed", refresh);
    return () => window.removeEventListener("waitly:changed", refresh);
  }, [id, nav]);

  if (!w) return null;
  const conv = w.views > 0 ? ((w.signups.length / w.views) * 100).toFixed(1) : "0.0";
  const filtered = w.signups.filter((s) => !q || s.email.toLowerCase().includes(q.toLowerCase()) || (s.name ?? "").toLowerCase().includes(q.toLowerCase())).slice().reverse();

  function download() {
    const blob = new Blob([exportCsv(w!)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${w!.slug}-signups.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  const stats = [
    { i: Users, label: "Signups", value: w.signups.length.toLocaleString() },
    { i: Eye, label: "Page views", value: w.views.toLocaleString() },
    { i: TrendingUp, label: "Conversion", value: `${conv}%` },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/builder/$id" params={{ id: w.id }} className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-surface">Edit page</Link>
            <button onClick={download} className="text-xs px-3 py-1.5 rounded-full bg-primary text-primary-foreground inline-flex items-center gap-1.5">
              <Download className="h-3 w-3" /> Export CSV
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div>
          <div className="text-xs text-muted-foreground">/w/{w.slug}</div>
          <h1 className="mt-1 font-display text-5xl tracking-tight">{w.title}</h1>
        </div>

        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="p-5 rounded-2xl border border-border bg-surface">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><s.i className="h-3.5 w-3.5" /> {s.label}</div>
              <div className="mt-2 text-3xl font-semibold">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-surface overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <Mail className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">Subscribers</h2>
            <span className="text-xs text-muted-foreground">{filtered.length} of {w.signups.length}</span>
            <div className="ml-auto relative">
              <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search email or name"
                className="text-xs pl-8 pr-3 py-1.5 rounded-full bg-background border border-border outline-none focus:border-primary w-64" />
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-sm text-muted-foreground">
              {w.signups.length === 0 ? "No signups yet. Share your page to start collecting emails." : "No matches."}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground bg-background/50">
                <tr><th className="text-left px-4 py-2 font-medium">Email</th><th className="text-left px-4 py-2 font-medium">Name</th><th className="text-left px-4 py-2 font-medium">Joined</th></tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-4 py-2.5 font-medium">{s.email}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{s.name ?? "—"}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{new Date(s.at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
