import { Request, Response } from "express";
import { User } from "../model/User";
import { UserRepo } from "../repository/UserRepo";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const new_user = new User();
      new_user.name = req.body.name;
      new_user.email = req.body.email;
      new_user.password = req.body.password;

      await new UserRepo().save(new_user);

      res.status(201).json({
        status: "CREATED",
        message: "Successfully created a new user",
      });
    } catch (err) {
      console.log("ERR controller**** ", err);
      res.status(500).json({
        status: 500,
        message: "Failed to save user.",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      await new UserRepo().delete(id);

      res.status(200).json({
        status: "OK",
        message: "Successfully deleted user",
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      const fetched_user = await new UserRepo().retrieveById(id);

      res.status(200).json({
        status: "OK",
        message: "Successfully fetched user by id",
        data: fetched_user,
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }

  async findByEmail(req: Request, res: Response) {
    try {
      let email = req.params["email"];
      const fetched_user = await new UserRepo().retrieveByEmail(email);

      res.status(200).json({
        status: "OK",
        message: "Successfully fetched user by email",
        data: fetched_user,
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const all_users = await new UserRepo().retrieveAll();

      res.status(200).json({
        status: "OK",
        message: "Successfully fetched all users",
        data: all_users,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error",
        message: "Internal Server Error",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      const new_user = new User();

      new_user.id = id;
      new_user.name = req.body.name;
      new_user.email = req.body.email;
      new_user.password = req.body.password;

      await new UserRepo().update(new_user);

      res.status(200).json({
        status: "OK",
        message: "Successfully updated user data",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error",
        message: "Internal Server Error",
      });
    }
  }
}

export default new UserController();
