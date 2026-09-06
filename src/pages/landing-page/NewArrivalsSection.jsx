import { Heart } from "lucide-react";

const products = [
  {
    name: "Chaos Tee - Black",
    price: "$49.00",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Washed Hoodie - Charcoal",
    price: "$89.00",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Utility Cargo Pants - Black",
    price: "$99.00",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sketch Tee - Sand",
    price: "$45.00",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Urban Cap - Black",
    price: "$45.00",
    image:
      "https://images.unsplash.com/photo-1521369909026-2afed882baee?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Society Hoodie - Olive",
    price: "$89.00",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
  },
];

export default function NewArrivalsSection() {
  return (
    <section
      id="new-arrivals"
      className="mx-auto mt-12 max-w-[1400px] px-4 sm:px-6 lg:px-8"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-footer sm:text-4xl">
          New arrivals
        </h2>

        <button className="text-sm font-medium uppercase tracking-[0.2em] text-footer">
          View all →
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {products.map(({ name, price, image }) => (
          <article key={name} className="group bg-[#f5f5f5] p-2">
            <div className="relative overflow-hidden bg-white">
              <button
                type="button"
                aria-label={`Save ${name}`}
                className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-footer shadow-sm"
              >
                <Heart size={14} />
              </button>

              <img
                src={image}
                alt={name}
                className="h-[240px] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
            </div>

            <div className="mt-3 space-y-2 px-1 pb-2">
              <p className="text-sm font-medium text-footer">{name}</p>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-footer">
                  {price}
                </span>
                <div className="flex gap-2">
                  {[...Array(3)].map((_, idx) => (
                    <span
                      key={idx}
                      className="h-3 w-3 rounded-full border border-black/20 bg-[#2a2a2a]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
