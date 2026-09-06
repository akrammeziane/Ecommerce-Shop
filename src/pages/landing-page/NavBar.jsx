import { useState } from "react";
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const items = ["HOODIES", "T-SHIRTS", "PANTS", "JACKETS", "ACCESSORIES"];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const navigate = useNavigate();
  // const scrollToSection = (sectionId) => {
  //   console.log(sectionId);
  //   const section = document.getElementById(sectionId);
  //   console.log(section);
  //   if (section) {
  //     section.scrollIntoView({ behavior: "smooth" });
  //     setMobileMenuOpen(false);
  //   }
  // };

  return (
    <header className="border-b border-black/10 bg-primary">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-footer sm:text-4xl">
            Talqin
          </h1>
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          <button
            className="text-sm font-medium uppercase tracking-[0.12em] text-footer"
            onClick={() => navigate("/")}
          >
            Home
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShopOpen((prev) => !prev)}
              className="flex items-center gap-1 text-sm font-medium uppercase tracking-[0.12em] text-footer"
            >
              Shop
              <ChevronDown size={15} />
            </button>

            {shopOpen && (
              <div className="absolute left-0 top-full z-50 mt-3 min-w-[200px] border border-black/10 bg-primary shadow-lg">
                {items.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="block w-full border-b border-black/5 px-4 py-3 text-left text-sm uppercase tracking-[0.14em] text-footer transition hover:bg-black/5 last:border-b-0"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="text-sm font-medium uppercase tracking-[0.12em] text-footer"
            onClick={() => navigate("/#new-arrivals")}
          >
            New arrivals
          </button>

          <button className="text-sm font-medium uppercase tracking-[0.12em] text-footer">
            Collections
          </button>
          <button className="text-sm font-medium uppercase tracking-[0.12em] text-footer">
            Sale
          </button>
          <button
            className="text-sm font-medium uppercase tracking-[0.12em] text-footer"
            onClick={() => navigate("/#about")}
          >
            About us
          </button>
        </nav>

        <div className="flex items-center gap-3 text-footer">
          <button
            aria-label="Search"
            className="rounded-full p-2 transition hover:bg-black/5"
          >
            <Search size={18} />
          </button>
          <button
            aria-label="Profile"
            className="rounded-full p-2 transition hover:bg-black/5"
            onClick={() => navigate("/login")}
          >
            <UserRound size={18} />
          </button>
          <button
            aria-label="Shopping cart"
            className="relative rounded-full p-2 transition hover:bg-black/5"
          >
            <ShoppingCart size={18} />
            <span className="absolute -right-1.5 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-primary">
              0
            </span>
          </button>

          <button
            type="button"
            aria-label="Open menu"
            className="rounded-full p-2 transition hover:bg-black/5 lg:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-black/10 bg-primary px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            <button
              className="text-left text-sm font-medium uppercase tracking-[0.12em] text-footer"
              onClick={() => navigate("/")}
            >
              Home
            </button>

            <div>
              <button
                type="button"
                onClick={() => setShopOpen((prev) => !prev)}
                className="flex w-full items-center justify-between text-left text-sm font-medium uppercase tracking-[0.12em] text-footer"
              >
                <span>Shop</span>
                <ChevronDown
                  size={15}
                  className={shopOpen ? "rotate-180" : ""}
                />
              </button>

              {shopOpen && (
                <div className="mt-2 flex flex-col gap-2 border-l border-black/10 pl-3">
                  {items.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="text-left text-sm uppercase tracking-[0.12em] text-footer/80"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => navigate("/#new-arrivals")}
              className="text-left text-sm font-medium uppercase tracking-[0.12em] text-footer"
            >
              New arrivals
            </button>
            <button className="text-left text-sm font-medium uppercase tracking-[0.12em] text-footer">
              Collections
            </button>
            <button className="text-left text-sm font-medium uppercase tracking-[0.12em] text-footer">
              Sale
            </button>
            <button
              className="text-left text-sm font-medium uppercase tracking-[0.12em] text-footer"
              onClick={() => navigate("/#about")}
            >
              About us
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
