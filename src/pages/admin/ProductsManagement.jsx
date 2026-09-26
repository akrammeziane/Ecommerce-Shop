import {
  Search,
  Edit2,
  Trash2,
  Plus,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Filter,
  Package,
  XCircle,
  Calendar,
  Palette,
  Ruler,
  Tag,
  ImageIcon,
  Eye,
  Upload,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  editProduct,
  fetchProducts,
  setCurrentPage,
} from "@/slices/productsSlice";

const availableSizeOptions = ["S", "M", "L", "XL", "XXL", "XXXL"];

const initialProductForm = {
  name: "",
  description: "",
  price: "",
  image: "",
  availableSizes: [],
  availableColors: "",
  category: "",
  quantity: "0",
  createdAt: "",
  updatedAt: "",
};

export default function ProductsManagement() {
  const dispatch = useDispatch();
  const { currentPage } = useSelector(
    (state) => state.products || { currentPage: 1 },
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setstatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [Debounced, setDebounced] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [editImageFile, setEditImageFile] = useState(null);
  const isMongoId = (str) => /^[0-9a-fA-F]{24}$/.test(str);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(searchTerm);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        page: currentPage,
        limit: 10,
        id: isMongoId(Debounced) ? Debounced : undefined,
        name: !isMongoId(Debounced) ? Debounced : undefined,
        status: statusFilter === "ALL" ? undefined : statusFilter,
        category: categoryFilter === "All" ? undefined : categoryFilter,
      }),
    );
    // return () => {
    //   (setDebounced(""),
    //     setSearchTerm(""),
    //     setstatusFilter("ALL"),
    //     setCategoryFilter("All"));
    // };
  }, [dispatch, currentPage, statusFilter, Debounced, categoryFilter]);

  const productsFromStore = useSelector(
    (state) => state.products?.products || [],
  );
  const loading = useSelector((state) => state.products?.loading);
  const { totalProducts, totalPages, totalInStock, totalOutOfStock, error } =
    useSelector(
      (state) =>
        state.products || {
          totalProducts: 0,
          totalPages: 0,
          totalInStock: 0,
          totalOutOfStock: 0,
        },
    );
  console.log("the products from store are ", productsFromStore);

  const products = useMemo(
    () =>
      productsFromStore?.map((product) => ({
        id: product._id,
        name: product.name,
        category: product.category,
        description: product.description,
        availableSizes: product.availableSizes,
        availableColors: product.availableColors,
        price: `${Number(product.price).toFixed(2)} DZD`,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        stock: product.quantity,
        status:
          product.quantity === 0
            ? "Out Of Stock"
            : product.quantity < 10
              ? "Low Stock"
              : "In Stock",
        image: product.image?.startsWith("https") ? product.image : "🛍️",
      })),
    [productsFromStore],
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [productForm, setProductForm] = useState(initialProductForm);
  const [formError, setFormError] = useState("");
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState(initialProductForm);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [actionFeedback, setActionFeedback] = useState({
    type: "",
    message: "",
  });
  const feedbackMessage = error
    ? `${error.message} session expired. Please login again.`
    : actionFeedback.message;

  const feedbackType = error ? "error" : actionFeedback.type;

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = isMongoId(Debounced)
          ? product.id.toLowerCase().includes(Debounced.toLowerCase())
          : product.name.toLowerCase().includes(Debounced.toLowerCase());
        const matchedStatus =
          statusFilter === "ALL" ||
          (statusFilter === "In Stock" && product.stock > 0) ||
          (statusFilter === "Out Of Stock" && product.stock === 0);
        const matchedCategory =
          categoryFilter === "All" || product.category === categoryFilter;
        return matchesSearch && matchedStatus && matchedCategory;
      }),
    [products, statusFilter, categoryFilter, Debounced],
  );
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-700";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-700";
      case "Out Of Stock":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  const CATEGORY_OPTIONS = [
    "T-Shirts",
    "Jackets",
    "Pants",
    "Hoodies",
    "Accessories",
    "Shoes",
  ];

  const handleDelete = async (id) => {
    setActionFeedback({ type: "", message: "" });
    try {
      await dispatch(deleteProduct(id)).unwrap();
      setActionFeedback({
        type: "success",
        message: "Product deleted successfully.",
      });
      setTimeout(() => {
        setActionFeedback({ type: "", message: "" });
      }, 5000);
    } catch (error) {
      setActionFeedback({
        type: "error",
        message:
          typeof error === "string" ? error : "Failed to delete product.",
      });
      return;
    }
  };

  const openEditModal = (product) => {
    setActionFeedback({ type: "", message: "" });
    setEditingProduct(product);
    setEditForm({
      name: product.name || "",
      description: product.description || "",
      price: String(product.price || "")
        .replace("DZD", "")
        .trim(),
      image: product.image?.startsWith("http") ? product.image : "",
      availableSizes: product.availableSizes || [],
      availableColors: Array.isArray(product.availableColors)
        ? product.availableColors.join(", ")
        : "",
      category: product.category || "",
      quantity: String(product.stock ?? 0),
    });
  };

  const closeEditModal = () => {
    setEditingProduct(null);
    setEditForm(initialProductForm);
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleEditSizeChange = (size) => {
    setEditForm((currentForm) => ({
      ...currentForm,
      availableSizes: currentForm.availableSizes.includes(size)
        ? currentForm.availableSizes.filter(
            (currentSize) => currentSize !== size,
          )
        : [...currentForm.availableSizes, size],
    }));
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setProductForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSizeChange = (size) => {
    setProductForm((currentForm) => ({
      ...currentForm,
      availableSizes: currentForm.availableSizes.includes(size)
        ? currentForm.availableSizes.filter(
            (currentSize) => currentSize !== size,
          )
        : [...currentForm.availableSizes, size],
    }));
  };

  // handleAddProduct function to handle adding a new product

  const handleAddProduct = async (event) => {
    event.preventDefault();
    const colors = productForm.availableColors
      .split(",")
      .map((color) => color.trim())
      .filter(Boolean);

    if (productForm.availableSizes.length === 0 || colors.length === 0) {
      setFormError("Select at least one size and enter at least one color.");
      return;
    }

    setFormError("");
    setIsAddingProduct(true);
    const formData = new FormData();

    if (imageFile) {
      formData.append("image", imageFile);
    }
    formData.append("name", productForm.name.trim());
    if (productForm.description.trim()) {
      formData.append("description", productForm.description.trim());
    }
    formData.append("price", productForm.price);
    formData.append(
      "availableSizes",
      JSON.stringify(productForm.availableSizes),
    );
    formData.append("availableColors", JSON.stringify(colors));
    formData.append("category", productForm.category.trim());
    formData.append("quantity", productForm.quantity);
    console.log("the form data is ", Object.fromEntries(formData));

    try {
      await dispatch(addProduct(formData)).unwrap();
      setProductForm(initialProductForm);
      setShowAddForm(false);
      setActionFeedback({
        type: "success",
        message: "Product added successfully.",
      });
      setTimeout(() => {
        setActionFeedback({ type: "", message: "" });
      }, 5000);
    } catch (error) {
      console.log("the errors is ", error);
      setFormError(
        typeof error === "string" ? error : "Failed to add product.",
      );
      setTimeout(() => {
        setActionFeedback({ type: "", message: "" });
      }, 5000);
    } finally {
      setIsAddingProduct(false);
    }
  };
  const handleDeleteImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setImageFile(file);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  };

  // handleSaveEdit function to handle saving the edited product

  const handleSaveEdit = async (event) => {
    event.preventDefault();
    const colors = editForm.availableColors
      .split(",")
      .map((color) => color.trim())
      .filter(Boolean);

    if (editForm.availableSizes.length === 0 || colors.length === 0) {
      setActionFeedback({
        type: "error",
        message: "Unable to save changes: add at least one size and color.",
      });
      return;
    }
    const formdata = new FormData();
    if (editImageFile) {
      formdata.append("image", editImageFile);
    }
    formdata.append("name", editForm.name.trim());
    if (editForm.description.trim()) {
      formdata.append("description", editForm.description.trim());
    }
    formdata.append("price", editForm.price);
    formdata.append("availableSizes", JSON.stringify(editForm.availableSizes));
    formdata.append("availableColors", JSON.stringify(colors));
    formdata.append("category", editForm.category.trim());
    formdata.append("quantity", editForm.quantity);
    try {
      await dispatch(
        editProduct({
          productId: editingProduct.id,
          productData: formdata,
        }),
      ).unwrap();
      closeEditModal();
      setActionFeedback({
        type: "success",
        message: "Product updated successfully.",
      });
      setTimeout(() => {
        setActionFeedback({ type: "", message: "" });
      }, 5000);
    } catch (error) {
      setActionFeedback({
        type: "error",
        message:
          typeof error === "string" ? error : "Failed to update product.",
      });
      setTimeout(() => {
        setActionFeedback({ type: "", message: "" });
      }, 5000);
      return;
    }
  };
  const handleRemoveEditImage = () => {
    setEditImagePreview(null);
    setEditImageFile(null);
  };
  const handleEditImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setEditImageFile(file);
    if (editImagePreview) {
      URL.revokeObjectURL(editImagePreview);
    }
    const imageUrl = URL.createObjectURL(file);
    setEditImagePreview(imageUrl);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-heading font-bold text-footer mb-2">
            Products Management
          </h1>
          <p className="text-footer/60">
            Manage and update your product catalog
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 bg-accent text-primary rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
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

      {/* Add Product Form */}
      {showAddForm && (
        <div className="bg-primary border border-footer/10 rounded-xl p-6">
          <h3 className="text-xl font-heading font-bold text-footer mb-4">
            Add New Product
          </h3>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                type="text"
                placeholder="Product Name"
                value={productForm.name}
                onChange={handleFormChange}
                minLength={2}
                maxLength={100}
                required
                className="px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <select
                name="category"
                value={productForm.category}
                onChange={handleFormChange}
                required
                className="px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                name="price"
                type="number"
                placeholder="Price (DZD)"
                value={productForm.price}
                onChange={handleFormChange}
                min="0"
                step="0.01"
                required
                className="px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <input
                name="quantity"
                type="number"
                placeholder="Quantity"
                value={productForm.quantity}
                onChange={handleFormChange}
                min="0"
                required
                className="px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <textarea
                name="description"
                placeholder="Description (optional)"
                value={productForm.description}
                onChange={handleFormChange}
                minLength={2}
                maxLength={1000}
                className="md:col-span-2 min-h-24 px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {/* Image Upload */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-footer">
                  Product Image
                </label>

                {imagePreview ? (
                  <div className="relative w-40">
                    <div className="aspect-square w-40 overflow-hidden rounded-lg border border-footer/10 bg-hero">
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleDeleteImage}
                      aria-label="Remove image"
                      className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-footer text-primary shadow-sm hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="product-image-input"
                    className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-footer/20 bg-hero px-6 py-8 text-center transition-colors hover:border-accent hover:bg-accent/5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <ImageIcon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium text-footer">
                      Click to upload an image
                    </p>
                    <p className="text-xs text-footer/50">
                      PNG, JPG or WEBP — up to 5MB
                    </p>
                    <input
                      id="product-image-input"
                      name="image"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div className="md:col-span-2">
                <p className="mb-2 text-sm font-medium text-footer">
                  Available sizes
                </p>
                <div className="flex flex-wrap gap-3">
                  {availableSizeOptions.map((size) => (
                    <label
                      key={size}
                      className="flex items-center gap-2 text-sm text-footer"
                    >
                      <input
                        type="checkbox"
                        checked={productForm.availableSizes.includes(size)}
                        onChange={() => handleSizeChange(size)}
                        className="accent-accent"
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </div>
              <input
                name="availableColors"
                type="text"
                placeholder="Available colors (comma-separated)"
                value={productForm.availableColors}
                onChange={handleFormChange}
                className="md:col-span-2 px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            {formError && <p className="text-sm text-red-600">{formError}</p>}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isAddingProduct}
                className="flex-1 px-6 py-2 bg-accent text-primary rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50"
              >
                {isAddingProduct ? "Adding..." : "Add Product"}
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-6 py-2 bg-hero border border-footer/10 text-footer rounded-lg hover:bg-footer/5 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Products */}
        <div className="bg-primary border border-footer/10 p-5 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
              Total Products
            </p>
            <p className="text-2xl font-bold text-footer">{totalProducts}</p>
          </div>
          <div className="p-3 bg-accent/10 text-accent rounded-xl">
            <Package className="w-5 h-5" />
          </div>
        </div>

        {/* In Stock */}
        <div className="bg-primary border border-footer/10 p-5 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
              In Stock
            </p>
            <p className="text-2xl font-bold text-footer">{totalInStock}</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-primary border border-footer/10 p-5 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-footer/50 mb-1">
              Out of Stock
            </p>
            <p className="text-2xl font-bold text-footer">{totalOutOfStock}</p>
          </div>
          <div className="p-3 bg-red-500/10 text-red-600 rounded-xl">
            <XCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-3 w-5 h-5 text-footer/40" />
          <input
            type="text"
            placeholder="Search by product name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 text-sm bg-primary border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="relative w-full sm:w-48">
          <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-footer/40 pointer-events-none" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full h-10 pl-10 pr-8 text-sm bg-primary border border-footer/10 rounded-lg text-footer focus:outline-none focus:ring-2 focus:ring-accent appearance-none cursor-pointer transition-all"
          >
            <option value="All">All Categories</option>
            <option value="T-Shirts">T-Shirts</option>
            <option value="Jackets">Jackets</option>
            <option value="Pants">Pants</option>
            <option value="Hoodies">Hoodies</option>
            <option value="Accessories">Accessories</option>
            <option value="Shoes">Shoes</option>
          </select>
        </div>

        {/* Status / Stock Filter */}
        <div className="relative w-full sm:w-48">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-footer/40 pointer-events-none" />
          <select
            value={statusFilter}
            onChange={(e) => setstatusFilter(e.target.value)}
            className="w-full h-10 pl-10 pr-8 text-sm bg-primary border border-footer/10 rounded-lg text-footer focus:outline-none focus:ring-2 focus:ring-accent appearance-none cursor-pointer transition-all"
          >
            <option value="ALL">All Products</option>
            <option value="In Stock">In Stock</option>
            <option value="Out Of Stock">Out Of Stock</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-primary border border-footer/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-footer/10 bg-hero">
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-footer">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12">
                    <div className="flex items-center justify-center">
                      <Loader2
                        className="h-8 w-8 animate-spin text-accent"
                        aria-label="Loading products"
                      />
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12">
                    <div className="text-footer/60 text-lg">
                      No matching products found.
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-footer/10 hover:bg-hero transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="text-sm font-medium text-footer">
                            {product.name}
                          </p>
                          <p className="text-xs text-footer/60">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-footer">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-footer">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 text-sm text-footer">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          product.status,
                        )}`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="p-2 hover:bg-hero rounded-lg transition-colors text-footer/60 hover:text-accent"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditModal(product)}
                          aria-label={`Edit ${product.name}`}
                          className="p-2 hover:bg-hero rounded-lg transition-colors text-footer/60 hover:text-accent"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          aria-label={`Delete ${product.name}`}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-footer/60 hover:text-red-600"
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
      {/* View Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-primary border border-footer/10 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-footer/10 flex items-center justify-between bg-hero/30">
              <div>
                <h3 className="text-lg font-bold text-footer">
                  Product Details
                </h3>
                <p className="text-xs font-mono text-accent">
                  Product ID: {selectedProduct.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1.5 text-footer/60 hover:text-footer rounded-lg transition-colors hover:bg-hero"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Top Info Card: Image, Title, Price & Stock */}
              <div className="p-4 bg-hero/50 rounded-xl border border-footer/5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                {/* Image */}
                <div className="w-24 h-24 bg-hero rounded-xl border border-footer/10 overflow-hidden flex items-center justify-center shrink-0">
                  {selectedProduct.image ? (
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-footer/30">
                      <ImageIcon className="w-6 h-6" />
                      <span className="text-[10px] mt-1">No Image</span>
                    </div>
                  )}
                </div>

                {/* Name & Core Details */}
                <div className="flex-1 space-y-1.5">
                  <h4 className="text-base font-bold text-footer">
                    {selectedProduct.name}
                  </h4>

                  <p className="text-xs text-footer/60 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-accent/80 shrink-0" />
                    Category:{" "}
                    <b className="text-footer">
                      {selectedProduct.category || "N/A"}
                    </b>
                  </p>

                  <div className="flex items-center gap-3 pt-1">
                    {/* Stock Status Badge */}
                    {selectedProduct.stock > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        In Stock ({selectedProduct.stock})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-600 border border-red-500/20">
                        <XCircle className="w-3 h-3" />
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-footer/40">
                    Price
                  </p>
                  <p className="text-2xl font-bold text-accent">
                    {Number(
                      selectedProduct.price.replace("DZD", "").trim(),
                    ).toFixed(2)}
                    <span className="text-xs font-normal text-footer/60 ml-1">
                      DZD
                    </span>
                  </p>
                </div>
              </div>

              {/* Variants: Available Sizes & Colors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Available Sizes */}
                <div className="p-4 bg-hero/30 rounded-xl border border-footer/5 space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-footer/40 flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-accent" />
                    Available Sizes
                  </p>

                  {selectedProduct.availableSizes &&
                  selectedProduct.availableSizes.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedProduct.availableSizes.map((size, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 bg-primary border border-footer/10 rounded-lg text-xs font-semibold text-footer shadow-xs"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-footer/40 italic">
                      No sizes specified
                    </p>
                  )}
                </div>

                {/* Available Colors */}
                <div className="p-4 bg-hero/30 rounded-xl border border-footer/5 space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-footer/40 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-accent" />
                    Available Colors
                  </p>

                  {selectedProduct.availableColors &&
                  selectedProduct.availableColors.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedProduct.availableColors.map((color, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 bg-primary border border-footer/10 rounded-lg text-xs font-semibold text-footer shadow-xs flex items-center gap-1.5"
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-footer/20"
                            style={{ backgroundColor: color.toLowerCase() }}
                          />
                          {color}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-footer/40 italic">
                      No colors specified
                    </p>
                  )}
                </div>
              </div>

              {/* Description Section (Optional if present in model) */}
              {selectedProduct.description && (
                <div className="p-4 bg-hero/30 rounded-xl border border-footer/5 space-y-1.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-footer/40">
                    Description
                  </p>
                  <p className="text-xs text-footer/80 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>
              )}

              {/* Timestamps Footer */}
              <div className="pt-2 border-t border-footer/10 flex items-center justify-between text-xs text-footer/50">
                <p className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Created:{" "}
                  {selectedProduct.createdAt
                    ? formatDate(selectedProduct.createdAt)
                    : "N/A"}
                </p>
                <p>
                  Updated:{" "}
                  {selectedProduct.updatedAt
                    ? formatDate(selectedProduct.updatedAt)
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 border-t border-footer/10 bg-hero/30 flex justify-end gap-2.5">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 bg-hero text-footer rounded-lg text-xs font-semibold hover:bg-footer/10 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit form */}
      {editingProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-footer/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-product-title"
        >
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-primary p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Product management
                </p>
                <h2
                  id="edit-product-title"
                  className="mt-1 text-2xl font-heading font-bold text-footer"
                >
                  Edit Product
                </h2>
                <p className="mt-1 text-sm text-footer/60">
                  Update all product information before saving.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close edit product dialog"
                onClick={closeEditModal}
                className="rounded-lg p-2 text-footer/60 transition-colors hover:bg-hero hover:text-footer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  name="name"
                  type="text"
                  placeholder="Product Name"
                  value={editForm.name}
                  onChange={handleEditFormChange}
                  minLength={2}
                  maxLength={100}
                  required
                  className="px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleEditFormChange}
                  required
                  className="px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <input
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={editForm.price}
                  onChange={handleEditFormChange}
                  min="0"
                  step="0.01"
                  required
                  className="px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <input
                  name="quantity"
                  type="number"
                  placeholder="Quantity"
                  value={editForm.quantity}
                  onChange={handleEditFormChange}
                  min="0"
                  required
                  className="px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <textarea
                  name="description"
                  placeholder="Description (optional)"
                  value={editForm.description}
                  onChange={handleEditFormChange}
                  minLength={2}
                  maxLength={1000}
                  className="min-h-28 px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent md:col-span-2"
                />
                {/* Image Upload */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-footer">
                    Product Image
                  </label>

                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <div className="h-24 w-24 overflow-hidden rounded-lg border border-footer/10 bg-hero">
                        {editImagePreview || editForm.image ? (
                          <img
                            src={editImagePreview || editForm.image}
                            alt="Product preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-footer/20">
                            <ImageIcon className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                      {editImagePreview && (
                        <button
                          type="button"
                          onClick={handleRemoveEditImage}
                          aria-label="Revert to original image"
                          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-footer text-primary shadow-sm hover:bg-red-600 transition-colors"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="flex-1">
                      <label
                        htmlFor="edit-product-image-input"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-footer/10 bg-hero px-4 py-2 text-sm font-medium text-footer transition-colors hover:bg-footer/5"
                      >
                        <Upload className="h-4 w-4" />
                        {editForm.image ? "Replace Image" : "Upload Image"}
                      </label>
                      <input
                        id="edit-product-image-input"
                        name="image"
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleEditImageChange}
                        className="hidden"
                      />
                      <p className="mt-1.5 text-xs text-footer/50">
                        PNG, JPG or WEBP — up to 5MB
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="mb-2 text-sm font-medium text-footer">
                    Available sizes
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {availableSizeOptions.map((size) => (
                      <label
                        key={size}
                        className="flex items-center gap-2 text-sm text-footer"
                      >
                        <input
                          type="checkbox"
                          checked={editForm.availableSizes.includes(size)}
                          onChange={() => handleEditSizeChange(size)}
                          className="accent-accent"
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>
                <input
                  name="availableColors"
                  type="text"
                  placeholder="Available colors (comma-separated)"
                  value={editForm.availableColors}
                  onChange={handleEditFormChange}
                  className="px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent md:col-span-2"
                />
              </div>

              {actionFeedback.type === "error" && (
                <p className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  {actionFeedback.message}
                </p>
              )}

              <div className="flex gap-3 border-t border-footer/10 pt-4">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-accent px-6 py-2 font-medium text-primary transition-opacity hover:opacity-90"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="flex-1 rounded-lg border border-footer/10 bg-hero px-6 py-2 font-medium text-footer transition-colors hover:bg-footer/5"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => dispatch(setCurrentPage(page))}
            className={`px-3 py-1 rounded-lg text-xs font-bold ${
              currentPage === page
                ? "bg-accent text-primary"
                : "bg-hero text-footer"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
