"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    // TODO fix validations so it corresponds to user
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, { message: "Name must be 2 or more characters." }),
        email: zod_1.z.string().email({ message: "Invalid email address." }),
        password: zod_1.z
            .string()
            .min(6, { message: "Password must be greater than 6 characters." }),
    }),
});
exports.updateUserSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    body: zod_1.z
        .object({
        name: zod_1.z
            .string()
            .min(2, { message: "Name must be 2 or more characters." }),
        email: zod_1.z.string().email({ message: "Invalid email address." }),
        password: zod_1.z
            .string()
            .min(6, { message: "Password must be greater than 6 characters." }),
    })
        .partial(),
});
