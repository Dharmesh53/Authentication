import { Router } from "express";
import { login, register, logout } from "controllers/authentication.controller";
import { isAuthenticated, validateCSRFToken } from "middlewares";

export default (router: Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.get("/auth/logout", isAuthenticated, logout);
};
