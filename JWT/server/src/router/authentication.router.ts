import { Router } from "express";
import { register, login, getNewAccessToken, logout } from "../controllers/authentication.controller";
import { isAuthenticated } from "middlewares";

export default (router: Router, prefix: string) => {
  router.post(prefix + "/register", register);
  router.post(prefix + "/login", login);
  router.post(prefix + "/logout", isAuthenticated, logout);
  router.post(prefix + "/refreshToken", getNewAccessToken);
};
