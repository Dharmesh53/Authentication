import { Router } from "express";
import authentication from "./authentication.router";
import users from "./users.router";
import healthCheck from "./healthCheck.router";

const router = Router();

export default (): Router => {
  authentication(router);
  users(router);
  healthCheck(router);
  return router;
};
