import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Cart({ cartItems = defaultMockCart }) {
  // Subtotal Calculation
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const estimatedShipping = subtotal > 100 || cartItems.length === 0 ? 0 : 15.0;
  const grandTotal = subtotal + estimatedShipping;

  const handleUpdateQuantity = (productId, newQuantity) => {
    /* TODO: dispatch updateQuantity action to Redux store */
    console.log("Update quantity:", productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    /* TODO: dispatch removeFromCart action to Redux store */
    console.log("Remove item:", productId);
  };

  const handleProceedToCheckout = () => {
    /* TODO: navigate to /checkout or trigger checkout initialization */
    console.log("Navigating to checkout...");
  };

  // Empty Cart View
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="bg-primary min-h-[70vh] flex items-center justify-center py-16 px-4 font-body">
        <div className="text-center max-w-md border border-black/10 bg-white p-10">
          <div className="mx-auto w-16 h-16 bg-hero border border-black/10 flex items-center justify-center mb-6 text-footer">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-2">
            Your Bag is Empty
          </p>
          <h2 className="font-heading text-2xl font-black uppercase tracking-tight text-footer mb-4">
            No Items Selected
          </h2>
          <p className="text-xs text-footer/70 mb-8">
            Explore our latest drops and elevated modest streetwear collections.
          </p>
          <Link
            to="/shop"
            className="w-full bg-footer text-primary py-3.5 px-6 font-heading text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-accent hover:text-footer inline-flex items-center justify-center gap-2"
          >
            Continue Shopping
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
        <div className="mb-10 pb-6 border-b border-black/10 flex items-baseline justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
              Your Selection
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-tight text-footer mt-1">
              Shopping Cart ({cartItems.length})
            </h1>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold uppercase tracking-wider text-footer/60 hover:text-accent transition"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* Main Content Layout */}
        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
          {/* Left Column: Cart Items List */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.productId}-${item.chosenSize}-${item.chosenColor}`}
                className="border border-black/10 bg-white p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                {/* Item Details */}
                <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                  <div className="w-20 h-24 sm:w-24 sm:h-30 shrink-0 overflow-hidden border border-black/10 bg-hero">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
                      TALQIN
                    </p>
                    <h3 className="font-heading text-base font-bold uppercase text-footer">
                      {item.name}
                    </h3>
                    <p className="text-xs text-footer/60">
                      Size:{" "}
                      <span className="font-bold text-footer">
                        {item.chosenSize}
                      </span>{" "}
                      | Color:{" "}
                      <span className="font-bold text-footer">
                        {item.chosenColor}
                      </span>
                    </p>
                    <p className="font-heading font-bold text-sm text-footer pt-2 sm:hidden">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Controls & Price */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-black/10 pt-4 sm:pt-0">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-black/10 bg-primary">
                    <button
                      type="button"
                      aria-label="Decrease Quantity"
                      onClick={() =>
                        handleUpdateQuantity(item.productId, item.quantity - 1)
                      }
                      className="p-2 text-footer hover:text-accent transition-colors disabled:opacity-30"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 font-heading text-xs font-bold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase Quantity"
                      onClick={() =>
                        handleUpdateQuantity(item.productId, item.quantity + 1)
                      }
                      className="p-2 text-footer hover:text-accent transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Total Price for Item */}
                  <p className="font-heading font-bold text-base text-footer hidden sm:block min-w-[90px] text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  {/* Remove Button */}
                  <button
                    type="button"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => handleRemoveItem(item.productId)}
                    className="p-2 text-footer/40 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary Box */}
          <div className="border border-black/10 bg-white p-6 sm:p-8 space-y-6 lg:sticky lg:top-8">
            <h2 className="font-heading text-xl font-black uppercase tracking-tight text-footer pb-4 border-b border-black/10">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs uppercase tracking-wider">
              <div className="flex justify-between text-footer/80">
                <span>Subtotal</span>
                <span className="font-bold text-footer">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-footer/80">
                <span>Estimated Shipping</span>
                <span className="font-bold text-footer">
                  {estimatedShipping === 0
                    ? "FREE"
                    : `$${estimatedShipping.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-3 border-t border-black/10 flex justify-between text-sm font-bold text-footer">
                <span>Total</span>
                <span className="font-heading text-lg text-accent">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              onClick={handleProceedToCheckout}
              className="w-full bg-footer text-primary py-4 px-6 font-heading text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-accent hover:text-footer flex items-center justify-center gap-2 group"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="pt-4 border-t border-black/10 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-footer/60">
              <ShieldCheck className="w-4 h-4 text-accent" /> Encrypted 256-Bit
              Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fallback Mock Cart Items
const defaultMockCart = [
  {
    productId: "TLQ-001",
    name: "Heavyweight Oversized Thobe Tee",
    image:
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80",
    price: 68.0,
    chosenSize: "L",
    chosenColor: "Onyx Black",
    quantity: 1,
  },
  {
    productId: "TLQ-002",
    name: "Relaxed Fit Utility Cargo",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    price: 98.0,
    chosenSize: "XL",
    chosenColor: "Raw Olive",
    quantity: 1,
  },
];
