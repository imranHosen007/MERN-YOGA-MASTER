import React, { useEffect, useState } from "react";
import useUser from "../../../Hooks/useUser";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { HashLoader } from "react-spinners";

const EnrollClasses = () => {
  const [data, SetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(5);

  const axiosSecure = useAxiosSecure();

  // ------Pagination---------

  const firstIndex = currentPage * itemPerPage;
  const lastIndex = firstIndex - itemPerPage;
  const currentEnrolled = data.slice(lastIndex, firstIndex);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // ---Data-Fetching------

  useEffect(() => {
    axiosSecure
      .get(`/enrolled/${currentUser?.email}`)
      .then((res) => {
        SetData(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
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
      <h1 className="my-6 text-4xl font-bold text-center">
        My <span className="text-secondary">Enrolled</span> Classes
      </h1>

      <div className="grid grid-cols-1 gap-6 pr-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {currentEnrolled.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-around mx-3 overflow-hidden bg-white shadow-md md:flex-row h-96 rounded-3xl md:flex-grow md:h-52 "
            >
              <img
                src={item.classes.image}
                alt=""
                className="object-cover w-full h-1/2 md:h-full md:w-1/2"
              />
              <div className="flex flex-col items-baseline justify-around flex-1 w-full pl-6 h-1/2 md:h-full md:items-baseline md:w-1/2 ">
                <div>
                  {" "}
                  <h1 className="line-clamp-2">{item.classes.name}</h1>
                  <h1 className="line-clamp-1">
                    {item.classes.instructorName}
                  </h1>
                  <p className="my-2 text-sm line-clamp-3">
                    Lorem ipsum dolor sit Lorem ipsum dolor sit amet
                    consectetur, adipisicing elit. Ullam, maiores.
                  </p>
                </div>
                <div className="flex items-center justify-between w-full sm:flex-nowrap">
                  <p className="font-bold text-gray-500">
                    ${item.classes.price}
                  </p>
                  <button className="px-3 py-1 mr-5 font-bold text-white shadow-md rounded-xl bg-secondary">
                    View
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* --------Pagination--------- */}

      {!EnrollClasses.length == 0 && (
        <div className="flex flex-col items-center py-10">
          <span class="text-sm text-gray-700 dark:text-gray-400">
            Showing <span class="font-semibold ">{currentPage}</span> to{" "}
            <span class="font-semibold ">
              {Math.ceil(data.length / itemPerPage)}
            </span>{" "}
            Entries
          </span>

          <div class="inline-flex mt-2 xs:mt-0">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="flex items-center justify-center h-8 px-3 text-sm font-medium text-white bg-green-500 cursor-pointer rounded-s disabled:bg-gray-800 "
            >
              Prev
            </button>
            <button
              disabled={currentPage === Math.ceil(data.length / itemPerPage)}
              onClick={handleNext}
              className="flex items-center justify-center h-8 px-3 text-sm font-medium text-white bg-green-500 cursor-pointer disabled:bg-gray-800 "
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollClasses;
