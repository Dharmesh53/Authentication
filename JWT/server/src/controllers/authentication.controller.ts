import { createUser, getUserById, getUsersByEmail } from "db/users";
import { Request, Response } from "express";
import { hasher, random, timeSafeEqual, decryptData } from "helper";
import { generateAccessToken, generateRefreshToken, verifyJWT } from "helper/token";
import { get } from "lodash";
import { JWTData, User } from "types";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Please enter all the required field");
    }

    const user = await getUsersByEmail(email).select("+authentication.salt +authentication.password");
    if (!user) {
      return res.status(400).send("Email is not registered");
    }

    const availableHash = hasher(user.authentication.salt, password);
    const isEqual = timeSafeEqual(availableHash, user.authentication.password);

    if (!isEqual) {
      return res.status(403).send("Incorrect password");
    }

    const accessToken = generateAccessToken(user, "10s");

    const refreshToken = generateRefreshToken(String(user._id), "24h")
    user.authentication.refreshToken = refreshToken;
    user.save();

    return res.status(200).json({ id: user._id, username: user.username, email: user.email, accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    return res.status(500).send(`Error -> ${error.message}`);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
      return res.status(400).send("Please enter all the required field");
    }

    const existingUser = await getUsersByEmail(email);

    if (existingUser) {
      return res.status(400).send("Email is already registered");
    }

    const salt = random(128);

    const user = await createUser({
      username,
      email,
      authentication: {
        salt,
        password: hasher(salt, password),
      },
    });

    const refreshToken = generateRefreshToken(String(user._id), "24h")
    const accessToken = generateAccessToken(user, "10s");

    user.authentication.refreshToken = refreshToken;
    await user.save();


    return res.status(200).json({ id: user._id, username: user.username, email: user.email, accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    return res.status(500).send(`Error -> ${error.message}`);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const identity: User = get(req, "identity")

    const user = await getUserById(identity._id)

    user.authentication.refreshToken = "";
    user.save();

    return res.status(200).send("Logged out successfully")
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

export const getNewAccessToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    const decoded: JWTData = verifyJWT(refreshToken)

    if (!decoded) {
      return res.status(400).send("Invalid signature of refresh Token")
    }

    const decryptedId = decryptData(decoded.sub);
    console.log(decryptedId)

    const user = await getUserById(decryptedId).select('+authentication.refreshToken');

    if (user.authentication.refreshToken !== refreshToken) {
      return res.status(400).send("Invalid refresh token");
    }

    const newAccessToken = generateAccessToken(user, "10s");
    const newRefreshToken = generateRefreshToken(String(user._id), '24h');

    user.authentication.refreshToken = newRefreshToken;
    await user.save();

    return res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
