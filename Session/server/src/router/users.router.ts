import { Router } from "express";
import { deleteUser, getAllUser, updateUser, getUser } from "../controllers/users.controller";
import { isAuthenticated, isOwner, validateCSRFToken } from "../middlewares";

export default (router: Router) => {
  router.get("/user", isAuthenticated, getUser);
  router.get("/users", isAuthenticated, validateCSRFToken, getAllUser);
  router.delete("/users/:id", isAuthenticated, validateCSRFToken, isOwner, deleteUser);
  router.patch("/users/:id", isAuthenticated, validateCSRFToken, isOwner, updateUser);
};
