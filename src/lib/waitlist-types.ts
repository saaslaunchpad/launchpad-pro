import asta from "@/assets/template-asta.png";

export type SectionType = "hero" | "form" | "logos" | "benefits" | "testimonials" | "faq" | "footer";
export type HeroVariant = "centered" | "split" | "minimal" | "bigtype";

export const CATEGORIES = [
  "SaaS",
  "AI Tool",
  "Indie Hacker",
  "Newsletter",
  "Mobile App",
  "Developer Tool",
  "Community",
  "Event",
  "E-commerce",
  "Creator",
  "Wellness",
  "Luxury",
  "Consumer",
  "Other",
] as const;
export type Category = typeof CATEGORIES[number];

export interface WaitlistConfig {
  brandName: string;
  logoEmoji: string;
  logoUrl?: string;
  badge: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  emailPlaceholder: string;
  socialProof: string;
  signupCount: number;
  category?: Category;
  collectName?: boolean;
  theme: {
    bg: string;
    fg: string;
    surface: string;
    accent: string;
    radius: string;
    font: "sans" | "serif";
    aurora: boolean;
    grid: boolean;
    heroVariant?: HeroVariant;
  };
  sections: SectionType[];
  logos: string[];
  benefits: { icon: string; title: string; body: string }[];
  testimonials: { name: string; role: string; quote: string }[];
  faq: { q: string; a: string }[];
  heroImage?: string;
}

export interface Waitlist {
  id: string;
  slug: string;
  title: string;
  templateId: string;
  category?: Category;
  config: WaitlistConfig;
  published: boolean;
  views: number;
  signups: { email: string; name?: string; at: number }[];
  createdAt: number;
  updatedAt: number;
}

export interface Template {
  id: string;
  name: string;
  category: Category;
  thumbnail?: string;
  config: WaitlistConfig;
}

const baseTheme = {
  bg: "oklch(0.14 0.015 270)",
  fg: "oklch(0.98 0.005 270)",
  surface: "oklch(0.20 0.020 270)",
  accent: "oklch(0.72 0.22 295)",
  radius: "1rem",
  font: "sans" as const,
  aurora: true,
  grid: true,
  heroVariant: "centered" as HeroVariant,
};

const baseBenefits = [
  { icon: "Lock", title: "Beta access", body: "Get exclusive early entry to our newest features before public launch." },
  { icon: "Gift", title: "Free lifetime plan", body: "No hidden fees, no expiration date, no strings attached." },
  { icon: "Award", title: "Founding member badge", body: "This isn't just a badge — it's a legacy." },
];

const baseFaq = [
  { q: "When does it launch?", a: "We're launching in Spring 2026. Waitlist members get first access." },
  { q: "Is it really free?", a: "Yes. Free forever for waitlist members. No credit card required." },
  { q: "What problem does it solve?", a: "We replace the scattered tools founders use with one clean platform." },
  { q: "How do I get updates?", a: "Drop your email and we'll send a short note when there's real progress." },
];

const baseTestimonials = [
  { name: "Sarah Mitchell", role: "Founder, Taskflow", quote: "Launched my waitlist in under an hour. Looked more professional than anything I could have built from scratch." },
  { name: "James Okafor", role: "Indie Maker, Buildspace", quote: "I've bought a lot of templates. This is genuinely one of the best. The attention to detail is next level." },
  { name: "Tom Brecker", role: "Solo Founder, Sheetflow", quote: "Most templates look like templates. This actually looks like a real product." },
  { name: "Lena Hoffmann", role: "Founder, Arcflow", quote: "It's not just a template, it's a full launch strategy packed into one clean design." },
];

const make = (over: Partial<WaitlistConfig>): WaitlistConfig => ({
  brandName: "asta",
  logoEmoji: "✦",
  badge: "Launching Soon · Spring 2026",
  headline: "Where the future starts simply by clicking.",
  subheadline: "Replace your scattered tools with one clean, simple platform built for the way modern teams actually work.",
  ctaLabel: "Join waitlist",
  emailPlaceholder: "Enter your email",
  socialProof: "Trusted by 1,000+ early adopters",
  signupCount: 1247,
  collectName: false,
  theme: baseTheme,
  sections: ["hero", "logos", "benefits", "testimonials", "faq", "footer"],
  logos: ["Vortex", "Quantum", "Synergy", "Echo", "Evolve", "Nexus"],
  benefits: baseBenefits,
  testimonials: baseTestimonials,
  faq: baseFaq,
  ...over,
});

