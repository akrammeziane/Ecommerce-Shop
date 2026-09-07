import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productsReducer from "./productsSlice";
import usersReducer from "./usersSlice";
import ordersReducer from "./ordersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    users: usersReducer,
    orders: ordersReducer,
  },
});
export default store;
