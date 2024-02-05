import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const DisProducts = () => {
  const discount = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products based on discount
  useEffect(() => {
    axios
      .get(`http://localhost:8000/getdiscount/${discount.dis}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [discount]);

  // Pagination
  const productPerPage = 9;
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentItems = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const maxVisibleButtons = 3;
  const indexOfLastButton = Math.min(
    Math.max(currentPage + maxVisibleButtons - 1, maxVisibleButtons),
    pageNumbers.length
  );
  const indexOfFirstButton = Math.max(indexOfLastButton - maxVisibleButtons, 0);

  const visiblePageNumbers = pageNumbers.slice(
    indexOfFirstButton,
    indexOfLastButton
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Rendering code...
  return (
    <div className="my-16">
      <h1 className="text-teal-600 text-4xl mb-6 font-bold">
        Explore Our Products
      </h1>
      <div className="relative flex flex-wrap gap-7 justify-center items-center mx-16">
        {currentItems.map((product) => (
          <div
            key={product.product_id}
            className="group my-2 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
          >
            <Link
              className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
              to={`/product/${product.product_id}`}
            >
              <img
                className="peer absolute border top-0 right-0 h-full w-full object-cover"
                src={product.product_image}
                alt="product image"
              />
            </Link>
            <div className="mt-4 px-5 pb-5">
              <a href="#">
                <h5 className="text-xl text-start h-8 mb-5 overflow-hidden tracking-tight text-slate-900">
                  {product.product_name}
                </h5>
              </a>
              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span className="text-lg font-bold text-slate-900">
                    ${product.price}
                  </span>
                </p>
              </div>
              <button className="w-full flex items-center justify-center rounded-full bg-teal-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 px-4 py-2 border text-black rounded-lg shadow "
          >
            Previous Page
          </button>
          <ul className="flex list-none">
            {visiblePageNumbers.map((number) => (
              <li key={number} className="mx-1">
                <button
                  onClick={() => paginate(number)}
                  className={`${
                    currentPage === number
                      ? "bg-teal-800 w-10 font-bold text-white"
                      : "bg-teal-600 w-10 text-white"
                  } py-2 px-3 focus:outline-none rounded-lg`}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(products.length / productPerPage)
            }
            className="px-4 py-2 border text-black rounded-lg shadow"
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisProducts;
