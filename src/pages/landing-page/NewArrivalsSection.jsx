import { ArrowRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchLatestProducts } from "../../slices/productsSlice";

const currency = (value) => `${Number(value || 0).toLocaleString()} DZD`;

export default function NewArrivalsSection() {
  const dispatch = useDispatch();
  const {
    latestProducts = [],
    latestLoading,
    latestError,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchLatestProducts(6));
  }, [dispatch]);

  return (
    <section
      id="new-arrivals"
      className="mx-auto mt-16 max-w-[1400px] px-4 sm:px-6 lg:px-8"
    >
      <div className="mb-8 flex items-end justify-between  pb-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-2">
            Just Dropped
          </p>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-footer sm:text-4xl">
            New Arrivals
          </h2>
        </div>

        <Link
          to="/shop"
          className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-footer hover:text-accent transition-colors group"
        >
          View All
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {latestError ? (
        <div className="border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-4 text-center">
          {latestError}
        </div>
      ) : latestLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-hero" />
              <div className="mt-3 space-y-2">
                <div className="h-3 bg-hero w-3/4" />
                <div className="h-3 bg-hero w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : latestProducts.length === 0 ? (
        <div className="border border-black/10 bg-white py-16 text-center">
          <p className="text-sm text-footer/60">
            No new arrivals just yet — check back soon.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {latestProducts.map((product) => {
            const isOutOfStock =
              product.status === "Out Of Stock" || product.quantity === 0;

            return (
              <Link
                key={product._id}
                to={`/shop/${product._id}`}
                className="group bg-[#f5f5f5] p-2 block"
              >
                <div className="relative overflow-hidden bg-white aspect-[3/4]">
                  {isOutOfStock && (
                    <span className="absolute left-3 top-3 z-10 bg-footer text-primary px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest">
                      Sold Out
                    </span>
                  )}

                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-footer/20 text-4xl">
                      👕
                    </div>
                  )}
                </div>

                <div className="mt-3 space-y-1.5 px-1 pb-2">
                  {product.category && (
                    <p className="text-[9px] font-bold uppercase tracking-widest text-footer/40">
                      {product.category}
                    </p>
                  )}
                  <p className="text-sm font-medium text-footer leading-snug line-clamp-1">
                    {product.name}
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-footer">
                      {currency(product.price)}
                    </span>
                    {product.availableColors?.length > 0 && (
                      <span className="text-[10px] text-footer/40 uppercase tracking-wider">
                        {product.availableColors.length} colors
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Mobile View All */}
      <Link
        to="/shop"
        className="sm:hidden mt-6 flex items-center justify-center gap-2 border border-black/10 py-3 text-xs font-bold uppercase tracking-[0.2em] text-footer hover:bg-black/5 transition-colors"
      >
        View All
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </section>
  );
}
