import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Home from "./pages/Home"; // Ensure to import your Home component
import { Toaster } from "react-hot-toast";
import MenuList from "./components/menu/Menu";
import OrderDetails from "./components/orderDetails/OrderDetails";
// import AdminDashboard from "./pages/admin/AdminDashboard";

const App = () => {
  const isAuthenticated = false; // Replace with your authentication logic

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* <Route path="/navbar" element={<Navbar />} />s */}
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<MenuList />} />
        <Route path="/order-details" element={<OrderDetails />} />
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
        <Route path="*" element={<Navigate to="/" />} />{" "}
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
