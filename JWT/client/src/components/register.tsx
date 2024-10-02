import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const RegisterURL = '/auth/register';

const Register = () => {
  const { data, setData, errorMsg, setErrorMsg, navigate, location, setAuth } = useRegisterStates();

  const from = location?.state?.from?.pathname || "/";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(RegisterURL, data, {
        withCredentials: true
      });
      if (response.status === 201) {
        setAuth(response.data)
        navigate(from, { replace: true });
      } else {
        throw new Error('Registration failed');
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Registration Failed');
    }
  }


  useEffect(() => {
    if (data.username || data.email || data.password) {
      setErrorMsg("");
    }
  }, [data, setErrorMsg]);

  return (
    <section>
      <div>
        <p>{errorMsg}</p>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            onChange={(e) => setData((prev) => ({ ...prev, username: e.target.value }))}
            value={data.username}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
            value={data.email}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setData((prev) => ({ ...prev, password: e.target.value }))}
            value={data.password}
            required
          />

          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already registered? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </section>
  )
}

const useRegisterStates = () => {

  const [data, setData] = useState({
    username: "", email: "", password: ""
  })
  const [errorMsg, setErrorMsg] = useState<string>('');

  const navigate = useNavigate();

  const location = useLocation();

  const { setAuth } = useAuth();

  return { data, setData, errorMsg, setErrorMsg, navigate, location, setAuth }
}

export default Register;
