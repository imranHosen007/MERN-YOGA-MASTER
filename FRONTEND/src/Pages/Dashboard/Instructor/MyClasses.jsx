import React, { useEffect, useState } from "react";
import useUser from "../../../Hooks/useUser";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import moment from "moment";
import { HashLoader } from "react-spinners";
const MyClasses = () => {
  const [classes, setClasses] = useState([]);
  const { currentUser, isLoading } = useUser();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const totalItems = classes.length;
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  let itemsPerPage = 5;
  let totalPage = Math.ceil(totalItems / itemsPerPage);
  const newTotalPage = [];

  for (let i = 1; i <= totalPage; i++) {
    newTotalPage.push(i);
  }

  // -------Pagination---------
  const lastIndex = itemsPerPage * page;

  const firstIndex = lastIndex - itemsPerPage;

  const currentItems = classes.slice(firstIndex, lastIndex);

  const handleNext = () => {
    setPage(page + 1);
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleChange = (value) => {
    setPage(value);
  };
  // ------Data-Fetcing--------
  useEffect(() => {
    axiosSecure
      .get(`/classes/instructor/${currentUser?.email}`)
      .then((res) => {
        setLoading(false);
        setClasses(res.data);
      })
      .catch((error) => console.log(`Instructor all Classes ${error}`));
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
      <div className="my-9">
        <h1 className="text-4xl font-bold text-center">
          My <span className="text-secondary">Classes</span>
        </h1>
        <p className="text-center text-[12px] sm:text-[20px] my-2">
          Here You can see how many classes added by you and all classes status
        </p>
      </div>{" "}
      <div className="px-4">
        {classes.length === 0 ? (
          <div className="my-10 text-2xl font-bold text-center">
            You have not added any class yet
          </div>
        ) : (
          <div>
            {currentItems.map((cls, index) => {
              return (
                <div
                  key={index}
                  className="mb-5 duration-200 rounded-lg hover:ring ring-secondary focus:ring"
                >
                  <div className="flex flex-col gap-8 p-4 bg-white rounded-lg shadow md:flex-row ">
                    <div>
                      <img
                        src={cls.image}
                        alt=""
                        className="md:max-w-[300px] md:max-h-[200px] max-h-[300px] w-full mx-auto"
                      />
                    </div>
                    <div className="flex flex-col items-start w-full gap-5 sm:items-center sm:flex-row ">
                      <div>
                        <h2 className="font-bold border-b pb-2 mb-2 text-secondary text-[21px]">
                          {cls.name}
                        </h2>
                        <h1 className="mb-2 font-bold">Some Info:</h1>
                        <h1 className="my-2 text-secondary">
                          <span className="text-black">Total Student: </span>
                          {cls.totalEnrolled}
                        </h1>
                        <h1 className="my-2 text-secondary">
                          <span className="text-black">Total Seats: </span>
                          {cls.availableSeats}
                        </h1>
                        <h1 className="my-2 text-secondary">
                          <span className="text-black">Status: </span>
                          <span
                            className={`font-bold ${
                              cls.status === "pending"
                                ? "text-orange-400"
                                : cls.status === "checking"
                                ? "text-yellow-300"
                                : cls.status === "approved"
                                ? "text-green-500"
                                : "text-red-600"
                            }`}
                          >
                            {cls.status}
                          </span>
                        </h1>
                      </div>
                      <div>
                        <h1 className="mb-3 font-bold">-----</h1>
                        <h1 className="my-2 text-secondary">
                          <span className="text-black">Price: </span>$
                          {cls.price}
                        </h1>
                        <h1 className="my-2 text-secondary">
                          <span className="text-black">Submited: </span>
                          {moment(cls.submitted).format("MMMM do YYYY")}
                        </h1>
                      </div>
                      <div className="space-y-2 ">
                        <h1 className="mb-3 font-bold">Actions:</h1>
                        <button className="w-full px-3 py-1 font-bold text-white bg-orange-400 rounded-lg">
                          View FeedBack
                        </button>
                        <button className="w-full px-3 py-1 font-bold text-white bg-green-500 rounded-lg">
                          View Deatils
                        </button>
                        <button className="w-full">
                          <Link
                            to={`/dashboard/update/${cls._id}`}
                            className="block w-full px-3 py-1 font-bold text-white rounded-lg bg-secondary"
                          >
                            Update
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {!classes.length == 0 && (
        <div className="flex items-center justify-center py-10">
          <nav
            aria-label="Pagination"
            className="inline-flex -space-x-px rounded-md shadow-sm dark:bg-gray-100 dark:text-gray-800"
          >
            <button
              onClick={handlePrev}
              disabled={page === 1}
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
                  className={`inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 bg-indigo-700  text-gray-50 ${
                    index + 1 === page && "active text-white "
                  }`}
                >
                  {num}
                </button>
              );
            })}
            <button
              disabled={page === totalPage}
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

export default MyClasses;
