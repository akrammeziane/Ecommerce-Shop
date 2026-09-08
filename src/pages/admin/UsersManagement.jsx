import {
  Search,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  PackageCheck,
  CheckCircle2,
  XCircle,
  Users,
  UserCheck,
  Calendar,
  AlertCircle,
  X,
  Filter,
  Loader2,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "@/slices/usersSlice";

export default function UsersManagement() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const { users, loading } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionFeedback, setActionFeedback] = useState({
    type: "",
    message: "",
  });

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user._id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        roleFilter === "All" ||
        (roleFilter === "Admin" && user.isAdmin) ||
        (roleFilter === "Customer" && !user.isAdmin);

      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  const handleDelete = async (id) => {
    setActionFeedback({ type: "", message: "" });
    try {
      await dispatch(deleteUser(id)).unwrap();
      setActionFeedback({
        type: "success",
        message: "User deleted successfully.",
      });
      if (selectedUser?._id === id) setSelectedUser(null);
    } catch (error) {
      setActionFeedback({
        type: "error",
        message: error.message || "Failed to delete user.",
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateId = (id) => `#${id.slice(-6)}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold text-footer mb-2">
          Users Management
        </h1>
        <p className="text-footer/60">
          Monitor registered accounts, user roles, and ordering histories
        </p>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-primary border border-footer/10 p-5 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
              Total Users
            </p>
            <p className="text-2xl font-bold text-footer">{users.length}</p>
          </div>
          <div className="p-3 bg-accent/10 text-accent rounded-xl">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-primary border border-footer/10 p-5 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
              Customers
            </p>
            <p className="text-2xl font-bold text-footer">
              {users.filter((u) => !u.isAdmin).length}
            </p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-primary border border-footer/10 p-5 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
              Admins
            </p>
            <p className="text-2xl font-bold text-footer">
              {users.filter((u) => u.isAdmin).length}
            </p>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-600 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>
      {actionFeedback.message && (
        <div
          role="alert"
          className={`flex items-start justify-between gap-4 rounded-lg border px-4 py-3 text-sm ${
            actionFeedback.type === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-green-200 bg-green-50 text-green-700"
          }`}
        >
          <div className="flex items-center gap-2">
            {actionFeedback.type === "error" ? (
              <AlertCircle className="h-5 w-5 shrink-0" />
            ) : (
              <CheckCircle2 className="h-5 w-5 shrink-0" />
            )}
            <span>{actionFeedback.message}</span>
          </div>
          <button
            type="button"
            aria-label="Dismiss message"
            onClick={() => setActionFeedback({ type: "", message: "" })}
            className="shrink-0 opacity-70 transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-3 w-5 h-5 text-footer/40" />
          <input
            type="text"
            placeholder="Search by name, email, or user ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 text-sm bg-primary border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          />
        </div>

        <div className="relative w-full sm:w-48">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-footer/40 pointer-events-none" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full h-10 pl-10 pr-8 text-sm bg-primary border border-footer/10 rounded-lg text-footer focus:outline-none focus:ring-2 focus:ring-accent appearance-none cursor-pointer transition-all"
          >
            <option value="All">All Roles</option>
            <option value="Customer">Customers Only</option>
            <option value="Admin">Admins Only</option>
          </select>
        </div>
      </div>

      {/* Users Data Table */}
      <div className="bg-primary border border-footer/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-footer/10 bg-hero">
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  User ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  User Info
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Joined Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Orders
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Bought
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-footer/10 text-footer">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12">
                    <div className="flex items-center justify-center">
                      <Loader2
                        className="h-8 w-8 animate-spin text-accent"
                        aria-label="Loading users..."
                      />
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12">
                    <div className="text-footer/60 text-lg">
                      No matching users found.
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-hero/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-accent font-semibold whitespace-nowrap">
                      {truncateId(user._id)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-footer leading-tight">
                        {user.name}
                      </div>
                      <div className="text-xs text-footer/60 mt-0.5">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.isAdmin ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600">
                          <ShieldCheck className="w-3 h-3" />
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-footer/10 text-footer/80">
                          Customer
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-footer/70 whitespace-nowrap">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-center font-medium">
                      {user.productsOrdered?.length || 0}
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-emerald-600">
                      {user.productsBought?.length || 0}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="p-2 hover:bg-hero rounded-lg transition-colors text-footer/60 hover:text-accent"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-footer/60 hover:text-red-600"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-primary border border-footer/10 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-footer/10 flex items-center justify-between bg-hero/30">
              <div>
                <h3 className="text-lg font-bold text-footer">User Details</h3>
                <p className="text-xs font-mono text-accent">
                  ID: {selectedUser._id}
                </p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-1.5 text-footer/60 hover:text-footer rounded-lg transition-colors hover:bg-hero"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Profile Card Header */}
              <div className="flex items-center justify-between p-4 bg-hero/50 rounded-xl border border-footer/5">
                <div>
                  <p className="font-bold text-base text-footer">
                    {selectedUser.name}
                  </p>
                  <p className="text-xs text-footer/60 mt-0.5">
                    {selectedUser.isAdmin ? "Administrator" : "Customer"}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedUser.isEmailVerified
                      ? "bg-emerald-500/10 text-emerald-600"
                      : "bg-amber-500/10 text-amber-600"
                  }`}
                >
                  {selectedUser.isEmailVerified ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" /> Unverified
                    </>
                  )}
                </span>
              </div>

              {/* Contact Information */}
              <div className="space-y-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-footer/40">
                  Contact Information
                </p>

                <div className="flex items-center gap-3 text-sm text-footer bg-hero/30 p-2.5 rounded-lg border border-footer/5">
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <span>{selectedUser.email}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-footer bg-hero/30 p-2.5 rounded-lg border border-footer/5">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <span>{selectedUser.phone || "Not provided"}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-footer bg-hero/30 p-2.5 rounded-lg border border-footer/5">
                  <MapPin className="w-4 h-4 text-accent shrink-0" />
                  <span>{selectedUser.address || "No address on file"}</span>
                </div>
              </div>

              {/* Order Activity */}
              <div className="space-y-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-footer/40">
                  Order Summary
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-hero/40 p-3.5 rounded-xl border border-footer/5 flex items-center gap-3">
                    <div className="p-2.5 bg-accent/10 text-accent rounded-lg">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-footer/60">Ordered</p>
                      <p className="text-lg font-bold text-footer">
                        {selectedUser.productsOrdered?.length || 0}
                      </p>
                    </div>
                  </div>

                  <div className="bg-hero/40 p-3.5 rounded-xl border border-footer/5 flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-500/10 text-emerald-600 rounded-lg">
                      <PackageCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-footer/60">Purchased</p>
                      <p className="text-lg font-bold text-footer">
                        {selectedUser.productsBought?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div className="pt-3 border-t border-footer/10 flex justify-between text-xs text-footer/50">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Joined:{" "}
                  {formatDate(selectedUser.createdAt)}
                </span>
                <span>Updated: {formatDate(selectedUser.updatedAt)}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 border-t border-footer/10 bg-hero/30 flex justify-end gap-2.5">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-hero text-footer rounded-lg text-xs font-semibold hover:bg-footer/10 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => handleDelete(selectedUser._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors shadow-sm"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
