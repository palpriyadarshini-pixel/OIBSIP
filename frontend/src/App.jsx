import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Cart from "./pages/cart";
import Orders from "./pages/orders";
import Admin from "./pages/admin";
import AdminOrders from "./pages/AdminOrders";
import Layout from "./components/Layout";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import AdminAddons from "./pages/AdminAddons";
import AdminDeals from "./pages/AdminDeals";
import DealDetails from "./pages/DealDetails";


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
            <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/deals"
          element={
            <AdminRoute>
              <AdminDeals />
            </AdminRoute>
          }
        />
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/addons"
          element={
            <AdminRoute>
              <AdminAddons />
            </AdminRoute>
          }
        />
        <Route
          path="/deal/:id"
          element={<DealDetails />}
        />
      </Routes>
    </Layout>
  );
}

export default App;