import React, { useState, useEffect } from "react";

const ProductsGallery = ({ category }) => {
  const [products, setProducts] = useState([]);

  // Getting all products from the dtaabase
  useEffect(() => {
    async function getProducts() {
      const response = await fetch(`http://localhost:5050/products/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const products = await response.json();
      setProducts(products);
    }
    getProducts();
    return;
  }, [products.length]);
  console.log(products);

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-3xl p-4 font-AS-3D-Bold">Newest Products </h1>
      {/* Products GAllery  */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-10 m-5">
        {products.map((product) => (
          <div key={product._id} className=" overflow-hidden">
            {/* Product Image */}
            <div className="">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]} // Display the first image
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-md"
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
              <p className="text-left font-AS tracking-wider text-xl">
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
                  <p>{product.price}£</p>
                )}
                {/* {product.price} */}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsGallery;
