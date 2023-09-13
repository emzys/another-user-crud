"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../model/User");
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        const old_user = await User_1.User.findOne({ where: { email: req.body.email } });
        if (old_user) {
            throw new Error("User with this email aleady exists.");
        }
        return next();
    }
    catch (err) {
        res.status(400).json({
            status: 400,
            message: "Bad Request",
        });
    }
};
exports.default = validate;
