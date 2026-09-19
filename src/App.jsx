import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/landing-page/Landing-page";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import OrdersManagement from "./pages/admin/OrdersManagement";
import ProductsManagement from "./pages/admin/ProductsManagement";
import AdminProfile from "./pages/admin/AdminProfile";
import UsersManagement from "./pages/admin/UsersManagement";
import ShoppingProducts from "./pages/shop/ShoppingProducts";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// import ClientDashboard from "./pages/client/ClientDashboard";
import ProductDetail from "./pages/shop/ProductDetail";
import Checkout from "./pages/shop/Checkout";
import Cart from "./pages/shop/Cart";
import MainLayout from "./pages/main-layout/MainLayout";
import ProtectedPages from "./pages/protected-pages/ProtectedPages";
import ForgotPassword from "./pages/reset-password/ForgotPassword";
import ResetPassword from "./pages/reset-password/ResetPassword";
import ResetPasswordSuccess from "./pages/reset-password/Resetpasswordsuccess ";
import AccountLayout from "./pages/client/AccountLayout";
import MyOrders from "./pages/client/MyOrders";
import Profile from "./pages/client/Profile";
import Settings from "./pages/client/Settings";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <LandingPage /> },

        {
          path: "shop",
          element: <ShoppingProducts />,
          children: [{ path: ":productId", element: <ProductDetail /> }],
        },
        { path: "checkout", element: <Checkout /> },
        { path: "cart", element: <Cart /> },
      ],
    },
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "forgot-password", element: <ForgotPassword /> },
    { path: "reset-password/:userId/:token", element: <ResetPassword /> },
    { path: "reset-password-success", element: <ResetPasswordSuccess /> },

    {
      element: <ProtectedPages adminCheck={false} />,
      children: [
        {
          path: "account",
          element: <AccountLayout />,
          children: [
            { index: true, element: <MyOrders /> },
            { path: "profile", element: <Profile /> },
            { path: "settings", element: <Settings /> },
          ],
        },
      ],
    },
    {
      element: <ProtectedPages adminCheck={true} />,
      children: [
        {
          path: "admin",
          element: <AdminLayout />,
          children: [
            { index: true, element: <Dashboard /> },
            { path: "orders", element: <OrdersManagement /> },
            { path: "products", element: <ProductsManagement /> },
            { path: "users", element: <UsersManagement /> },
            { path: "profile", element: <AdminProfile /> },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
