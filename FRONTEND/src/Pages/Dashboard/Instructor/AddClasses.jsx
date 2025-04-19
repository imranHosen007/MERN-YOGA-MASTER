import React, { useState } from "react";
import useUser from "../../../Hooks/useUser";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast, ToastContainer } from "react-toastify";
const AddClasses = () => {
  const { register, handleSubmit, reset } = useForm();
  const { currentUser } = useUser();
  const axiosSecure = useAxiosSecure();
  const [buttonLoading, setButtonLoading] = useState(false);
  const image_hosting_api_key = "2532cb3068943f3d1c912720026f1cd4";
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_api_key}`;
  const onSubmit = async (data) => {
    setButtonLoading(true);
    const imageFile = { image: data.image[0] };

    axios
      .post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          setButtonLoading(false);
          const classesData = {
            name: data.name,
            image: res.data.data.display_url,
            instructorName: currentUser?.name,
            instructorEmail: currentUser?.email,
            availableSeats: data.availableSeats,
            price: parseFloat(data.price),
            videoLink: data.videoLink,
            description: data.description,
            status: "pending",
            totalEnrolled: 0,
            reason: null,
          };
          axiosSecure
            .post(`/classes`, classesData)
            .then((res) => {
              if (res.status === 201) {
                setButtonLoading(false);
                toast.success(`Your Class Added SuccesFull`);
                reset();
              }
            })
            .catch((error) => {
              setButtonLoading(false);
              console.log(`Classes Post ${error}`);
            });
        }
      })
      .catch((error) => {
        setButtonLoading(false);
        console.log(`Imagebb posted ${error}`);
      });
  };
  return (
    <div>
      <h1 className="my-10 text-3xl font-bold text-center">Add New Class</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 mx-auto bg-white rounded shadow"
      >
        {/* ------1st-row------- */}
        <div className="grid items-center w-full gap-3 md:grid-cols-2">
          <div className="mb-2">
            <label
              htmlFor="classname"
              className="block mb-2 font-bold text-gray-700"
            >
              Class Name
            </label>
            <input
              {...register("name")}
              type="text"
              id="classname"
              placeholder="Your Class Name"
              required
              className="w-full px-4 py-2 border rounded-md border-secondary focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="coursethumbail"
              className="block mb-2 font-bold text-gray-700"
            >
              Course Thumbnail
            </label>
            <input
              {...register("image")}
              type="file"
              id="coursethumbail"
              placeholder="Your Class Name"
              required
              className="w-full mt-[-5px]  border shadow-md text-sm file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4 rounded-md border-secondary focus:outline-none focus:ring-blue-500"
            />
          </div>
        </div>
        {/* -----2nd-Row----- */}
        <div>
          <h1 className="text-secondary my-2 ml-2 text-[12px]">
            You can not change ame or Email
          </h1>
          <div className="grid items-center w-full gap-3 md:grid-cols-2">
            <div className="mb-2">
              <label
                htmlFor="instructorname"
                className="block mb-2 font-bold text-gray-700"
              >
                Instructor Name
              </label>
              <input
                {...register("instructorName")}
                type="text"
                id="instructorname"
                readOnly
                defaultValue={currentUser?.name}
                disabled
                className="w-full px-4 py-2 border rounded-md border-secondary focus:outline-none focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="instructoremail"
                className="block mb-2 font-bold text-gray-700"
              >
                Instructor Email
              </label>
              <input
                {...register("instructorEmail")}
                type="text"
                id="instructoremail"
                className="w-full px-4 py-2 border rounded-md border-secondary focus:outline-none focus:ring-blue-500"
                readOnly
                disabled
                defaultValue={currentUser?.email}
              />
            </div>
          </div>
        </div>

        {/* -----3rd-row---- */}
        <div className="grid items-center w-full gap-3 md:grid-cols-2">
          <div className="mb-2">
            <label
              htmlFor="availableseats"
              className="block mb-2 font-bold text-gray-700"
            >
              Available Seats
            </label>
            <input
              {...register("availableSeats")}
              type="number"
              id="availableseats"
              placeholder="How Many Seats are Available?"
              required
              className="w-full px-4 py-2 border rounded-md border-secondary focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="price"
              className="block mb-2 font-bold text-gray-700"
            >
              Price
            </label>
            <input
              {...register("price")}
              type="number"
              id="price"
              placeholder="How Much does it cost?"
              required
              className="w-full px-4 py-2 border rounded-md border-secondary focus:outline-none focus:ring-blue-500"
            />
          </div>
        </div>
        {/* -------4th-Row------- */}
        <div className="mb-2">
          <label
            htmlFor="youtubelink"
            className="block mb-2 font-bold text-gray-700"
          >
            Youtube Link
          </label>
          <input
            {...register("videoLink")}
            type="url"
            id="youtubelink"
            placeholder="Your Course Intro Video Link"
            required
            className="w-full px-4 py-2 border rounded-md border-secondary focus:outline-none focus:ring-blue-500"
          />
        </div>
        {/* ----------5th-row--------- */}
        <div className="mb-2">
          <label
            htmlFor="Description"
            className="block mb-2 font-bold text-gray-700"
          >
            DescriptionAbout Your Couse
          </label>
          <textarea
            {...register("description")}
            id="Description"
            placeholder="  Description About Your Couse"
            required
            className="w-full px-4 py-2 border rounded-md resize-none border-secondary focus:outline-none focus:ring-blue-500"
            rows={4}
          />
        </div>
        <button
          disabled={buttonLoading}
          className="flex items-center justify-center w-full px-4 py-2 text-white border rounded-md resize-none bg-secondary border-secondary focus:outline-none focus:ring-blue-500"
        >
          {buttonLoading ? (
            <div className="w-8 h-8 border-4 border-gray-300 rounded-full animate-spin border-t-blue-600" />
          ) : (
            "Add New Class"
          )}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddClasses;
