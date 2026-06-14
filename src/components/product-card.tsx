import { Link } from "@tanstack/react-router";
import type { ShopifyProduct } from "@/lib/shopify";
import { formatPrice } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const p = product.node;
  const img1 = p.images.edges[0]?.node;
  const img2 = p.images.edges[1]?.node ?? img1;
  const sizeOption = p.options.find((o) => /size/i.test(o.name));
  const sizes = sizeOption?.values?.slice(0, 5) ?? [];

  return (
    <Link
      to="/product/$handle"
      params={{ handle: p.handle }}
      className="group block"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-soft">
        {img1 && (
          <img
            src={img1.url}
            alt={img1.altText ?? p.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:opacity-0"
          />
        )}
        {img2 && (
          <img
            src={img2.url}
            alt={img2.altText ?? p.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-[1.02]"
          />
        )}
        {sizes.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white/85 ghost-blur translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <div className="flex items-center justify-center gap-4 py-3 text-[11px] uppercase tracking-[0.2em]">
              {sizes.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="pt-4 pb-2 px-1">
        <h3 className="text-[13px] font-medium tracking-wide">{p.title}</h3>
        <p className="mt-1 text-[12px] text-ink/65">
          {formatPrice(p.priceRange.minVariantPrice.amount, p.priceRange.minVariantPrice.currencyCode)}
        </p>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div>
      <div className="aspect-[3/4] bg-soft shimmer" />
      <div className="pt-4 px-1 space-y-2">
        <div className="h-3 w-2/3 bg-soft shimmer" />
        <div className="h-3 w-1/4 bg-soft shimmer" />
      </div>
    </div>
  );
}