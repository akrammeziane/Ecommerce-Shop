import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Package, User, ShieldCheck, LogOut, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogOut as logOutAction } from "../../slices/authSlice";
import { fetchMyOrders } from "../../slices/ordersSlice";
import { fetchUserById } from "../../slices/usersSlice";

const currency = (value) => `$${(Number(value) || 0).toFixed(2)}`;

export default function AccountLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SavedUserInBrowser = JSON.parse(localStorage.getItem("user"));
  const userId = SavedUserInBrowser?._id || SavedUserInBrowser?.id;

  const { user: SavedUser } = useSelector((state) => state.users);
  const { orders = [] } = useSelector((state) => state.orders);

  // Fetch a light snapshot just for the header stats. Each page fetches
  // its own paginated data separately.
  useEffect(() => {
    if (userId) {
      dispatch(fetchMyOrders({ page: 1, limit: 5 }));
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  const totalSpent = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  const menuItems = [
    { path: "/account", label: "My Orders", icon: Package },
    { path: "/account/profile", label: "Profile", icon: User },
    { path: "/account/settings", label: "Settings", icon: ShieldCheck },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logOutAction());
    navigate("/", { replace: true });
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
      {/* User Header */}
      <div className="bg-footer text-primary p-6 sm:p-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-accent">
            Client Portal
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight mt-1">
            Welcome, {SavedUser?.name || "Guest"}
          </h1>
          <p className="text-xs text-primary/70 mt-1">
            {SavedUser?.email || "N/A"}
          </p>
        </div>

        <div className="flex gap-4 border-t border-primary/10 pt-4 sm:border-t-0 sm:pt-0">
          <div className="bg-white/5 border border-primary/10 px-4 py-3 text-center">
            <p className="text-[10px] uppercase tracking-widest text-primary/60">
              Total Orders
            </p>
            <p className="font-heading text-xl font-bold mt-1 text-accent">
              {orders.length}
            </p>
          </div>
          <div className="bg-white/5 border border-primary/10 px-4 py-3 text-center">
            <p className="text-[10px] uppercase tracking-widest text-primary/60">
              Total Spent
            </p>
            <p className="font-heading text-xl font-bold mt-1 text-primary">
              {currency(totalSpent)}
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Navigation Sidebar */}
        <aside className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`w-full flex items-center justify-between p-4 text-xs font-bold uppercase tracking-[0.15em] border transition-colors ${
                  isActive(item.path)
                    ? "bg-black text-primary border-black"
                    : "bg-white text-footer border-black/10 hover:bg-black/5"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="w-4 h-4" /> {item.label}
                </span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            );
          })}

          <button
            className="w-full flex items-center justify-between p-4 text-xs font-bold uppercase tracking-[0.15em] bg-white text-red-600 border border-black/10 hover:bg-red-50 transition-colors mt-6"
            onClick={handleLogout}
          >
            <span className="flex items-center gap-3">
              <LogOut className="w-4 h-4" /> Sign Out
            </span>
          </button>
        </aside>

        {/* Page Content */}
        <main className="space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
