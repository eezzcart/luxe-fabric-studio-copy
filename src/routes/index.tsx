import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { FloatingActions } from "@/components/floating-action";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import { MagneticButton } from "@/components/magnetic-button";
import { fetchProducts } from "@/lib/shopify";
import heroImg from "@/assets/hero.jpg";
import cat1 from "@/assets/category-1.jpg";
import cat2 from "@/assets/category-2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bhat Imported Clothes — Exclusive Global Fashion" },
      { name: "description", content: "Curated imported fashion. A minimalist luxury edit of pieces from around the world." },
      { property: "og:title", content: "Bhat Imported Clothes" },
      { property: "og:description", content: "Curated imported fashion. A minimalist luxury edit." },
    ],
  }),
  component: Home,
});

function Home() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", "home"],
    queryFn: () => fetchProducts(24),
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-ink">
      <SiteHeader />

      {/* HERO */}
      <section ref={heroRef} className="relative h-[100svh] w-full overflow-hidden bg-soft">
        <img
          src={heroImg}
          alt="Bhat Imported Clothes editorial"
          width={1080}
          height={1920}
          className="absolute inset-0 h-[115%] w-full object-cover object-left will-change-transform"
          style={{ transform: `translate3d(0, ${scrollY * 0.18}px, 0)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/80" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col justify-end px-5 md:px-10 pb-20 md:pb-28">
          <p className="text-[10px] uppercase tracking-[0.4em] text-ink/70 fade-up">Autumn / Winter Edit</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[88px] leading-[0.95] mt-4 max-w-3xl fade-up" style={{ animationDelay: ".15s" }}>
            The imported<br />edit, refined.
          </h1>
          <p className="mt-5 max-w-md text-sm text-ink/65 leading-relaxed fade-up" style={{ animationDelay: ".3s" }}>
            A quiet selection of pieces sourced from Milan, Tokyo and Paris — authenticated, in limited quantities.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 fade-up" style={{ animationDelay: ".45s" }}>
            <MagneticButton onClick={() => document.getElementById("edit")?.scrollIntoView({ behavior: "smooth" })}>
              Shop the Edit
            </MagneticButton>
            <MagneticButton variant="outline">The Lookbook</MagneticButton>
          </div>
        </div>
      </section>

      {/* CATEGORY EDITORIAL */}
      <section className="mx-auto max-w-[1500px] px-5 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="group relative overflow-hidden bg-soft aspect-[4/5]">
            <img src={cat1} alt="Essentials" loading="lazy" width={1024} height={1280} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]" />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
              <p className="text-[10px] uppercase tracking-[0.36em] text-white/80">Edit 01</p>
              <h2 className="font-display text-3xl md:text-5xl text-white mt-3">The Quiet Essentials</h2>
            </div>
          </div>
          <div className="group relative overflow-hidden bg-soft aspect-[4/5]">
            <img src={cat2} alt="Texture" loading="lazy" width={1024} height={1280} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]" />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
              <p className="text-[10px] uppercase tracking-[0.36em] text-white/80">Edit 02</p>
              <h2 className="font-display text-3xl md:text-5xl text-white mt-3">Material Studies</h2>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section id="edit" className="mx-auto max-w-[1500px] px-5 md:px-10 pb-24 md:pb-32">
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p className="text-[10px] uppercase tracking-[0.36em] text-ink/55">In Stock</p>
            <h2 className="font-display text-3xl md:text-5xl mt-2">New Arrivals</h2>
          </div>
          <button className="hidden md:inline-block text-[11px] uppercase tracking-[0.22em] link-underline">View All</button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
            {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : !products || products.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
            {products.map((p) => <ProductCard key={p.node.id} product={p} />)}
          </div>
        )}
      </section>

      {/* AUTHENTICITY */}
      <section className="border-t border-ink/10 bg-soft">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10 py-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 text-center">
          {[
            { t: "Authenticated", d: "Every piece verified by our in-house specialists before despatch." },
            { t: "Imported Directly", d: "Sourced from authorised boutiques across Europe and Asia." },
            { t: "Considered Delivery", d: "Carbon-neutral shipping, signature-required and fully insured." },
          ].map((b) => (
            <div key={b.t}>
              <span className="inline-block w-6 h-px bg-gold mb-5" />
              <h3 className="text-[12px] uppercase tracking-[0.28em] font-medium">{b.t}</h3>
              <p className="mt-3 text-sm text-ink/65 leading-relaxed max-w-xs mx-auto">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STORE INFO */}
      <section className="border-t border-ink/10 bg-soft">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10 py-20 md:py-28 grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-16">
          <div className="md:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.36em] text-ink/55">Visit Us</p>
            <h2 className="font-display text-3xl md:text-5xl mt-3">Bhat Imported Clothess</h2>
            <p className="mt-6 text-sm text-ink/65 leading-relaxed max-w-md">
              Singhpora Pattan, near J&amp;K Bank.<br />
              Open daily <span className="text-ink">9:00 AM – 10:00 PM</span>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://wa.me/919103174217" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 h-11 text-[11px] uppercase tracking-[0.22em] border border-ink/20 hover:border-ink transition-colors">
                WhatsApp 9103174217
              </a>
              <a href="https://wa.me/918899507736" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 h-11 text-[11px] uppercase tracking-[0.22em] border border-ink/20 hover:border-ink transition-colors">
                WhatsApp 8899507736
              </a>
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.36em] text-ink/55">Instagram</p>
            <a href="https://instagram.com/bhat_imported_clothess" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 font-display text-2xl md:text-3xl link-underline">@bhat_imported_clothess</a>
            <div className="mt-5 flex gap-6 text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span><strong className="text-ink">94</strong> Posts</span>
              <span><strong className="text-ink">332</strong> Followers</span>
              <span><strong className="text-ink">111</strong> Following</span>
            </div>
            <p className="mt-4 text-xs text-ink/55 leading-relaxed">
              Highlights: Stock updates, our physical location &amp; store openings.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink text-white/80">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2">
            <div className="font-display text-xl tracking-[0.3em] uppercase text-white">Bhat<span className="text-gold">·</span>Imported</div>
            <p className="mt-4 text-sm max-w-sm">Imported designer fashion curated for you. Visit our store at Singhpora Pattan, near J&amp;K Bank — open daily 9 AM – 10 PM.</p>
          </div>
          <div className="space-y-2 text-[11px] uppercase tracking-[0.22em]">
            <p className="text-white/45 mb-3">Shop:Shop</p>
            <p>Women</p><p>Men</p><p>New In</p>
          </div>
          <div className="space-y-2 text-[11px] uppercase tracking-[0.22em]">
            <p className="text-white/45 mb-3">Service</p>
            <p>Size Guide</p><p>Shipping</p>
            <a href="https://wa.me/919103174217" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">WhatsApp</a>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 text-center text-[11px] uppercase tracking-[0.3em] text-white/45">
          © {new Date().getFullYear()} Bhat Imported Clothess
        </div>
      </footer>

      <FloatingActions />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-ink/15 py-24 text-center">
      <p className="text-[10px] uppercase tracking-[0.36em] text-ink/45">The Edit</p>
      <h3 className="font-display text-3xl md:text-4xl mt-3">No products yet</h3>
      <p className="mt-3 text-sm text-ink/60 max-w-md mx-auto">
        Tell us in chat what to add — e.g. <em>"Add a Milano wool coat, ₹24,800, sizes S/M/L in ivory and black."</em>
      </p>
    </div>
  );
}
