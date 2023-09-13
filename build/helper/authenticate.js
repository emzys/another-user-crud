"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { AnyZodObject } from "zod";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../config/auth"));
const authenticate = 
// (schema: AnyZodObject) =>
() => async (req, res, next) => {
    try {
        let token = req.headers["x-access-token"];
        if (!token) {
            throw new Error("No token provided.");
        }
        jsonwebtoken_1.default.verify("token", auth_1.default, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            // req.body.id = decoded.id;
            next();
        });
        return next();
    }
    catch (err) {
        res.status(400).json({
            status: 400,
            message: "Bad Request",
        });
    }
};
exports.default = authenticate;
