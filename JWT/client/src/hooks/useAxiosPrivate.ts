import { axiosPrivateInstance } from "../api/axios";

const useAxiosPrivate = () => {
  axiosPrivateInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        return config
      }

      config.headers["authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosPrivateInstance.interceptors.response.use(
    (response) => {
      const accessToken = response.data["accessToken"];
      const refreshToken = response.data["refreshToken"];

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken)
      }

      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
          try {
            const response = await axiosPrivateInstance.post(`/auth/refreshToken`, { refreshToken });

            const newAccessToken = response.data["accessToken"];
            const newRefreshToken = response.data["refreshToken"];

            localStorage.setItem("accessToken", newAccessToken);
            localStorage.setItem("refreshToken", newRefreshToken);

            originalRequest.headers["authorization"] = `Bearer ${newAccessToken}`

            return axiosPrivateInstance(originalRequest)
          } catch (error) {
            console.log(error)

            try {
              // await axiosPrivateInstance.post('/auth/logout');

              // localStorage.clear()
            } catch (error) {
              console.log("error in logging out", error);
            }
          }
        }
      }

      return Promise.reject(error)
    }
  );
  return axiosPrivateInstance;
};

export default useAxiosPrivate;
