import { Request, Response } from "express";
import { get } from "lodash";
import { getUsers } from "db/users";
import { User } from "types";

export const getUser = (req: Request, res: Response) => {
  try {
    const identity = get(req, "identity") as User;

    if (!identity) {
      return res.status(400).send("No user data found");
    }

    return res.status(201).json({ _id: identity._id, username: identity.username, email: identity.email });
  } catch (error) {
    console.log(error);
    return res.status(500).send(`that's the error -> ${error.message}`);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send(`that's the error -> ${error.message}`);
  }
};
