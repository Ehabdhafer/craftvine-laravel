import React, { useState, useEffect } from "react";
import axios from "axios";

const OrdersTable = () => {
  const [users, setUsers] = useState([]);
  async function fetchUsers() {
    axios
      .get("http://localhost:8000/All_products")
      .then((response) => {
        setUsers(response.data);
        // console.log("us", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  useEffect(() => {
    fetchUsers();
  }, [1]);

  async function removeuser(product_id) {
    axios
      .put("http://localhost:8000/deleteproduct", { product_id })
      .then((response) => {
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="w-full">
      <div className="lg:ml-72 m-4 my-8 lg:mx-8">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      <th scope="col" className="px-6 py-2">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-2">
                        #
                      </th>
                      <th scope="col" className="px-6 py-2">
                        Product Name
                      </th>
                      <th scope="col" className="px-6 py-2">
                        QUANTITY
                      </th>
                      <th scope="col" className="px-6 py-2">
                        PRICE
                      </th>
                      <th scope="col" className="px-6 py-2">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, id) => (
                      <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                        <td className="whitespace-nowrap px-6 py-2">
                          <img
                            className={`rounded-full w-1/4 ${
                              user.product_image === null && "hidden"
                            } border`}
                            src={user.product_image}
                            alt="Profile Picture"
                          />
                        </td>
                        <td className="whitespace-nowrap px-6 py-2 font-medium">
                          {user.product_id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          {user.product_name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          {user.quantity} PCS
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          {user.price} $
                        </td>

                        <td className="whitespace-nowrap px-6 py-2">
                          <button
                            onClick={() => removeuser(user.product_id)}
                            className="p-3 bg-gray-50 border-teal-600 ml-4 border font-bold rounded-md"
                          >
                            <svg
                              class="w-6 h-6"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              {" "}
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />{" "}
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
