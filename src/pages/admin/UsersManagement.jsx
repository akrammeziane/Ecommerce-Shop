import { Search, Edit2, Trash2, Eye, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function UsersManagement() {
  const [users, setUsers] = useState([
    {
      id: "#USR001",
      name: "Sarah Anderson",
      email: "sarah@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, USA",
      joinDate: "2025-08-15",
      orders: 5,
      totalSpent: "$450.50",
      status: "Active",
      verified: true,
    },
    {
      id: "#USR002",
      name: "Michael Chen",
      email: "michael@example.com",
      phone: "+1 (555) 234-5678",
      location: "Los Angeles, USA",
      joinDate: "2025-08-20",
      orders: 3,
      totalSpent: "$289.99",
      status: "Active",
      verified: true,
    },
    {
      id: "#USR003",
      name: "Emma Wilson",
      email: "emma@example.com",
      phone: "+1 (555) 345-6789",
      location: "Chicago, USA",
      joinDate: "2025-08-25",
      orders: 1,
      totalSpent: "$79.99",
      status: "Active",
      verified: false,
    },
    {
      id: "#USR004",
      name: "David Martinez",
      email: "david@example.com",
      phone: "+1 (555) 456-7890",
      location: "Houston, USA",
      joinDate: "2025-08-10",
      orders: 8,
      totalSpent: "$1,205.50",
      status: "Active",
      verified: true,
    },
    {
      id: "#USR005",
      name: "Jessica Taylor",
      email: "jessica@example.com",
      phone: "+1 (555) 567-8901",
      location: "Phoenix, USA",
      joinDate: "2025-07-30",
      orders: 0,
      totalSpent: "$0.00",
      status: "Inactive",
      verified: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-700";
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleVerify = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, verified: !user.verified } : user,
      ),
    );
  };

  const handleStatusChange = (id, newStatus) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user,
      ),
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold text-footer mb-2">
          Users Management
        </h1>
        <p className="text-footer/60">
          Manage and monitor registered customers
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3 w-5 h-5 text-footer/40" />
          <input
            type="text"
            placeholder="Search by name, email, or user ID..."
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
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-primary border border-footer/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-footer/10 bg-hero">
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  User ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Joined
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Orders
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Total Spent
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-footer/10 hover:bg-hero transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-accent">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-footer font-medium">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-footer/80">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-footer/60">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-footer">
                    {user.orders}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-footer">
                    {user.totalSpent}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        user.status,
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-2 hover:bg-hero rounded-lg transition-colors text-footer/60 hover:text-accent"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(
                            user.id,
                            user.status === "Active" ? "Inactive" : "Active",
                          )
                        }
                        className="p-2 hover:bg-hero rounded-lg transition-colors text-footer/60 hover:text-accent"
                        title="Change status"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-footer/60 hover:text-red-600"
                        title="Delete user"
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
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-footer/60 text-lg">No users found</p>
        </div>
      )}

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-primary rounded-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-footer/10 flex items-center justify-between">
              <h3 className="text-xl font-heading font-bold text-footer">
                User Details
              </h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-footer/60 hover:text-footer"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-6 space-y-4">
              {/* Name */}
              <div>
                <p className="text-sm text-footer/60 font-medium mb-1">Name</p>
                <p className="text-footer font-semibold">{selectedUser.name}</p>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-footer/60 font-medium">Email</p>
                  <p className="text-footer">{selectedUser.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-footer/60 font-medium">Phone</p>
                  <p className="text-footer">{selectedUser.phone}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-footer/60 font-medium">Location</p>
                  <p className="text-footer">{selectedUser.location}</p>
                </div>
              </div>

              {/* Join Date */}
              <div className="bg-hero p-3 rounded-lg">
                <p className="text-sm text-footer/60 font-medium mb-1">
                  Join Date
                </p>
                <p className="text-footer">{selectedUser.joinDate}</p>
              </div>

              {/* Orders & Spending */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-hero p-3 rounded-lg">
                  <p className="text-sm text-footer/60 font-medium mb-1">
                    Total Orders
                  </p>
                  <p className="text-2xl font-bold text-accent">
                    {selectedUser.orders}
                  </p>
                </div>
                <div className="bg-hero p-3 rounded-lg">
                  <p className="text-sm text-footer/60 font-medium mb-1">
                    Total Spent
                  </p>
                  <p className="text-lg font-bold text-accent">
                    {selectedUser.totalSpent}
                  </p>
                </div>
              </div>

              {/* Verification Status */}
              <div className="flex items-center justify-between bg-hero p-3 rounded-lg">
                <div>
                  <p className="text-sm text-footer/60 font-medium">
                    Email Verified
                  </p>
                  <p className="text-footer">
                    {selectedUser.verified ? "✓ Verified" : "✗ Not Verified"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleVerify(selectedUser.id);
                    setSelectedUser({
                      ...selectedUser,
                      verified: !selectedUser.verified,
                    });
                  }}
                  className="px-3 py-1 bg-accent text-primary rounded text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  Toggle
                </button>
              </div>

              {/* Account Status */}
              <div>
                <p className="text-sm text-footer/60 font-medium mb-2">
                  Account Status
                </p>
                <select
                  value={selectedUser.status}
                  onChange={(e) => {
                    handleStatusChange(selectedUser.id, e.target.value);
                    setSelectedUser({
                      ...selectedUser,
                      status: e.target.value,
                    });
                  }}
                  className="w-full px-3 py-2 bg-hero border border-footer/10 rounded-lg text-footer focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-footer/10 flex gap-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="flex-1 px-4 py-2 bg-hero text-footer rounded-lg hover:bg-footer/5 transition-colors font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDelete(selectedUser.id);
                  setSelectedUser(null);
                }}
                className="flex-1 px-4 py-2 bg-red-500/10 text-red-600 rounded-lg hover:bg-red-500/20 transition-colors font-medium"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
