import { Router } from "express";
import { getAllUsers, getUser } from "../controllers/user.controller";
import { isAuthenticated } from "middlewares";

export default (router: Router, prefix: string) => {
  router.get(prefix + "/", isAuthenticated, getUser);
  router.get(prefix + "/allUsers", isAuthenticated, getAllUsers);
};
