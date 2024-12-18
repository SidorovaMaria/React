import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductsGallery from "./components/ProductsGallery";
import NewProduct from "./components/NewProduct";
import AuthPage from "./pages/AuthPage";
import { auth } from "./components/user/firebase";
import { logoutUser, setLoading, setUser } from "./redux/auth/authSlice";
import ProfilePage from "./pages/ProfilePage";
import { ToastContainer } from "react-toastify";
import CartPage from "./pages/CartPage";

function App() {
  const PrivateRoute = ({ children }) => {
    const user = useSelector((state) => state.auth.user); // Get the user from Redux store

    // If the user is not logged in, redirect to login page
    if (!user) {
      return <Navigate to="/" />;
    }

    return children; // If the user is logged in, allow access to the protected route
  };

  auth.signOut();
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products:product" element={<ProductPage />} />
        <Route path="/all" element={<ProductsGallery category={"all"} />} />
        <Route path="/new" element={<ProductsGallery category={"new"} />} />
        <Route path="/sale" element={<ProductsGallery category={"sale"} />} />
        <Route path="/login" element={<AuthPage />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/addNew"
          element={
            <PrivateRoute>
              <NewProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer toastClassName="bg-main text-white font-mitr whitespace-nowrap px-3" />
    </BrowserRouter>
  );
}

export default App;
