import crypto from "crypto";
import { Response } from "express";

export const random = () => crypto.randomBytes(128).toString("base64");

export const hasher = (salt: string, password: string) => {
  return crypto.createHmac("sha256", process.env.SECERT_X).update([salt, password].join("/")).digest("hex");
};

export const myCookieOptions = {
  domain: "localhost",
  path: "/",
  httpOnly: true,
  sameSite: "lax" as "lax",
  secure: process.env.NODE_ENV === "production",
};

export const createCSRF = (res: Response) => {
  const csrfToken = random();
  const signedCsrfToken = hasher(csrfToken, "/");

  res.clearCookie("X_CSRF_TOKEN_SIGNED", myCookieOptions);

  res
    .setHeader("Access-Control-Expose-Headers", "X-CSRF-Token, Auth-Response")
    .setHeader("auth-response", "true")
    .setHeader("x-csrf-token", csrfToken)
    .cookie("X_CSRF_TOKEN_SIGNED", signedCsrfToken, myCookieOptions);
};
