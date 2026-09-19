import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Lock,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
  ShoppingBag,
} from "lucide-react";
import { createOrder, clearCreateOrderState } from "@/slices/ordersSlice";
import { fetchUserById } from "@/slices/usersSlice";

const currency = (value) => `${Number(value || 0).toLocaleString()} DZD`;
const FLAT_SHIPPING = 500;
const FREE_SHIPPING_THRESHOLD = 8000;

const readCart = () => {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
};

export default function Checkout() {
  const dispatch = useDispatch();

  const localSavedUser = JSON.parse(localStorage.getItem("user") || "null");
  useEffect(() => {
    if (localSavedUser && localSavedUser._id) {
      dispatch(fetchUserById(localSavedUser._id));
    }
  }, [dispatch, localSavedUser]);

  const { user: SavedUser } = useSelector((state) => state.users);
  console.log("SavedUser in Checkout:", SavedUser);
  const { createLoading, createError, lastCreatedOrder } = useSelector(
    (state) => state.orders,
  );

  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    setOrderItems(readCart());
    dispatch(clearCreateOrderState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [formData, setFormData] = useState({
    fullName: SavedUser?.name || "",
    email: SavedUser?.email || "",
    phone: SavedUser?.phone || "",
    address: SavedUser?.address || "",
    paymentMethod: "cod",
  });

  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping =
    orderItems.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : FLAT_SHIPPING;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (orderItems.length === 0) return;

    const products = orderItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      chosenSize: item.chosenSize,
      chosenColor: item.chosenColor,
    }));

    const payload = {
      products,
      ...(SavedUser
        ? { userId: SavedUser._id || SavedUser.id }
        : {
            guestInfo: {
              name: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
            },
          }),
    };

    try {
      await dispatch(createOrder(payload)).unwrap();
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cart-updated"));
    } catch {
      // createError from the slice will render below
    }
  };

  // Order Confirmed View
  if (lastCreatedOrder) {
    return (
      <div className="bg-primary min-h-[80vh] flex items-center justify-center py-16 px-4 font-body">
        <div className="text-center max-w-md border border-black/10 bg-white p-10">
          <div className="mx-auto w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-2">
            Order Placed
          </p>
          <h2 className="font-heading text-2xl font-black uppercase tracking-tight text-footer mb-3">
            Thank You
          </h2>
          <p className="text-xs text-footer/70 mb-2">
            Your order has been received and is being processed.
          </p>
          {lastCreatedOrder._id && (
            <p className="text-[11px] font-mono text-accent mb-8">
              Order ID: {lastCreatedOrder._id.slice(-8).toUpperCase()}
            </p>
          )}
          <div className="flex flex-col gap-3">
            <Link
              to="/account"
              className="w-full bg-footer text-primary py-3.5 px-6 font-heading text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-accent hover:text-footer inline-flex items-center justify-center gap-2"
            >
              View My Orders
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/shop"
              className="w-full border border-black/10 text-footer py-3.5 px-6 font-heading text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-black/5 inline-flex items-center justify-center gap-2"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty Cart Guard
  if (orderItems.length === 0) {
    return (
      <div className="bg-primary min-h-[70vh] flex items-center justify-center py-16 px-4 font-body">
        <div className="text-center max-w-md border border-black/10 bg-white p-10">
          <div className="mx-auto w-16 h-16 bg-hero border border-black/10 flex items-center justify-center mb-6 text-footer">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-2">
            Nothing to Check Out
          </p>
          <h2 className="font-heading text-2xl font-black uppercase tracking-tight text-footer mb-4">
            Your Cart is Empty
          </h2>
          <Link
            to="/shop"
            className="w-full bg-footer text-primary py-3.5 px-6 font-heading text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-accent hover:text-footer inline-flex items-center justify-center gap-2"
          >
            Browse the Shop
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary min-h-screen py-10 lg:py-16 font-body text-footer">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-black/10 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
              Final Step
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-tight text-footer mt-1">
              Checkout
            </h1>
          </div>
          <Link
            to="/cart"
            className="text-xs font-bold uppercase tracking-wider text-footer/60 hover:text-accent transition"
          >
            ← Return to Cart
          </Link>
        </div>

        {createError && (
          <div
            role="alert"
            className="flex items-center gap-3 border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm mb-8"
          >
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{createError}</p>
          </div>
        )}

        {/* Two-Column Form Layout */}
        <form
          onSubmit={handlePlaceOrder}
          className="grid gap-10 lg:grid-cols-[1fr_420px]"
        >
          {/* Left Column: Customer & Shipping Details */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="border border-black/10 bg-white p-6 sm:p-8 space-y-5">
              <h2 className="font-heading text-lg font-bold uppercase tracking-wide text-footer flex items-center gap-2">
                <span className="w-5 h-5 bg-footer text-primary rounded-full text-[10px] flex items-center justify-center font-bold">
                  1
                </span>
                Contact Information
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-[11px] font-bold uppercase tracking-wider text-footer mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Tariq Mansour"
                    className="w-full border border-black/10 bg-primary px-4 py-3 text-sm text-footer outline-none placeholder:text-footer/40 focus:border-footer transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[11px] font-bold uppercase tracking-wider text-footer mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tariq@example.com"
                    className="w-full border border-black/10 bg-primary px-4 py-3 text-sm text-footer outline-none placeholder:text-footer/40 focus:border-footer transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-[11px] font-bold uppercase tracking-wider text-footer mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+213 555 000 000"
                  className="w-full border border-black/10 bg-primary px-4 py-3 text-sm text-footer outline-none placeholder:text-footer/40 focus:border-footer transition-colors"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="border border-black/10 bg-white p-6 sm:p-8 space-y-5">
              <h2 className="font-heading text-lg font-bold uppercase tracking-wide text-footer flex items-center gap-2">
                <span className="w-5 h-5 bg-footer text-primary rounded-full text-[10px] flex items-center justify-center font-bold">
                  2
                </span>
                Shipping Address
              </h2>

              <div>
                <label
                  htmlFor="address"
                  className="block text-[11px] font-bold uppercase tracking-wider text-footer mb-2"
                >
                  Full Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street, City, Wilaya, Postal Code"
                  className="w-full border border-black/10 bg-primary px-4 py-3 text-sm text-footer outline-none placeholder:text-footer/40 focus:border-footer transition-colors resize-none"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="border border-black/10 bg-white p-6 sm:p-8 space-y-4">
              <h2 className="font-heading text-lg font-bold uppercase tracking-wide text-footer flex items-center gap-2">
                <span className="w-5 h-5 bg-footer text-primary rounded-full text-[10px] flex items-center justify-center font-bold">
                  3
                </span>
                Payment Option
              </h2>

              <div className="grid gap-3 sm:grid-cols-2">
                <label
                  className={`flex items-center gap-3 p-4 border cursor-pointer transition-all ${
                    formData.paymentMethod === "cod"
                      ? "border-footer bg-footer/5"
                      : "border-black/10 bg-primary"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="accent-footer"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Cash on Delivery
                  </span>
                </label>

                <label
                  className="flex items-center gap-3 p-4 border border-black/5 bg-hero/50 cursor-not-allowed opacity-50"
                  title="Coming soon"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    disabled
                    className="accent-footer"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Card — Coming Soon
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="border border-black/10 bg-white p-6 sm:p-8 space-y-6 lg:sticky lg:top-8 h-fit">
            <h2 className="font-heading text-xl font-black uppercase tracking-tight text-footer pb-4 border-b border-black/10">
              Your Order
            </h2>

            {/* Itemized List */}
            <div className="divide-y divide-black/5 max-h-72 overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {orderItems.map((item) => (
                <div
                  key={`${item.productId}-${item.chosenSize}-${item.chosenColor}`}
                  className="py-3 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-14 shrink-0 overflow-hidden border border-black/10 bg-hero">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-footer/20 text-sm">
                          👕
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-footer uppercase">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-footer/60">
                        Size: {item.chosenSize} | Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-footer whitespace-nowrap">
                    {currency(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 pt-4 border-t border-black/10 text-xs uppercase tracking-wider">
              <div className="flex justify-between text-footer/80">
                <span>Subtotal</span>
                <span className="font-bold text-footer">
                  {currency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-footer/80">
                <span>Shipping</span>
                <span className="font-bold text-footer">
                  {shipping === 0 ? "FREE" : currency(shipping)}
                </span>
              </div>
              <div className="pt-3 border-t border-black/10 flex justify-between text-sm font-bold text-footer">
                <span>Total Due</span>
                <span className="font-heading text-xl text-accent">
                  {currency(total)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={createLoading}
              className="w-full bg-accent text-footer py-4 px-6 font-heading text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-footer hover:text-primary flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {createLoading ? (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              {createLoading ? "Placing Order..." : "Place Order"}
              {!createLoading && (
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              )}
            </button>

            <div className="space-y-2 text-[10px] text-footer/60 border-t border-black/10 pt-4">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                <span>Guaranteed Authentic TALQIN Craftsmanship</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>Modest Fit & Satisfaction Guarantee</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
