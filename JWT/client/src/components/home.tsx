import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.ts";

const Home = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    setAuth(null)
    navigate('/linkpage');
  }

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/editor">Go to the Editor page</Link>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <Link to="/lounge">Go to the Lounge</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
    </section>
  )
}

export default Home;
