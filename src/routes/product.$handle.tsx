import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { FloatingActions } from "@/components/floating-action";
import { MagneticButton } from "@/components/magnetic-button";
import { fetchProductByHandle, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cart-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/product/$handle")({
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => fetchProductByHandle(handle),
  });

  if (isLoading) {
    return (
      <>
        <SiteHeader />
        <div className="pt-32 mx-auto max-w-[1500px] px-5 md:px-10 grid md:grid-cols-2 gap-10">
          <div className="aspect-[3/4] bg-soft shimmer" />
          <div className="space-y-4 pt-10">
            <div className="h-4 w-40 bg-soft shimmer" />
            <div className="h-8 w-3/4 bg-soft shimmer" />
            <div className="h-4 w-24 bg-soft shimmer" />
          </div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <SiteHeader />
        <div className="pt-40 text-center px-6">
          <h1 className="font-display text-4xl">Not found</h1>
          <Link to="/" className="mt-6 inline-block text-[11px] uppercase tracking-[0.22em] link-underline">Return home</Link>
        </div>
      </>
    );
  }

  return <Detail product={product.node} />;
}

function Detail({ product }: { product: NonNullable<Awaited<ReturnType<typeof fetchProductByHandle>>>["node"] }) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    const first = product.variants.edges[0]?.node;
    first?.selectedOptions.forEach((o) => (init[o.name] = o.value));
    return init;
  });

  const variant = useMemo(() => {
    return product.variants.edges.find((v) =>
      v.node.selectedOptions.every((o) => selected[o.name] === o.value),
    )?.node;
  }, [product, selected]);

  const images = product.images.edges;
  const [activeImg, setActiveImg] = useState(0);

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });
  };

  return (
    <div className="min-h-screen bg-background text-ink">
      <SiteHeader />
      <div className="pt-24 md:pt-28 mx-auto max-w-[1500px] px-5 md:px-10 pb-24">
        <Link to="/" className="text-[11px] uppercase tracking-[0.22em] link-underline">← The Edit</Link>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Gallery */}
          <div>
            <div className="aspect-[3/4] bg-soft overflow-hidden">
              {images[activeImg]?.node && (
                <img
                  src={images[activeImg].node.url}
                  alt={images[activeImg].node.altText ?? product.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {images.slice(0, 5).map((img, i) => (
                  <button
                    key={img.node.url}
                    onClick={() => setActiveImg(i)}
                    className={cn(
                      "aspect-[3/4] bg-soft overflow-hidden border transition-colors",
                      i === activeImg ? "border-ink" : "border-transparent hover:border-ink/30",
                    )}
                  >
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="md:sticky md:top-24 self-start">
            <p className="text-[10px] uppercase tracking-[0.36em] text-ink/55">Bhat Imported</p>
            <h1 className="font-display text-3xl md:text-5xl leading-tight mt-3">{product.title}</h1>
            <p className="mt-4 text-lg">
              {variant
                ? formatPrice(variant.price.amount, variant.price.currencyCode)
                : formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
            </p>

            <div className="mt-8 space-y-6">
              {product.options.map((opt) => (
                <div key={opt.name}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[11px] uppercase tracking-[0.22em]">{opt.name}</p>
                    {/^size$/i.test(opt.name) && (
                      <Dialog>
                        <DialogTrigger className="text-[11px] uppercase tracking-[0.22em] link-underline">
                          Size Guide
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle className="font-display text-2xl">International Size Guide</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4 text-sm">
                            <table className="w-full text-left">
                              <thead className="text-[11px] uppercase tracking-[0.18em] text-ink/55">
                                <tr><th className="py-2">EU</th><th>UK</th><th>US</th><th>JP</th><th>IN</th></tr>
                              </thead>
                              <tbody>
                                {[["34","6","2","7","XS"],["36","8","4","9","S"],["38","10","6","11","M"],["40","12","8","13","L"],["42","14","10","15","XL"]].map((r) => (
                                  <tr key={r[0]} className="border-t border-ink/10">{r.map((c) => <td key={c} className="py-2">{c}</td>)}</tr>
                                ))}
                              </tbody>
                            </table>
                            <p className="mt-4 text-xs text-ink/55">Tailored for imported sizing — please size up for an oversized fit.</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {opt.values.map((v) => {
                      const isActive = selected[opt.name] === v;
                      return (
                        <button
                          key={v}
                          onClick={() => setSelected({ ...selected, [opt.name]: v })}
                          className={cn(
                            "min-w-[44px] px-4 h-11 text-[12px] uppercase tracking-[0.18em] border transition-colors",
                            isActive ? "border-ink bg-ink text-white" : "border-ink/20 hover:border-ink",
                          )}
                        >
                          {v}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <MagneticButton
                className="w-full"
                onClick={handleAdd}
                disabled={!variant?.availableForSale || isLoading}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> :
                  variant?.availableForSale ? "Add to Bag" : "Sold Out"}
              </MagneticButton>
            </div>

            {product.description && (
              <div className="mt-12 border-t border-ink/10 pt-8">
                <p className="text-[11px] uppercase tracking-[0.22em] mb-3">Details</p>
                <p className="text-sm text-ink/70 leading-relaxed whitespace-pre-line">{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <FloatingActions />
    </div>
  );
}