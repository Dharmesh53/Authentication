import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "helper/token";
import { merge } from "lodash";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers["authorization"];

    if (!header || typeof header !== "string") {
      return res.status(400).send("No Authorization header found");
    }

    const token = header.split(" ")[1];
    if (!token || token === "undefined") {
      return res.status(400).send("No token found");
    }

    const user = verifyJWT(token);
    if (!user) {
      return res.status(403).send("Get your valid token");
    }

    merge(req, { identity: user });
    return next();
  } catch (error) {
    return res.status(500).send(`Error: ${error.message}`);
  }
};
