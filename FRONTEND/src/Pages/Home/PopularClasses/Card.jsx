import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  return (
    <div className="flex flex-col justify-between p-3 m-4 transition-all duration-300 border rounded-lg shadow-lg hover:scale-105 border-secondary">
      <img src={data.image} />
      <div className="p-4">
        <h2 className="mb-2 text-lg font-semibold dark:text-white">
          {data.name}
        </h2>
        <p className="mb-2 text-gray-600 dark:text-white">
          availableSeats:{data.availableSeats}
        </p>{" "}
        <p className="mb-2 text-gray-600 dark:text-white">Price:{data.price}</p>
        <p className="mb-2 text-gray-600 dark:text-white">
          Total Student:{data.totalEnrolled}
        </p>
        <Link to={`classes/${data._id}`} className="mt-2 text-center">
          <button className="w-full px-2 py-1 mt-2 font-bold text-white bg-secondary rounded-xl">
            Select
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
