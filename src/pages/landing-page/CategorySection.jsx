import { useNavigate } from "react-router-dom";
import Hoodies from "../../assets/Hoodies.jpg";
import TShirts from "../../assets/TShirts.jpg";
import Pants from "../../assets/Pants.jpg";
import Jackets from "../../assets/Jackets.jpg";
import Accessoires from "../../assets/Accessoires.jpg";

const categories = [
  {
    title: "Hoodies",
    image: Hoodies,
  },
  {
    title: "T-Shirts",
    image: TShirts,
  },
  {
    title: "Pants",
    image: Pants,
  },
  {
    title: "Jackets",
    image: Jackets,
  },
  {
    title: "Accessories",
    image: Accessoires,
  },
];

export default function CategorySection() {
  const navigate = useNavigate();
  return (
    <section
      className="mx-auto mt-10 max-w-[1400px] px-4 sm:px-6 lg:px-8"
      id="collections"
    >
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
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
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
