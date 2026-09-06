import { Search, Edit2, Trash2, Eye } from "lucide-react";
import { useState } from "react";

export default function OrdersManagement() {
  const [orders, setOrders] = useState([
    {
      id: "#ORD001",
      customer: "John Doe",
      email: "john@example.com",
      amount: "$89.99",
      status: "Completed",
      date: "2025-08-30",
      items: 3,
    },
    {
      id: "#ORD002",
      customer: "Jane Smith",
      email: "jane@example.com",
      amount: "$129.50",
      status: "Pending",
      date: "2025-08-29",
      items: 2,
    },
    {
      id: "#ORD003",
      customer: "Mike Johnson",
      email: "mike@example.com",
      amount: "$45.99",
      status: "Shipped",
      date: "2025-08-28",
      items: 1,
    },
    {
      id: "#ORD004",
      customer: "Sarah Williams",
      email: "sarah@example.com",
      amount: "$199.99",
      status: "Completed",
      date: "2025-08-27",
      items: 5,
    },
    {
      id: "#ORD005",
      customer: "Tom Brown",
      email: "tom@example.com",
      amount: "$75.50",
      status: "Cancelled",
      date: "2025-08-26",
      items: 2,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold text-footer mb-2">
          Orders Management
        </h1>
        <p className="text-footer/60">Manage and track all customer orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3 w-5 h-5 text-footer/40" />
          <input
            type="text"
            placeholder="Search by order ID or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Shipped</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-primary border border-footer/10 rounded-xl overflow-hidden">
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
                  Items
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-footer/10 hover:bg-hero transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-accent">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-footer">
                        {order.customer}
                      </p>
                      <p className="text-xs text-footer/60">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-footer">
                    {order.items}
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
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-hero rounded-lg transition-colors text-footer/60 hover:text-accent">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-hero rounded-lg transition-colors text-footer/60 hover:text-accent">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-footer/60 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-footer/60 text-lg">No orders found</p>
        </div>
      )}
    </div>
  );
}
