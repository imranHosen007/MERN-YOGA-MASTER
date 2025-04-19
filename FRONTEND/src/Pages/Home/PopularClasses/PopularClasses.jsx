import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../Hooks/useAxiosFetch";
import Card from "./Card";

export const PopularClasses = () => {
  const axiosPublic = useAxiosFetch();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get(`/classes/approved/classes`);
        setClasses(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="md:w-[80%] mx-auto my-36">
      <div>
        <h1 className="text-5xl font-bold text-center">
          Our <span className="text-secondary">Popular</span> Classes
        </h1>
        <div className="w-[40%] mx-auto my-4 text-center">
          <p className="text-gray-500 dark:text-white">
            Explore Our Popular Classes - Here is some Popular Classes based on
            How many student enrolled
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {classes.slice(0, 6).map((item, index) => {
          return <Card key={index} data={item} />;
        })}
      </div>
    </div>
  );
};
