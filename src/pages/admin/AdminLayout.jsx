import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  BarChart3,
  Package,
  ShoppingCart,
  User,
  Users,
  LogOut,
  X,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LogOut as logOutAction } from "../../slices/authSlice";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: BarChart3 },
    { path: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { path: "/admin/products", label: "Products", icon: Package },
    { path: "/admin/users", label: "Users", icon: Users },
    { path: "/admin/profile", label: "Profile", icon: User },
  ];
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutAction());
    navigate("/", { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-primary text-footer">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-footer transition-all duration-300 flex flex-col border-r border-accent/10`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 border-b border-accent/10">
          <div
            className={`flex items-center gap-3 ${!sidebarOpen && "justify-center w-full"}`}
          >
            <div className="w-10 h-10 bg-accent rounded flex items-center justify-center">
              <Package className="w-6 h-6 text-primary" />
            </div>
            {sidebarOpen && (
              <div>
                <p className="font-bold text-primary font-heading">Admin</p>
                <p className="text-xs text-primary/60">Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-3 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-accent text-primary"
                    : "text-primary/70 hover:bg-accent/10 hover:text-primary"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-accent/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-4 bg-primary border-b border-footer/10">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-hero rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-heading font-bold text-lg">Welcome Admin</p>
              <p className="text-sm text-footer/60">
                Manage your store efficiently
              </p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
