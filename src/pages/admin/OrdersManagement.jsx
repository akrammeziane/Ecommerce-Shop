import {
  Search,
  Trash2,
  Eye,
  Edit2,
  ShoppingBag,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  Calendar,
  X,
  Filter,
  DollarSign,
  User,
  Loader2,
  AlertCircle,
  AlertTriangle,
  Mail,
  Phone,
  MapPin,
  Image as ImageIcon,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  editOrderStatus,
  deleteOrder,
} from "@/slices/ordersSlice";
export default function OrdersManagement() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const { orders, loading, error } = useSelector((state) => state.orders);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [deletingOrder, setDeletingOrder] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [actionFeedback, setActionFeedback] = useState({
    type: "",
    message: "",
  });
  const feedbackMessage = error
    ? `${error.message} session expired. Please login again.`
    : actionFeedback.message;

  const feedbackType = error ? "error" : actionFeedback.type;

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const { userId, guestInfo } = order;
        const matchesSearch =
          order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          userId._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          userId.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (guestInfo &&
            guestInfo.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (guestInfo &&
            guestInfo.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (guestInfo &&
            guestInfo._id.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (guestInfo &&
            guestInfo.email.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus =
          statusFilter === "All" ||
          order.status.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesStatus;
      }),
    [orders, searchTerm, statusFilter],
  );

  const handleDelete = async (id) => {
    setActionFeedback({ type: "", message: "" });
    try {
      await dispatch(deleteOrder(id)).unwrap();
      if (selectedOrder?._id === id) setSelectedOrder(null);
      if (editingOrder?._id === id) setEditingOrder(null);
      setDeletingOrder(null);
      setActionFeedback({
        type: "success",
        message: "Order deleted successfully.",
      });
      setTimeout(() => {
        setActionFeedback({ type: "", message: "" });
      }, 5000);
    } catch (error) {
      setDeletingOrder(null);
      setActionFeedback({
        type: "error",
        message: error.message || "Failed to delete order.",
      });
      setTimeout(() => {
        setActionFeedback({ type: "", message: "" });
      }, 5000);
    }
  };

  const handleOpenEdit = (order) => {
    setEditingOrder(order);
    setEditStatus(order.status);
  };

  const handleSaveStatus = async () => {
    if (!editingOrder) return;
    setActionFeedback({ type: "", message: "" });
    try {
      await dispatch(
        editOrderStatus({ orderId: editingOrder._id, status: editStatus }),
      ).unwrap();
      setEditingOrder(null);
      setActionFeedback({
        type: "success",
        message: "Order status updated successfully.",
      });
      setTimeout(() => {
        setActionFeedback({ type: "", message: "" });
      }, 5000);
    } catch (error) {
      setEditingOrder(null);
      setActionFeedback({
        type: "error",
        message: error.message || "Failed to update order status.",
      });
      setTimeout(() => {
        setActionFeedback({ type: "", message: "" });
      }, 5000);
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

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case "shipped":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600">
            <Truck className="w-3 h-3" />
            Shipped
          </span>
        );
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="w-3 h-3" />
            Delivered
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600">
            <XCircle className="w-3 h-3" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-footer/10 text-footer/80">
            {status}
          </span>
        );
    }
  };

  const totalRevenue = orders.reduce(
    (acc, order) =>
      order.status !== "cancelled" ? acc + order.totalPrice : acc,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold text-footer mb-2">
          Orders Management
        </h1>
        <p className="text-footer/60">
          Monitor customer orders, status updates, and order details
        </p>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-primary border border-footer/10 p-5 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
              Total Orders
            </p>
            <p className="text-2xl font-bold text-footer">{orders.length}</p>
          </div>
          <div className="p-3 bg-accent/10 text-accent rounded-xl">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-primary border border-footer/10 p-5 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
              Total Revenue
            </p>
            <p className="text-2xl font-bold text-footer">
              ${totalRevenue.toFixed(2)}
            </p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-primary border border-footer/10 p-5 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
              Pending Orders
            </p>
            <p className="text-2xl font-bold text-footer">
              {orders.filter((o) => o.status === "pending").length}
            </p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>
      {feedbackMessage && (
        <div
          role="alert"
          className={`flex items-start justify-between gap-4 rounded-lg border px-4 py-3 text-sm ${
            feedbackType === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-green-200 bg-green-50 text-green-700"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedbackType === "error" ? (
              <AlertCircle className="h-5 w-5 shrink-0" />
            ) : (
              <CheckCircle2 className="h-5 w-5 shrink-0" />
            )}
            <span>{feedbackMessage}</span>
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
            placeholder="Search by order ID, user ID, or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 text-sm bg-primary border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          />
        </div>

        <div className="relative w-full sm:w-48">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-footer/40 pointer-events-none" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-10 pl-10 pr-8 text-sm bg-primary border border-footer/10 rounded-lg text-footer focus:outline-none focus:ring-2 focus:ring-accent appearance-none cursor-pointer transition-all"
          >
            <option value="All">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Data Table */}
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
            <tbody className="divide-y divide-footer/10 text-footer">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12">
                    <div className="flex items-center justify-center">
                      <Loader2
                        className="h-8 w-8 animate-spin text-accent"
                        aria-label="Loading orders"
                      />
                    </div>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12">
                    <div className="text-footer/60 text-lg">
                      No matching orders found.
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const { userId, guestInfo } = order;
                  const totalItems = order.products.reduce(
                    (acc, item) => acc + item.quantity,
                    0,
                  );
                  return (
                    <tr
                      key={order._id}
                      className="hover:bg-hero/30 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono text-xs text-accent font-semibold whitespace-nowrap">
                        {truncateId(order._id)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-footer leading-tight">
                          {userId ? userId.name : guestInfo?.name || "N/A"}
                        </div>
                        <div className="text-xs text-footer/60 mt-0.5">
                          {userId ? userId.email : guestInfo?.email || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-footer font-medium">
                        {totalItems} {totalItems === 1 ? "item" : "items"}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-footer whitespace-nowrap">
                        ${order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 text-xs text-footer/70 whitespace-nowrap">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 hover:bg-hero rounded-lg transition-colors text-footer/60 hover:text-accent"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(order)}
                            className="p-2 hover:bg-hero rounded-lg transition-colors text-footer/60 hover:text-accent"
                            title="Edit Order Status"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingOrder(order)}
                            className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-footer/60 hover:text-red-600"
                            title="Delete Order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-primary border border-footer/10 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-footer/10 flex items-center justify-between bg-hero/30">
              <div>
                <h3 className="text-lg font-bold text-footer">Order Details</h3>
                <p className="text-xs font-mono text-accent">
                  Order ID: {selectedOrder._id}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 text-footer/60 hover:text-footer rounded-lg transition-colors hover:bg-hero"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Overview & Customer Header */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-hero/50 rounded-xl border border-footer/5">
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-footer/40 mb-1.5">
                    Customer Details
                  </p>

                  {/* Name */}
                  <p className="font-bold text-sm text-footer flex items-center gap-2">
                    <User className="w-4 h-4 text-accent shrink-0" />
                    <span>
                      {selectedOrder.userId
                        ? selectedOrder.userId.name
                        : selectedOrder.guestInfo?.name || "N/A"}
                    </span>
                  </p>

                  {/* Email */}
                  <p className="text-xs text-footer/70 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-accent/80 shrink-0" />
                    <span>
                      {selectedOrder.userId
                        ? selectedOrder.userId.email
                        : selectedOrder.guestInfo?.email || "N/A"}
                    </span>
                  </p>

                  {/* Phone */}
                  <p className="text-xs text-footer/70 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-accent/80 shrink-0" />
                    <span>
                      {selectedOrder.userId
                        ? selectedOrder.userId.phone
                        : selectedOrder.guestInfo?.phone || "N/A"}
                    </span>
                  </p>

                  {/* Address */}
                  <p className="text-xs text-footer/70 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-accent/80 shrink-0" />
                    <span>
                      {selectedOrder.userId
                        ? selectedOrder.userId.address
                        : selectedOrder.guestInfo?.address || "N/A"}
                    </span>
                  </p>

                  {/* User ID */}
                  <p className="text-[11px] font-mono text-footer/40 pt-1">
                    User ID:{" "}
                    {selectedOrder.userId
                      ? selectedOrder.userId._id
                      : selectedOrder.guestInfo?._id || "N/A"}
                  </p>
                </div>

                <div className="sm:text-right flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-footer/40 mb-1">
                      Order Status
                    </p>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                  <div className="text-xs text-footer/50 mt-2">
                    Date: {formatDate(selectedOrder.createdAt)}
                  </div>
                </div>
              </div>

              {/* Products Section */}
              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-footer/40">
                  Products Included ({selectedOrder.products.length})
                </p>

                <div className="space-y-3">
                  {selectedOrder.products.map((item) => {
                    const { productId } = item;
                    return (
                      <div
                        key={productId._id}
                        className="p-3.5 bg-hero/30 rounded-xl border border-footer/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        {/* Product Image & Info */}
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 bg-hero rounded-lg border border-footer/10 overflow-hidden flex items-center justify-center shrink-0">
                            {productId.image ? (
                              <img
                                src={productId.image}
                                alt={productId.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center text-footer/30">
                                <ImageIcon className="w-5 h-5" />
                                <span className="text-[9px] mt-0.5">
                                  No Img
                                </span>
                              </div>
                            )}
                          </div>

                          <div>
                            <p className="font-semibold text-sm text-footer">
                              {productId.name}
                            </p>
                            <p className="text-xs font-mono text-accent/80">
                              ID: {productId._id}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-footer/60 mt-1">
                              <span>
                                Size: <b>{item.chosenSize}</b>
                              </span>
                              <span>•</span>
                              <span>
                                Color: <b>{item.chosenColor}</b>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity & Pricing */}
                        <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
                          <p className="text-xs text-footer/60">
                            Qty: <b className="text-footer">{item.quantity}</b>
                          </p>
                          <p className="text-sm font-bold text-footer">
                            ${(productId.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Summary Footer */}
              <div className="pt-4 border-t border-footer/10 flex items-center justify-between">
                <div className="text-xs text-footer/50 space-y-0.5">
                  <p className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Created:{" "}
                    {formatDate(selectedOrder.createdAt)}
                  </p>
                  <p>Updated: {formatDate(selectedOrder.updatedAt)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-footer/60">Total Amount</p>
                  <p className="text-2xl font-bold text-accent">
                    ${selectedOrder.totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 border-t border-footer/10 bg-hero/30 flex justify-end gap-2.5">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-hero text-footer rounded-lg text-xs font-semibold hover:bg-footer/10 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Status Modal */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-primary border border-footer/10 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-footer/10 flex items-center justify-between bg-hero/30">
              <div>
                <h3 className="text-lg font-bold text-footer">
                  Edit Order Status
                </h3>
                <p className="text-xs font-mono text-accent">
                  Order ID: {editingOrder._id}
                </p>
              </div>
              <button
                onClick={() => setEditingOrder(null)}
                className="p-1.5 text-footer/60 hover:text-footer rounded-lg transition-colors hover:bg-hero"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-footer/60">
                  Select Order Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-hero border border-footer/10 rounded-lg text-footer focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer transition-all"
                >
                  <option value="pending">pending</option>
                  <option value="shipped">shipped</option>
                  <option value="delivered">delivered</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </div>

              <div className="p-3 bg-hero/40 rounded-xl border border-footer/5 text-xs text-footer/60 space-y-1">
                <p>
                  <b>Customer:</b> {editingOrder.customerName}
                </p>
                <p>
                  <b>Total Amount:</b> ${editingOrder.totalPrice.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 border-t border-footer/10 bg-hero/30 flex justify-end gap-2.5">
              <button
                onClick={() => setEditingOrder(null)}
                className="px-4 py-2 bg-hero text-footer rounded-lg text-xs font-semibold hover:bg-footer/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStatus}
                className="px-4 py-2 bg-accent text-white rounded-lg text-xs font-semibold hover:bg-accent/90 transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {deletingOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-primary border border-footer/10 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-footer/10 flex items-center justify-between bg-hero/30">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-red-500/10 text-red-600 rounded-lg">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-footer">
                    Confirm Deletion
                  </h3>
                  <p className="text-xs font-mono text-accent">
                    Order ID: {deletingOrder._id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDeletingOrder(null)}
                className="p-1.5 text-footer/60 hover:text-footer rounded-lg transition-colors hover:bg-hero"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <p className="text-sm text-footer/80 leading-relaxed">
                Are you sure you want to delete this order? This action cannot
                be undone and will permanently remove the record from your
                database.
              </p>

              {/* Order Details Preview */}
              <div className="p-3.5 bg-hero/40 rounded-xl border border-footer/5 text-xs text-footer/70 space-y-1.5">
                <p className="flex justify-between">
                  <span className="text-footer/50">Customer:</span>
                  <b className="text-footer">
                    {deletingOrder.userId?.name ||
                      deletingOrder.guestInfo?.name ||
                      "N/A"}
                  </b>
                </p>
                <p className="flex justify-between">
                  <span className="text-footer/50">Total Amount:</span>
                  <b className="text-footer">
                    ${deletingOrder.totalPrice.toFixed(2)}
                  </b>
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 border-t border-footer/10 bg-hero/30 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeletingOrder(null)}
                className="px-4 py-2 bg-hero text-footer rounded-lg text-xs font-semibold hover:bg-footer/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deletingOrder._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors shadow-sm flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
