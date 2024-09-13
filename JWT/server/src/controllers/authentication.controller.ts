import { createUser, getUsersByEmail } from "db/users";
import { Request, Response } from "express";
import { hasher, random, timeSafeEqual } from "helper";
import { generateJWT } from "helper/token";

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

    const token = generateJWT(user);

    return res.status(200).json({ id: user._id, username: user.username, email: user.email, token });
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

    const salt = random();
    const user = await createUser({
      username,
      email,
      authentication: {
        salt,
        password: hasher(salt, password),
      },
    });

    const token = generateJWT(user);

    return res.status(200).json({ id: user._id, username: user.username, email: user.email, token });
  } catch (error) {
    console.log(error);
    return res.status(500).send(`Error -> ${error.message}`);
  }
};
