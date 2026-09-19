import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/api/axiosInstance";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    {
      page = 1,
      limit = 10,
      name,
      id,
      status,
      category,
      minPrice,
      maxPrice,
      availableSizes,
      availableColors,
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await API.get("/products", {
        params: {
          page,
          limit,
          name,
          id,
          status,
          category,
          minPrice,
          maxPrice,
          availableSizes,
          availableColors,
        },
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch products";
      return rejectWithValue(errorMessage);
    }
  },
);
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await API.post("/products", productData);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add product";
      return rejectWithValue(errorMessage);
    }
  },
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/products/${productId}`);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete product";
      return rejectWithValue(errorMessage);
    }
  },
);
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/products/${productId}`, productData);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update product";
      return rejectWithValue(errorMessage);
    }
  },
);
export const fetchLatestProducts = createAsyncThunk(
  "products/fetchLatestProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/products/latest");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch latest products";
      return rejectWithValue(errorMessage);
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    totalProducts: 0,
    totalInStock: 0,
    totalOutOfStock: 0,
    totalPages: 0,
    currentPage: 1,
    error: null,
    latestProducts: [],
    latestLoading: false,
    latestError: null,
    productsOrderedNumber:
      JSON.parse(localStorage.getItem("cart"))?.length || 0,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    incrementProductsOrderedNumber: (state) => {
      state.productsOrderedNumber += 1;
    },
    decrementProductsOrderedNumber: (state) => {
      if (state.productsOrderedNumber > 0) {
        state.productsOrderedNumber -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
        state.totalInStock = action.payload.totalInStock;
        state.totalOutOfStock = action.payload.totalOutOfStock;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.totalProducts += 1;
        if (action.payload.status === "In Stock") {
          state.totalInStock += 1;
        } else if (action.payload.status === "Out Of Stock") {
          state.totalOutOfStock += 1;
        }
        if (state.totalProducts > state.totalPages * 10) {
          state.totalPages += 1;
          state.currentPage = state.totalPages;
        }
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.totalProducts -= 1;
        if (action.payload.status === "In Stock") {
          state.totalInStock -= 1;
        } else if (action.payload.status === "Out Of Stock") {
          state.totalOutOfStock -= 1;
        }
        if (state.totalProducts <= state.totalPages * 10) {
          state.totalPages -= 1;
          state.currentPage = state.totalPages;
        }
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id,
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product._id === action.payload.product._id,
        );
        if (index !== -1) {
          state.products[index] = action.payload.product;
          state.totalInStock = action.payload.totalInStock;
          state.totalOutOfStock = action.payload.totalOutOfStock;
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLatestProducts.pending, (state) => {
        state.latestLoading = true;
        state.latestError = null;
      })
      .addCase(fetchLatestProducts.fulfilled, (state, action) => {
        state.latestLoading = false;
        state.latestError = null;
        state.latestProducts = action.payload;
      })
      .addCase(fetchLatestProducts.rejected, (state, action) => {
        state.latestLoading = false;
        state.latestError = action.payload;
      });
  },
});
export const {
  setCurrentPage,
  incrementProductsOrderedNumber,
  decrementProductsOrderedNumber,
} = productsSlice.actions;
export default productsSlice.reducer;
