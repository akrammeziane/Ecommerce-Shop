import { Link, useNavigate } from "react-router-dom";
export default function PromoSection() {
  const navigate = useNavigate();
  return (
    <section
      className="mx-auto mt-10 grid max-w-[1400px] gap-5 px-4 sm:px-6 lg:grid-cols-3 lg:px-8 "
      id="promo"
    >
      <div className="flex  h-full min-h-[120px] flex-col justify-between bg-[#f2f2f2] p-4 sm:min-h-[140px] sm:p-5 ">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-footer/70 sm:text-[10px]">
            Join the movement
          </p>
          <h3 className="mt-2 max-w-xs font-heading text-[1.8rem] font-bold uppercase leading-none text-footer sm:text-[2.1rem]">
            Be part of something real.
          </h3>
        </div>
        <Link to="/shop">
          <button className="mt-4 inline-flex w-fit items-center justify-center bg-accent px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.2em] text-primary transition hover:opacity-90 sm:text-[10px]">
            Shop now
          </button>
        </Link>
      </div>

      <div className="flex  h-full min-h-[120px] flex-col justify-between bg-[#1a1a1a] p-4 sm:min-h-[140px] sm:p-5">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-white/60 sm:text-[10px]">
            Seasonal sale
          </p>
          <h3 className="mt-2 max-w-xs font-heading text-[1.8rem] font-bold uppercase leading-none text-white sm:text-[2.1rem]">
            Fresh collection.
          </h3>
        </div>

        <button
          className="mt-4 inline-flex w-fit items-center justify-center bg-white px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a] transition hover:opacity-80 sm:text-[10px]"
          onClick={() => navigate("/shop", { state: { category: "Hoodies" } })}
        >
          Explore
        </button>
      </div>
      <div className="flex  h-full min-h-[120px] flex-col justify-between bg-gradient-to-br from-[#2d5a4f] to-[#1a3a35] p-4 sm:min-h-[140px] sm:p-5">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-emerald-200/70 sm:text-[10px]">
            VIP members
          </p>
          <h3 className="mt-2 max-w-xs font-heading text-[1.8rem] font-bold uppercase leading-none text-emerald-50 sm:text-[2.1rem]">
            Exclusive perks.
          </h3>
        </div>
        <Link to="/login">
          <button className="mt-4 inline-flex w-fit items-center justify-center bg-emerald-400 px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#1a3a35] transition hover:bg-emerald-300 sm:text-[10px]">
            Join now
          </button>
        </Link>
      </div>
    </section>
  );
}
