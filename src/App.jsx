import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";
import AdminOrders from "./pages/AdminOrders";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import CategoryProducts from "./pages/CategoryProducts";

import ProductDetails from "./pages/ProductDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Home */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Products */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* Orders */}
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        {/* Dashboard */}
        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>

<Route
  path="/order-success"
  element={
    <ProtectedRoute>
      <OrderSuccess />
    </ProtectedRoute>
  }
/>
<Route
  path="/category/:id"
  element={
    <ProtectedRoute>
      <CategoryProducts />
    </ProtectedRoute>
  }
/>

<Route
  path="/product/:id"
  element={
    <ProtectedRoute>
      <ProductDetails />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;