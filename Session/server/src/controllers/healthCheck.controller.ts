import { Request, Response } from "express";
import { DBConnection } from "db/connectToDB";

export const healthcheck = async (req: Request, res: Response) => {
  return res.status(200).json("Health check passed");
};

export const db_resetter = async (req: Request, res: Response) => {
  const { name } = req.params;
  if (DBConnection) {
    await DBConnection.db.dropDatabase({
      dbName: name,
    });
    return res.status(200).send(`Database dropped successfully, if ${name} ever existed`);
  }
  return res.status(500).send(`You are not connected to any database"`);
};
