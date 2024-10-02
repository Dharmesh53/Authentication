import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthType } from "../types";

const Users = () => {
  const [users, setUsers] = useState<AuthType[]>([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/user/allUsers', {
          signal: controller.signal
        });
        if (isMounted) {
          setUsers(response.data);
        }
      } catch (error: any) {
        if (error.name === "CanceledError") {
          console.log("Request canceled", error);
        } else {
          console.log(error);
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, navigate, location]);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length > 0 ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;

