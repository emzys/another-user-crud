import { NextFunction, Request, Response } from "express";
// import { AnyZodObject } from "zod";
import jwt from "jsonwebtoken";
import SECRET from "../config/auth";

const authenticate =
  // (schema: AnyZodObject) =>
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token = req.headers["x-access-token"];
      if (!token) {
        throw new Error("No token provided.");
      }

      jwt.verify("token", SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: "Unauthorized!",
          });
        }
        // req.body.id = decoded.id;
        next();
      });

      return next();
    } catch (err: any) {
      res.status(400).json({
        status: 400,
        message: "Bad Request",
      });
    }
  };

export default authenticate;
