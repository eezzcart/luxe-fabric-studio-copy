import { useState } from "react";
import { HelpCircle, Ruler, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
      <FAB icon={<MessageCircle className="h-4 w-4" />} label="Chat on WhatsApp" href="https://wa.me/919103174217" />
      <FAB icon={<Ruler className="h-4 w-4" />} label="Need help with imported sizes?" delay="0.3s" />
      <FAB icon={<HelpCircle className="h-4 w-4" />} label="Concierge — we're here to help" href="/contact" delay="0.6s" />
    </div>
  );
}

function FAB({
  icon,
  label,
  href,
  delay = "0s",
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
  delay?: string;
}) {
  const [hover, setHover] = useState(false);
  const baseClass = cn(
    "float-bubble group flex items-center gap-2 rounded-full bg-ink text-white pl-3 pr-4 h-11 shadow-[0_8px_30px_rgba(11,11,11,0.18)] transition-[width,padding] duration-500 overflow-hidden",
  );
  const inner = (
    <>
      <span className="shrink-0">{icon}</span>
      <span
        className={cn(
: 18.38,