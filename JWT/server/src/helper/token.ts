import { privateKey, publicKey } from "helper/keyPairs";
import jwt from "jsonwebtoken";

export const generateJWT = (user: Record<string, any>) => {
  const data = {
    iss: process.env.X_CURRENT_URL,
    sub: user._id,
    aud: process.env.X_CORS_ORIGIN,
    exp: Math.floor(Date.now() / 1000) + 60 * 5,
    nbf: Math.floor(Date.now() / 1000),
    data: { username: user.username, email: user.email },
  };

  const token = jwt.sign(data, privateKey, { algorithm: "RS256" });

  return token;
};

export const verifyJWT = (token: string) => {
  const user = jwt.verify(token, publicKey, {
    algorithms: ["RS256"],
    audience: process.env.X_CORS_ORIGIN,
    issuer: process.env.X_CURRENT_URL,
  });
  return user;
};
