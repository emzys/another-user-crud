import { User } from "../model/User";
import bcrypt from "bcryptjs";

interface IUserRepo {
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(userId: number): Promise<void>;
  retrieveById(userId: number): Promise<User>;
  retrieveByEmail(userEmail: string): Promise<User>;
  retrieveAll(): Promise<User[]>;
}

export class UserRepo implements IUserRepo {
  async save(user: User): Promise<void> {
    try {
      await User.create({
        name: user.name,
        email: user.email,
        password: bcrypt.hashSync(user.password, 8),
      });
    } catch (error) {
      throw new Error("Failed to create user.");
    }
  }

  async update(user: User): Promise<void> {
    try {
      const old_user = await User.findOne({
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
    } catch (error) {
      throw new Error("Failed to create user.");
    }
  }

  async delete(userId: number): Promise<void> {
    try {
      const user_to_delete = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (!user_to_delete) {
        throw new Error("User not found.");
      }

      await user_to_delete.destroy();
    } catch (error) {
      throw new Error("Failed to create user.");
    }
  }

  async retrieveById(userId: number): Promise<User> {
    //TODO change name to get ot find
    try {
      const one_user = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (!one_user) {
        throw new Error("User not found.");
      }
      return one_user;
    } catch (error) {
      throw new Error("Failed to fetch user.");
    }
  }

  async retrieveByEmail(userEmail: string): Promise<User> {
    //TODO change name to get ot find
    try {
      const one_user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      if (!one_user) {
        throw new Error("User not found!");
      }
      return one_user;
    } catch (error) {
      throw new Error("Failed to fetch user!");
    }
  }

  async retrieveAll(): Promise<User[]> {
    try {
      return await User.findAll();
    } catch (error) {
      throw new Error("Failed to create user!");
    }
  }
}
