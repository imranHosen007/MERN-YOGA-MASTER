import { useLoaderData } from "react-router-dom";
import useUser from "../../Hooks/useUser";
import { useEffect, useState } from "react";
import useAxiosFetch from "../../Hooks/useAxiosFetch";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import banner from "../../assets/home/banner-1.jpg";
import photo from "../../assets/home/girl.jpg";
import {
  FaLanguage,
  FaLevelUpAlt,
  FaPlayCircle,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { MdBookOnline, MdCheck } from "react-icons/md";
import { BiTime } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
const SingleClasses = () => {
  const course = useLoaderData();
  const { currentUser } = useUser();
  const role = currentUser?.role;
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const axiosFetch = useAxiosFetch();
  const [buttonLoading, setButtonLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const handleSelect = async (id, name) => {
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
    axiosSecure
      .get(`/enrolled/${currentUser?.email}`)
      .then((res) => setEnrolledClasses(res.data))
      .catch((error) => console.log(`Enrolled Class ${error}`));
  }, []);

  return (
    <div className="font-medium text-gray dark:text-white text-lg leading-[27px] w-[90%] mx-auto">
      <div className="py-20 mt-20 bg-primary ">
        <div className="container text-center">
          <h2>Course Deatils</h2>
        </div>
      </div>
      {/* --- bottom--- */}
      <div className="container mt-8">
        <div className="grid grid-cols-12 md:gap-[30px]">
          {/* ----left-Side---- */}
          <div className="col-span-12 lg:col-span-8">
            <div className="lg:h-[470px] h-[350px] mb-10">
              <img
                src={course.image}
                alt=""
                className="block object-fill w-full h-full rounded-md"
              />
            </div>
            <h2 className="mb-2 text-2xl">{course.name}</h2>
            <div className="left-side">
              <div className="flex items-center space-x-4 text-base">
                <img src={photo} alt="" className="w-12 h-12 rounded" />
                <p className="text-secondary">
                  Trainer:
                  <a href="" className="text-black dark:text-white">
                    {course.instructorName}
                  </a>
                </p>
                <div>
                  <span className="text-secondary ">Last Updated </span>
                  <a href="" className="ml-1 text-black dark:text-white">
                    {new Date(course.submitted).toLocaleDateString()}
                  </a>
                </div>
              </div>
              <ul className="mt-12 text-base">
                <li>Overview</li>
                <li>Carriculum</li>
                <li>Instructor</li>
                <li>Review</li>
              </ul>
              <div>
                <h3 className="mt-8 text-3xl">Course Description</h3>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad,
                  natus repudiandae. At temporibus mollitia dignissimos eum
                  fugiat saepe officiis quo. Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Obcaecati fugiat quos dolore.
                  <br /> <br /> Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Ad, natus repudiandae. At temporibus
                  mollitia dignissimos eum fugiat saepe officiis quo. Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati
                  fugiat quos dolore.
                </p>
              </div>
              <div className="bg-[#F8F8F8] dark:bg-indigo-500  p-8 space-y-6 my-8 rounded-md">
                <h4 className="text-2xl">What You Will Learn?</h4>
                <ul className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                  <li className="flex items-center space-x-3">
                    <MdCheck className="text-green-600 text-7xl" />
                    <p>
                      Learn How Perspective works and how to incoporate your art
                    </p>
                  </li>
                  <li className="flex items-center space-x-3">
                    <MdCheck className="text-green-600 text-7xl" />
                    <p>
                      Learn How Perspective works and how to incoporate your art
                    </p>
                  </li>
                  <li className="flex items-center space-x-3">
                    <MdCheck className="text-green-600 text-7xl" />
                    <p>
                      Learn How Perspective works and how to incoporate your art
                    </p>
                  </li>
                  <li className="flex items-center space-x-3">
                    <MdCheck className="text-green-600 text-7xl" />
                    <p>
                      Learn How Perspective works and how to incoporate your art
                    </p>
                  </li>
                </ul>
              </div>
              <div className="">
                <h4 className="text-2xl">What You Will Learn?</h4>
                <ul className="grid grid-cols-1 gap-6 mt-5 ml-16 lg:grid-cols-3 sm:grid-cols-2">
                  <li>Computer/Mobile</li>
                  <li>Paper/Pencil</li>
                  <li>Internet/Connection</li>
                </ul>
              </div>
              <div className="bg-[#F8F8F8] dark:bg-indigo-500 p-4 my-8">
                <h3 className="mt-8 text-3xl">Lession Plan</h3>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad,
                  natus repudiandae. At temporibus mollitia dignissimos eum
                  fugiat saepe officiis quo. Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Obcaecati fugiat quos dolore.
                  <br /> <br /> Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Ad, natus repudiandae. At temporibus
                  mollitia dignissimos eum fugiat saepe officiis quo. Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati
                  fugiat quos dolore.
                </p>
              </div>
              <div className="bg-[#F8F8F8] dark:bg-indigo-500  p-8 space-y-6 my-8 rounded-md">
                {" "}
                <h4>This Course For Beginners</h4>
              </div>
              <div>
                <h3 className="mt-8 text-3xl">What You Will Learn?</h3>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad,
                  natus repudiandae. At temporibus mollitia dignissimos eum
                  fugiat saepe officiis quo. Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Obcaecati fugiat quos dolore.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad,
                  natus repudiandae. At temporibus mollitia dignissimos eum
                  fugiat saepe officiis quo. Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Obcaecati fugiat quos dolore.
                </p>
              </div>
            </div>
          </div>
          {/* ---right-side---- */}
          <div className="col-span-12 mt-8 lg:col-span-4 lg:mt-0">
            <div className="h-[220px] rounded block relative">
              {" "}
              <img
                src={course.image}
                alt=""
                className="block object-cover w-full h-full rounded"
              />
              <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                <FaPlayCircle className="text-4xl" />
              </div>
            </div>
            <h3 className="my-3">${course.price}</h3>
            <button
              title={
                role === "admin" || role === "instructor"
                  ? "Instructor/Admin can not be able to select"
                    ? course.availableSeats < 1
                    : "No Seat available"
                  : "You Can Select This Classes"
              }
              disabled={
                role === "admin" ||
                buttonLoading ||
                role === "instructor" ||
                course.availableSeats < 1
              }
              onClick={() => handleSelect(course._id)}
              className="flex items-center justify-center w-full py-2 text-center text-white bg-secondary"
            >
              {buttonLoading ? (
                <div className="w-8 h-8 border-4 border-gray-300 rounded-full animate-spin border-t-blue-600" />
              ) : (
                "     Enroll Now"
              )}
            </button>
            <div className="mt-4 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {" "}
                  <FaUser />
                  <h4>Instructor</h4>
                </div>
                <h4>{course.instructorName}</h4>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {" "}
                  <MdBookOnline />
                  <h4>Lectures</h4>
                </div>
                <h4>23</h4>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {" "}
                  <BiTime />
                  <h4>Duration</h4>
                </div>
                <h4>2Hr 36Minutes</h4>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {" "}
                  <FaUsers />
                  <h4>Enrolled</h4>
                </div>
                <h4>{course.totalEnrolled} Students</h4>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {" "}
                  <FaLevelUpAlt />
                  <h4>Course Level</h4>
                </div>
                <h4>Intetmedite</h4>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {" "}
                  <FaLanguage />
                  <h4>Language</h4>
                </div>
                <h4>English</h4>
              </div>
            </div>
            <h4 className="my-6 font-semibold">Share On:</h4>
            <div>
              <h4 className="text-base font-bold">Releted Courses</h4>
              <div className="flex items-center mb-10 gap-x-3">
                <div className="w-20 h-16">
                  {" "}
                  <img src={banner} className="object-cover w-full h-full" />
                </div>
                <div>
                  <h4 className="line-clamp-1 w-[70%]">{course.name}</h4>
                  <p className="text-secondary">${course.price}</p>
                </div>
              </div>
              <div className="flex items-center mb-10 gap-x-3">
                <div className="w-20 h-16">
                  {" "}
                  <img src={banner} className="object-cover w-full h-full" />
                </div>
                <div>
                  <h4 className="line-clamp-1 w-[70%]">{course.name}</h4>
                  <p className="text-secondary">${course.price}</p>
                </div>
              </div>
              <div className="flex items-center mb-10 gap-x-3">
                <div className="w-20 h-16">
                  {" "}
                  <img src={banner} className="object-cover w-full h-full" />
                </div>
                <div>
                  <h4 className="line-clamp-1 w-[70%]">{course.name}</h4>
                  <p className="text-secondary">${course.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SingleClasses;
