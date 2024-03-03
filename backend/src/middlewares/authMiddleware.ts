import express from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = "mysecretpassword";
//declare global
declare global {
  namespace Express {
    interface Request {
      userId: number; // Add your custom property
    }
  }
}
//end
export async function authUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(400).send("Token must start with Bearer");
  } else {
    const token = authHeader.split(" ")[1];
    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      if (decoded) {
        req.userId = decoded.userId;
        next();
      } else {
        res.send("Failed to verify jwt");
      }
    } catch (err) {
      res.send("Some error occured");
    }
  }
}

export function signJwt(userId: number) {
  const token = jwt.sign({ userId }, JWT_SECRET);
  return token;
}