export const TEMPLATES: Template[] = [
  { id: "asta-dark", name: "Asta — Violet Aurora", category: "SaaS", thumbnail: asta, config: make({}) },
  { id: "minimal-light", name: "Linen — Editorial Light", category: "Newsletter",
    config: make({
      brandName: "Linen", logoEmoji: "◐", badge: "Beyond Artificial",
      headline: "Early Access to Game-Changing AI",
      subheadline: "Unlock exclusive early access to groundbreaking AI. Subscribe now and stay ahead of the future.",
      theme: { ...baseTheme, bg: "oklch(0.98 0.005 90)", fg: "oklch(0.15 0.01 270)",
        surface: "oklch(1 0 0)", accent: "oklch(0.20 0.02 270)",
        font: "serif", aurora: false, grid: false, radius: "1.25rem", heroVariant: "centered" },
    })},
  { id: "neon-mint", name: "Pulse — Neon Mint", category: "AI Tool",
    config: make({ brandName: "Pulse", logoEmoji: "⏣", badge: "Private Beta",
      headline: "AI that ships your side project for you.",
      theme: { ...baseTheme, accent: "oklch(0.82 0.18 165)", bg: "oklch(0.13 0.02 180)" } })},
  { id: "sunset", name: "Ember — Sunset Glow", category: "Mobile App",
    config: make({ brandName: "Ember", logoEmoji: "✺", badge: "Coming to iOS",
      headline: "Journal at the speed of thought.",
      theme: { ...baseTheme, accent: "oklch(0.74 0.20 35)", bg: "oklch(0.15 0.03 30)" } })},
  { id: "ocean", name: "Tide — Deep Ocean", category: "SaaS",
    config: make({ brandName: "Tide", logoEmoji: "≋", badge: "Q3 2026",
      headline: "Calm analytics for noisy teams.",
      theme: { ...baseTheme, accent: "oklch(0.68 0.18 230)", bg: "oklch(0.14 0.04 240)" } })},
  { id: "brutalist", name: "Blok — Brutalist Pop", category: "Newsletter",
    config: make({ brandName: "BLOK", logoEmoji: "■", badge: "ISSUE 001",
      headline: "Opinions from the edge of software.",
      theme: { ...baseTheme, bg: "oklch(0.99 0 0)", fg: "oklch(0.10 0 0)",
        surface: "oklch(0.96 0 0)", accent: "oklch(0.65 0.25 25)",
        aurora: false, grid: true, radius: "0rem", heroVariant: "bigtype" } })},
  { id: "gold-noir", name: "Atelier — Noir & Gold", category: "Luxury",
    config: make({ brandName: "Atelier", logoEmoji: "✦", badge: "By Invitation",
      headline: "Membership opens spring 2026.",
      theme: { ...baseTheme, bg: "oklch(0.10 0 0)", accent: "oklch(0.80 0.14 85)",
        font: "serif", radius: "0.25rem" } })},
  { id: "forest", name: "Grove — Forest Calm", category: "Wellness",
    config: make({ brandName: "Grove", logoEmoji: "❦", badge: "Open beta soon",
      headline: "A quieter way to track what matters.",
      theme: { ...baseTheme, accent: "oklch(0.70 0.15 145)", bg: "oklch(0.16 0.03 150)", font: "serif" } })},
  { id: "rose", name: "Bloom — Rose Gradient", category: "Community",
    config: make({ brandName: "Bloom", logoEmoji: "✿", badge: "Founding 100",
      headline: "A community for builders who actually ship.",
      theme: { ...baseTheme, accent: "oklch(0.75 0.18 350)", bg: "oklch(0.16 0.04 350)" } })},
  { id: "monolith", name: "Monolith — Pure Mono", category: "Developer Tool",
    config: make({ brandName: "Monolith", logoEmoji: "▮", badge: "v0.1 preview",
      headline: "One binary. Every database.",
      theme: { ...baseTheme, bg: "oklch(0.12 0 0)", accent: "oklch(0.95 0 0)",
        surface: "oklch(0.18 0 0)", aurora: false, radius: "0.5rem", heroVariant: "split" } })},
  { id: "candy", name: "Pop — Candy Pastel", category: "Consumer",
    config: make({ brandName: "Pop", logoEmoji: "❤", badge: "Closed beta",
      headline: "Group chats your parents will actually use.",
      theme: { ...baseTheme, bg: "oklch(0.97 0.02 320)", fg: "oklch(0.15 0.02 320)",
        surface: "oklch(1 0 0)", accent: "oklch(0.72 0.22 320)",
        aurora: false, radius: "1.5rem" } })},
  { id: "event", name: "Convene — Event", category: "Event",
    config: make({ brandName: "Convene", logoEmoji: "◈", badge: "Oct 18 · San Francisco",
      headline: "The conference for people who build things.",
      theme: { ...baseTheme, accent: "oklch(0.74 0.20 50)" } })},
  // --- 10 new templates ---
  { id: "indie-launch", name: "Maker — Indie Launch", category: "Indie Hacker",
    config: make({ brandName: "Maker", logoEmoji: "⚡", badge: "Built solo in 14 days",
      headline: "Built by an indie. For indies.",
      subheadline: "I'm building this in public. Drop your email and follow the journey from $0 to $10k MRR.",
      theme: { ...baseTheme, accent: "oklch(0.78 0.20 50)", bg: "oklch(0.13 0.02 60)", heroVariant: "split" } })},
  { id: "ph-launch", name: "Rocket — Product Hunt Day", category: "Indie Hacker",
    config: make({ brandName: "Rocket", logoEmoji: "🚀", badge: "Launching on Product Hunt",
      headline: "We launch in 7 days. Be there.",
      subheadline: "Get notified the moment we go live and grab a lifetime deal before it's gone.",
      theme: { ...baseTheme, accent: "oklch(0.72 0.22 25)", bg: "oklch(0.14 0.025 25)" } })},
  { id: "cyber-ai", name: "Neural — Cyber AI", category: "AI Tool",
    config: make({ brandName: "Neural", logoEmoji: "◉", badge: "GPT-5 powered",
      headline: "The agent that does your inbox while you sleep.",
      theme: { ...baseTheme, bg: "oklch(0.10 0.03 280)", accent: "oklch(0.78 0.22 200)", heroVariant: "bigtype" } })},
  { id: "creator", name: "Studio — Creator OS", category: "Creator",
    config: make({ brandName: "Studio", logoEmoji: "◆", badge: "Creator beta",
      headline: "Run your creator business from one beautiful dashboard.",
      theme: { ...baseTheme, accent: "oklch(0.74 0.20 320)", bg: "oklch(0.15 0.04 320)", radius: "1.25rem" } })},
  { id: "ecom", name: "Shoply — Drop Soon", category: "E-commerce",
    config: make({ brandName: "Shoply", logoEmoji: "◐", badge: "Limited drop · 500 units",
      headline: "The product everyone will be wearing this summer.",
      theme: { ...baseTheme, bg: "oklch(0.97 0.01 60)", fg: "oklch(0.15 0.01 60)",
        surface: "oklch(1 0 0)", accent: "oklch(0.55 0.18 25)", aurora: false } })},
  { id: "devtool-dark", name: "Forge — Dev Tool", category: "Developer Tool",
    config: make({ brandName: "Forge", logoEmoji: "⌘", badge: "v0.4 preview",
      headline: "The terminal-first deployment tool engineers actually want.",
      theme: { ...baseTheme, bg: "oklch(0.11 0.01 220)", accent: "oklch(0.80 0.18 145)", heroVariant: "split" } })},
  { id: "newsletter-serif", name: "Quarterly — Editorial", category: "Newsletter",
    config: make({ brandName: "Quarterly", logoEmoji: "§", badge: "Issue 12 · Coming Friday",
      headline: "Long-form essays for people who think for a living.",
      theme: { ...baseTheme, bg: "oklch(0.96 0.01 80)", fg: "oklch(0.18 0.01 80)",
        surface: "oklch(1 0 0)", accent: "oklch(0.40 0.10 25)", font: "serif", aurora: false, grid: false } })},
  { id: "saas-gradient", name: "Lumen — Gradient SaaS", category: "SaaS",
    config: make({ brandName: "Lumen", logoEmoji: "✺", badge: "Closed alpha",
      headline: "Customer support, finally calm.",
      theme: { ...baseTheme, accent: "oklch(0.74 0.22 260)", bg: "oklch(0.14 0.03 260)" } })},
  { id: "community", name: "Circle — Private Community", category: "Community",
    config: make({ brandName: "Circle", logoEmoji: "◯", badge: "Founding members open",
      headline: "A private community for serious operators.",
      theme: { ...baseTheme, bg: "oklch(0.12 0.02 200)", accent: "oklch(0.80 0.12 60)", font: "serif" } })},
  { id: "event-minimal", name: "Summit — Minimal Event", category: "Event",
    config: make({ brandName: "Summit", logoEmoji: "▲", badge: "May 14 · NYC",
      headline: "One day. 200 founders. Zero pitches.",
      theme: { ...baseTheme, bg: "oklch(0.99 0 0)", fg: "oklch(0.10 0 0)",
        surface: "oklch(0.96 0 0)", accent: "oklch(0.15 0 0)", aurora: false, grid: false, heroVariant: "minimal" } })},
  { id: "wellness-soft", name: "Calm — Wellness", category: "Wellness",
    config: make({ brandName: "Calm", logoEmoji: "❀", badge: "iOS coming this fall",
      headline: "A gentler way to start your morning.",
      theme: { ...baseTheme, bg: "oklch(0.96 0.02 150)", fg: "oklch(0.20 0.02 150)",
        surface: "oklch(1 0 0)", accent: "oklch(0.55 0.12 150)", aurora: false, font: "serif", radius: "1.5rem" } })},
];

export const getTemplate = (id: string) => TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
