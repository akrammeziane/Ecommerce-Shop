import heroImage from "../../assets/HERO.png";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative bg-black text-primary">
      <div className="mx-auto max-w-[1400px] px-0 sm:px-0 lg:px-0">
        <div className="relative min-h-[460px] overflow-hidden sm:min-h-[500px] lg:min-h-[580px]">
          <img
            src={heroImage}
            alt="Talqin clothing collection"
            className="absolute inset-0 h-full w-full object-cover object-left"
          />

          <div className="absolute inset-0 bg-black/0" />

          <div className="relative z-10 flex h-full max-w-[560px] flex-col justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.4em] text-accent sm:text-xs">
              New collection
            </p>

            <h1 className="font-heading text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-primary sm:text-5xl lg:text-[5rem]">
              Built different.
              <span className="mt-2 block">
                Made to <span className="text-accent">stand out.</span>
              </span>
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-6 text-white/75 sm:text-base">
              Premium streetwear for those who set their own rules.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Link to="/shop">
                <button className="bg-accent px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-footer transition hover:opacity-90 sm:px-6 sm:text-xs">
                  Shop now
                </button>
              </Link>
              <button className="border border-white/35 bg-transparent px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-footer sm:px-6 sm:text-xs">
                Explore collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
