import { useState } from "react";
import {
  ChevronDown,
  Menu,
  ShoppingCart,
  UserRound,
  X,
  Package,
  Settings,
  LogOut,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogOut as logoutAction } from "../../slices/authSlice";

export default function NavBar() {
  const { productsOrderedNumber } = useSelector((state) => state.products);
  const items = [
    "T-Shirts",
    "Jackets",
    "Pants",
    "Hoodies",
    "Accessories",
    "Shoes",
  ];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.isAdmin === false) {
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
  }

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    dispatch(logoutAction());
    setMobileMenuOpen(false);
    setIsLoggedIn(false);
    setAccountOpen(false);
    navigate("/");
  };

  return (
    <header className="border-b border-black/10 bg-primary">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link to="/">
            <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-footer sm:text-4xl">
              Talqin
            </h1>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          <button
            className="text-sm font-medium uppercase tracking-[0.12em] text-footer"
            onClick={() => navigate("/")}
          >
            Home
          </button>
          {location.pathname === "/shop" ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => navigate("/shop")}
                className="flex items-center gap-1 text-sm font-medium uppercase tracking-[0.12em] text-footer"
              >
                Shop
                <ChevronDown size={15} />
              </button>
            </div>
          ) : (
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
                      onClick={() => {
                        setShopOpen(false);
                        navigate("/shop", {
                          state: { category: item, redirect: true },
                        });
                      }}
                      className="block w-full border-b border-black/5 px-4 py-3 text-left text-sm uppercase tracking-[0.14em] text-footer transition hover:bg-black/5 last:border-b-0"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            className="text-sm font-medium uppercase tracking-[0.12em] text-footer"
            onClick={() => navigate("/#new-arrivals")}
          >
            New arrivals
          </button>

          <button
            className="text-sm font-medium uppercase tracking-[0.12em] text-footer"
            onClick={() => navigate("/#collections")}
          >
            Collections
          </button>
          <button
            className="text-sm font-medium uppercase tracking-[0.12em] text-footer"
            onClick={() => navigate("/#promo")}
          >
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
          {/* Profile / Account */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                type="button"
                aria-label="Account menu"
                onClick={() => setAccountOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full p-1 pr-1 transition hover:bg-black/5"
              >
                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-footer text-[11px] font-bold text-primary">
                  {initials || <UserRound size={15} />}
                  {/* Logged-in indicator dot */}
                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-primary" />
                </span>
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-full z-50 mt-3 min-w-[220px] border border-black/10 bg-primary shadow-lg">
                  <div className="border-b border-black/10 px-4 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-footer/40">
                      Signed in as
                    </p>
                    <p className="mt-0.5 truncate text-sm font-bold text-footer">
                      {user.name}
                    </p>
                  </div>

                  <Link
                    to="/account"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-3 border-b border-black/5 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] text-footer transition hover:bg-black/5"
                  >
                    <Package size={15} className="text-accent" />
                    My Orders
                  </Link>
                  <Link
                    to="/account/profile"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-3 border-b border-black/5 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] text-footer transition hover:bg-black/5"
                  >
                    <UserRound size={15} className="text-accent" />
                    Profile
                  </Link>
                  <Link
                    to="/account/settings"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-3 border-b border-black/5 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] text-footer transition hover:bg-black/5"
                  >
                    <Settings size={15} className="text-accent" />
                    Settings
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={15} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              aria-label="Profile"
              className="rounded-full p-2 transition hover:bg-black/5"
              onClick={() => navigate("/login")}
            >
              <UserRound size={18} />
            </button>
          )}

          <button
            aria-label="Shopping cart"
            onClick={() => navigate("/cart")}
            className="relative rounded-full p-2 transition hover:bg-black/5"
          >
            <ShoppingCart size={18} />
            <span className="absolute -right-1.5 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-primary">
              {productsOrderedNumber}
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
            {/* Mobile Account Block */}
            {isLoggedIn ? (
              <div className="mb-1 flex items-center gap-3 border-b border-black/10 pb-4">
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-footer text-xs font-bold text-primary">
                  {initials || <UserRound size={16} />}
                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-primary" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-footer/40">
                    Signed in as
                  </p>
                  <p className="truncate text-sm font-bold text-footer">
                    {user.name}
                  </p>
                </div>
              </div>
            ) : (
              <button
                className="mb-1 flex items-center gap-2 border-b border-black/10 pb-4 text-left text-sm font-medium uppercase tracking-[0.12em] text-footer"
                onClick={() => navigate("/login")}
              >
                <UserRound size={16} />
                Sign In
              </button>
            )}

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
                      onClick={() => {
                        setShopOpen(false);
                        navigate("/shop", {
                          state: { category: item, redirect: true },
                        });
                      }}
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

            {isLoggedIn && (
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 border-t border-black/10 pt-4 text-left text-sm font-medium uppercase tracking-[0.12em] text-red-600"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
