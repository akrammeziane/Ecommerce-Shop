import { useState } from "react";
import { Lock, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Checkout({ orderItems = defaultOrderSummary }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    country: "United States",
    paymentMethod: "card",
  });

  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = 15.0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    /* TODO: dispatch submitOrder action to Redux store / execute API request */
    /* Payload structure: { customerDetails: formData, items: orderItems, totalAmount: total } */
    console.log("Submitting order:", { formData, orderItems, total });
  };

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
                  placeholder="+1 (555) 000-0000"
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
                  htmlFor="streetAddress"
                  className="block text-[11px] font-bold uppercase tracking-wider text-footer mb-2"
                >
                  Street Address
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  required
                  value={formData.streetAddress}
                  onChange={handleChange}
                  placeholder="124 Urban District Way"
                  className="w-full border border-black/10 bg-primary px-4 py-3 text-sm text-footer outline-none placeholder:text-footer/40 focus:border-footer transition-colors"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-[11px] font-bold uppercase tracking-wider text-footer mb-2"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New York"
                    className="w-full border border-black/10 bg-primary px-4 py-3 text-sm text-footer outline-none placeholder:text-footer/40 focus:border-footer transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-[11px] font-bold uppercase tracking-wider text-footer mb-2"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="10001"
                    className="w-full border border-black/10 bg-primary px-4 py-3 text-sm text-footer outline-none placeholder:text-footer/40 focus:border-footer transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-[11px] font-bold uppercase tracking-wider text-footer mb-2"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border border-black/10 bg-primary px-4 py-3 text-sm text-footer outline-none placeholder:text-footer/40 focus:border-footer transition-colors"
                  />
                </div>
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
                    formData.paymentMethod === "card"
                      ? "border-footer bg-footer/5"
                      : "border-black/10 bg-primary"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleChange}
                    className="accent-footer"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Credit / Debit Card
                  </span>
                </label>

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
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="border border-black/10 bg-white p-6 sm:p-8 space-y-6 lg:sticky lg:top-8 h-fit">
            <h2 className="font-heading text-xl font-black uppercase tracking-tight text-footer pb-4 border-b border-black/10">
              Your Order
            </h2>

            {/* Itemized List */}
            <div className="divide-y divide-black/5 max-h-72 overflow-y-auto pr-1">
              {orderItems.map((item) => (
                <div
                  key={`${item.productId}-${item.chosenSize}`}
                  className="py-3 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-14 object-cover border border-black/10 bg-hero"
                    />
                    <div>
                      <p className="text-xs font-bold text-footer uppercase">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-footer/60">
                        Size: {item.chosenSize} | Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-footer">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 pt-4 border-t border-black/10 text-xs uppercase tracking-wider">
              <div className="flex justify-between text-footer/80">
                <span>Subtotal</span>
                <span className="font-bold text-footer">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-footer/80">
                <span>Flat Shipping</span>
                <span className="font-bold text-footer">
                  ${shipping.toFixed(2)}
                </span>
              </div>
              <div className="pt-3 border-t border-black/10 flex justify-between text-sm font-bold text-footer">
                <span>Total Due</span>
                <span className="font-heading text-xl text-accent">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-accent text-footer py-4 px-6 font-heading text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-footer hover:text-primary flex items-center justify-center gap-2 group"
            >
              <Lock className="w-4 h-4" />
              Place Order
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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

// Fallback Mock Checkout Data
const defaultOrderSummary = [
  {
    productId: "TLQ-001",
    name: "Heavyweight Oversized Thobe Tee",
    image:
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80",
    price: 68.0,
    chosenSize: "L",
    quantity: 1,
  },
  {
    productId: "TLQ-002",
    name: "Relaxed Fit Utility Cargo",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    price: 98.0,
    chosenSize: "XL",
    quantity: 1,
  },
];
