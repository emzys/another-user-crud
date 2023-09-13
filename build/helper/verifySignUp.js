"use strict";
// import { NextFunction, Request, Response } from "express";
// import { User } from "../model/User";
// import { AnyZodObject } from "zod";
// const checkDuplicateEmail =
//   () => async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       console.log("YELLOW REQ>>>>>>", req.body);
//       const old_user = await User.findOne({ where: { email: req.body.email } });
//       console.log("YELLOW old_user>>>>>>", old_user);
//       if (old_user) {
//         throw new Error("User with this email aleady exists.");
//       }
//       return next();
//     } catch (err: any) {
//       const error_message = JSON.parse(err.message);
//       return res.status(409).json({
//         status: "Bad Request!",
//         message: error_message[0].message,
//       });
//     }
//   };
// // const verifySignUp = {
// //   checkDuplicateEmail: checkDuplicateEmail,
// // };
// export default checkDuplicateEmail;
