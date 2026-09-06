import { BarChart3, ShoppingCart, Package, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      label: "Total Revenue",
      value: "$12,459",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Total Orders",
      value: "184",
      icon: ShoppingCart,
      color: "text-accent",
      bgColor: "bg-accent/5",
    },
    {
      label: "Total Products",
      value: "42",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Page Views",
      value: "2,847",
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD001",
      customer: "John Doe",
      amount: "$89.99",
      status: "Completed",
      date: "2025-08-30",
    },
    {
      id: "#ORD002",
      customer: "Jane Smith",
      amount: "$129.50",
      status: "Pending",
      date: "2025-08-29",
    },
    {
      id: "#ORD003",
      customer: "Mike Johnson",
      amount: "$45.99",
      status: "Shipped",
      date: "2025-08-28",
    },
    {
      id: "#ORD004",
      customer: "Sarah Williams",
      amount: "$199.99",
      status: "Completed",
      date: "2025-08-27",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold text-footer mb-2">
          Dashboard
        </h1>
        <p className="text-footer/60">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-primary border border-footer/10 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-footer/60 text-sm font-medium mb-2">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold font-heading text-footer">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-primary border border-footer/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-footer/10">
          <h2 className="text-2xl font-heading font-bold text-footer">
            Recent Orders
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-footer/10 bg-hero">
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-footer/10 hover:bg-hero transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-accent">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-footer">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-footer">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-footer/60">
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
