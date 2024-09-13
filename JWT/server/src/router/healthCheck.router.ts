import { Router } from "express";
import { healthCheck } from "controllers/healthCheck.controller";

export default (router: Router, prefix: string) => {
  router.get("/", healthCheck);
};
