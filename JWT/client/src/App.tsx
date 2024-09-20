import { useState, ChangeEvent, FormEvent, useLayoutEffect } from "react";
import "./App.css";
import useAxiosPrivate from "./hooks/useAxiosPrivate";

interface FormData {
  username?: string;
  email: string;
  password: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
}

function App() {
  const axiosPrivate = useAxiosPrivate();

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  useLayoutEffect(() => {
    const fetcher = async () => {
      try {
        const res = await axiosPrivate.get("/user");
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetcher();
  }, [axiosPrivate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogout = async () => {
    try {
      localStorage.clear()
      setUser(null);
    } catch (error) {
      console.error("Failed to logout, ", error);
    }
  };

  const handleAllUser = async () => {
    await axiosPrivate.get("/user/allUsers");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await axiosPrivate.post("/auth/login", formData);
        setUser(res.data);
      } else {
        const res = await axiosPrivate.post("/auth/register", formData);
        setUser(res.data);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleAllUser}>getAllUsers</button>
    </div>
  ) : (
    <div className="auth-form">
      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        {!isLogin && (
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required={!isLogin}
              placeholder="Enter your username"
            />
          </div>
        )}

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>

        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>

        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Switch to Sign Up" : "Switch to Login"}
        </button>
      </form>
    </div>
  );
}

export default App;
