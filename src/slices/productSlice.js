import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/api/axiosInstance";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/products");
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
  "product/addProduct",
  async (productData, { rejectWithValue }) => {
    console.log("the product data is ", productData);
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
  "product/deleteProduct",
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
  "product/editProduct",
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

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    // handleAdd: (state, action) => {
    //   state.products.push(action.payload);
    // },
    // handleDelete: (state, action) => {
    //   state.products = state.products.filter(
    //     (product) => product.id !== action.payload,
    //   );
    // },
    // handleEdit: (state, action) => {
    //   const { productId, updatedProduct } = action.payload;
    //   const index = state.products.findIndex(
    //     (product) => product.id === productId,
    //   );
    //   if (index !== -1) {
    //     state.products[index] = {
    //       ...state.products[index],
    //       ...updatedProduct,
    //     };
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Fetch pending...");
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload;
        console.log("Fetched products:", action.payload); // Log the fetched products for debugging
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("Fetch failed with error:", action.payload);
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
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
          (product) => product._id === action.payload._id,
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const { handleAdd, handleDelete, handleEdit } = productSlice.actions;

export default productSlice.reducer;
