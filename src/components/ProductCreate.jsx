import { request } from "@/api";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductCreate = () => {
  const token = useSelector((s) => s.token.value);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    request.get("/product-category/get").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const product = Object.fromEntries(formData);

    product.price = +product.price;
    product.categoryId = +product.categoryId;
    product.stock = +product.stock;
    product.average_rating = 0;

    request.post("/product/create", product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Create a New Product
      </h2>
      <form onSubmit={handleCreateProduct} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            className="border border-gray-300 rounded-md w-full p-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="border border-gray-300 rounded-md w-full p-2 focus:ring-blue-500 focus:border-blue-500"
            name="description"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            className="border border-gray-300 rounded-md w-full p-2 focus:ring-blue-500 focus:border-blue-500"
            type="number"
            name="price"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            className="border border-gray-300 rounded-md w-full p-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="image"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            className="border border-gray-300 rounded-md w-full p-2 focus:ring-blue-500 focus:border-blue-500"
            name="categoryId"
            required
          >
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Quantity
          </label>
          <input
            className="border border-gray-300 rounded-md w-full p-2 focus:ring-blue-500 focus:border-blue-500"
            type="number"
            name="stock"
            required
          />
        </div>

        <button className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
