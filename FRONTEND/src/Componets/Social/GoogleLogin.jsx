import React from "react";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const { googleLogin, user } = useAuth();
  const handleSumbit = () => {
    googleLogin()
      .then(currentUser => {
        const user = currentUser.user;
        if (user) {
          const userInfo = {
            name: user?.displayName,
            email: user?.email,
            photoUrl: user?.photoURL,
            role: "user",
            gender: "Is not Provided",
            phone: "Is not Provided",
            address: "Is not Provided",
          };
          if (user.displayName && user.email) {
            return axios
              .post(`http://localhost:5000/user`, userInfo)
              .then(res => {
                console.log(res);
                alert(`Account Creation SuccesFull`);
                return navigate("/dashboard");
              })
              .catch(error => {
                console.log(`User Data Post ${error}`);
                navigate("/");
              });
          }
        }
      })
      .catch(error => console.log(`GoogleLogin In ${error}`));
  };
  return (
    <div className="flex items-center justify-center my-3">
      <button
        onClick={handleSumbit}
        className="flex items-center px-6 py-4 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg shadow-md outline-none hover:bg-gray-200 focus:outline-none"
      >
        <FaGoogle className="w-6 h-6 mr-2" />
        <span>Continue With Google</span>
      </button>
    </div>
  );
};

export default GoogleLogin;
