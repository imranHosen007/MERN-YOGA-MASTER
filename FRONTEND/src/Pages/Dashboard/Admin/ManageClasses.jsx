import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosFetch from "../../../Hooks/useAxiosFetch";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import { HashLoader } from "react-spinners";

const ManageClasses = () => {
  const axiosSecure = useAxiosSecure();
  const axiosFetch = useAxiosFetch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(5);
  const newTotalPage = [];
  // ---------Funcanality------
  const handleApproved = (id) => {
    axiosSecure
      .put(`/classes/change-status/${id}`, { status: "approved" })
      .then((res) => {
        const updateClasses = classes.map((cls) =>
          cls._id === id ? { ...cls, status: "approved" } : cls
        );
        setClasses(updateClasses);
        toast.success(`Class Approved SuccesFull`);
      })
      .catch((error) => console.log(`Class Approved ${error}`));
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Rejected it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put(`/classes/change-status/${id}`, { status: "rejected" })
          .then((res) => {
            const updateClasses = classes.map((cls) =>
              cls._id === id ? { ...cls, status: "rejected" } : cls
            );
            setClasses(updateClasses);
            Swal.fire({
              title: "Rejected",
              text: "Your Rejected has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => console.log(`Class Approved ${error}`));
      }
    });
  };

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

  // -----Data-fetching------
  useEffect(() => {
    axiosFetch
      .get(`/classes`)
      .then((res) => {
        setClasses(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(`Manage Classes Data Fetching`, error));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader color="#36d7d7" size={50} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="my-10 text-4xl font-bold text-center">
        Manage <span className="text-secondary">Classes</span>
      </h1>
      <div className="w-full">
        <div className="p-6 mb-4 overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full text-sm text-left">
            <thead className="">
              <tr>
                <th className="px-4 font-semibold text-left">Photo</th>
                <th className="px-4 font-semibold text-left">Course Name</th>
                <th className="px-4 font-semibold text-left">
                  Instructors Name
                </th>
                <th className="px-4 font-semibold text-left">Status</th>
                <th className="px-4 font-semibold text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              {classes.length === 0 ? (
                <tr>
                  <td
                    colSpan={"5"}
                    className="mt-5 text-2xl font-bold text-center"
                  >
                    No Classes Found
                  </td>
                </tr>
              ) : (
                currentClasses.map((cls, index) => {
                  return (
                    <tr
                      key={index}
                      className="transition duration-200 ease-in-out border-b border-neutral-500"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <img
                          src={cls.image}
                          alt=""
                          className="w-[35px] h-[35px] rounded-sm"
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-pre-wrap">
                        {cls.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {cls.instructorName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <p
                          className={`font-bold px-2 uppercase text-white rounded-xl text-center py-1 ${
                            cls.status === "pending"
                              ? "bg-orange-400"
                              : cls.status === "checking"
                              ? "bg-yellow-500"
                              : cls.status === "approved"
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                        >
                          {cls.status}
                        </p>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {" "}
                          <button
                            onClick={() => handleApproved(cls._id)}
                            disabled={cls.status === "approved"}
                            className="px-2 text-[12px] py-1 font-bold text-white disabled:bg-green-700 disabled:cursor-auto bg-green-500 cursor-pointer rounded-md"
                          >
                            Approved
                          </button>
                          <button
                            onClick={() => handleReject(cls._id)}
                            disabled={
                              cls.status === "checking" ||
                              cls.status === "rejected"
                            }
                            className="px-3 py-1 font-bold text-white bg-red-600 rounded-md cursor-pointer disabled:cursor-default disabled:bg-red-800"
                          >
                            {" "}
                            Deny
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
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
                  className={`inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300   ${
                    index + 1 === currentPage && "bg-secondary text-white "
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
      <ToastContainer />
    </div>
  );
};

export default ManageClasses;
