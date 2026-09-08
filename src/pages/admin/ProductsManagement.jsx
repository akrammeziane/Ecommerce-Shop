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
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  editProduct,
  fetchProducts,
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
};

export default function ProductsManagement() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const productsFromStore = useSelector(
    (state) => state.products?.products || [],
  );
  const loading = useSelector((state) => state.products?.loading);

  const products = useMemo(
    () =>
      productsFromStore?.map((product) => ({
        id: product._id,
        name: product.name,
        category: product.category,
        description: product.description,
        availableSizes: product.availableSizes,
        availableColors: product.availableColors,
        price: `${Number(product.price).toFixed(2)} dzd`,
        stock: product.quantity,
        status:
          product.quantity === 0
            ? "Out of Stock"
            : product.quantity < 10
              ? "Low Stock"
              : "In Stock",
        image: "🛍️",
      })),
    [productsFromStore],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [productForm, setProductForm] = useState(initialProductForm);
  const [formError, setFormError] = useState("");
  const [statusFilter, setstatusFilter] = useState("ALL");
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState(initialProductForm);
  const [actionFeedback, setActionFeedback] = useState({
    type: "",
    message: "",
  });

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchedStatus =
          statusFilter === "ALL" ||
          (statusFilter === "in stock" && product.stock > 0) ||
          (statusFilter === "out of stock" && product.stock === 0);
        return matchesSearch && matchedStatus;
      }),
    [products, searchTerm, statusFilter],
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-700";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-700";
      case "Out of Stock":
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
        .replace("dzd", "")
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

    const quantity = Number(editForm.quantity);
    try {
      await dispatch(
        editProduct({
          productId: editingProduct.id,
          productData: {
            name: editForm.name.trim(),
            description: editForm.description
              ? editForm.description.trim()
              : undefined,
            category: editForm.category.trim(),
            price: Number(editForm.price),
            quantity: quantity,
            image: editForm.image.trim() || undefined,
            availableSizes: editForm.availableSizes,
            availableColors: colors,
          },
        }),
      ).unwrap();
      closeEditModal();
      setActionFeedback({
        type: "success",
        message: "Product updated successfully.",
      });
    } catch (error) {
      setActionFeedback({
        type: "error",
        message:
          typeof error === "string" ? error : "Failed to update product.",
      });
      return;
    }
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

    try {
      await dispatch(
        addProduct({
          name: productForm.name.trim(),
          description: productForm.description
            ? productForm.description.trim()
            : undefined,
          price: Number(productForm.price),
          image: productForm.image.trim() || undefined,
          availableSizes: productForm.availableSizes,
          availableColors: colors,
          category: productForm.category.trim(),
          quantity: Number(productForm.quantity),
        }),
      ).unwrap();
      setProductForm(initialProductForm);
      setShowAddForm(false);
      setActionFeedback({
        type: "success",
        message: "Product added successfully.",
      });
    } catch (error) {
      console.log("the errors is ", error);
      setFormError(
        typeof error === "string" ? error : "Failed to add product.",
      );
    } finally {
      setIsAddingProduct(false);
    }
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

      {actionFeedback.message && (
        <div
          role="alert"
          className={`flex items-start justify-between gap-4 rounded-lg border px-4 py-3 text-sm ${
            actionFeedback.type === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-green-200 bg-green-50 text-green-700"
          }`}
        >
          <div className="flex items-center gap-2">
            {actionFeedback.type === "error" ? (
              <AlertCircle className="h-5 w-5 shrink-0" />
            ) : (
              <CheckCircle2 className="h-5 w-5 shrink-0" />
            )}
            <span>{actionFeedback.message}</span>
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
                placeholder="Price"
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
              <input
                name="image"
                type="url"
                placeholder="Image URL (optional)"
                value={productForm.image}
                onChange={handleFormChange}
                className="md:col-span-2 px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent"
              />
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

      {/* Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
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

        <div className="relative w-full sm:w-48">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-footer/40 pointer-events-none" />
          <select
            value={statusFilter}
            onChange={(e) => setstatusFilter(e.target.value)}
            className="w-full h-10 pl-10 pr-8 text-sm bg-primary border border-footer/10 rounded-lg text-footer focus:outline-none focus:ring-2 focus:ring-accent appearance-none cursor-pointer transition-all"
          >
            <option value="ALL">All Products</option>
            <option value="in stock">In Stock</option>
            <option value="out of stock">Out Of Stock</option>
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
                        <span className="text-2xl">{product.image}</span>
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
                <input
                  name="image"
                  type="url"
                  placeholder="Image URL (optional)"
                  value={editForm.image}
                  onChange={handleEditFormChange}
                  className="px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent md:col-span-2"
                />
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
    </div>
  );
}
