import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth(null);
    try {
      await axios('/auth/logout', {
        withCredentials: true
      });
    } catch (err) {
      console.error("Error while logging out", err);
    }
  }

  return logout;
}

export default useLogout
