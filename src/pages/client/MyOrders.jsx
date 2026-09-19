import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  LoaderCircle,
} from "lucide-react";
import { fetchMyOrders, setCurrentPage } from "../../slices/ordersSlice";

const currency = (value) => `$${(Number(value) || 0).toFixed(2)}`;

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

const getStatusBadge = (status) => {
  switch (status) {
    case "shipped":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-700 text-[10px] font-bold uppercase tracking-wider border border-amber-500/20">
          <Truck className="w-3 h-3" /> Shipped
        </span>
      );
    case "delivered":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-700 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
          <CheckCircle2 className="w-3 h-3" /> Delivered
        </span>
      );
    case "cancelled":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/10 text-red-700 text-[10px] font-bold uppercase tracking-wider border border-red-500/20">
          <XCircle className="w-3 h-3" /> Cancelled
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/5 text-footer/70 text-[10px] font-bold uppercase tracking-wider border border-black/10">
          <Clock className="w-3 h-3" /> Pending
        </span>
      );
  }
};

export default function MyOrders() {
  const dispatch = useDispatch();
  const SavedUser = JSON.parse(localStorage.getItem("user"));
  const userId = SavedUser?._id || SavedUser?.id;

  const {
    orders = [],
    totalPages = 0,
    currentPage = 1,
    loading,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    if (userId) {
      dispatch(fetchMyOrders({ page: currentPage, limit: 10 }));
    }
  }, [dispatch, currentPage, userId]);

  // const myOrders = orders.filter((o) =>
  //   o.userId ? o.userId._id === userId || o.userId === userId : false,
  // );

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-footer">
        Order History & Tracking
      </h2>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <LoaderCircle className="w-8 h-8 animate-spin text-accent" />
        </div>
      ) : orders.length === 0 ? (
        <div className="border border-black/10 bg-white p-10 text-center">
          <Package className="w-8 h-8 text-footer/30 mx-auto mb-3" />
          <p className="text-sm text-footer/60">
            You haven&apos;t placed any orders yet.
          </p>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border border-black/10 bg-white p-6">
            {/* Order Top Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-black/10 text-xs text-footer">
              <div>
                <p className="font-bold uppercase tracking-widest">
                  {order._id.slice(-8).toUpperCase()}
                </p>
                <p className="text-footer/60 text-[11px] mt-0.5">
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {getStatusBadge(order.status)}
                <span className="font-bold text-sm">
                  {currency(order.totalPrice)}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-4 divide-y divide-black/5">
              {order.products.map((item) => {
                const product = item.productId;
                return (
                  <div
                    key={item._id}
                    className="py-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={product?.image || "/placeholder.png"}
                        alt={product?.name || "Product"}
                        className="w-16 h-20 object-cover bg-hero border border-black/10"
                      />
                      <div>
                        <p className="text-sm font-bold text-footer">
                          {product?.name || "Product no longer available"}
                        </p>
                        <p className="text-xs text-footer/60 mt-1">
                          Size: {item.chosenSize} | Color: {item.chosenColor} |
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-footer">
                      {currency((product?.price || 0) * item.quantity)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => dispatch(setCurrentPage(page))}
              className={`w-9 h-9 text-xs font-bold border transition-colors ${
                currentPage === page
                  ? "bg-black text-primary border-black"
                  : "bg-white text-footer border-black/10 hover:bg-black/5"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
