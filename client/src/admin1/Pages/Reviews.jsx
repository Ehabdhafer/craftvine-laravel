import React from "react";
// import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
// import {
//     Card,
//     CardHeader,
//     Typography,
//     Button,
//     CardBody,
//     Chip,
//     CardFooter,
//     IconButton,
//     Tooltip,
// } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
// import { usePage } from "../../Context/SelectedPageContext";

const Reviews = () => {
  const [messages, setMessages] = useState([]);
  // const [filteredMsgs, setFilteredMsgs] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalCount, setTotalCount] = useState(1);
  const [isMessageOpened, setIsMessageOpened] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  // const itemsPerPage = 10;
  // const { page, onSelectedPage, selectedId, onSelectedId } = usePage();

  const TABLE_HEAD = ["Number", "From", "Subject", ""];
  const fetchData = () => {
    axios
      .get(`http://localhost:8000/getcontact`)
      .then((response) => {
        setMessages(response.data);
        // setFilteredMsgs(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  // const totalPages = Math.ceil(filteredMsgs.length / itemsPerPage);
  // const indexOfLastMessages = currentPage * itemsPerPage;
  // const indexOfFirstMessages = indexOfLastMessages - itemsPerPage;
  // const currentConatct = filteredMsgs.slice(
  //     indexOfFirstMessages,
  //     indexOfLastMessages
  // );

  // const paginate = (pageNumber) => {
  //     setCurrentPage(pageNumber);
  // };
  // const handleSearch = (e) => {
  //     e.preventDefault();
  //     if (searchQuery === "") {
  //         setFilteredMsgs(messages);
  //     } else {
  //         setFilteredMsgs(
  //             messages.filter(
  //                 (msg) =>
  //                     msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //                     msg.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //                     msg.email.toLowerCase().includes(searchQuery.toLowerCase())
  //             )
  //         );
  //     }
  // };

  const openMessage = (id) => {
    setIsMessageOpened(true);
    setMsgIndex(id);
  };

  const closeMessage = () => {
    setIsMessageOpened(false);
  };

  const replyToMsg = () => {};

  const handleDelete = (id) => {};

  return (
    <>
      <div className="lg:ml-72 m-4 my-8 lg:mx-8">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                        >
                          <p>{head}</p>
                        </th>
                      ))}
                      {/* <th scope="col" className="px-6 py-2">
                                                #
                                            </th>
                                            <th scope="col" className="px-6 py-2">
                                                Username
                                            </th>
                                            <th scope="col" className="px-6 py-2">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-2">
                                                Remove
                                            </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg, id) => (
                      <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                        <td className="whitespace-nowrap px-6 py-2 font-medium">
                          {msg.message_id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          <p>{msg.name}</p>
                          <p>{msg.email}</p>
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          {msg.message}
                        </td>
                        <td className={`whitespace-nowrap px-6 py-2`}>
                          <button
                            onClick={() => openMessage(id)}
                            variant="text"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="text-Base-color w-6 h-6 font-bold"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                              />
                            </svg>
                          </button>
                        </td>
                        {/* <td className="whitespace-nowrap px-6 py-2">
                                                    <button
                                                        onClick={() => handleDelete(msg.inquiry_id)}
                                                        className="p-3 bg-gray-50 border-teal-600 ml-4 border font-bold text-black rounded-md">
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
                                                </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* msg modal */}
                {isMessageOpened && (
                  <div className="fixed x-[55] top-0 left-0 w-full h-full flex items-center justify-center bg-black/30 bg-opacity-50">
                    <div className="bg-second-color p-6 rounded shadow-lg w-full lg:w-2/5 text-black flex flex-col gap-3 justify-center">
                      <div className="text-start text-Base-color flex justify-between items-center">
                        <h1 className="font-bold">
                          {messages[msgIndex].name}
                          <span className="text-fourth-color/80 font-normal">
                            {" <"}
                            {messages[msgIndex].email}
                            {">"}
                          </span>
                        </h1>

                        <button
                          onClick={closeMessage}
                          className="p-2 text-third-color hover:text-fourth-color"
                          // className="mt-4 ml-3 p-2 px-4 bg-white hover:bg-gray-200 border text-fourth-color border-fourth-color lg:text-lg rounded-lg shadow-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </button>
                      </div>
                      <hr />
                      <div className="text-start text-Base-color">
                        <h1 className="font-bold">
                          subject:{" "}
                          <span className="font-normal text-third-color">
                            {messages[msgIndex].message}
                          </span>
                        </h1>
                      </div>
                      <hr />
                      <div className="w-full bg-white text-start text-Base-color p-3 h-[230px]">
                        {messages[msgIndex].message}
                      </div>
                      <div className="text-end">
                        <button onClick={() => replyToMsg()} variant="text">
                          <svg
                            className="text-third-color w-6 h-6 rotate-[315deg]"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(messages[msgIndex].message_id)
                          }
                          variant="text"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="text-fourth-color w-6 h-6 font-bold"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Reviews;
