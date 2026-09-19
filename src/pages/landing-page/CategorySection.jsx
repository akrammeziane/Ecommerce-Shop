import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Hoodies",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "T-Shirts",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Pants",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Jackets",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Accessories",
    image:
      "https://images.unsplash.com/photo-1521369909026-2afed882baee?auto=format&fit=crop&w=900&q=80",
  },
];

export default function CategorySection() {
  const navigate = useNavigate();
  return (
    <section className="mx-auto mt-10 max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <h2 className="text-center font-heading text-3xl font-bold uppercase tracking-tight text-footer sm:text-4xl">
        Shop by category
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map(({ title, image }) => (
          <article
            key={title}
            className="group relative overflow-hidden bg-black"
          >
            <div className="relative h-[320px] overflow-hidden sm:h-[360px]">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-xl font-bold uppercase tracking-wide text-primary">
                {title}
              </p>
              <button
                className="mt-3 inline-flex items-center border border-primary/60 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-footer"
                onClick={() =>
                  navigate(`/shop`, {
                    state: { category: title },
                    replace: true,
                  })
                }
              >
                Shop now
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
