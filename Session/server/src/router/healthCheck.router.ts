import { Router } from "express";
import { healthcheck } from "controllers/healthCheck.controller";
import { db_resetter } from "controllers/healthCheck.controller";
import { avoidInProduction } from "middlewares";

export default (router: Router) => {
  router.get("/", healthcheck);
  router.delete("/reset-db/:name", avoidInProduction, db_resetter);
};
