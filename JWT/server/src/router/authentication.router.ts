import { Router } from "express";
import { register, login } from "../controllers/authentication.controller";

export default (router: Router, prefix: string) => {
  router.post(prefix + "/register", register);
  router.post(prefix + "/login", login);
};
