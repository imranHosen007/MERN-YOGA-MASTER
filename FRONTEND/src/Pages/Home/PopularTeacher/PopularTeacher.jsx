import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../Hooks/useAxiosFetch";
import img from "../../../assets/home/girl.jpg";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
const PopularTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const axiosPublic = useAxiosFetch();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosPublic.get(
        `/enrolled/popular-instructors/teacher`
      );
      setTeachers(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="md:w-[80%] mx-auto my-36">
      <div>
        <h1 className="text-5xl font-bold text-center dark:text-white">
          <span className="text-secondary">Our</span> Amazing
          <span className="text-secondary"> Teachers</span>
        </h1>
        <div className="w-[40%] mx-auto my-4 text-center">
          <p className="text-gray-500 dark:text-white">
            Explore Our Popular Classes - Here is some Popular Classes based on
            How many student enrolled
          </p>
        </div>
      </div>
      {teachers ? (
        <>
          <div className="grid mt-6 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-28 w-[90%] mx-auto">
            {teachers.slice(0, 4).map((tech, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col px-10 py-8 duration-200 rounded-md shadow-md cursor-pointer dark:text-white hover:-translate-y-2 md:px-8"
                >
                  <div className="flex flex-col gap-6 md:gap-8">
                    <img
                      className="object-cover w-24 h-24 mx-auto border-4 border-gray-400 rounded-full"
                      src={tech?.instructor?.photoUrl || img}
                      alt=""
                    />
                    <div className="flex flex-col text-center">
                      <p className="text-lg font-medium text-gray-800 dark:text-white">
                        {tech?.instructor.name}
                      </p>
                      <p className="text-gray-500 whitespace-nowrap dark:text-white">
                        Instructor
                      </p>
                      <p className="text-gray-500 whitespace-nowrap dark:text-white">
                        Total Student:{tech?.totalEnrolled}
                      </p>
                      <div className="flex items-center justify-center gap-2 mt-4 ">
                        <FaLinkedin className="text-xl text-secondary" />
                        <FaFacebook className="text-xl text-secondary" />
                        <FaTwitter className="text-xl text-secondary" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <p>No Instructor Availvle</p>
        </>
      )}
    </div>
  );
};

export default PopularTeacher;
