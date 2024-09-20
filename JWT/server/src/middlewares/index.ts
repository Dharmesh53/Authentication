import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "helper/token";
import { getUserById } from "db/users";
import { merge } from "lodash";
import { JWTData } from "types"

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers["authorization"] as string;

    if (!header) {
      return res.status(400).send("No Authorization header found");
    }

    const token = header.split(" ")[1];
    if (!token || token === "undefined") {
      return res.status(400).send("No token found");
    }

    const decoded: JWTData = verifyJWT(token);
    if (!decoded) {
      return res.status(401).send("Expired or invalid token");
    }

    const user = await getUserById(decoded.sub).lean();

    if (!user) {
      return res.status(400).send("No user found")
    }

    merge(req, { identity: user });
    return next();
  } catch (error) {
    return res.status(500).send(`Error: ${error.message}`);
  }
};
