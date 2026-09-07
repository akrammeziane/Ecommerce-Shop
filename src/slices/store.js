import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "./adminSlice";
import productReducer from "./productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    product: productReducer,
  },
});
export default store;
