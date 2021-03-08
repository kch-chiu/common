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
  const token = await jwt.getToken({ req, secret })
  // const sessionCookie = req.cookies['__Secure-next-auth.session-token'];
  // console.log(`sessionCookie is: ${sessionCookie}`);
  if (token) {
    console.log('JSON Web Token', JSON.stringify(token, null, 2));
    // const payload = (await jwt.getToken({ req, secret })) as UserPayload;
    req.currentUser = token;
    
  }

  next();
};
