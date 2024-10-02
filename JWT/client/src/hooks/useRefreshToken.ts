import useAuth from "./useAuth"
import axios from "../api/axios"

const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const refresh = async () => {
    try {
      const response = await axios.post('/auth/refreshToken', {}, {
        withCredentials: true,
      })

      if (response.data) {
        setAuth(response.data)
      }

      return response.data.accessToken
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  return refresh
}

export default useRefreshToken
