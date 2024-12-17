import React, { useState, useEffect } from "react";
import { categories } from "../assets/data/constants";
import { useLocation } from "react-router-dom";
import BackSection from "./design/BackSection";

const ProductsGallery = ({ category }) => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(`http://localhost:5050/products/`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          console.error(message);
          return;
        }

        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    getProducts();
  }, []);
  //Filter products based on the category of the page
  useEffect(() => {
    if (category === "sale") {
      setFilteredProducts(products.filter((product) => product.discount));
    } else if (category === "new") {
      // Assuming products have a 'createdAt' field and 'new' means within the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      setFilteredProducts(
        products.filter(
          (product) => new Date(product.createdAt) >= thirtyDaysAgo
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [category, products, location]);

  // Set products based on the category of the clothing
  // Filter products based on category and search query
  useEffect(() => {
    let filtered = products;

    if (categoryFilter) {
      if (categoryFilter === "featured") {
        filtered = filtered.filter((product) => product.IsFeatured);
      } else {
        filtered = filtered.filter(
          (product) => product.category === categoryFilter
        );
      }
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [categoryFilter, searchQuery, products]);

  return (
    <BackSection>
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-4xl p-4 font-AS-3D-Bold my-5">
          {" "}
          {category === "sale"
            ? "Sale Items"
            : category === "new"
            ? "New Items"
            : "All Products"}
        </h1>
        {/* Category Filter */}
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-10    items-center justify-around">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=" pl-4 py-2 border rounded-xl text-main text-sm  lg:text-xl font-semibold outline-main font-mitr flex-1"
          />
          <div className="flex justify-between items-center">
            <label
              htmlFor="category"
              className="font-AS text-lg text-start bg-red pr-5"
            >
              Category:
            </label>
            <select
              id="category"
              name="category"
              value={categoryFilter}
              className="outline-none w-full rounded-md text-main px-2 font-mitr font-medium tracking-wider text-center"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value={""}>All</option>
              <option value="featured">Featured</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Products GAllery  */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-4/5 mt-10">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className=" overflow-hidden hover:shadow-[4px_4px_0_white] border-2 border-transparent hover:border-accent rounded-xl transition-all"
            >
              {/* Product Image */}
              <div className="">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]} // Display the first image
                    alt={product.name}
                    className="w-full aspect-square object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full bg-gray-200 flex items-center justify-center">
                    <span>No Image Available</span>
                  </div>
                )}
              </div>
              {/* Product Details */}
              <div className="mt-4 ">
                <h1 className="text-left font-mitr font-semibold italic text-sm tracking-widest px-2">
                  {product.name}
                </h1>
                <div className="text-left font-AS tracking-wider text-xl px-2 scale-y-125">
                  {product.discount ? (
                    <div className="flex  gap-2 items-center ">
                      {Math.ceil(
                        (product.price / 100) * (100 - product.discount)
                      )}
                      £
                      <span className=" text-lg  line-through text-accent ">
                        {product.price}£
                      </span>
                    </div>
                  ) : (
                    <span>{product.price}£</span>
                  )}
                  {/* {product.price} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BackSection>
  );
};

export default ProductsGallery;
