import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CheckoutComponent = () => {
  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [email, setEmail] = useState("");
  const [number, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setSecurityCode] = useState("");
  const [cardname, setCardName] = useState("");
  const [shipping, setshipping] = useState("");
  const [error, setError] = useState("");
  const [blogPost, setBlogPost] = useState(null);
  const [cartProduct, setCartProduct] = useState([]);

  const history = useNavigate();

  const hendlePayment = async (e) => {
    e.preventDefault();

    // Validation
    // if (!validateEmail(email)) {
    //     setError("Please enter a valid email.");
    //     return;
    //   } else{
    //       setError("");
    //   }

    if (!validateCardNumber(number)) {
      setError("Card number must be exactly 16 digits.");
      return;
    } else {
      setError("");
    }

    try {
      const response = await axios.post("http://localhost:8000/postpayment", {
        // "email" : email,
        number: number,
        month: month,
        year: year,
        cvc: cvc,
        cardname: cardname,
        payment_amount:
          cartProduct.reduce(
            (total, product) => total + product.price * product.quantity,
            0
          ) + 8,
      });
      console.log(response.status);
      if (response.status === 200) {
        alert(
          `Your purchase was completed successfully! , Your remaining balance is : ${response[0]}`
        );

        await axios
          .post("http://localhost:8000/postorder", {
            blogPost,
            shipping_address: shipping,
            payment_amount:
              cartProduct.reduce(
                (total, product) => total + product.price * product.quantity,
                0
              ) + 8,
          })
          .then(() => {
            axios
              .delete("http://localhost:8000/deleteall")
              .then(() => {
                // Redirect to the order page after successfully removing cart items
                history("/order"); // Change '/order' to the URL of your order page
              })
              .catch((error) => {
                setError(
                  "An error occurred while removing items from the cart."
                );
              });
          })

          .catch((error) => {
            setError("An error occurred while saving items in the order.");
          });
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError("Email is already taken. Please use a different email.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  // getCart------------------------------------------------------------------------------------------------getCart

  useEffect(() => {
    axios
      .get("http://localhost:8000/getcart")
      .then((response) => {
        setBlogPost(response.data);
        setCartProduct(response.data);
      })
      .catch((error) => {
        setError("An error occurred. Please try again.");
      });
  }, []);

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  // const validateEmail = (email) => {
  //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // };

  const validateCardNumber = (number) => {
    return number.length === 16;
  };

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const years = [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];
  // console.log("hh", blogPost);
  return (
    <div className="relative mx-auto w-full bg-white">
      <div className="grid min-h-screen grid-cols-10">
        <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
          <div className="mx-auto w-full max-w-lg">
            <h1 className="relative text-2xl text-left font-medium text-gray-700 sm:text-3xl">
              Secure Checkout
              <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
            </h1>
            <form
              action=""
              className="mt-10 flex  text-left flex-col space-y-4"
              onSubmit={hendlePayment}
            >
              {/* <div><label htmlFor="email" className="text-xs  font-semibold text-gray-500">Email</label><input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="john.capler@fang.com" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /></div> */}
              <div className="relative">
                <label
                  htmlFor="card-number"
                  className="text-xs font-semibold text-gray-500"
                >
                  Card number
                </label>
                <input
                  value={number}
                  onChange={(e) => setCardNumber(e.target.value)}
                  type="text"
                  id="card-number"
                  name="card-number"
                  placeholder="1234-5678-XXXX-XXXX"
                  className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                />
                <img
                  src="/images/uQUFIfCYVYcLK0qVJF5Yw.png"
                  alt=""
                  className="absolute bottom-3 right-3 max-h-4"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">
                  Expiration date
                </p>
                <div className="mr-6 flex flex-wrap">
                  <div className="my-1">
                    <select
                      name="month"
                      id="month"
                      className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                      onChange={(e) => setMonth(e.target.value)}
                    >
                      <option value="">Month</option>
                      {months.map((month, index) => (
                        <option key={index} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="my-1 ml-3 mr-6">
                    <select
                      name="year"
                      id="year"
                      className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option value="">Year</option>
                      {years.map((year, index) => (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="relative my-1">
                    <label htmlFor="security-code" className="sr-only">
                      Security code
                    </label>
                    <input
                      value={cvc}
                      onChange={(e) => setSecurityCode(e.target.value)}
                      type="text"
                      id="security-code"
                      name="security-code"
                      placeholder="Security code"
                      className="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="card-name" className="sr-only">
                  Card name
                </label>
                <input
                  value={cardname}
                  onChange={(e) => setCardName(e.target.value)}
                  type="text"
                  id="card-name"
                  name="card-name"
                  placeholder="Name on the card"
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label htmlFor="shipping" className="sr-only">
                  Shipping Address
                </label>
                <input
                  value={shipping}
                  onChange={(e) => setshipping(e.target.value)}
                  type="text"
                  // id="card-name"
                  // name="card-name"
                  placeholder="Shipping Address"
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </form>
            <p className="mt-10 text-center text-sm font-semibold text-gray-500">
              By placing this order you agree to the{" "}
              <a
                href="#"
                className="whitespace-nowrap text-teal-400 underline hover:text-teal-600"
              >
                Terms and Conditions
              </a>
            </p>
            <button
              onClick={hendlePayment}
              type="submit"
              className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
            >
              Place Order
            </button>
          </div>
        </div>
        <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
          <h2 className="sr-only">Order summary</h2>
          <div>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
          </div>
          <div className="relative">
            {blogPost ? ( // Check if blogPost is available
              blogPost.map((blog, index) => (
                <>
                  <div className="space-y-5" key={index}>
                    <div className="flex justify-between">
                      <div className="inline-flex">
                        <img
                          src={blog.product_image}
                          alt={blog.product_name}
                          className="max-h-16"
                        />
                        <div className="ml-3 text-left">
                          <p className="text-base  font-semibold text-white">
                            {blog.product_name}
                          </p>
                          <p className="text-sm font-medium text-white text-opacity-80">
                            {blog.description}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        ${blog.price}
                      </p>
                    </div>
                  </div>

                  <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
                </>
              ))
            ) : (
              <p>Loading...</p>
            )}
            <div className="flex justify-between text-lg font-bold text-white">
              <p className="text-sm text-white">Shipping</p>
              <p className="text-lg font-semibold text-white">$8.00</p>
            </div>
            <div className="space-y-2">
              <p className="flex justify-between text-lg font-bold text-white">
                <span> Total Price</span>
                <span>
                  $
                  {cartProduct.reduce(
                    (total, product) =>
                      total + product.price * product.quantity,
                    0
                  ) + 8}
                </span>
              </p>
            </div>
          </div>

          <div className="relative text-left mt-10 text-white">
            <h3 className="mb-5 text-lg font-bold">Support</h3>
            <p className="text-sm font-semibold">
              +962 78 067 98 76{" "}
              <span className="font-light">(International)</span>
            </p>
            <p className="mt-1 text-sm font-semibold">
              support@nanohair.com <span className="font-light">(Email)</span>
            </p>
            <p className="mt-2 text-xs font-medium">
              Call us now for payment related issues
            </p>
          </div>
          <div className="relative mt-10 flex">
            <p className="flex flex-col">
              <span className="text-sm font-bold text-white">
                Money Back Guarantee
              </span>
              <span className="text-xs font-medium text-white">
                within 30 days of purchase
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutComponent;
