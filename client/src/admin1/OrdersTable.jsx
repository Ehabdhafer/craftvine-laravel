import React, { useState, useEffect } from "react";
import axios from "axios";

const OrdersTable = () => {
  const [users, setUsers] = useState([]);
  async function fetchUsers() {
    axios
      .get("http://localhost:8000/allorders")
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
                        #
                      </th>
                      <th scope="col" className="px-6 py-2">
                        Username
                      </th>
                      <th scope="col" className="px-6 py-2">
                        shipping_address
                      </th>
                      <th scope="col" className="px-6 py-2">
                        status
                      </th>
                      <th scope="col" className="px-6 py-2">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, id) => (
                      <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                        <td className="whitespace-nowrap px-6 py-2 font-medium">
                          {user.order_id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          {user.username}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          {user.shipping_address}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          {user.status}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          {user.total_amount} $
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
