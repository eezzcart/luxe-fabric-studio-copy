import { useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useCartStore } from "@/stores/cart-store";
import { Minus, Plus, Trash2, Loader2, ShoppingBag } from "lucide-react";
import { MagneticButton } from "./magnetic-button";
import { formatPrice } from "@/lib/shopify";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, isDrawerOpen, isLoading, isSyncing, pulseVariantId, setDrawerOpen, updateQuantity, removeItem, getCheckoutUrl, syncCart } =
    useCartStore();

  useEffect(() => {
    if (isDrawerOpen) syncCart();
  }, [isDrawerOpen, syncCart]);

  const total = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "INR";

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setDrawerOpen(false);
    }
  };

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 bg-white border-l border-ink/10">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-ink/10">
          <SheetTitle className="text-[11px] uppercase tracking-[0.3em] font-medium text-ink">Shopping Bag</SheetTitle>
          <SheetDescription className="text-xs text-ink/60">
            {items.length === 0 ? "Your bag is empty" : `${items.reduce((n, i) => n + i.quantity, 0)} item(s)`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-ink/50">
            <ShoppingBag className="h-7 w-7" />
            <p className="text-[11px] uppercase tracking-[0.22em]">Nothing here yet</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {items.map((item) => (
                <div
                  key={item.variantId}
                  className={cn("flex gap-4", pulseVariantId === item.variantId && "animate-cart-pulse")}
                >
                  <div className="w-20 h-24 bg-soft overflow-hidden flex-shrink-0">
                    {item.product.node.images?.edges?.[0]?.node && (
                      <img
                        src={item.product.node.images.edges[0].node.url}
                        alt={item.product.node.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="text-sm font-medium truncate">{item.product.node.title}</h4>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-ink/55 mt-0.5">
                          {item.selectedOptions.map((o) => o.value).join(" · ")}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-ink/40 hover:text-ink transition-colors"
                        aria-label="Remove"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="mt-auto pt-2 flex items-center justify-between">
                      <div className="inline-flex items-center border border-ink/15">
                        <button
                          className="w-8 h-8 inline-flex items-center justify-center hover:bg-ink hover:text-white transition-colors"
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs">{item.quantity}</span>
                        <button
                          className="w-8 h-8 inline-flex items-center justify-center hover:bg-ink hover:text-white transition-colors"
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm font-medium">
                        {formatPrice(parseFloat(item.price.amount) * item.quantity, item.price.currencyCode)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-ink/10 px-6 py-5 space-y-4 bg-white">
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] uppercase tracking-[0.22em] text-ink/60">Subtotal</span>
                <span className="text-lg font-medium">{formatPrice(total, currency)}</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-ink/45">Duties & shipping calculated at checkout</p>
              <MagneticButton
                onClick={handleCheckout}
                disabled={isLoading || isSyncing}
                className="w-full"
              >
                {isLoading || isSyncing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Proceed to Checkout"}
              </MagneticButton>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}