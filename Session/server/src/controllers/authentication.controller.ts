import { Request, Response } from "express";
import { getUserByEmail, createUser, getUserById } from "../db/users";
import { random, hasher, createCSRF } from "../helpers";
import { get } from "lodash";
import { myCookieOptions } from "../helpers";

const createSession = async (user: any, res: Response) => {
  const salt = random();
  user.authentication.sessionToken = hasher(salt, user._id.toString());
  await user.save();

  createCSRF(res);

  return res
    .cookie("TOKEN_GUY", user.authentication.sessionToken, myCookieOptions)
    .json({ _id: user._id, email: user.email, username: user.username })
    .status(200);
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("enter both email and password");
    }

    const user = await getUserByEmail(email).select("+authentication.salt +authentication.password");

    if (!user) {
      return res.status(400).send("no user found");
    }

    const expectedHash = hasher(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.status(403).send("incorrect password");
    }

    return createSession(user, res);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: hasher(salt, password),
      },
    });

    return createSession(user, res);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const currentUserId = get(req, "identity._id") as string;

    const user = await getUserById(currentUserId);
    user.authentication.sessionToken = "";
    await user.save();

    return res
      .clearCookie("X_CSRF_TOKEN_SIGNED", myCookieOptions)
      .clearCookie("TOKEN_GUY", myCookieOptions)
      .sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
