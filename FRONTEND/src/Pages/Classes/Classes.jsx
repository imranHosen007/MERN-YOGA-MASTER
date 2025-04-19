import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../Hooks/useAxiosFetch";
import { Transition } from "@headlessui/react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import useUser from "../../Hooks/useUser";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast, ToastContainer } from "react-toastify";
import { HashLoader } from "react-spinners";

const Classes = () => {
  const navigate = useNavigate();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [hoverCard, setHoverCard] = useState(null);
  const { currentUser } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [itemPerPage] = useState(5);
  const newTotalPage = [];
  const role = currentUser?.role;
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const axiosSecure = useAxiosSecure();
  const handleHoverCard = (index) => {
    setHoverCard(index);
  };

  // -----Pagenation----
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

  // -------Handle--Submit----

  const handleSubmit = async (id, name) => {
    setButtonLoading(true);
    const findCls = enrolledClasses.find((item) => item.classes._id == id);

    if (!currentUser) {
      alert(`Login First`);
      return navigate("/login");
    }

    axiosSecure
      .get(`/cart/item/${id}?email=${currentUser?.email}`)
      .then((res) => {
        setButtonLoading(false);
        if (findCls) {
          return toast.error(`Already Enrolled`);
        } else if (res?.data?.classId == id) {
          return toast.error(`Already Selected`);
        } else {
          const data = {
            name: name,
            classId: id,
            userMail: currentUser.email,
            data: new Date(),
          };
          axiosSecure
            .post(`/cart`, data)
            .then((res) => {
              if (res.status === 201) {
                setButtonLoading(false);
                toast.success(` Selected SuccesFull`);
              }
            })
            .catch((error) => {
              setButtonLoading(false);
              console.log(`Classes Cart Added ${error}`);
            });
        }
      })
      .catch((error) => {
        console.log(`cart get ${error}`);
        setButtonLoading(false);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get(`/classes/approved/classes`);
        setLoading(false);
        setClasses(response.data);
      } catch (error) {
        setLoading(false);
        console.log(`Approved Class Get ${error}`);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    axiosSecure
      .get(`/enrolled/${currentUser?.email}`)
      .then((res) => {
        setLoading(false);
        setEnrolledClasses(res.data);
      })
      .catch((error) => console.log(`Enrolled Class ${error}`));
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
      <div className="pt-3 mt-20">
        {!classes.length == 0 && (
          <h1 className="text-4xl font-bold text-center text-secondary">
            Classes
          </h1>
        )}
        {classes.length == 0 && (
          <div className="text-4xl font-bold text-center text-secondary">
            No Classes Found
          </div>
        )}
      </div>
      <div className="my-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentClasses.map((cls, index) => {
          return (
            <div
              onMouseLeave={() => handleHoverCard(null)}
              key={index}
              onMouseEnter={() => handleHoverCard(index)}
              className={`relative hover:-translate-y-2 duration-200 hover:ring-[2px] hover:ring-secondary h-[350px] w-64 mx-auto ${
                cls?.availableSeats < 1 ? "bg-red-300" : "bg-white"
              } dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
            >
              <div className="relative h-48">
                <div
                  className={` absolute inset-0  bg-black opacity-0 transition-opacity duration-300 ${
                    hoverCard === index ? "opacity-60" : ""
                  }`}
                />
                <img
                  src={cls?.image}
                  alt=""
                  className="object-cover w-full h-full"
                />
                <Transition
                  show={hoverCard === index}
                  enter="transition-opacity duration-300"
                  enterFrom="opacity-0 "
                  enterTo="opacity-100 "
                  leave="transition-opacity duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => handleSubmit(cls._id, cls.name)}
                      title={
                        role == "admin" || role == "instructor"
                          ? "instructor/admin cant able to select"
                            ? cls.availableSeats < 0
                            : "not set Avalivle"
                          : "You can select Classes"
                      }
                      disabled={
                        role == "admin" ||
                        buttonLoading ||
                        role == "instructor" ||
                        cls.availableSeats < 0
                      }
                      className="flex items-center justify-center px-4 py-2 text-white duration-300 rounded-lg disabled:bg-red-300 bg-secondary hover:bg-red-700"
                    >
                      {buttonLoading ? (
                        <div className="w-8 h-8 border-4 border-gray-300 rounded-full animate-spin border-t-blue-600" />
                      ) : (
                        " Add to Cart"
                      )}
                    </button>
                  </div>
                </Transition>
              </div>
              <div className="px-6 py-2">
                <h3 className="mb-1 font-semibold line-clamp-1 dark:text-gray-200">
                  {cls.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-200">
                  Instructor: {cls.instructorName}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-200">
                    availableSeats: {cls.availableSeats}
                  </span>
                  <span className="font-semibold text-green-500">
                    ${cls.price}
                  </span>
                </div>

                <Link to={`/classes/${cls._id}`}>
                  <button className="w-full px-4 py-2 mx-auto mt-4 text-white transition-all duration-300 bg-secondary disabled:bg-red-300 hover:bg-red-700">
                    View
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>{" "}
      <ToastContainer />
    </div>
  );
};

export default Classes;
