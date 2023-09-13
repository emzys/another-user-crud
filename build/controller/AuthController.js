"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../model/User");
const UserRepo_1 = require("../repository/UserRepo");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = __importDefault(require("../config/auth"));
class AuthController {
    async signup(req, res) {
        try {
            const new_user = new User_1.User();
            new_user.name = req.body.name;
            new_user.email = req.body.email;
            new_user.password = req.body.password;
            new_user.password = bcryptjs_1.default.hashSync(req.body.password, 8);
            await new UserRepo_1.UserRepo().save(new_user);
            res.status(201).json({
                status: "REGISTERED",
                message: "User was registered successfully.",
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
    async signin(req, res) {
        try {
            const user = await User_1.User.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (!user) {
                throw new Error("User not found.");
            }
            var passwordIsValid = bcryptjs_1.default.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                throw new Error("Invalid password.");
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, auth_1.default, {
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
        }
        catch (err) {
            res.status(401).json({
                status: 401,
                message: "Invalid login information.",
            });
        }
    }
}
exports.default = new AuthController();
