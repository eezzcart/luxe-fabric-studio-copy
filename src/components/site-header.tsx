import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, Search, User } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const totalItems = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const setDrawerOpen = useCartStore((s) => s.setDrawerOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500",
        scrolled
          ? "bg-white/70 ghost-blur border-b border-ink/5"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 md:px-10">
        <div className="flex-1 hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.22em]">
          <Link to="/" className="link-underline">Women</Link>
          <Link to="/" className="link-underline">Men</Link>
          <Link to="/" className="link-underline">New</Link>
          <Link to="/" className="link-underline">Editorial</Link>
        </div>
        <Link to="/" className="font-display text-[15px] md:text-[17px] tracking-[0.32em] uppercase">
          Bhat<span className="text-gold">·</span>Imported
        </Link>
        <div className="flex-1 flex items-center justify-end gap-5 text-ink">
          <button aria-label="Search" className="hover:opacity-60 transition-opacity"><Search className="h-[18px] w-[18px]" /></button>
          <button aria-label="Account" className="hover:opacity-60 transition-opacity hidden md:inline-flex"><User className="h-[18px] w-[18px]" /></button>
          <button
            aria-label="Bag"
            onClick={() => setDrawerOpen(true)}
            className="relative hover:opacity-60 transition-opacity inline-flex items-center gap-2"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            <span className="text-[11px] uppercase tracking-[0.2em]">Bag {totalItems > 0 && `(${totalItems})`}</span>
          </button>
        </div>
      </div>
    </header>
  );
}