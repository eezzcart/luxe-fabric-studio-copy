import { useState } from "react";
import { HelpCircle, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
      <FAB icon={<Ruler className="h-4 w-4" />} label="Need help with imported sizes?" />
      <FAB icon={<HelpCircle className="h-4 w-4" />} label="Concierge — we're here to help" delay="0.6s" />
    </div>
  );
}

function FAB({ icon, label, delay = "0s" }: { icon: React.ReactNode; label: string; delay?: string }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ animationDelay: delay }}
      className={cn(
        "float-bubble group flex items-center gap-2 rounded-full bg-ink text-white pl-3 pr-4 h-11 shadow-[0_8px_30px_rgba(11,11,11,0.18)] transition-[width,padding] duration-500 overflow-hidden",
      )}
    >
      <span className="shrink-0">{icon}</span>
      <span
        className={cn(
          "whitespace-nowrap text-[11px] tracking-[0.18em] uppercase transition-[max-width,opacity,margin] duration-500",
          hover ? "max-w-[260px] opacity-100 ml-1" : "max-w-0 opacity-0 ml-0",
        )}
      >
        {label}
      </span>
    </button>
  );
}