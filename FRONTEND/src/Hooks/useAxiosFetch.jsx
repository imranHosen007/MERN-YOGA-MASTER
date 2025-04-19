import React, { useEffect } from "react";
import axios from "axios";

const useAxiosFetch = () => {
  const axiosPublic = axios.create({
    baseURL: "http://localhost:5000/",
  });
  useEffect(() => {
    const requestInterceptors = axiosPublic.interceptors.request.use(
      function (config) {
        // Do something before request is sent

        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // ------Response----
    const responseInterptior = axiosPublic.interceptors.response.use(
      function (response) {
        return response;
      },
      async error => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPublic.interceptors.request.eject(requestInterceptors);
      axiosPublic.interceptors.response.eject(responseInterptior);
    };
  }, [axiosPublic]);
  return axiosPublic;
};

export default useAxiosFetch;
