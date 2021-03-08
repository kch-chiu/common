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
  console.log(`req is: ${JSON.stringify(req)}`);
  // const sessionCookie = req.cookies['__Secure-next-auth.session-token'];
  // console.log(`sessionCookie is: ${sessionCookie}`);
  if (req) {
    try {
      const payload = (await jwt.getToken({ req, secret })) as UserPayload;
      req.currentUser = payload;
    } catch (err) {}
  }

  next();
};
