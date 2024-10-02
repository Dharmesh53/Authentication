import { useEffect } from "react";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { axiosPrivateInstance } from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import useLogout from "./useLogout";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const logout = useLogout();

  useEffect(() => {
    const requestInterceptor = axiosPrivateInstance.interceptors.request.use(
      (config) => addAuthHeader(config, auth?.accessToken),
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        return handleResponseError(error, refresh, logout);
      }
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestInterceptor);
      axiosPrivateInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh, logout]);

  return axiosPrivateInstance;
};

const addAuthHeader = (config: InternalAxiosRequestConfig, token?: string): InternalAxiosRequestConfig => {
  if (!token) return config;

  if (!config.headers["authorization"]) {
    config.headers["authorization"] = `Bearer ${token}`;
  }
  return config;
};

const handleResponseError = async (error: AxiosError, refresh: () => Promise<string>, logout: () => Promise<void>) => {
  const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

  if (error.response?.status === 401 && !originalRequest._retry) {

    originalRequest._retry = true;

    try {
      const newAccessToken = await refresh();

      originalRequest.headers["authorization"] = `Bearer ${newAccessToken}`;

      return axiosPrivateInstance(originalRequest);
    } catch (refreshError) {

      console.error("Error refreshing token:", refreshError);

      await logout();

      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(error);
};

export default useAxiosPrivate;
