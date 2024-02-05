import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const OrderPage = () => {
  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [detailcart, setDetailCart] = useState(null);
  const [error, setError] = useState("");
  const [blogPost, setBlogPost] = useState(null);
  // const [blogcust, setBlogCust] = useState(null);

  // endpoint to order cart

  useEffect(() => {
    axios
      .get("http://localhost:8000/getorder")
      .then((response) => {
        setBlogPost(response.data);
        // console.log("hh", response.data);
      })
      .catch((error) => {
        setError("An error occurred. Please try again.");
      });
  }, []);

  // endpoint to profile

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/user")
  //     .then((response) => {
  //       setBlogCust(response.data);
  //     })
  //     .catch((error) => {
  //       setError("An error occurred. Please try again.");
  //     });
  // }, []);

  // Discount on invoice
  // const discountPercentage = 20; // نسبة الخصم

  // Calculate discounted price
  // const discounteddis = blogPost
  //   ? blogPost.prices - blogPost.prices * (discountPercentage / 100)
  //   : 0;

  // Total on invoice
  // const Shipping = 8.0; // نسبة الشحن

  // Calculate total price
  // const discountedtotal = discounteddis + Shipping;

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-start item-start space-y-2 flex-col">
        <h1 className="text-3xl dark:text-black lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
          Order #13432
        </h1>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start  bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl dark:text-black font-semibold leading-6 xl:leading-5 text-gray-800">
              Customer’s Cart
            </p>
            <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
              {blogPost ? (
                blogPost.map((blog, index) => (
                  <>
                    <div>
                      {/* <div className="pb-4 md:pb-8 w-full md:w-40" key={index}> */}
                      <img
                        className="w-full hidden md:block"
                        src={
                          "https://thumbs.dreamstime.com/b/thank-you-your-order-message-red-snowflakes-christmas-ornaments-beige-sherpa-material-thank-you-your-order-message-235862867.jpg"
                        }
                        alt="dress"
                      />
                      <img
                        className="w-full md:hidden"
                        src={
                          "https://thumbs.dreamstime.com/b/thank-you-your-order-message-red-snowflakes-christmas-ornaments-beige-sherpa-material-thank-you-your-order-message-235862867.jpg"
                        }
                        alt="dress"
                      />
                    </div>
                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl dark:text-black xl:text-2xl font-semibold leading-6 text-gray-800">
                          {blog.product_name}
                        </h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm dark:text-black leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-300">
                              Shipping Address:{" "}
                            </span>{" "}
                            {blog.shipping_address}
                          </p>
                          <p className="text-sm dark:text-black leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-300">
                              Total Amount:{" "}
                            </span>{" "}
                            {blog.total_amount}$
                          </p>
                          <p className="text-sm dark:text-black leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-300">
                              Purchased In:{" "}
                            </span>{" "}
                            {blog.created_at.split("T")[0]}
                            <p>
                              At {blog.created_at.split("T")[1].split(".")[0]}
                            </p>
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between space-x-8 items-start w-full">
                        <p className="text-base dark:text-black xl:text-lg leading-6">
                          {blog.price}{" "}
                          <span className="text-red-300 line-through"> </span>
                        </p>
                        <p className="text-base dark:text-black xl:text-lg leading-6 text-gray-800">
                          {blog.quantity}
                        </p>
                        <p className="text-base dark:text-black xl:text-lg font-semibold leading-6 text-gray-800">
                          {blog.price}{" "}
                        </p>
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>
            {blogPost ? (
              blogPost.map((blog, index) => (
                <div className="flex justify-center md:flex-row flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                  <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50  space-y-6">
                    <div className="flex justify-between w-full">
                      <p className="text-base dark:text-black-300 leading-4 text-gray-600">
                        {/* {blogPost ? blog.total_amount : "N/A"} */}
                      </p>
                    </div>

                    <div className="flex justify-between items-center w-full">
                      {/* <p className="text-base dark:text-black font-semibold leading-4 text-gray-800">
                        Total */}
                      {/* </p> */}
                      {/* <p className="text-base dark:text-black-300 font-semibold leading-4 text-gray-600"> */}
                      {/* </p> */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
