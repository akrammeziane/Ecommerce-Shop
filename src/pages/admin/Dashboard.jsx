import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboardData } from "../../slices/dashboardSlice";
import {
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Clock,
  XCircle,
  Package,
  AlertTriangle,
  PackageX,
  Users,
  UserPlus,
  Repeat,
  ArrowUpRight,
  Loader2,
} from "lucide-react";

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const {
    totalRevenue = 0,
    monthlyRevenue = 0,
    averageOrderValue = 0,
    totalOrdersCount = 0,
    pendingOrdersCount = 0,
    cancelledOrdersCount = 0,
    deliveredOrdersCount = 0,
    recentOrdersList = [],
    totalProductsCount = 0,
    lowStockProductsCountValue = 0,
    outOfStockProductsCountValue = 0,
    topSellingProductsList = [],
    totalUsersCountValue = 0,
    recentRegistredUsersList = [],
    numbersOfUserswithAtLeastOneOrderValue = 0,
    loading,
    error,
  } = useSelector((state) => state.dashboard);

  const cancelledRate =
    totalOrdersCount > 0 ? (cancelledOrdersCount / totalOrdersCount) * 100 : 0;

  const newRegistrationsThisMonth = recentRegistredUsersList.filter((u) => {
    if (!u?.createdAt) return false;
    const created = new Date(u.createdAt);
    const now = new Date();
    return (
      created.getMonth() === now.getMonth() &&
      created.getFullYear() === now.getFullYear()
    );
  }).length;

  const inactiveUsers = Math.max(
    totalUsersCountValue - numbersOfUserswithAtLeastOneOrderValue,
    0,
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2
          className="h-8 w-8 animate-spin text-accent"
          aria-label="Loading dashboard"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-3">
        <AlertTriangle className="w-8 h-8 text-red-500" />
        <p className="text-footer/70 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold text-footer mb-2">
          Dashboard
        </h1>
        <p className="text-footer/60">
          Overview of revenue, orders, products, and customers
        </p>
      </div>

      {/* 1. Revenue & Sales Statistics */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-footer uppercase tracking-wider">
          Revenue & Sales
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-primary border border-footer/10 p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
                  Grand Total Revenue
                </p>
                <p className="text-2xl font-bold text-footer">
                  {totalRevenue.toFixed(2)} DZD
                </p>
              </div>
              <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-primary border border-footer/10 p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
                  Revenue This Month
                </p>
                <p className="text-2xl font-bold text-footer">
                  {monthlyRevenue.toFixed(2)} DZD
                </p>
              </div>
              <div className="p-3 bg-accent/10 text-accent rounded-xl">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-primary border border-footer/10 p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
                  Average Order Value
                </p>
                <p className="text-2xl font-bold text-footer">
                  {averageOrderValue.toFixed(2)} DZD
                </p>
              </div>
              <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-footer/10" />

      {/* 2. Orders Overview */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-footer uppercase tracking-wider">
          Orders Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-primary border border-footer/10 p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-footer">
                  {totalOrdersCount}
                </p>
              </div>
              <div className="p-3 bg-accent/10 text-accent rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-primary border border-footer/10 p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
                  Pending Orders
                </p>
                <p className="text-2xl font-bold text-footer">
                  {pendingOrdersCount}
                </p>
              </div>
              <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl">
                <Clock className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-primary border border-footer/10 p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
                  Delivered Orders
                </p>
                <p className="text-2xl font-bold text-footer">
                  {deliveredOrdersCount}
                </p>
              </div>
              <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl">
                <Package className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-primary border border-footer/10 p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
                  Cancelled Orders
                </p>
                <p className="text-2xl font-bold text-footer">
                  {cancelledOrdersCount}
                  <span className="text-sm font-semibold text-footer/50 ml-1.5">
                    ({cancelledRate.toFixed(1)}%)
                  </span>
                </p>
              </div>
              <div className="p-3 bg-red-500/10 text-red-600 rounded-xl">
                <XCircle className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-footer/10" />

      {/* 3. Product & Inventory Analytics */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-footer uppercase tracking-wider">
          Product & Inventory
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-primary border border-footer/10 p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-footer">
                  {totalProductsCount}
                </p>
              </div>
              <div className="p-3 bg-accent/10 text-accent rounded-xl">
                <Package className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-primary border border-footer/10 p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
                  Low Stock
                </p>
                <p className="text-2xl font-bold text-footer">
                  {lowStockProductsCountValue}
                </p>
              </div>
              <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-primary border border-footer/10 p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
                  Out of Stock
                </p>
                <p className="text-2xl font-bold text-footer">
                  {outOfStockProductsCountValue}
                </p>
              </div>
              <div className="p-3 bg-red-500/10 text-red-600 rounded-xl">
                <PackageX className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-footer/10" />

      {/* 4. User & Customer Base Insights */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-footer uppercase tracking-wider">
          Users & Customers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-primary border border-footer/10 p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
                  Total Registered Users
                </p>
                <p className="text-2xl font-bold text-footer">
                  {totalUsersCountValue}
                </p>
              </div>
              <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl">
                <Users className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-primary border border-footer/10 p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
                  New This Month
                </p>
                <p className="text-2xl font-bold text-footer">
                  {newRegistrationsThisMonth}
                </p>
              </div>
              <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl">
                <UserPlus className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-primary border border-footer/10 p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
                  Buyers vs Inactive
                </p>
                <p className="text-2xl font-bold text-footer">
                  {numbersOfUserswithAtLeastOneOrderValue} / {inactiveUsers}
                </p>
              </div>
              <div className="p-3 bg-accent/10 text-accent rounded-xl">
                <Repeat className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-footer/10" />

      {/* Activity: Recent Orders & Top-Selling Products */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-footer uppercase tracking-wider">
          Activity
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Orders */}
          <div className="bg-primary border border-footer/10 rounded-xl shadow-sm overflow-hidden lg:col-span-2">
            <div className="px-5 py-4 border-b border-footer/10 bg-hero/30">
              <h3 className="text-sm font-bold text-footer">Recent Orders</h3>
              <p className="text-xs text-footer/50 mt-0.5">
                Latest orders across your store
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-footer/10">
                    <th className="px-5 py-2 text-left text-xs font-semibold text-footer/50">
                      Order
                    </th>
                    <th className="px-5 py-2 text-left text-xs font-semibold text-footer/50">
                      Customer
                    </th>
                    <th className="px-5 py-2 text-left text-xs font-semibold text-footer/50">
                      Amount
                    </th>
                    <th className="px-5 py-2 text-left text-xs font-semibold text-footer/50">
                      Status
                    </th>
                    <th className="px-5 py-2 text-left text-xs font-semibold text-footer/50">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-footer/10">
                  {recentOrdersList.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-8 text-sm text-footer/50"
                      >
                        No recent orders.
                      </td>
                    </tr>
                  ) : (
                    recentOrdersList.map((order) => (
                      <tr
                        key={order._id}
                        className="hover:bg-hero/30 transition-colors"
                      >
                        <td className="px-5 py-3 font-mono text-xs text-accent font-semibold whitespace-nowrap">
                          {order._id.slice(-6).toUpperCase()}
                        </td>
                        <td className="px-5 py-3 text-sm text-footer whitespace-nowrap">
                          {order.userId
                            ? order.userId.name
                            : order.guestInfo?.name || "N/A"}
                        </td>
                        <td className="px-5 py-3 text-sm font-bold text-footer whitespace-nowrap">
                          {order.totalPrice.toFixed(2)} DZD
                        </td>
                        <td className="px-5 py-3 whitespace-nowrap">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${
                              order.status === "pending"
                                ? "bg-amber-500/10 text-amber-600"
                                : order.status === "shipped"
                                  ? "bg-blue-500/10 text-blue-600"
                                  : order.status === "delivered"
                                    ? "bg-emerald-500/10 text-emerald-600"
                                    : order.status === "cancelled"
                                      ? "bg-red-500/10 text-red-600"
                                      : "bg-footer/10 text-footer/60"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-xs text-footer/60 whitespace-nowrap">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top-Selling Products + Recently Registered Users */}
          <div className="space-y-4">
            <div className="bg-primary border border-footer/10 rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-footer/10 bg-hero/30">
                <h3 className="text-sm font-bold text-footer">
                  Top-Selling Products
                </h3>
                <p className="text-xs text-footer/50 mt-0.5">
                  Ranked by units sold
                </p>
              </div>
              <div className="p-5 space-y-3">
                {topSellingProductsList.length === 0 ? (
                  <p className="text-sm text-footer/50 text-center py-8">
                    No sales data yet.
                  </p>
                ) : (
                  topSellingProductsList.map((product, index) => (
                    <div
                      key={product.productId || index}
                      className="flex items-center justify-between gap-3 p-2.5 rounded-lg hover:bg-hero/30 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-sm font-medium text-footer truncate">
                          {product.name || "Unknown product"}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-footer/60 whitespace-nowrap">
                        {product.totalSold} sold
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-primary border border-footer/10 rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-footer/10 bg-hero/30">
                <h3 className="text-sm font-bold text-footer">
                  Recently Registered
                </h3>
                <p className="text-xs text-footer/50 mt-0.5">Last 5 signups</p>
              </div>
              <div className="p-5 space-y-3">
                {recentRegistredUsersList.length === 0 ? (
                  <p className="text-sm text-footer/50 text-center py-8">
                    No new users yet.
                  </p>
                ) : (
                  recentRegistredUsersList.map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center justify-between gap-3 p-2.5 rounded-lg hover:bg-hero/30 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-footer truncate">
                          {user.name || "N/A"}
                        </p>
                        <p className="text-xs text-footer/50 truncate">
                          {user.email || "N/A"}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-footer/60 whitespace-nowrap">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
