import React, { useState } from "react";
import {
  AiOutlineLock,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlinePicture,
  AiOutlineUser,
} from "react-icons/ai";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../../Componets/Social/GoogleLogin";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [buttonLoading, setButtonLoading] = useState(false);
  const location = useLocation();
  const [firbaseError, setFirbaseError] = useState("");
  const { singUp, updateUser, setError, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setButtonLoading(true);
    singUp(data.email, data.password)
      .then((result) => {
        const user = result?.user;
        if (user) {
          return updateUser(data.name, data.photoUrl)
            .then((imran) => {
              setButtonLoading(false);
              const userInfo = {
                name: data?.name,
                email: data?.email,
                gender: data?.gender,
                photoUrl: data?.photoUrl,
                address: data?.address,
                phone: data?.phone,
                role: "user",
              };
              if (user?.email && user?.displayName) {
                return axios
                  .post(`http://localhost:5000/user`, userInfo)
                  .then((finalUser) => {
                    navigate("/");
                    setButtonLoading(false);
                    reset();
                    return alert(`Registion SuccesFull`);
                  })
                  .catch((error) => {
                    console.log(`Final User ${error}`);
                  });
              }
            })
            .catch((error) => {
              setButtonLoading(false);
              console.log(`Update User ${error}`);
            });
        }
      })
      .catch((error) => {
        let errrorCode = error?.code?.split("auth/")[1];
        setFirbaseError(errrorCode);
      });
  };
  const password = watch("password", "");

  return (
    <div className="flex items-center justify-center bg-gray-100 pt-14">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-semibold text-center ">
          Please Register
        </h2>
        {/* ----From-Start-Here----- */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* --1-row-- */}
          <div className="flex flex-col gap-5 sm:items-center sm:flex-row">
            <div className="sm:mb-4">
              <label
                htmlFor="name"
                className="block mb-2 font-bold text-gray-700"
              >
                <AiOutlineUser className="inline-flex mb-1 mr-2 text-lg" />
                Name
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                id="name"
                placeholder="Enter Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4 ">
              <label
                htmlFor="email"
                className="block mb-2 font-bold text-gray-700"
              >
                <AiOutlineMail className="inline-flex mb-1 mr-2 text-lg" />
                Email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                id="email"
                placeholder="Enter Your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>
          {/* ---2nd-Row--- */}
          <div className="flex flex-col gap-5 sm:items-center sm:flex-row">
            <div className="relative sm:mb-4">
              <label
                htmlFor="password"
                className="block mb-2 font-bold text-gray-700"
              >
                <AiOutlineLock className="inline-flex mb-1 mr-2 text-lg" />
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <span
                className="absolute inset-y-0  top-[25px] grid end-0 right-1 place-content-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {" "}
                {showPassword ? (
                  <IoIosEyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <IoIosEye className="w-4 h-4 text-gray-400" />
                )}
              </span>
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password2"
                className="block mb-2 font-bold text-gray-700"
              >
                <AiOutlineLock className="inline-flex mb-1 mr-2 text-lg" />
                Confrim Password
              </label>
              <input
                {...register("confirmpassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "Password Does Not Match",
                })}
                type={showPassword ? "text" : "password"}
                id="password2"
                placeholder="Confirm password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <span
                className="absolute inset-y-0 grid end-0 right-1 top-[25px] place-content-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {" "}
                {showPassword ? (
                  <IoIosEyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <IoIosEye className="w-4 h-4 text-gray-400" />
                )}
              </span>
            </div>
          </div>
          {/* -----3rd-Row------ */}
          <div className="flex flex-col gap-5 overflow-hidden sm:items-center sm:flex-row">
            <div className="sm:mb-4 ">
              <label
                htmlFor="tel"
                className="block mb-2 font-bold text-gray-700"
              >
                <AiOutlinePhone className="inline-flex mb-1 mr-2 text-lg" />
                Phone
              </label>
              <input
                {...register("phone", {
                  required: true,
                })}
                type="number"
                id="tel"
                placeholder="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4 ">
              <label
                htmlFor="photoUrl"
                className="block mb-2 font-bold text-gray-700"
              >
                <AiOutlinePicture className="inline-flex mb-1 mr-2 text-lg" />
                Photo Url
              </label>
              <input
                {...register("photoUrl")}
                type="url"
                id="photoUrl"
                placeholder="Photo Url"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>

          {/* ---4th-Row----- */}
          <div>
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block mb-2 font-bold text-gray-700"
              >
                <AiOutlineUser className="inline-flex mb-1 mr-2 text-lg" />
                Gender
              </label>
              <select
                className="w-full px-4 py-2 mb-2 font-bold border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                id="gender"
                {...register("gender", { required: true })}
              >
                <option value="">Selecet Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-2">
              <label
                htmlFor="address"
                className="block mb-2 font-bold text-gray-700"
              >
                <HiOutlineLocationMarker className="inline-flex mb-1 mr-2 text-lg" />
                Address
              </label>
              <textarea
                {...register("address")}
                id="address"
                rows={3}
                placeholder="Enter Address"
                className="w-full px-4 py-2 mb-2 font-bold border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              ></textarea>
            </div>
          </div>
          {firbaseError && (
            <div className="w-full my-2 text-base text-center text-red-500">
              <p className="capitalize">{firbaseError}</p>
            </div>
          )}
          <div className="text-center">
            <button
              disabled={buttonLoading}
              type="submit"
              className="px-4 py-2 text-white transition-all duration-300 rounded-md hover:bg-red-300 bg-secondary"
            >
              {buttonLoading ? (
                <div className="w-8 h-8 border-4 border-gray-300 rounded-full animate-spin border-t-blue-600" />
              ) : (
                "Register"
              )}
            </button>

            {error && (
              <div className="w-full mt-2 text-sm text-red-500">
                <p>Password Does Not Match</p>
              </div>
            )}
          </div>
          <p className="my-2 text-sm text-center text-gray-500">
            Already Have An Account{" "}
            <Link to={"/login"} className="text-red-400 underline">
              Login
            </Link>
          </p>
          <GoogleLogin />
        </form>
      </div>
    </div>
  );
};

export default Register;
