import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../Hooks/useAxiosFetch";
import img from "../../assets/home/girl.jpg";
import { HashLoader } from "react-spinners";
const Instructor = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosFetch();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosPublic.get(`/user/instructors`);
      setTeachers(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  <div className="flex items-center justify-center h-screen">
    <HashLoader color="#36d7d7" size={50} />
  </div>;

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
          <div className="grid mt-20 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-28 w-[90%] mx-auto">
            {teachers.map((tech, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col px-8 py-8 duration-200 rounded-md shadow-md cursor-pointer dark:bg-white !dark:text-black hover:-translate-y-2 "
                >
                  <div className="flex flex-col gap-6 md:gap-8">
                    <img
                      className="w-24 h-24 mx-auto border-4 border-gray-400 rounded-full"
                      src={tech?.photoUrl || `${img}`}
                      alt=""
                    />
                    <div className="flex flex-col space-y-2 text-center">
                      <p className="text-sm font-medium text-gray-800 ">
                        Address: {tech?.address}
                      </p>
                      <p className="text-sm text-gray-500 ">
                        Phone: {tech?.phone ? tech?.phone : <>Undifind</>}
                      </p>
                      <p className="mb-4 text-sm text-gray-500 text-nowrap line-clamp-1 ">
                        Email: {tech?.email}
                      </p>
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

export default Instructor;
