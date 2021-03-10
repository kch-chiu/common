import { NextFunction } from "express";
import jwt, { JWTDecodeParams } from "next-auth/jwt";
import {
  GenericObject,
  NextApiRequest,
  NextApiResponse,
} from "next-auth/_utils";
import { IncomingMessage } from "http";

interface UserPayload {
  id: string;
  email: string;
}

declare module "next-auth/_utils" {
  interface NextApiRequest extends IncomingMessage, GenericObject {
    currentUser?: object;
  }
}

const secret = process.env.JWT_KEY as JWTDecodeParams["secret"];

export const currentUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextFunction
) => {
  try {
    const token = await jwt.getToken({ req, secret });
    // Request from client
    if (token) {
      console.log("JSON Web Token", JSON.stringify(token, null, 2));
      req.currentUser = token;
    }
  } catch (err) {
    console.error(err);
  }

  next();
};
