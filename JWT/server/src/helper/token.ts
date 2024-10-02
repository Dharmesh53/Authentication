import { privateKey, publicKey } from "helper/keyPairs";
import jwt from "jsonwebtoken";
import { JWTData } from "types"
import { encryptData, decryptData } from "helper";

export const generateAccessToken = (user: Record<string, any>, exp: string) => {

  const data: JWTData = {
    iss: process.env.X_CURRENT_URL,
    sub: user._id,
    aud: process.env.X_CORS_ORIGIN,
    nbf: Math.floor(Date.now() / 1000),
  };

  return generateJWT(data, exp);
};

export const generateRefreshToken = (id: string, exp: string) => {
  const somethingIDontKnowAbout = encryptData(id)

  const data: JWTData = {
    iss: process.env.X_CURRENT_URL,
    sub: somethingIDontKnowAbout,
    aud: process.env.X_CORS_ORIGIN,
    nbf: Math.floor(Date.now() / 1000),
  };

  return generateJWT(data, exp)
};

export const generateJWT = (data: Record<string, any>, exp: string) => {
  const token = jwt.sign(data, privateKey, { algorithm: "RS256", expiresIn: exp });
  return token;
}

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
      audience: process.env.X_CORS_ORIGIN,
      issuer: process.env.X_CURRENT_URL,
    });

    return decoded as JWTData;
  } catch (error) {
    console.log(error.message)
    return null
  }
};

export const getIdFromRefreshToken = (refreshToken: string) => {

  const decoded: JWTData = verifyJWT(refreshToken)

  if (!decoded) {
    return null
  }

  const decryptedId = decryptData(decoded.sub);

  return decryptedId
}

