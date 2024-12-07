import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductsGallery from "./components/ProductsGallery";
import LoginPage from "./pages/LoginPage";
import NewProduct from "./components/NewProduct";
function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" default element={<HomePage />} />
          <Route path="/products:product" element={<ProductPage />} />
          <Route path="/new" element={<ProductsGallery category={"new"} />} />
          <Route path="/sale" element={<ProductsGallery category={"sale"} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/addNew" element={<NewProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
