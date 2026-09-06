import { Check, ShieldCheck, Truck, Headphones } from "lucide-react";

const items = [
  { icon: Truck, title: "Free shipping", text: "On orders over $100" },
  { icon: Check, title: "Easy returns", text: "30-day returns" },
  { icon: ShieldCheck, title: "Secure payment", text: "100% secure checkout" },
  { icon: Headphones, title: "Customer support", text: "24/7 support" },
];

export default function InfoStrip() {
  return (
    <div className="mx-auto -mt-1 max-w-[1400px] border border-black/10 bg-hero shadow-sm">
      <div className="grid gap-4 px-4 py-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        {items.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="flex items-center gap-3 border-b border-black/5 pb-3 last:border-b-0 last:pb-0 sm:border-b-0 sm:pb-0"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-hero text-footer">
              <Icon size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-tight text-footer">
                {title}
              </p>
              <p className="text-xs text-footer/70">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
