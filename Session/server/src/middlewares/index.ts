import { NextFunction, Request, Response } from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../db/users";
import { hasher } from "helpers";

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;
    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    return next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.cookies["TOKEN_GUY"];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const avoidInProduction = async (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV == "development") {
    next();
  } else {
    return res.status(400).send("Not allowed in production");
  }
};

export const validateCSRFToken = (req: Request, res: Response, next: NextFunction) => {
  const clientToken = req.headers["x-csrf-token"];
  const signedToken = req.cookies["X_CSRF_TOKEN_SIGNED"];

  if (!clientToken || typeof clientToken !== "string" || !signedToken) {
    return res.status(403).send("Missing CSRF Token");
  }

  const validToken = hasher(clientToken, "/");

  if (signedToken !== validToken) {
    return res.status(403).send("Invalid CSRF Token");
  }
  next();
};
