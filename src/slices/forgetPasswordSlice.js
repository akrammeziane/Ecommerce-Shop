import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/api/axiosInstance";

export const sendForgetPasswordEmail = createAsyncThunk(
  "forgetPassword/sendForgetPasswordEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await API.post("/password/reset-password", { email });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to send password reset email";
      return rejectWithValue(errorMessage);
    }
  },
);
export const sendForgetPasswrodPage = createAsyncThunk(
  "forgetPassword/sendForgetPasswrodPage",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/password/reset-password/${userId}/${token}`,
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to send password reset email";
      return rejectWithValue(errorMessage);
    }
  },
);
export const resetPassword = createAsyncThunk(
  "forgetPassword/resetPassword",
  async ({ userId, token, password }, { rejectWithValue }) => {
    try {
      const response = await API.post(
        `/password/reset-password/${userId}/${token}`,
        { password },
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to send password reset email";
      return rejectWithValue(errorMessage);
    }
  },
);

const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState: {
    loading: false,
    success: false,
    error: null,
    forgetPasswordError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendForgetPasswordEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendForgetPasswordEmail.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendForgetPasswordEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(sendForgetPasswrodPage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendForgetPasswrodPage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendForgetPasswrodPage.rejected, (state, action) => {
        state.loading = false;
        state.forgetPasswordError = action.payload || "Something went wrong";
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default forgetPasswordSlice.reducer;
