"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../model/User");
const UserRepo_1 = require("../repository/UserRepo");
class UserController {
    async create(req, res) {
        try {
            const new_user = new User_1.User();
            new_user.name = req.body.name;
            new_user.email = req.body.email;
            new_user.password = req.body.password;
            await new UserRepo_1.UserRepo().save(new_user);
            res.status(201).json({
                status: "CREATED",
                message: "Successfully created a new user",
            });
        }
        catch (err) {
            console.log("ERR controller**** ", err);
            res.status(500).json({
                status: 500,
                message: "Failed to save user.",
            });
        }
    }
    async delete(req, res) {
        try {
            let id = parseInt(req.params["id"]);
            await new UserRepo_1.UserRepo().delete(id);
            res.status(200).json({
                status: "OK",
                message: "Successfully deleted user",
            });
        }
        catch (err) {
            res.status(500).json({
                status: 500,
                message: "Internal Server Error",
            });
        }
    }
    async findById(req, res) {
        try {
            let id = parseInt(req.params["id"]);
            const fetched_user = await new UserRepo_1.UserRepo().retrieveById(id);
            res.status(200).json({
                status: "OK",
                message: "Successfully fetched user by id",
                data: fetched_user,
            });
        }
        catch (err) {
            res.status(500).json({
                status: 500,
                message: "Internal Server Error",
            });
        }
    }
    async findByEmail(req, res) {
        try {
            let email = req.params["email"];
            const fetched_user = await new UserRepo_1.UserRepo().retrieveByEmail(email);
            res.status(200).json({
                status: "OK",
                message: "Successfully fetched user by email",
                data: fetched_user,
            });
        }
        catch (err) {
            res.status(500).json({
                status: 500,
                message: "Internal Server Error",
            });
        }
    }
    async findAll(req, res) {
        try {
            const all_users = await new UserRepo_1.UserRepo().retrieveAll();
            res.status(200).json({
                status: "OK",
                message: "Successfully fetched all users",
                data: all_users,
            });
        }
        catch (err) {
            res.status(500).json({
                status: "Internal Server Error",
                message: "Internal Server Error",
            });
        }
    }
    async update(req, res) {
        try {
            let id = parseInt(req.params["id"]);
            const new_user = new User_1.User();
            new_user.id = id;
            new_user.name = req.body.name;
            new_user.email = req.body.email;
            new_user.password = req.body.password;
            await new UserRepo_1.UserRepo().update(new_user);
            res.status(200).json({
                status: "OK",
                message: "Successfully updated user data",
            });
        }
        catch (err) {
            res.status(500).json({
                status: "Internal Server Error",
                message: "Internal Server Error",
            });
        }
    }
}
exports.default = new UserController();
