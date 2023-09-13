"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("./base/BaseRouter"));
const AuthController_1 = __importDefault(require("../controller/AuthController"));
const validate_1 = __importDefault(require("../helper/validate"));
const UserSchema_1 = require("../schema/UserSchema");
class AuthRoutes extends BaseRouter_1.default {
    routes() {
        this.router.post("/signup", (0, validate_1.default)(UserSchema_1.createUserSchema), AuthController_1.default.signup);
        this.router.post("/signin", AuthController_1.default.signin);
    }
}
exports.default = new AuthRoutes().router;
