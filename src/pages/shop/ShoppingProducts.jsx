import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  LoaderCircle,
  AlertCircle,
  PackageX,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { fetchProducts, setCurrentPage } from "@/slices/productsSlice";

const CATEGORY_OPTIONS = [
  "T-Shirts",
  "Jackets",
  "Pants",
  "Hoodies",
  "Accessories",
  "Shoes",
];

const SIZE_OPTIONS = ["S", "M", "L", "XL", "XXL", "XXXL"];

const STATUS_OPTIONS = ["In Stock", "Low Stock", "Out Of Stock"];

const currency = (value) => `${Number(value || 0).toLocaleString()} DZD`;

const getStatusStyle = (status) => {
  switch (status) {
    case "Low Stock":
      return "bg-amber-500/10 text-amber-700 border-amber-500/20";
    case "Out Of Stock":
      return "bg-red-500/10 text-red-700 border-red-500/20";
    default:
      return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20";
  }
};

export default function ShoppingProducts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const categorieFromState = location.state?.category || "";

  const initialFilters = {
    category: categorieFromState,
    size: "",
    color: "",
    status: "",
    minPrice: "",
    maxPrice: "",
  };
  useEffect(() => {
    if (categorieFromState) {
      navigate(".", { replace: true, state: null });
    }
  }, [categorieFromState, navigate]);

  // When on /shop/:productId, only render the nested ProductDetail view
  const isDetailView = /^\/shop\/[^/]+$/.test(location.pathname);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [debouncedPrice, setDebouncedPrice] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const {
    products = [],
    loading,
    error,
    totalProducts,
    totalPages,
    currentPage,
  } = useSelector((state) => state.products);

  // Debounce free-text search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Debounce price range inputs
  useEffect(() => {
    const timer = setTimeout(
      () =>
        setDebouncedPrice({
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
        }),
      500,
    );
    return () => clearTimeout(timer);
  }, [filters.minPrice, filters.maxPrice]);

  useEffect(() => {
    if (isDetailView) return;
    dispatch(
      fetchProducts({
        page: currentPage,
        limit: 12,
        name: debouncedSearch || undefined,
        category: filters.category || undefined,
        status: filters.status || undefined,
        availableSizes: filters.size || undefined,
        availableColors: filters.color || undefined,
        minPrice: debouncedPrice.minPrice || undefined,
        maxPrice: debouncedPrice.maxPrice || undefined,
      }),
    );
  }, [
    dispatch,
    currentPage,
    debouncedSearch,
    filters.category,
    filters.status,
    filters.size,
    filters.color,
    debouncedPrice.minPrice,
    debouncedPrice.maxPrice,
    isDetailView,
  ]);

  useEffect(() => {
    if (currentPage !== 1) dispatch(setCurrentPage(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debouncedSearch,
    filters.category,
    filters.status,
    filters.size,
    filters.color,
    debouncedPrice.minPrice,
    debouncedPrice.maxPrice,
  ]);

  // Lock body scroll while the mobile filter sheet is open
  useEffect(() => {
    document.body.style.overflow = mobileFiltersOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFiltersOpen]);

  const setFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value,
    }));
  };

  const clearFilters = () => {
    dispatch(setCurrentPage(1));
    setFilters(initialFilters);
    setSearchTerm("");
  };

  const activeFilterCount =
    Object.values(filters).filter(Boolean).length + (searchTerm ? 1 : 0);

  if (isDetailView) {
    return <Outlet />;
  }

  const FilterSections = (
    <>
      {/* Search */}
      <div className="p-5 border-b border-black/10">
        <label className="block text-[10px] font-bold uppercase tracking-widest text-footer/60 mb-3">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-footer/40" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-hero border border-black/10 text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
          />
        </div>
      </div>

      {/* Category */}
      <div className="p-5 border-b border-black/10">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-footer/60 mb-3">
          Category
        </h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter("category", cat)}
              className={`px-3 py-2 text-[11px] font-bold uppercase tracking-wider border transition-colors ${
                filters.category === cat
                  ? "bg-footer text-primary border-footer"
                  : "bg-white text-footer border-black/10 hover:border-black/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="p-5 border-b border-black/10">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-footer/60 mb-3">
          Availability
        </h3>
        <div className="space-y-2">
          {STATUS_OPTIONS.map((status) => (
            <label
              key={status}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.status === status}
                onChange={() => setFilter("status", status)}
                className="w-4 h-4 accent-accent cursor-pointer"
              />
              <span className="text-xs text-footer">{status}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="p-5 border-b border-black/10">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-footer/60 mb-3">
          Size
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {SIZE_OPTIONS.map((size) => (
            <button
              key={size}
              onClick={() => setFilter("size", size)}
              className={`py-2 text-[11px] font-bold uppercase border transition-colors ${
                filters.size === size
                  ? "bg-footer text-primary border-footer"
                  : "bg-white text-footer border-black/10 hover:border-black/40"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div className="p-5 border-b border-black/10">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-footer/60 mb-3">
          Color
        </h3>
        <input
          type="text"
          placeholder="e.g. Onyx Black"
          value={filters.color}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, color: e.target.value }))
          }
          className="w-full px-3 py-2.5 bg-hero border border-black/10 text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
        />
      </div>

      {/* Price Range */}
      <div className="p-5">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-footer/60 mb-3">
          Price (DZD)
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                minPrice: e.target.value,
              }))
            }
            className="w-full px-3 py-2.5 bg-hero border border-black/10 text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
          />
          <span className="text-footer/40 text-xs">—</span>
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                maxPrice: e.target.value,
              }))
            }
            className="w-full px-3 py-2.5 bg-hero border border-black/10 text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
          />
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-primary text-footer font-body">
      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block lg:w-72 shrink-0">
            <div className="border border-black/10 bg-white sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-center justify-between p-5 border-b border-black/10 sticky top-0 bg-white z-10">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-footer flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-accent" />
                  Refine
                </h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-[10px] font-bold uppercase tracking-widest text-accent hover:opacity-70"
                  >
                    Clear ({activeFilterCount})
                  </button>
                )}
              </div>
              {FilterSections}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Trigger + Results Info */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-black/10">
              <div>
                <p className="font-heading text-xl font-bold uppercase tracking-tight text-footer">
                  {filters.category || "All Products"}
                </p>
                <p className="text-xs text-footer/50 mt-1">
                  {loading ? "Loading..." : `${totalProducts} pieces found`}
                </p>
              </div>
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-black/10 text-xs font-bold uppercase tracking-widest hover:bg-black/5 active:scale-95 transition-transform"
              >
                <Filter className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-accent text-footer w-4 h-4 rounded-full text-[9px] flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-center gap-3 border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm mb-6"
              >
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-24">
                <LoaderCircle className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : products.length === 0 ? (
              <div className="border border-black/10 bg-white py-20 text-center">
                <PackageX className="w-8 h-8 text-footer/30 mx-auto mb-3" />
                <p className="text-sm text-footer/60">No products found.</p>
                <p className="text-xs text-footer/40 mt-1">
                  Try adjusting your filters.
                </p>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-xs font-bold uppercase tracking-widest text-accent hover:opacity-70"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product, index) => {
                    const stockStatus =
                      product.status ||
                      (product.quantity === 0
                        ? "Out Of Stock"
                        : product.quantity < 10
                          ? "Low Stock"
                          : "In Stock");

                    return (
                      <Link
                        key={product._id}
                        to={`/shop/${product._id}`}
                        className="group bg-white border border-black/10 flex flex-col hover:border-footer transition-colors duration-300"
                      >
                        {/* Image */}
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-hero">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-footer/20 text-6xl">
                              👕
                            </div>
                          )}

                          {/* Gradient overlay for depth */}
                          <div className="absolute inset-0 bg-gradient-to-t from-footer/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {stockStatus === "Out Of Stock" && (
                            <div className="absolute inset-0 bg-footer/60 flex items-center justify-center">
                              <span className="text-primary font-bold text-xs uppercase tracking-[0.2em]">
                                Sold Out
                              </span>
                            </div>
                          )}

                          <span
                            className={`absolute top-3 left-3 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest border ${getStatusStyle(
                              stockStatus,
                            )}`}
                          >
                            {stockStatus}
                          </span>

                          {index === 0 && (
                            <span className="absolute top-3 right-3 bg-accent text-footer px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest">
                              Featured
                            </span>
                          )}

                          {/* Quick view CTA on hover */}
                          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-footer text-primary py-3 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
                            View Product <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-5 flex-1 flex flex-col">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-1.5">
                            {product.category}
                          </p>
                          <h3 className="font-heading font-bold text-footer text-lg leading-snug mb-3">
                            {product.name}
                          </h3>

                          <div className="mt-auto flex items-center justify-between pt-3 border-t border-black/5">
                            <p className="font-heading font-bold text-footer text-lg">
                              {currency(product.price)}
                            </p>
                            {product.availableColors?.length > 0 && (
                              <p className="text-[10px] text-footer/40 uppercase tracking-wider">
                                {product.availableColors.length} colors
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => dispatch(setCurrentPage(page))}
                          className={`w-10 h-10 text-xs font-bold border transition-colors ${
                            currentPage === page
                              ? "bg-footer text-primary border-footer"
                              : "bg-white text-footer border-black/10 hover:border-black/40"
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          mobileFiltersOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileFiltersOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        className={`fixed inset-x-0 bottom-0 z-50 lg:hidden bg-white border-t border-black/10 max-h-[85vh] flex flex-col transition-transform duration-300 ease-out ${
          mobileFiltersOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <span className="h-1 w-10 bg-black/15 rounded-full" />
        </div>

        {/* Sheet Header */}
        <div className="flex items-center justify-between px-5 pb-4 border-b border-black/10 shrink-0">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-footer flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-accent" />
            Filters
          </h2>
          <div className="flex items-center gap-4">
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-[10px] font-bold uppercase tracking-widest text-accent"
              >
                Clear ({activeFilterCount})
              </button>
            )}
            <button
              onClick={() => setMobileFiltersOpen(false)}
              aria-label="Close filters"
              className="p-1.5 border border-black/10 hover:bg-black/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sheet Scrollable Body */}
        <div className="overflow-y-auto flex-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {FilterSections}
        </div>

        {/* Sheet Sticky Footer CTA */}
        <div className="shrink-0 p-4 border-t border-black/10 bg-white">
          <button
            onClick={() => setMobileFiltersOpen(false)}
            className="w-full bg-accent text-footer py-3.5 font-heading text-xs font-bold uppercase tracking-[0.2em] hover:bg-footer hover:text-primary transition-colors"
          >
            {loading
              ? "Show Results"
              : `Show ${totalProducts} Result${totalProducts === 1 ? "" : "s"}`}
          </button>
        </div>
      </div>
    </div>
  );
}
