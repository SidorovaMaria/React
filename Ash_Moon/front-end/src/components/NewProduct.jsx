import { categories, sizes } from "../assets/data/constants";
import { capitalizeFirstLetter, formatDate } from "../utils/helperFunctions";

import React, { useEffect, useState } from "react";

const NewProduct = () => {
  // Empty New Product
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    images: [
      "https://harshandcruel.com/cdn/shop/files/download_d3065a7a-017c-44dc-b161-fea93185ad3e_1024x1024@2x.jpg?v=1730988332",
    ],
    colors: "",
    sizes: [],
    stock: [],
    IsFeatured: false,
    discount: "",
    createdAt: formatDate(new Date()),
  });
  const [addColor, setAddColor] = useState("");
  const [stock, setStock] = useState({
    color: "",
    amount: 0,
    size: "",
  });
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  function updateStock(value) {
    return setStock((prev) => {
      return { ...prev, ...value };
    });
  }
  function handleDeleteStock(e, index) {
    e.preventDefault();
    const updatedStock = form.stock.filter((item, i) => i !== index);

    updateForm({ stock: updatedStock });
  }
  // Add Stock
  function OnAddStock(e) {
    e.preventDefault();
    if (!stock.color || stock.color === "") {
      alert("Please select a color.");
      return; // Prevent the submission
    }
    const existingStockIndex = form.stock.findIndex(
      (item) => item.color === stock.color
    );
    if (existingStockIndex > -1) {
      const updatedStock = [...form.stock];
      const sizeKey = stock.size;
      updatedStock[existingStockIndex][sizeKey] =
        (updatedStock[existingStockIndex][sizeKey] || 0) +
        parseInt(stock.amount);
      updateForm({ stock: updatedStock });
    } else {
      const newStock = { color: stock.color };
      form.sizes.forEach((size) => {
        newStock[size] = stock.size === size ? parseInt(stock.amount) || 0 : 0;
      });
      updateForm({ stock: [...form.stock, newStock] });
    }
    setStock({ color: "", size: "", amount: "" });
  }

  // Add product to the Database
  async function onSubmit(e) {
    e.preventDefault();
    const product = { ...form };

    try {
      let response;

      // if we are adding a new record we will POST to /products.
      response = await fetch("http://localhost:5050/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
    } catch (error) {
    } finally {
      setForm({
        name: "",
        price: "",
        category: "",
        images: "",
        colors: "",
        sizes: [],
        stock: [],
        IsFeatured: false,
        discount: "",
        createdAt: "",
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center my-5 ">
      <h1 className="text-3xl p-4 font-AS-3D-Bold">Add New product </h1>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col lg:flex-row gap-10 lg:justify-center lg:gap-18  items-center w-full ">
          {/* Name, Price, Category, Images, isFeatured */}
          <div className="flex flex-col gap-10  items-center">
            {/* Name */}
            <div className="flex flex-col ">
              <label htmlFor="name" className="font-AS text-lg text-start ">
                Title:
              </label>
              <div>
                <input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Clothing Piece"
                  value={form.name}
                  className="p-2 rounded-md  text-main font-mitr outline-accent"
                  onChange={(e) => updateForm({ name: e.target.value })}
                />
              </div>
            </div>
            {/* Price */}
            <div className="flex flex-col ">
              <label
                htmlFor="price"
                className="font-AS text-lg text-start bg-red"
              >
                Price:
              </label>
              <div>
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Price"
                  value={form.price}
                  className="p-2 rounded-md  text-main font-mitr"
                  onChange={(e) => updateForm({ price: e.target.value })}
                />
              </div>
            </div>
            {/* Category */}
            <div className="flex justify-between">
              <label
                htmlFor="category"
                className="font-AS text-lg text-start bg-red pr-5"
              >
                Category:
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                className="outline-none w-full rounded-md text-main font-mitr font-medium tracking-wider text-center"
                onChange={(e) => updateForm({ category: e.target.value })}
              >
                <option value={""}>Choose Category</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            {/* IsFeatured */}
            <div className="flex justify-between gap-4">
              <label
                htmlFor="IsFeatured"
                className="font-AS text-lg text-start bg-red"
              >
                Is Featured ?
              </label>
              <input
                type="checkbox"
                name="IsFeatured"
                id="IsFeatured"
                className="w-6 h-6 border-none outline-none"
                checked={form.IsFeatured} // Always a boolean value
                onChange={(e) => updateForm({ IsFeatured: !form.IsFeatured })}
              />
            </div>
          </div>
          {/* Colors,Stock,Sizes,Tags */}
          <div className="flex flex-col gap-10 ">
            {/* Sizes */}
            <div className="flex justify-center gap-20 items-center ">
              <label
                htmlFor="sizes"
                className="font-AS text-xl text-start bg-red pr-5"
              >
                Sizes:
              </label>
              {/* CheckBoxes for Sizes */}
              <div id="sizes" className="grid grid-cols-3 gap-2">
                {sizes.map((size, index) => (
                  <div className="flex flex-col items-center" key={index}>
                    <label
                      htmlFor={size}
                      className="font-mitr drop-shadow-lg font-medium"
                    >
                      {size}
                    </label>
                    <input
                      type="checkbox"
                      value={size}
                      id={size}
                      checked={form.sizes.includes(size)}
                      onChange={(e) => {
                        // If checked, add size to the array; if unchecked, remove it
                        if (e.target.checked) {
                          updateForm({
                            sizes: [...form.sizes, e.target.value],
                          }); // Add size
                        } else {
                          updateForm({
                            sizes: form.sizes.filter(
                              (size) => size !== e.target.value
                            ), // Remove size
                          });
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Colors */}
            <div className="flex flex-col gap-2 ">
              <div className="flex justify-between items-center flex-col md:flex-row  ">
                <label
                  htmlFor="colors"
                  className="font-AS text-lg text-start bg-red pr-5 mb-2 md:mb-0"
                >
                  Colors:
                </label>
                <input
                  type="text"
                  id="colors"
                  name="colors"
                  value={addColor}
                  className="text-main text-center font-mitr font-medium  outline-none md:rounded-r-none rounded-xl py-2 capitalize"
                  onChange={(e) => setAddColor(e.target.value)}
                />
                <button
                  className={`${
                    addColor ? "bg-accent" : "bg-secondary"
                  } whitespace-nowrap text-xl pl-3 pr-4 p-[0.25rem] font-AS-3D-Bold border-2 md:rounded-l-none rounded-lg my-2 md:my-0 `}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the default form submission
                    if (addColor.trim() !== "") {
                      updateForm({
                        colors: [
                          ...form.colors,
                          capitalizeFirstLetter(addColor),
                        ],
                      });
                      setAddColor(""); // Clear the input field
                    }
                  }}
                >
                  Add Color
                </button>
              </div>
              {/* Color Palletes */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
                {form.colors
                  ? form.colors.map((color, index) => (
                      <div
                        key={index}
                        className="flex px-2 py-1 rounded-lg border-bg-light border-2 text-sm justify-between hover:text-accent"
                      >
                        <p className="font-mitr font-medium pr-2">{color}</p>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            updateForm({
                              colors: form.colors.filter((cl) => cl !== color),
                            });
                          }}
                          className="font-bold "
                        >
                          x
                        </button>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
        {/* Stock */}
        <hr className="h-1 bg-tertiary mt-5" />
        <div className="flex my-2 flex-col items-center justify-evenly  ">
          <label
            htmlFor="stock-color"
            className="font-AS text-2xl text-start my-2"
          >
            Add Stock:
          </label>
          <div className="flex items-center gap-10 w-full flex-col lg:flex-row ">
            {/* Color */}
            <div className="flex gap-4 items-center w-full justify-between">
              <label
                htmlFor="stock-color"
                className="font-AS text-xl text-start "
              >
                Color
              </label>
              <select
                id="stock-color"
                name="stock-color"
                value={stock.color}
                className="outline-none rounded-md text-main font-mitr font-medium tracking-wider text-center"
                onChange={(e) => updateStock({ color: e.target.value })}
              >
                <option defaultValue={""}>Choose Color</option>
                {form.colors
                  ? form.colors.map((color, index) => (
                      <option value={color} key={index}>
                        {color}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            {/* Size */}
            <div className="flex gap-4 items-center w-full justify-between">
              <label
                htmlFor="stock-size"
                className="font-AS text-xl text-start "
              >
                Size
              </label>
              <select
                id="stock-size"
                name="stock-size"
                value={stock.size}
                className="outline-none rounded-md text-main font-mitr font-medium tracking-wider text-center"
                onChange={(e) => updateStock({ size: e.target.value })}
              >
                <option defaultValue={""}>Choose Size</option>
                {form.sizes
                  ? form.sizes.map((size, index) => (
                      <option value={size} key={index}>
                        {size}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            {/* Amount */}
            <div className="flex gap-4 items-center w-full justify-between">
              <label
                htmlFor="stock-amount"
                className="font-AS text-xl text-start "
              >
                Stock
              </label>
              <input
                type="number"
                id="stock-amount"
                name="stock-amount"
                value={stock.amount || 0} // Default to 0 if undefined
                className="p-2 font-bold max-w-24 rounded-md  text-main font-mitr outline-none tracking-widest text-center"
                onChange={(e) => updateStock({ amount: e.target.value })}
              />
            </div>

            <button
              onClick={(e) => {
                OnAddStock(e);
              }}
              disabled={!stock.color || !stock.size}
              className="whitespace-nowrap text-2xl pl-3 pr-4 py-1 font-AS-3D border-2 rounded-lg hover:bg-white hover:font-AS-3D-Bold hover:text-main disabled:opacity-5"
            >
              Add Stock
            </button>
          </div>
          <div className="flex my-10 gap-10 flex-col md:flex-row">
            {form.stock
              ? form.stock.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 bg-accent/50 rounded-md border-2 shadow-[4px_5px_5px_#fff] border-white px-4 py-4 relative overflow-hidden"
                  >
                    {/* Delete Button */}
                    <button
                      className="absolute top-0 right-0 font-bold font-AS px-3 py-1 hover:text-accent"
                      onClick={(e) => handleDeleteStock(e, i)}
                    >
                      x
                    </button>
                    <p className=" font-AS-3D tracking-wider text-left text-3xl pr-10">
                      {item.color}
                    </p>
                    <div className=" gap-2 grid grid-cols-3">
                      {form.sizes.map((size, index) => (
                        <div key={index} className="text-center">
                          <p className="font-AS text-center text-xl">{size}</p>
                          {/* Display the amount for the specific size */}
                          <p className="font-mitr">{item[size] || 0}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className="mx-auto my-10 text-center">
          <input
            disabled={
              !form.name || // Name must be provided
              !form.category || // Category must be provided
              !form.price || // Price must be provided
              form.sizes.length === 0 || // At least one size must be selected
              form.colors.length === 0 // At least one color must be selected
            }
            type="submit"
            value="Save Product"
            className="whitespace-nowrap text-2xl pl-3 pr-4 py-1 font-AS-3D border-2 rounded-lg hover:bg-white hover:font-AS-3D-Bold hover:text-main disabled:opacity-50"
          />
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
