import { Request, Response } from "express";
import { User } from "../model/User";
import { UserRepo } from "../repository/UserRepo";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import SECRET from "../config/auth";

class AuthController {
  async signup(req: Request, res: Response) {
    try {
      const new_user = new User();
      new_user.name = req.body.name;
      new_user.email = req.body.email;
      new_user.password = req.body.password;
      new_user.password = bcrypt.hashSync(req.body.password, 8);
      await new UserRepo().save(new_user);

      res.status(201).json({
        status: "REGISTERED",
        message: "User was registered successfully.",
      });
    } catch (err) {
      console.log("ERR controller**** ", err);
      res.status(500).json({
        status: 500,
        message: "Failed to save user.",
      });
    }
  }
  async signin(req: Request, res: Response) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!user) {
        throw new Error("User not found.");
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        throw new Error("Invalid password.");
      }

      const token = jwt.sign({ id: user.id }, SECRET, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      res.status(201).send({
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken: token,
      });
    } catch (err) {
      res.status(401).json({
        status: 401,
        message: "Invalid login information.",
      });
    }
  }
}

export default new AuthController();
