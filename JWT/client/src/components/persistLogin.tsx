import { useEffect, useState } from "react"
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const [persist] = useLocalStorage("persist", false);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    if (!auth?.accessToken && persist) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => { isMounted = false };
  }, [])

  return (
    <>
      {persist ? isLoading ? <p>Loading...</p> : <Outlet /> : <Outlet />}
    </>
  )
}

export default PersistLogin
