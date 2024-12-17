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

function App() {
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
        <Route path="/addNew" element={<NewProduct />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
