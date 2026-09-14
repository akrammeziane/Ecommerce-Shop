import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/api/axiosInstance";

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/admin/dashboard");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Stats";
      return rejectWithValue(errorMessage);
    }
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    totalRevenue: 0,
    monthlyRevenue: 0,
    averageOrderValue: 0,
    totalOrdersCount: 0,
    pendingOrdersCount: 0,
    cancelledOrdersCount: 0,
    deliveredOrdersCount: 0,
    recentOrdersList: [],
    totalProductsCount: 0,
    lowStockProductsCountValue: 0,
    outOfStockProductsCountValue: 0,
    topSellingProductsList: [],
    totalUsersCountValue: 0,
    recentRegistredUsersList: [],
    numbersOfUserswithAtLeastOneOrderValue: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.totalRevenue = action.payload.totalRevenue;
        state.monthlyRevenue = action.payload.monthlyRevenue;
        state.averageOrderValue = action.payload.averageOrderValue;
        state.totalOrdersCount = action.payload.totalOrdersCount;
        state.pendingOrdersCount = action.payload.pendingOrdersCount;
        state.cancelledOrdersCount = action.payload.cancelledOrdersCount;
        state.deliveredOrdersCount = action.payload.deliveredOrdersCount;
        state.recentOrdersList = action.payload.recentOrdersList;
        state.totalProductsCount = action.payload.totalProductsCount;
        state.lowStockProductsCountValue =
          action.payload.lowStockProductsCountValue;
        state.outOfStockProductsCountValue =
          action.payload.outOfStockProductsCountValue;
        state.topSellingProductsList = action.payload.topSellingProductsList;
        state.totalUsersCountValue = action.payload.totalUsersCountValue;
        state.recentRegistredUsersList =
          action.payload.recentRegistredUsersList;
        state.numbersOfUserswithAtLeastOneOrderValue =
          action.payload.numbersOfUserswithAtLeastOneOrderValue;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
