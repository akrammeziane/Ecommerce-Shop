import { Search, Filter, X } from "lucide-react";
import { useState } from "react";

export default function ShoppingProducts() {
  const [filters, setFilters] = useState({
    category: [],
    priceRange: "all",
    inStock: false,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const products = [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      category: "T-Shirts",
      price: 29.99,
      stock: 45,
      rating: 4.5,
      image: "👕",
    },
    {
      id: 2,
      name: "Vintage Denim Jacket",
      category: "Jackets",
      price: 79.99,
      stock: 12,
      rating: 4.8,
      image: "🧥",
    },
    {
      id: 3,
      name: "Classic Chinos",
      category: "Pants",
      price: 49.99,
      stock: 0,
      rating: 4.3,
      image: "👖",
    },
    {
      id: 4,
      name: "Casual Hoodie",
      category: "Hoodies",
      price: 59.99,
      stock: 28,
      rating: 4.6,
      image: "🧢",
    },
    {
      id: 5,
      name: "Summer Dress",
      category: "Dresses",
      price: 65.99,
      stock: 8,
      rating: 4.4,
      image: "👗",
    },
    {
      id: 6,
      name: "Sports Polo",
      category: "Polos",
      price: 39.99,
      stock: 35,
      rating: 4.2,
      image: "👕",
    },
  ];

  const categories = [
    "T-Shirts",
    "Jackets",
    "Pants",
    "Hoodies",
    "Dresses",
    "Polos",
  ];

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...prev.category, category],
    }));
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filters.category.length === 0 ||
      filters.category.includes(product.category);
    const matchesStock = !filters.inStock || product.stock > 0;
    const matchesPrice =
      filters.priceRange === "all" ||
      (filters.priceRange === "low" && product.price < 50) ||
      (filters.priceRange === "mid" &&
        product.price >= 50 &&
        product.price < 80) ||
      (filters.priceRange === "high" && product.price >= 80);

    return matchesSearch && matchesCategory && matchesStock && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-primary text-footer">
      {/* Header */}
      {/* <div className="bg-hero border-b border-footer/10 px-6 py-8">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-4xl font-heading font-bold mb-2">
            Our Collection
          </h1>
          <p className="text-footer/60">
            Browse our premium clothing selection
          </p>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside
            className={`${
              sidebarOpen ? "w-64" : "w-0"
            } transition-all duration-300 overflow-hidden`}
          >
            <div className="bg-primary border border-footer/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-heading font-bold text-footer flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="md:hidden p-1 hover:bg-hero rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-footer mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-footer/40" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-hero border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6 pb-6 border-b border-footer/10">
                <h3 className="font-medium text-footer mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.category.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="w-4 h-4 rounded accent-accent cursor-pointer"
                      />
                      <span className="text-sm text-footer">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6 pb-6 border-b border-footer/10">
                <h3 className="font-medium text-footer mb-3">Price Range</h3>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All Prices" },
                    { value: "low", label: "Under $50" },
                    { value: "mid", label: "$50 - $80" },
                    { value: "high", label: "$80+" },
                  ].map((range) => (
                    <label
                      key={range.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="price"
                        value={range.value}
                        checked={filters.priceRange === range.value}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: e.target.value,
                          }))
                        }
                        className="w-4 h-4 accent-accent cursor-pointer"
                      />
                      <span className="text-sm text-footer">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        inStock: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 accent-accent cursor-pointer"
                  />
                  <span className="text-sm text-footer">In Stock Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toggle Sidebar Button */}
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="mb-4 p-2 bg-hero rounded-lg hover:bg-footer/5 transition-colors flex items-center gap-2"
              >
                <Filter className="w-5 h-5" />
                Show Filters
              </button>
            )}

            {/* Results Info */}
            <div className="mb-6">
              <p className="text-footer/60">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-primary border border-footer/10 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  {/* Product Image */}
                  <div className="relative bg-hero h-48 flex items-center justify-center overflow-hidden">
                    <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {product.image}
                    </div>
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-footer/50 flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <p className="text-xs text-footer/60 uppercase tracking-wide mb-2">
                      {product.category}
                    </p>
                    <h3 className="font-heading font-bold text-footer mb-2 text-lg">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < Math.floor(product.rating)
                                ? "text-yellow-500"
                                : "text-footer/20"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-footer/60">
                        ({product.rating})
                      </span>
                    </div>

                    {/* Price and Stock */}
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-2xl font-bold font-heading text-accent">
                        ${product.price}
                      </p>
                      <p className="text-xs text-footer/60">
                        {product.stock > 0 ? `${product.stock} left` : "N/A"}
                      </p>
                    </div>

                    {/* Button */}
                    <button
                      disabled={product.stock === 0}
                      className="w-full py-2 bg-accent text-primary rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg text-footer/60">No products found</p>
                <p className="text-sm text-footer/40 mt-2">
                  Try adjusting your filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
