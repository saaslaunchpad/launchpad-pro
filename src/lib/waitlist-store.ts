import { Waitlist, getTemplate, WaitlistConfig } from "./waitlist-types";

const KEY = "waitly.waitlists.v1";

function read(): Waitlist[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}
function write(items: Waitlist[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("waitly:changed"));
}

export function listWaitlists(): Waitlist[] {
  return read().sort((a, b) => b.updatedAt - a.updatedAt);
}
export function getWaitlist(id: string): Waitlist | undefined {
  return read().find((w) => w.id === id);
}
export function getWaitlistBySlug(slug: string): Waitlist | undefined {
  return read().find((w) => w.slug === slug);
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 40) || "waitlist";
}

export function createWaitlist(templateId: string, title?: string): Waitlist {
  const t = getTemplate(templateId);
  const items = read();
  const id = crypto.randomUUID();
  const baseSlug = slugify(title ?? t.config.brandName);
  let slug = baseSlug;
  let i = 2;
  while (items.some((w) => w.slug === slug)) slug = `${baseSlug}-${i++}`;
  const now = Date.now();
  const w: Waitlist = {
    id,
    slug,
    title: title ?? t.name,
    templateId,
    config: JSON.parse(JSON.stringify(t.config)),
    published: false,
    views: 0,
    signups: [],
    createdAt: now,
    updatedAt: now,
  };
  write([w, ...items]);
  return w;
}

export function updateWaitlist(id: string, patch: Partial<Waitlist>) {
  const items = read();
  const idx = items.findIndex((w) => w.id === id);
  if (idx === -1) return;
  items[idx] = { ...items[idx], ...patch, updatedAt: Date.now() };
  write(items);
}

export function updateConfig(id: string, config: WaitlistConfig) {
  updateWaitlist(id, { config });
}

export function deleteWaitlist(id: string) {
  write(read().filter((w) => w.id !== id));
}

export function addSignup(slug: string, email: string, name?: string) {
  const items = read();
  const idx = items.findIndex((w) => w.slug === slug);
  if (idx === -1) return false;
  if (items[idx].signups.some((s) => s.email === email)) return false;
  items[idx].signups.push({ email, name, at: Date.now() });
  items[idx].updatedAt = Date.now();
  write(items);
  return true;
}

export function trackView(slug: string) {
  const items = read();
  const idx = items.findIndex((w) => w.slug === slug);
  if (idx === -1) return;
  items[idx].views += 1;
  write(items);
}

export function exportCsv(w: Waitlist): string {
  const rows = [["email", "name", "signed_up_at"], ...w.signups.map((s) => [s.email, s.name ?? "", new Date(s.at).toISOString()])];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}
