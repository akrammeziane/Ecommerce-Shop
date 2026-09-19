import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RefreshCw,
  LoaderCircle,
  AlertCircle,
  CheckCircle,
  PackageX,
} from "lucide-react";
import {
  fetchProducts,
  incrementProductsOrderedNumber,
} from "@/slices/productsSlice";

const currency = (value) => `${Number(value || 0).toLocaleString()} DZD`;

export default function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const {
    products = [],
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ id: productId, limit: 1 }));
  }, [dispatch, productId]);

  const product = products.find((p) => p._id === productId);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedMsg, setAddedMsg] = useState("");

  // Initialize selections once the product has loaded
  useEffect(() => {
    if (product) {
      setSelectedSize(product.availableSizes?.[0] || "");
      setSelectedColor(product.availableColors?.[0] || "");
      setQuantity(1);
    }
  }, [product]);

  const inStock = (product?.quantity ?? 0) > 0;
  const maxQuantity = product?.quantity ?? 1;

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncreaseQuantity = () => {
    if (quantity < maxQuantity) setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor || !inStock) return;

    const newItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      chosenSize: selectedSize,
      chosenColor: selectedColor,
      quantity,
    };

    // Simple localStorage-based cart, matching the item shape Cart.jsx expects.
    // Swap this for a cartSlice thunk if/when you add one.
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const matchIndex = existingCart.findIndex(
      (item) =>
        item.productId === newItem.productId &&
        item.chosenSize === newItem.chosenSize &&
        item.chosenColor === newItem.chosenColor,
    );

    if (matchIndex !== -1) {
      existingCart[matchIndex].quantity += quantity;
    } else {
      existingCart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    dispatch(incrementProductsOrderedNumber());
    setAddedMsg("Added to cart.");
    setTimeout(() => setAddedMsg(""), 3000);
  };

  if (loading) {
    return (
      <div className="bg-primary min-h-screen flex items-center justify-center">
        <LoaderCircle className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-primary min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md border border-black/10 bg-white p-10">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-sm text-footer/70">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-primary min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md border border-black/10 bg-white p-10">
          <PackageX className="w-8 h-8 text-footer/30 mx-auto mb-4" />
          <p className="font-heading text-xl font-bold uppercase text-footer mb-2">
            Product Not Found
          </p>
          <p className="text-xs text-footer/60 mb-6">
            This item may have been removed or is no longer available.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-footer text-primary py-3 px-6 font-heading text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent hover:text-footer transition"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const {
    _id: id,
    name,
    description,
    price,
    image,
    category,
    availableSizes = [],
    availableColors = [],
  } = product;

  return (
    <div className="bg-primary min-h-screen py-10 lg:py-16 font-body text-footer">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-footer/50 flex items-center gap-2">
          <Link to="/" className="hover:text-footer transition-colors">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/shop" className="hover:text-footer transition-colors">
            Shop
          </Link>{" "}
          / <span className="text-footer">{name}</span>
        </div>

        {/* Product Grid */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Product Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-black/10 bg-hero">
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-footer/20 text-7xl">
                  👕
                </div>
              )}
              {!inStock && (
                <div className="absolute inset-0 bg-footer/60 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm uppercase tracking-[0.25em]">
                    Sold Out
                  </span>
                </div>
              )}
              {category && (
                <span className="absolute top-4 left-4 bg-footer text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em]">
                  {category}
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="flex flex-col justify-between space-y-8">
            <div>
              {/* Category / ID Badge */}
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-2">
                SKU: {id.slice(-8).toUpperCase()}
              </p>

              {/* Title & Price */}
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-footer mb-4">
                {name}
              </h1>
              <p className="font-heading text-2xl font-bold text-footer mb-6">
                {currency(price)}
              </p>

              {/* Description */}
              {description && (
                <p className="text-sm leading-relaxed text-footer/80 mb-8 max-w-xl">
                  {description}
                </p>
              )}

              <hr className="border-black/10 my-6" />

              {addedMsg && (
                <div
                  role="status"
                  className="flex items-center gap-3 border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700 text-sm mb-6"
                >
                  <CheckCircle className="h-5 w-5 shrink-0" />
                  <p>{addedMsg}</p>
                </div>
              )}

              {/* Color Selection */}
              {availableColors.length > 0 && (
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <span>Color</span>
                    <span className="text-accent">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {availableColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border transition-all ${
                          selectedColor === color
                            ? "border-footer bg-footer text-primary"
                            : "border-black/10 bg-white text-footer hover:border-black/40"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {availableSizes.length > 0 && (
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <span>Size</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
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
              )}

              {/* Quantity Selector & Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="quantity-selector"
                    className="block text-xs font-bold uppercase tracking-wider"
                  >
                    Quantity
                  </label>
                  {inStock && (
                    <span className="text-[10px] text-footer/50">
                      {maxQuantity} available
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Quantity Input Controls */}
                  <div className="flex items-center border border-black/10 bg-white w-full sm:w-36 justify-between px-3 py-3">
                    <button
                      type="button"
                      aria-label="Decrease Quantity"
                      onClick={handleDecreaseQuantity}
                      className="p-1 text-footer hover:text-accent transition-colors disabled:opacity-30"
                      disabled={quantity <= 1 || !inStock}
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
                      className="p-1 text-footer hover:text-accent transition-colors disabled:opacity-30"
                      disabled={quantity >= maxQuantity || !inStock}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart CTA */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!inStock || !selectedSize || !selectedColor}
                    className="w-full bg-accent text-footer py-4 px-8 font-heading text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-footer hover:text-primary flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent disabled:hover:text-footer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {inStock ? "Add to Cart" : "Sold Out"}
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
                  Nationwide Delivery
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
