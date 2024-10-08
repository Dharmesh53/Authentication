import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider.tsx";

const useAuth = () => {
  const { auth } = useContext(AuthContext);

  useDebugValue(auth, (prop) => prop ? "Logged In" : "Logged Out")

  return useContext(AuthContext);
}

export default useAuth;
