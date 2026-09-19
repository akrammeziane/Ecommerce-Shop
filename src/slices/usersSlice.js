import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/api/axiosInstance";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    { page = 1, limit = 10, id, name, email, isAdmin },
    { rejectWithValue },
  ) => {
    try {
      const response = await API.get("/users", {
        params: { page, limit, id, name, email, isAdmin },
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch users";
      return rejectWithValue(errorMessage);
    }
  },
);
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch user";
      return rejectWithValue(errorMessage);
    }
  },
);
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete user";
      return rejectWithValue(errorMessage);
    }
  },
);
export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update user";
      return rejectWithValue(errorMessage);
    }
  },
);
export const changePassword = createAsyncThunk(
  "users/changePassword",
  async ({ userId, currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/users/${userId}/change-password`, {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to change password";
      return rejectWithValue(errorMessage);
    }
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: null,
    totalUsers: 0,
    totalAdmins: 0,
    totalRegularUsers: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
    passwordLoading: false,
    passwordError: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
        state.totalAdmins = action.payload.totalAdmins;
        state.totalRegularUsers = action.payload.totalRegularUsers;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.totalUsers -= 1;
        if (action.payload.isAdmin === "true") {
          state.totalAdmins -= 1;
        } else {
          state.totalRegularUsers -= 1;
        }
        if (state.totalUsers <= state.totalPages * 10) {
          state.totalPages -= 1;
          state.currentPage = state.totalPages;
        }
        state.users = state.users.filter(
          (user) => user._id !== action.payload._id,
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.passwordLoading = true;
        state.passwordError = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.passwordLoading = false;
        state.passwordError = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.passwordLoading = false;
        state.passwordError = action.payload;
      });
  },
});
export const { setCurrentPage } = usersSlice.actions;
export default usersSlice.reducer;
