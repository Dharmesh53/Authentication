import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useToggle from "../hooks/useToggle";

const LoginURL = '/auth/login';

const Login = () => {
  const { data, setData, errorMsg, setErrorMsg, navigate, location, setAuth, check, toggleCheck } = useLoginStates()

  const from = location.state?.from?.pathname || "/"

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!data.email || !data.password) {
        throw new Error("Email and password are required.");
      }

      const response = await axios.post(LoginURL, data, {
        withCredentials: true
      })
      if (response.status === 200) {
        setAuth(response.data)
        navigate(from, { replace: true })
      } else {
        throw new Error("Login Failed")
      }

    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setErrorMsg("Login successful!");
    }
  }

  useEffect(() => {
    if (data.email || data.password) {
      setErrorMsg("");
    }
  }, [data, setErrorMsg]);


  return (
    <section>
      <p>{errorMsg}</p>
      <h1>Sign in</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          autoComplete="off"
          value={data.email}
          onChange={(event) => setData((prevData) => ({ ...prevData, email: event.target.value }))}
          autoFocus
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={data.password}
          onChange={(event) => setData((prevData) => ({ ...prevData, password: event.target.value }))}
          required
        />
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={toggleCheck}
            checked={check}
          />
          <label htmlFor="persist">Trust This Device</label>
        </div>
        <button>Sign In</button>
      </form>

      <p>
        Need an Account <Link to='/register'>Sign Up</Link>
      </p>
    </section>
  )
}

const useLoginStates = () => {
  const [data, setData] = useState({
    email: "", password: ""
  })

  const [errorMsg, setErrorMsg] = useState<string>();

  const navigate = useNavigate()

  const location = useLocation();

  const { setAuth } = useAuth();

  const [check, toggleCheck] = useToggle("persist", false);

  return { data, setData, errorMsg, setErrorMsg, navigate, location, setAuth, check, toggleCheck }
}

export default Login
