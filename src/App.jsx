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
import ClientDashboard from "./pages/client/ClientDashboard";
import ProductDetail from "./pages/shop/ProductDetail";
import Checkout from "./pages/shop/Checkout";
import Cart from "./pages/shop/Cart";
import MainLayout from "./pages/main-layout/MainLayout";
import ProtectedPages from "./pages/protected-pages/ProtectedPages";

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
    {
      element: <ProtectedPages adminCheck={false} />,
      children: [{ path: "account", element: <ClientDashboard /> }],
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
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<LandingPage />} />
    //     <Route path="/admin" element={<AdminLayout />}>
    //       <Route index element={<Dashboard />} />
    //       <Route path="orders" element={<OrdersManagement />} />
    //       <Route path="products" element={<ProductsManagement />} />
    //       <Route path="users" element={<UsersManagement />} />
    //       <Route path="profile" element={<AdminProfile />} />
    //     </Route>
    //     <Route path="/shop" element={<ShoppingProducts />} />
    //     <Route path="/product" element={<ProductDetail />} />
    //     <Route path="/checkout" element={<Checkout />} />
    //     <Route path="/cart" element={<Cart />} />

    //     <Route path="/login" element={<Login />} />
    //     <Route path="/Register" element={<Register />} />
    //     <Route path="/account" element={<ClientDashboard />} />
    //   </Routes>
    // </Router>
  );
}

export default App;
