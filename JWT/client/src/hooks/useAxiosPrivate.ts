import { axiosPrivateInstance } from "../api/axios";

const useAxiosPrivate = () => {
  axiosPrivateInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("jwt");

      if (!token) {
        console.log("No token found in local storage");
      }

      config.headers["authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosPrivateInstance.interceptors.response.use(
    (response) => {
      const token = response.data["token"];

      if (token) {
        localStorage.setItem("jwt", token);
      }

      return response;
    },
    (error) => Promise.reject(error)
  );
  return axiosPrivateInstance;
};

export default useAxiosPrivate;
