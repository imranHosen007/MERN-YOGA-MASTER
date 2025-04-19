import React from "react";
import { useState } from "react";
import { MdOutlineAlternateEmail, MdOutlineRemoveRedEye } from "react-icons/md";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../../Componets/Social/GoogleLogin";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, setError, setLoading } = useAuth();
  const [buttonLoading, setButtonLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [firbaseError, setFirbaseError] = useState("");

  const handleSubmit = (e) => {
    setButtonLoading(true);
    setError("");
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data);

    login(formData.email, formData.password)
      .then((res) => {
        setButtonLoading(false);
        if (res?.user?.email) {
          alert(`Login SuccesFull`);
          navigate(location.state?.from || "/dashboard");
        } else {
          alert(``);
        }
      })
      .catch((error) => {
        let errrorCode = error?.code?.split("auth/")[1];
        setFirbaseError(errrorCode);
        setLoading(false);
        setButtonLoading(false);
      });
  };
  return (
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8 ">
      <h1 className="text-2xl font-bold text-center text-secondary sm:text-3xl">
        Get Stated Today
      </h1>
      <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
        Explore our comrehensive library of Courses,meticulosly crafted to cater
        to all levels of expertise.
      </p>
      <div className="max-w-lg p-4 mx-auto mt-6 mb-0 rounded-lg shadow-lg sm:p-6 lg:p-8">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <p className="text-lg font-medium text-center text-red-400">
            Sing In to Your Account
          </p>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                className="w-full p-4 text-sm border border-gray-200 rounded-lg shadow-sm outline-none pe-12"
              />
              <span className="absolute inset-y-0 grid end-0 right-2 place-content-center">
                <MdOutlineAlternateEmail className="w-4 h-4 text-gray-400" />
              </span>
            </div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative mt-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                name="password"
                className="w-full p-4 text-sm border border-gray-200 rounded-lg shadow-sm outline-none pe-12"
              />
              <span
                className="absolute inset-y-0 grid end-0 right-1 place-content-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoIosEyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <IoIosEye className="w-4 h-4 text-gray-400" />
                )}
              </span>
            </div>
            {firbaseError && (
              <div className="w-full my-2 text-base text-center text-red-500">
                <p className="capitalize">{firbaseError}</p>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-white rounded-lg bg-secondary"
          >
            {buttonLoading ? (
              <div className="w-8 h-8 border-4 border-gray-300 rounded-full animate-spin border-t-blue-600" />
            ) : (
              "  Log In"
            )}
          </button>
          <p className="text-sm text-center text-gray-500">
            No Account{" "}
            <Link to={"/register"} className="text-red-400 underline">
              Sing Up
            </Link>
          </p>
        </form>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Login;
