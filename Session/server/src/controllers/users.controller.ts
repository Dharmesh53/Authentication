import { Request, Response } from "express";
import { deleteUserById, getUsers, getUserById } from "../db/users";
import { get } from "lodash";
import { createCSRF } from "helpers";

interface Identity {
  _id: string;
  username: string;
  email: string;
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const identity = get(req, "identity");
    createCSRF(res);
    return res.status(200).json(identity).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteUser = await deleteUserById(id);
    return res.json(deleteUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const identity = get(req, "identity") as Identity | undefined;
    if (!identity || !identity._id) {
      return res.status(401).json({ message: "Unauthorized access, identity missing." });
    }

    const { username } = req.body;
    if (!username) {
      return res.sendStatus(400);
    }

    const user = await getUserById(identity._id);
    user.username = username;
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
