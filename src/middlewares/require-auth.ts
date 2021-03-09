import { NextFunction } from "express";
import { NextApiRequest, NextApiResponse } from "next-auth/_utils";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireAuth = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
