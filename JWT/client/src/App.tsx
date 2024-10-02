import { Routes, Route } from "react-router-dom";
import { Roles } from "./types";
import Layout from "./components/layout";
import Login from "./components/login";
import Register from "./components/register";
import Unauthorized from "./components/unauthorized";
import Home from "./components/home";
import LinkPage from "./components/linkPage";
import RequireAuth from "./components/requireAuth";
import Admin from "./components/admin";
import Editor from "./components/editor";
import Lounge from "./components/lounge";
import Missing from "./components/missing";
import Users from "./components/users";
import PersistLogin from "./components/persistLogin";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="*" element={<Missing />} />

        {/* Protected Route */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[Roles.User]} />}>
            <Route index element={<Home />} />
            <Route path="users" element={<Users />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[Roles.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[Roles.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[Roles.Editor, Roles.Admin]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
