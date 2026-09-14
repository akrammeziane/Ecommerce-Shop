import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/api/axiosInstance";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (
    { page = 1, limit = 10, productId, phone, status },
    { rejectWithValue },
  ) => {
    try {
      const response = await API.get("/orders", {
        params: { page, limit, productId, phone, status },
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch orders";
      return rejectWithValue(errorMessage);
    }
  },
);
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete order";
      return rejectWithValue(errorMessage);
    }
  },
);
export const editOrderStatus = createAsyncThunk(
  "orders/editOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/orders/${orderId}`, { status });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update order status";
      return rejectWithValue(errorMessage);
    }
  },
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalRevenue: 0,
    totalPendingOrders: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
        state.totalRevenue = action.payload.totalRevenue;
        state.totalPages = action.payload.totalPages;
        state.totalPendingOrders = action.payload.totalPendingOrders;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.totalOrders -= 1;
        if (action.payload.status === "delivered") {
          state.totalRevenue -= action.payload.totalPrice;
        }
        if (state.totalOrders <= state.totalPages * 10) {
          state.totalPages -= 1;
          state.currentPage = state.totalPages;
        }
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload._id,
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id,
        );
        if (index !== -1) {
          if (
            (state.orders[index].status === "pending" ||
              state.orders[index].status === "shipped" ||
              state.orders[index].status === "cancelled") &&
            action.payload.status === "delivered"
          ) {
            state.totalRevenue += action.payload.totalPrice;
          } else if (
            state.orders[index].status === "delivered" &&
            (action.payload.status === "pending" ||
              action.payload.status === "cancelled" ||
              action.payload.status === "shipped")
          ) {
            state.totalRevenue -= action.payload.totalPrice;
          }
          if (
            (state.orders[index].status === "delivered" ||
              state.orders[index].status === "shipped" ||
              state.orders[index].status === "cancelled") &&
            action.payload.status === "pending"
          ) {
            state.totalPendingOrders += 1;
          } else if (
            state.orders[index].status === "pending" &&
            (action.payload.status === "shipped" ||
              action.payload.status === "cancelled" ||
              action.payload.status === "delivered")
          ) {
            state.totalPendingOrders -= 1;
          }
          state.orders[index] = action.payload;
        }
      })
      .addCase(editOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setCurrentPage } = ordersSlice.actions;
export default ordersSlice.reducer;
