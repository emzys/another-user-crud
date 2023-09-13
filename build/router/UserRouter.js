"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("./base/BaseRouter"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const validate_1 = __importDefault(require("../helper/validate"));
// import checkDuplicateEmail from "../helper/verifySignUp";
const UserSchema_1 = require("../schema/UserSchema");
class UserRoutes extends BaseRouter_1.default {
    routes() {
        this.router.post("", (0, validate_1.default)(UserSchema_1.createUserSchema), UserController_1.default.create);
        this.router.patch("/:id", (0, validate_1.default)(UserSchema_1.updateUserSchema), UserController_1.default.update);
        this.router.delete("/:id", UserController_1.default.delete);
        this.router.get("", UserController_1.default.findAll);
        this.router.get("/findByEmail/email=:email", UserController_1.default.findByEmail);
        this.router.get("/:id", UserController_1.default.findById);
    }
}
exports.default = new UserRoutes().router;
