import { useState } from "react";
import {
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RefreshCw,
} from "lucide-react";

export default function ProductDetail({ product = mockProduct }) {
  // Fallback defaults if props are not provided directly
  const {
    id = "TLQ-001",
    name = "Heavyweight Oversized Thobe Tee",
    description = "Crafted from 450 GSM organic cotton. Cut with an extended modest length, dropped shoulders, and a structured collar for a clean streetwear silhouette.",
    price = 68.0,
    image = "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80",
    availableSizes = ["S", "M", "L", "XL", "XXL"],
    availableColors = [
      { name: "Onyx Black", hex: "#121212" },
      { name: "Desert Sand", hex: "#C2B280" },
      { name: "Raw Olive", hex: "#4A5D4E" },
    ],
  } = product;

  const [selectedSize, setSelectedSize] = useState(availableSizes[2] || "");
  const [selectedColor, setSelectedColor] = useState(
    availableColors[0]?.name || "",
  );
  const [quantity, setQuantity] = useState(1);

  const handleDecreaseQuantity = () => {
    /* TODO: update local quantity state or trigger Redux action */
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncreaseQuantity = () => {
    /* TODO: update local quantity state or trigger Redux action */
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    /* TODO: dispatch addToCart action to Redux store / context */
    /* Payload structure: { productId: id, name, price, image, selectedSize, selectedColor, quantity } */
    console.log("Adding to cart:", {
      id,
      name,
      price,
      selectedSize,
      selectedColor,
      quantity,
    });
  };

  return (
    <div className="bg-primary min-h-screen py-10 lg:py-16 font-body text-footer">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-footer/50 flex items-center gap-2">
          <span>Home</span> / <span>Shop</span> /{" "}
          <span className="text-footer">{name}</span>
        </div>

        {/* Product Grid */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Product Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-black/10 bg-hero">
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <span className="absolute top-4 left-4 bg-footer text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em]">
                Modest Oversized Fit
              </span>
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="flex flex-col justify-between space-y-8">
            <div>
              {/* Category / ID Badge */}
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-2">
                Drop 04 // SKU: {id}
              </p>

              {/* Title & Price */}
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-footer mb-4">
                {name}
              </h1>
              <p className="font-heading text-2xl font-bold text-footer mb-6">
                ${price.toFixed(2)}
              </p>

              {/* Description */}
              <p className="text-sm leading-relaxed text-footer/80 mb-8 max-w-xl">
                {description}
              </p>

              <hr className="border-black/10 my-6" />

              {/* Color Selection */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                  <span>Color</span>
                  <span className="text-accent">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {availableColors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => {
                        /* TODO: set chosen color in state */
                        setSelectedColor(color.name);
                      }}
                      className={`flex items-center gap-2 border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                        selectedColor === color.name
                          ? "border-footer bg-footer text-primary"
                          : "border-black/10 bg-white text-footer hover:border-black/40"
                      }`}
                    >
                      <span
                        className="h-3 w-3 rounded-full border border-black/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                  <span>Size</span>
                  <span className="text-footer/50 text-[10px]">
                    Modest Cut (Runs True to Size)
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        /* TODO: set chosen size in state */
                        setSelectedSize(size);
                      }}
                      className={`py-3.5 border text-center text-xs font-bold uppercase tracking-wider transition-all ${
                        selectedSize === size
                          ? "border-footer bg-footer text-primary"
                          : "border-black/10 bg-white text-footer hover:border-black/40"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className="space-y-4">
                <label
                  htmlFor="quantity-selector"
                  className="block text-xs font-bold uppercase tracking-wider"
                >
                  Quantity
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Quantity Input Controls */}
                  <div className="flex items-center border border-black/10 bg-white w-full sm:w-36 justify-between px-3 py-3">
                    <button
                      type="button"
                      aria-label="Decrease Quantity"
                      onClick={handleDecreaseQuantity}
                      className="p-1 text-footer hover:text-accent transition-colors disabled:opacity-30"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span
                      id="quantity-selector"
                      className="font-heading font-bold text-sm"
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase Quantity"
                      onClick={handleIncreaseQuantity}
                      className="p-1 text-footer hover:text-accent transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart CTA */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full bg-accent text-footer py-4 px-8 font-heading text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-footer hover:text-primary flex items-center justify-center gap-3 group"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Value Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/10 text-center sm:text-left">
              <div className="space-y-1">
                <Truck className="w-4 h-4 text-accent mx-auto sm:mx-0" />
                <p className="text-[10px] font-bold uppercase tracking-wider">
                  Fast Shipping
                </p>
                <p className="text-[10px] text-footer/60">
                  Global Express Delivery
                </p>
              </div>
              <div className="space-y-1">
                <ShieldCheck className="w-4 h-4 text-accent mx-auto sm:mx-0" />
                <p className="text-[10px] font-bold uppercase tracking-wider">
                  100% Ethical
                </p>
                <p className="text-[10px] text-footer/60">
                  Fair Trade Heavy Cotton
                </p>
              </div>
              <div className="space-y-1">
                <RefreshCw className="w-4 h-4 text-accent mx-auto sm:mx-0" />
                <p className="text-[10px] font-bold uppercase tracking-wider">
                  Easy Returns
                </p>
                <p className="text-[10px] text-footer/60">30-Day Hassle Free</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fallback Mock Product Data
const mockProduct = {
  id: "TLQ-001",
  name: "Heavyweight Oversized Thobe Tee",
  description:
    "Crafted from 450 GSM organic cotton. Cut with an extended modest length, dropped shoulders, and a structured collar for a clean streetwear silhouette.",
  price: 68.0,
  image:
    "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80",
  availableSizes: ["S", "M", "L", "XL", "XXL"],
  availableColors: [
    { name: "Onyx Black", hex: "#121212" },
    { name: "Desert Sand", hex: "#C2B280" },
    { name: "Raw Olive", hex: "#4A5D4E" },
  ],
};
