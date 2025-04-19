import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../Hooks/useAxiosFetch";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { GrUpdate } from "react-icons/gr";
import { FcDeleteDatabase } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";
const ManageUsers = () => {
  const axiosFetch = useAxiosFetch();
  const [deleteButton, setDeleteButton] = useState(false);
  const [updateButton, setUpdateButton] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [users, SetUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(5);
  const newTotalPage = [];
  const navigate = useNavigate();
  // ------Pagination---------
  const totalPage = Math.ceil(users.length / itemPerPage);
  const firstIndex = currentPage * itemPerPage;
  const lastIndex = firstIndex - itemPerPage;
  const currentUser = users.slice(lastIndex, firstIndex);

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
  // ---------Handle-functionilty----------

  const handleDelete = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Deleted This User Delete From DataBase",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDeleteButton(true);
        axiosSecure
          .delete(`user/${data._id}`)
          .then((res) => {
            setDeleteButton(false);
            const newUsers = users.map((use) => use._id !== data._id);
            SetUsers(newUsers);
            Swal.fire({
              title: "Deleted!",
              text: "User Deleted SuccesFull.",
              icon: "success",
            });
          })
          .catch((error) =>
            console.log((error) => {
              setDeleteButton(false);
              console.log(`user deleted ${error}`);
            })
          );
      }
    });
  };

  // -----Users-Data-Fetching----
  useEffect(() => {
    axiosFetch
      .get(`user`)
      .then((res) => {
        setLoading(false);
        SetUsers(res.data);
      })
      .catch((error) => console.log(`User Fetch ${error}`));
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
        Manage <span className="text-secondary">User</span>
      </h1>
      <div className="w-full">
        <div className="p-6 mb-4 overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full text-sm text-left">
            <thead className="">
              <tr>
                <th className="px-4 font-semibold text-left">#</th>
                <th className="px-4 font-semibold text-left">Photo</th>
                <th className="px-4 font-semibold text-left"> Name</th>
                <th className="px-4 font-semibold text-left">Role</th>
                <th className="px-4 font-semibold text-left">Update</th>
                <th className="px-4 font-semibold text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={"5"}
                    className="mt-5 text-2xl font-bold text-center"
                  >
                    No Classes Found
                  </td>
                </tr>
              ) : (
                currentUser.map((user, index) => {
                  return (
                    <tr
                      key={index}
                      className="transition duration-200 ease-in-out border-b border-neutral-500"
                    >
                      <td className="px-4 py-4 whitespace-pre-wrap">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <img
                          src={user.photoUrl}
                          alt=""
                          className="w-[35px] h-[35px] rounded-sm"
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-pre-wrap">
                        {user.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span>{user.role}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button
                          disabled={user?.role === "admin"}
                          onClick={() =>
                            navigate(`/dashboard/update-user/${user._id}`)
                          }
                          className="inline-flex items-center gap-2 px-2 py-1 font-semibold text-white bg-green-500 rounded-md disabled:bg-slate-500"
                        >
                          Update <GrUpdate className="text-white" />
                        </button>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button
                          disabled={deleteButton}
                          onClick={() => handleDelete(user)}
                          className="inline-flex items-center gap-2 px-2 py-1 font-semibold text-white bg-red-600 rounded-md disabled:bg-slate-500"
                        >
                          Delete <FcDeleteDatabase className="text-white" />
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
      {!users.length == 0 && (
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
    </div>
  );
};

export default ManageUsers;
