import { useState } from "react";
import {
  Package,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  RefreshCw,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOut as logOutAction } from "../../slices/authSlice";

const mockOrders = [
  {
    id: "TLQ-9042",
    date: "August 24, 2026",
    status: "In Transit",
    total: "$138.00",
    items: [
      {
        name: "Chaos Tee - Black",
        size: "L",
        price: "$49.00",
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Washed Hoodie - Charcoal",
        size: "XL",
        price: "$89.00",
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "TLQ-8110",
    date: "July 12, 2026",
    status: "Delivered",
    total: "$99.00",
    items: [
      {
        name: "Utility Cargo Pants - Black",
        size: "32",
        price: "$99.00",
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
];

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("orders");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutAction());
    navigate("/", { replace: true });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "In Transit":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-700 text-[10px] font-bold uppercase tracking-wider border border-amber-500/20">
            <Truck className="w-3 h-3" /> In Transit
          </span>
        );
      case "Delivered":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-700 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" /> Delivered
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/5 text-footer/70 text-[10px] font-bold uppercase tracking-wider border border-black/10">
            <Clock className="w-3 h-3" /> Processing
          </span>
        );
    }
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
            Welcome, Alex Vance
          </h1>
          <p className="text-xs text-primary/70 mt-1">alex.vance@example.com</p>
        </div>

        <div className="flex gap-4 border-t border-primary/10 pt-4 sm:border-t-0 sm:pt-0">
          <div className="bg-white/5 border border-primary/10 px-4 py-3 text-center">
            <p className="text-[10px] uppercase tracking-widest text-primary/60">
              Total Orders
            </p>
            <p className="font-heading text-xl font-bold mt-1 text-accent">2</p>
          </div>
          <div className="bg-white/5 border border-primary/10 px-4 py-3 text-center">
            <p className="text-[10px] uppercase tracking-widest text-primary/60">
              Total Spent
            </p>
            <p className="font-heading text-xl font-bold mt-1 text-primary">
              $237.00
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Navigation Sidebar */}
        <aside className="space-y-1">
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center justify-between p-4 text-xs font-bold uppercase tracking-[0.15em] border transition-colors ${
              activeTab === "orders"
                ? "bg-black text-primary border-black"
                : "bg-white text-footer border-black/10 hover:bg-black/5"
            }`}
          >
            <span className="flex items-center gap-3">
              <Package className="w-4 h-4" /> Active Orders
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab("bought")}
            className={`w-full flex items-center justify-between p-4 text-xs font-bold uppercase tracking-[0.15em] border transition-colors ${
              activeTab === "bought"
                ? "bg-black text-primary border-black"
                : "bg-white text-footer border-black/10 hover:bg-black/5"
            }`}
          >
            <span className="flex items-center gap-3">
              <ShoppingBag className="w-4 h-4" /> Purchased Items
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            className="w-full flex items-center justify-between p-4 text-xs font-bold uppercase tracking-[0.15em] bg-white text-red-600 border border-black/10 hover:bg-red-50 transition-colors mt-6"
            onClick={handleLogout}
          >
            <span className="flex items-center gap-3">
              <LogOut className="w-4 h-4" /> Sign Out
            </span>
          </button>
        </aside>

        {/* Tab Content */}
        <main className="space-y-6">
          {activeTab === "orders" && (
            <div className="space-y-6">
              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-footer">
                Order History & Tracking
              </h2>

              {mockOrders.map((order) => (
                <div
                  key={order.id}
                  className="border border-black/10 bg-white p-6"
                >
                  {/* Order Top Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-black/10 text-xs text-footer">
                    <div>
                      <p className="font-bold uppercase tracking-widest">
                        {order.id}
                      </p>
                      <p className="text-footer/60 text-[11px] mt-0.5">
                        {order.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {getStatusBadge(order.status)}
                      <span className="font-bold text-sm">{order.total}</span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mt-4 divide-y divide-black/5">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="py-4 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-20 object-cover bg-hero border border-black/10"
                          />
                          <div>
                            <p className="text-sm font-bold text-footer">
                              {item.name}
                            </p>
                            <p className="text-xs text-footer/60 mt-1">
                              Size: {item.size} | Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-footer">
                          {item.price}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-4 pt-4 border-t border-black/10 flex justify-end gap-3">
                    <button className="border border-black px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-footer hover:bg-black hover:text-primary transition">
                      Track Package
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "bought" && (
            <div className="space-y-6">
              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-footer">
                Purchased Products Catalog
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mockOrders
                  .flatMap((order) => order.items)
                  .map((product, idx) => (
                    <div
                      key={idx}
                      className="border border-black/10 bg-white p-4 flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-52 overflow-hidden bg-hero">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p className="mt-3 text-sm font-bold text-footer">
                          {product.name}
                        </p>
                        <p className="text-xs text-footer/60 mt-1">
                          Size: {product.size}
                        </p>
                        <p className="text-sm font-semibold text-footer mt-2">
                          {product.price}
                        </p>
                      </div>

                      <button className="mt-4 w-full bg-accent px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary transition hover:bg-footer flex items-center justify-center gap-2">
                        <RefreshCw className="w-3 h-3" /> Buy Again
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
