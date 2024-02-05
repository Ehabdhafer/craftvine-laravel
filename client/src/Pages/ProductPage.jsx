import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const ProductPage = () => {
  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const category = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Fetch products
  useEffect(() => {
    axios
      .get("http://localhost:8000/All_products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchFilteredProducts = products.filter(
    (product) =>
      product.product_name &&
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // console.log("ff", searchFilteredProducts);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchFilteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(searchFilteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const addToCart = async (productId, price) => {
    try {
      const response = await axios.post("http://localhost:8000/postcart", {
        quantity: 1,
        product_id: productId,
        price: price,
      });
      if (response.status === 201) {
        alert("Added to cart successfully!");
        // Find the selected product and add it to the cart
        const selectedProduct = currentProducts.find(
          (product) => product.product_id === productId
        );
        setCart([...cart, selectedProduct]);
      } else if (response.status === 401) {
        console.log("Redirecting to login page");
        window.location.href = "/login";
      }
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };
  return (
    <div className="my-16">
      <div className="flex justify-center items-center my-8">
        <div className="relative">
          <input
            type="text"
            className="px-4 py-2 border rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Search for products"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="relative flex flex-wrap gap-7 justify-center items-center mx-16">
        {currentProducts.map((product) => (
          <div
            key={product.product_id}
            className="group my-2 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
          >
            <Link
              to={`/product/${product.product_id}`}
              className="mx-3 mt-3 h-60 overflow-hidden rounded-xl"
            >
              <img
                className="h-full w-full object-cover"
                src={product.product_image}
                alt="product image"
              />
            </Link>
            <div className="mt-4 px-5 pb-5">
              <h5 className="text-xl text-start h-8 mb-5 overflow-hidden tracking-tight text-slate-900">
                {product.product_name}
              </h5>

              <div className="mt-2 mb-5 flex items-center justify-between">
                <span className="text-lg font-bold text-slate-900">
                  ${product.price}
                </span>
                <span className="text-lg font-bold text-slate-900">
                  Save : {product.discount_percentage}%
                </span>
              </div>
              <button
                onClick={() => addToCart(product.product_id, product.price)}
                className="w-full flex items-center justify-center rounded-full bg-teal-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 px-4 py-2 border text-black rounded-lg shadow"
          >
            Previous Page
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`${
                currentPage === index + 1
                  ? "bg-teal-800 w-10 font-bold text-white"
                  : "bg-teal-600 w-10 text-white"
              } py-2 px-3 focus:outline-none rounded-lg mx-1`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border text-black rounded-lg shadow"
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
