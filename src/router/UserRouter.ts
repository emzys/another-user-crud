import BaseRoutes from "./base/BaseRouter";
import UserController from "../controller/UserController";
import validate from "../helper/validate";
// import checkDuplicateEmail from "../helper/verifySignUp";
import { createUserSchema, updateUserSchema } from "../schema/UserSchema";

class UserRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("", validate(createUserSchema), UserController.create);
    this.router.patch(
      "/:id",
      validate(updateUserSchema),
      UserController.update
    );
    this.router.delete("/:id", UserController.delete);
    this.router.get("", UserController.findAll);
    this.router.get("/findByEmail/email=:email", UserController.findByEmail);
    this.router.get("/:id", UserController.findById);
  }
}

export default new UserRoutes().router;
