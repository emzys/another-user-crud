import BaseRoutes from "./base/BaseRouter";
import AuthController from "../controller/AuthController";
import validate from "../helper/validate";
import { createUserSchema } from "../schema/UserSchema";

class AuthRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post(
      "/signup",
      validate(createUserSchema),
      AuthController.signup
    );
    this.router.post("/signin", AuthController.signin);
  }
}

export default new AuthRoutes().router;
