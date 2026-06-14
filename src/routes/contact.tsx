import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { FloatingActions } from "@/components/floating-action";
import { Instagram, MapPin, Clock, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Bhat Imported Clothess" },
      { name: "description", content: "Visit Bhat Imported Clothess at Singhpora Pattan, near J&K Bank. Open daily 9 AM – 10 PM. WhatsApp 9103174217 or 8899507736." },
      { property: "og:title", content: "Contact — Bhat Imported Clothess" },
      { property: "og:description", content: "Visit our store at Singhpora Pattan, near J&K Bank. Open daily 9 AM – 10 PM." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <SiteHeader />
      <div className="pt-24 md:pt-32 mx-auto max-w-[1500px] px-5 md:px-10 pb-24">
        <Link to="/" className="text-[11px] uppercase tracking-[0.22em] link-underline">← Home</Link>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
          <div>
            <p className="text-[10px] uppercase tracking-[0.36em] text-ink/55">Get in Touch</p>
            <h1 className="font-display text-4xl md:text-6xl mt-3">Contact</h1>
            <p className="mt-6 text-sm text-ink/65 leading-relaxed max-w-md">
              Have a question about sizing, stock or your order? Reach us on WhatsApp — we reply fast.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-ink/55">Address</p>
                  <p className="mt-1 text-sm">Singhpora Pattan, near J&amp;K Bank</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-ink/55">Opening Hours</p>
                  <p className="mt-1 text-sm">Daily — 9:00 AM to 10:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MessageCircle className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-ink/55">WhatsApp</p>
                  <div className="mt-1 flex flex-wrap gap-3">
                    <a href="https://wa.me/919103174217" target="_blank" rel="noopener noreferrer" className="text-sm link-underline">9103174217</a>
                    <a href="https://wa.me/918899507736" target="_blank" rel="noopener noreferrer" className="text-sm link-underline">8899507736</a>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Instagram className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-ink/55">Instagram</p>
                  <a href="https://instagram.com/bhat_imported_clothess" target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm link-underline">@bhat_imported_clothess</a>
                  <p className="mt-2 text-xs text-ink/55">94 posts · 332 followers · 111 following</p>
                  <p className="mt-1 text-xs text-ink/55">Highlights: stock updates, location &amp; store openings</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-soft p-8 md:p-12">
            <p className="text-[10px] uppercase tracking-[0.36em] text-ink/55">Follow Along</p>
            <h2 className="font-display text-2xl md:text-4xl mt-3">@bhat_imported_clothess</h2>
            <p className="mt-4 text-sm text-ink/65 leading-relaxed">
              New drops, restocks and behind-the-scenes from Singhpora Pattan. DM us on Instagram for style advice or to reserve pieces before they sell out.
            </p>
            <a
              href="https://instagram.com/bhat_imported_clothess"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-6 h-12 text-[11px] uppercase tracking-[0.22em] border border-ink/20 hover:border-ink transition-colors"
            >
              <Instagram className="h-4 w-4" />
              Open Instagram
            </a>
          </div>
        </div>
      </div>
      <FloatingActions />
    </div>
  );
}
