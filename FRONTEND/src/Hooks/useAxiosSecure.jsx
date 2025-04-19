import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAxiosSecure = () => {
  const { logout } = useAuth();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const axiosSecure = axios.create({
    baseURL: "https://mern-yoga-master.onrender.com/",
  });
  useEffect(() => {
    const requestInterceptors = axiosSecure.interceptors.request.use(
      function (config) {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // ------Response----
    const responseInterptior = axiosSecure.interceptors.response.use(
      function (response) {
        return response;
      },
      async (error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
          await logout();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptors);
      axiosSecure.interceptors.response.eject(responseInterptior);
    };
  }, [axiosSecure, logout, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
