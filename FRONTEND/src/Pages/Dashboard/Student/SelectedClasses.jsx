import React, { useEffect, useState } from "react";
import useUser from "../../../Hooks/useUser";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import { MdDeleteSweep } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import Swal from "sweetalert2";
import moment from "moment";
import { HashLoader } from "react-spinners";
const SelectedClasses = () => {
  const { currentUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [classes, SetClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [itemPerPage] = useState(5);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const newTotalPage = [];

  // ------Pagination---------
  const totalPage = Math.ceil(classes.length / itemPerPage);
  const firstIndex = currentPage * itemPerPage;
  const lastIndex = firstIndex - itemPerPage;
  const currentClasses = classes.slice(lastIndex, firstIndex);

  for (let i = 1; i <= totalPage; i++) {
    newTotalPage.push(i);
  }

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleChange = (value) => {
    setCurrentPage(value);
  };

  // --------Functionality--------
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/cart/${id}?email=${currentUser?.email}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }

            const newClasses = classes.filter((cls) => cls._id !== id);
            SetClasses(newClasses);
          })
          .catch((error) => console.log(`Delete Cart ${error}`));
      }
    });
  };
  // -----HandlePay----
  const handlePay = (id) => {
    const findItem = classes.find((item) => item._id === id);
    console.log(findItem);
    const price = findItem.price;
    navigate(`/dashboard/user/payment`, {
      state: { price: price, itemId: id },
    });
    console.log(price);
  };

  // ------Price-Caluculate------

  const totalPrice = classes.reduce((acc, item) => {
    return parseFloat(acc) + parseFloat(item.price);
  }, 0);
  const totalTax = totalPrice * 0.1;
  const price = totalPrice + totalTax;

  // ----Data-Fecting-----
  useEffect(() => {
    axiosSecure
      .get(`/cart/${currentUser?.email}`)
      .then((res) => {
        SetClasses(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(`Selected Classes ${error}`);
      });
  }, []);

  // ------Loading------
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader color="#36d7d7" size={50} />
      </div>
    );
  }
  return (
    <div className="">
      <h1 className="my-6 text-4xl font-bold text-center">
        My <span className="text-secondary">Selected</span> Classes
      </h1>
      <div className="h-screen py-8">
        <div className="container px-4 mx-auto">
          <h2 className="mb-4 text-2xl font-semibold">Shopping Cart</h2>
          <div className="flex flex-col-reverse gap-4 md:flex-row">
            {/* ---left-Side----- */}
            <div className=" md:w-3/4">
              <div className="p-6 mb-4 overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="font-semibold text-left ">#</th>
                      <th className="px-4 font-semibold text-left">Product</th>
                      <th className="px-4 font-semibold text-left">Price</th>
                      <th className="px-4 font-semibold text-left">Date</th>
                      <th className="font-semibold text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.length === 0 ? (
                      <tr>
                        <td
                          colSpan={"5"}
                          className="text-2xl font-bold text-center"
                        >
                          No Classes Found
                        </td>
                      </tr>
                    ) : (
                      currentClasses.map((cls, index) => {
                        const letIdx =
                          (currentPage - 1) * itemPerPage + index + 1;
                        return (
                          <tr key={index}>
                            <td className="py-4 ">{letIdx}</td>
                            <td className="py-4">
                              <div className="flex items-center px-4 ">
                                <img
                                  src={cls.image}
                                  alt=""
                                  className="w-12 h-12 mr-4"
                                />
                                <span className="pr-6 lg:pr-0">{cls.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4">${cls.price}</td>
                            <td className="px-4 py-4">
                              <p className="text-sm text-green-700">
                                {moment(cls.submitted).format("MMMM  Do  YYYY")}
                              </p>
                            </td>
                            <td className="flex flex-wrap gap-2 px-4 pt-8">
                              <button
                                onClick={() => handleDelete(cls._id)}
                                className="px-3 py-1 font-bold text-white bg-red-500 cursor-pointer rounded-3xl"
                              >
                                {" "}
                                <MdDeleteSweep />
                              </button>
                              <button
                                onClick={() => handlePay(cls._id)}
                                className="px-3 py-1 font-bold text-white bg-green-500 cursor-pointer rounded-3xl"
                              >
                                <FaDollarSign className="mr-2" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* -----Right-Side--- */}
            <div className="md:w-1/5 md:fixed md:right-3">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-lg font-semibold">Summray</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)} </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes</span>
                  <span>${totalTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Extra Fees</span>
                  <span>$0</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-bold">Total</span>
                  <span>${price}</span>
                </div>
                <button
                  disabled={price <= 0}
                  onClick={() =>
                    navigate(`/dashboard/user/payment`, {
                      state: { price: price, itemId: null },
                    })
                  }
                  className="w-full px-4 py-2 mt-4 text-white rounded-lg bg-secondary disabled:bg-gray-400"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
          {!classes.length == 0 && (
            <div className="flex items-center justify-center py-10">
              <nav
                aria-label="Pagination"
                className="inline-flex -space-x-px rounded-md shadow-sm dark:bg-gray-100 dark:text-gray-800"
              >
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  type="button"
                  className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-l-md dark:border-gray-300 disabled:bg-gray-500 "
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>

                {newTotalPage.map((num, index) => {
                  return (
                    <button
                      onClick={() => handleChange(num)}
                      key={index}
                      type="button"
                      aria-current="page"
                      className={`inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300  ${
                        index + 1 === currentPage && "bg-green-500 text-white "
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
                <button
                  disabled={currentPage === totalPage}
                  onClick={handleNext}
                  type="button"
                  className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-r-md dark:border-gray-300 disabled:bg-gray-500"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedClasses;
