import { NextFunction } from "express";
import jwt, { JWTDecodeParams } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next-auth/_utils";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

const secret = process.env.JWT_KEY as JWTDecodeParams["secret"];

export const currentUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextFunction
) => {
  // Request not from client
  if (!req.cookies) {
    if (!req.headers?.authorization) return next();
    req.cookies = {
      "__Secure-next-auth.session-token": req.headers.authorization as string,
    };
  }
  const token = await jwt.getToken({ req, secret });
  if (token) {
    console.log("JSON Web Token", JSON.stringify(token, null, 2));
    req.currentUser = token;
  }

  next();
};
