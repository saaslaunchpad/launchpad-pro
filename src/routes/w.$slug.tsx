import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { addSignup, getWaitlistBySlug, trackView } from "@/lib/waitlist-store";
import { WaitlistPreview } from "@/components/WaitlistPreview";
import type { Waitlist } from "@/lib/waitlist-types";

export const Route = createFileRoute("/w/$slug")({
  head: () => ({ meta: [{ title: "Join the waitlist" }] }),
  component: PublicPage,
});

function PublicPage() {
  const { slug } = Route.useParams();
  const [w, setW] = useState<Waitlist | undefined | null>(undefined);

  useEffect(() => {
    const found = getWaitlistBySlug(slug);
    setW(found ?? null);
    if (found) trackView(slug);
  }, [slug]);

  if (w === undefined) return <div className="min-h-screen bg-background" />;
  if (w === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-6xl">404</h1>
          <p className="mt-2 text-muted-foreground">This waitlist doesn't exist (or hasn't been published yet).</p>
          <Link to="/" className="mt-6 inline-flex px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
            Build your own
          </Link>
        </div>
      </div>
    );
  }

  return (
    <WaitlistPreview
      config={w.config}
      showBranding
      onSubmit={async (email, name) => addSignup(slug, email, name)}
    />
  );
}
