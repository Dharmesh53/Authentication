import { Router } from "express";
import healthCheck from "./healthCheck.router";
import authentication from "./authentication.router";
import user from "./user.router";

const router = Router();

healthCheck(router, "/");
authentication(router, "/auth");
user(router, "/user");

export default router;
