import axios from "axios";

let CSRF_Token = "";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.set("x-csrf-token", CSRF_Token);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    CSRF_Token = response.data["X-CSRF-Token"];
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
