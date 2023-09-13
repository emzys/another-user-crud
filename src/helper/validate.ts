import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { User } from "../model/User";

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      const old_user = await User.findOne({ where: { email: req.body.email } });
      if (old_user) {
        throw new Error("User with this email aleady exists.");
      }

      return next();
    } catch (err: any) {
      res.status(400).json({
        status: 400,
        message: "Bad Request",
      });
    }
  };

export default validate;
