import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosFetch from "../../../Hooks/useAxiosFetch";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const UpdateUser = () => {
  const user = useLoaderData();
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const naviagate = useNavigate();
  const [loadingButton, setLoadingButton] = useState(false);
  const handleSubmit = (data) => {
    data.preventDefault();
    const formData = new FormData(data.target);
    const updatedData = Object.fromEntries(formData);
    Swal.fire({
      title: "Are you sure?",
      text: "Updated User Role",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoadingButton(true);
        axiosSecure
          .put(`/user/update-role/${user?._id}`, updatedData)
          .then((res) => {
            if (res.status === 200) {
              setLoadingButton(false);
              Swal.fire({
                title: "Updated",
                text: "User Role Updated SuccesFull.",
                icon: "success",
              });
              naviagate(`/dashboard/manage-users`);
            }
          })
          .catch((error) => {
            setLoadingButton(false);
            console.log(`Updated Role ${error}`);
          });
      }
    });
  };

  return (
    <div>
      <h1 className="mt-10 text-3xl font-bold text-center">
        Update: <span className="text-secondary">{user?.name}</span>
      </h1>
      <p className="mt-1 mb-10 font-semibold text-center">
        Change Details About{" "}
        <span className="text-orange-500">{user?.name}</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="p-6 mx-auto bg-white rounded shadow"
      >
        {/* ------1st-row------- */}
        <div className="grid items-center w-full gap-3 md:grid-cols-2">
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block mb-2 font-bold text-gray-700"
            >
              Name
            </label>
            <input
              disabled
              readOnly
              type="text"
              id="name"
              defaultValue={user?.name}
              placeholder="Your Class Name"
              required
              className="w-full px-4 py-2 border rounded-md border-secondary focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="phone"
              className="block mb-2 font-bold text-gray-700"
            >
              Phone
            </label>
            <input
              disabled
              readOnly
              type="text"
              id="phone"
              defaultValue={user?.phone || "Is not Provide"}
              placeholder="Your Class Name"
              required
              className="w-full px-4 py-2 border rounded-md border-secondary focus:outline-none focus:ring-blue-500"
            />
          </div>
        </div>
        {/* -----2nd-Row----- */}
        <div>
          <h1 className="text-secondary my-2 ml-2 text-[12px]">
            You can not change Email
          </h1>
          <div className="grid items-center w-full gap-3 md:grid-cols-2">
            <div className="mb-2">
              <label
                htmlFor="instructorname"
                className="block mb-2 font-bold text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="instructorname"
                readOnly
                defaultValue={user?.email}
                disabled
                className="w-full px-4 py-2 border rounded-md border-secondary focus:outline-none focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="instructoremail"
                className="block mb-2 font-bold text-gray-700"
              >
                Gender
              </label>
              <input
                type="text"
                id="instructoremail"
                className="w-full px-4 py-2 border rounded-md border-secondary focus:outline-none focus:ring-blue-500"
                readOnly
                disabled
                defaultValue={user?.gender || "Is not Provide"}
              />
            </div>
          </div>
        </div>

        {/* -----3rd-row---- */}
        <div className="grid items-center w-full gap-3 md:grid-cols-2">
          <div className="mb-2">
            <label
              htmlFor="address"
              className="block mb-2 font-bold text-gray-700"
            >
              Address
            </label>
            <input
              disabled
              readOnly
              type="text"
              id="address"
              defaultValue={user?.address || "Is Not Provide"}
              className="w-full px-4 py-2 border rounded-md border-secondary focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="photoUrl"
              className="block mb-2 font-bold text-gray-700"
            >
              photoUrl
            </label>
            <input
              disabled
              readOnly
              id="photoUrl"
              defaultValue={user?.photoUrl || "Is Not Provide"}
              className="w-full px-4 py-2 border rounded-md border-secondary focus:outline-none focus:ring-blue-500"
            />
          </div>
        </div>
        {/* -------4th-Row------- */}
        <div className="grid grid-cols-1 gap-4 mt-1 mb-4 text-center sm:grid-cols-3">
          <div>
            {" "}
            <input
              tabIndex={1}
              type="radio"
              id="option1"
              name="option"
              value={"user"}
              defaultChecked={user?.role === "user" ? true : false}
              className="sr-only peer"
            />
            <label
              htmlFor="option1"
              className="block w-full p-3 border rounded-lg border-secondary peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white"
            >
              <span className="text-sm font-bold">Users</span>
            </label>
          </div>
          <div>
            {" "}
            <input
              tabIndex={1}
              type="radio"
              id="option2"
              name="option"
              value={"instructor"}
              defaultChecked={user?.role === "instructor" ? true : false}
              className="sr-only peer hover:cursor-pointer"
            />
            <label
              htmlFor="option2"
              className="block w-full p-3 border rounded-lg border-secondary peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white"
            >
              <span className="text-sm font-bold">Instructor</span>
            </label>
          </div>
          <div>
            {" "}
            <input
              tabIndex={1}
              type="radio"
              id="option3"
              name="option"
              value={"admin"}
              defaultChecked={user?.role === "admin" ? true : false}
              className="sr-only peer"
            />
            <label
              htmlFor="option3"
              className="block w-full p-3 border rounded-lg border-secondary peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white"
            >
              <span className="text-sm font-bold">Admin</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loadingButton}
          className="flex items-center justify-center w-full px-4 py-2 text-white border rounded-md resize-none bg-secondary border-secondary focus:outline-none focus:ring-blue-500"
        >
          {loadingButton ? (
            <div className="w-8 h-8 border-4 border-gray-300 rounded-full animate-spin border-t-blue-600" />
          ) : (
            " Update User"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
