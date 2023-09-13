"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepo = void 0;
const User_1 = require("../model/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserRepo {
    async save(user) {
        try {
            await User_1.User.create({
                name: user.name,
                email: user.email,
                password: bcryptjs_1.default.hashSync(user.password, 8),
            });
        }
        catch (error) {
            throw new Error("Failed to create user.");
        }
    }
    async update(user) {
        try {
            const old_user = await User_1.User.findOne({
                where: {
                    id: user.id,
                },
            });
            if (!old_user) {
                throw new Error("User not found.");
            }
            old_user.name = user.name;
            old_user.email = user.email;
            old_user.password = user.password;
            await old_user.save();
        }
        catch (error) {
            throw new Error("Failed to create user.");
        }
    }
    async delete(userId) {
        try {
            const user_to_delete = await User_1.User.findOne({
                where: {
                    id: userId,
                },
            });
            if (!user_to_delete) {
                throw new Error("User not found.");
            }
            await user_to_delete.destroy();
        }
        catch (error) {
            throw new Error("Failed to create user.");
        }
    }
    async retrieveById(userId) {
        //TODO change name to get ot find
        try {
            const one_user = await User_1.User.findOne({
                where: {
                    id: userId,
                },
            });
            if (!one_user) {
                throw new Error("User not found.");
            }
            return one_user;
        }
        catch (error) {
            throw new Error("Failed to fetch user.");
        }
    }
    async retrieveByEmail(userEmail) {
        //TODO change name to get ot find
        try {
            const one_user = await User_1.User.findOne({
                where: {
                    email: userEmail,
                },
            });
            if (!one_user) {
                throw new Error("User not found!");
            }
            return one_user;
        }
        catch (error) {
            throw new Error("Failed to fetch user!");
        }
    }
    async retrieveAll() {
        try {
            return await User_1.User.findAll();
        }
        catch (error) {
            throw new Error("Failed to create user!");
        }
    }
}
exports.UserRepo = UserRepo;
