import { useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
}

export function MagneticButton({
  children,
  className,
  variant = "primary",
  onClick,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [transform, setTransform] = useState("translate3d(0,0,0)");
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < r.width / 2 + 40) {
      setTransform(`translate3d(${dx * 0.25}px, ${dy * 0.35}px, 0)`);
    } else {
      setTransform("translate3d(0,0,0)");
    }
  };

  const reset = () => setTransform("translate3d(0,0,0)");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (el) {
      const r = el.getBoundingClientRect();
      const id = Date.now();
      setRipples((p) => [...p, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
      setTimeout(() => setRipples((p) => p.filter((rp) => rp.id !== id)), 900);
    }
    onClick?.(e);
  };

  const base =
    "relative overflow-hidden inline-flex items-center justify-center px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] font-medium transition-transform duration-300 ease-out will-change-transform select-none disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-ink text-white hover:bg-ink/90",
    outline: "border border-ink text-ink hover:bg-ink hover:text-white",
    ghost: "text-ink hover:opacity-70",
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={handleClick}
      style={{ transform }}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="liquid-ripple"
          style={{ left: r.x, top: r.y }}
          aria-hidden
        />
      ))}
    </button>
  );
}