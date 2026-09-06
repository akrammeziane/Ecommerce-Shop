import { Search, Edit2, Trash2, Plus } from "lucide-react";
import { useState } from "react";

export default function ProductsManagement() {
  const [products, setProducts] = useState([
    {
      id: "#PRD001",
      name: "Premium Cotton T-Shirt",
      category: "T-Shirts",
      price: "$29.99",
      stock: 45,
      status: "In Stock",
      image: "👕",
    },
    {
      id: "#PRD002",
      name: "Vintage Denim Jacket",
      category: "Jackets",
      price: "$79.99",
      stock: 12,
      status: "In Stock",
      image: "🧥",
    },
    {
      id: "#PRD003",
      name: "Classic Chinos",
      category: "Pants",
      price: "$49.99",
      stock: 0,
      status: "Out of Stock",
      image: "👖",
    },
    {
      id: "#PRD004",
      name: "Casual Hoodie",
      category: "Hoodies",
      price: "$59.99",
      stock: 28,
      status: "In Stock",
      image: "🧢",
    },
    {
      id: "#PRD005",
      name: "Summer Dress",
      category: "Dresses",
      price: "$65.99",
      stock: 8,
      status: "Low Stock",
      image: "👗",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase()),
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

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
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

      {/* Add Product Form */}
      {showAddForm && (
        <div className="bg-primary border border-footer/10 rounded-xl p-6">
          <h3 className="text-xl font-heading font-bold text-footer mb-4">
            Add New Product
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              className="px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <input
              type="text"
              placeholder="Category"
              className="px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <input
              type="text"
              placeholder="Price"
              className="px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <input
              type="number"
              placeholder="Stock"
              className="px-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button className="flex-1 px-6 py-2 bg-accent text-primary rounded-lg hover:opacity-90 transition-opacity font-medium">
              Add Product
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="flex-1 px-6 py-2 bg-hero border border-footer/10 text-footer rounded-lg hover:bg-footer/5 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-3 w-5 h-5 text-footer/40" />
        <input
          type="text"
          placeholder="Search by product name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-2 bg-hero border border-footer/10 rounded-lg text-footer placeholder-footer/40 focus:outline-none focus:ring-2 focus:ring-accent"
        />
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
              {filteredProducts.map((product) => (
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
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-hero rounded-lg transition-colors text-footer/60 hover:text-accent">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-footer/60 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-footer/60 text-lg">No products found</p>
        </div>
      )}
    </div>
  );
}
