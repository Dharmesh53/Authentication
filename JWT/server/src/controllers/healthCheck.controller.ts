import { Request, Response } from "express";

export const healthCheck = (req: Request, res: Response) => {
  return res.sendStatus(200);
};
