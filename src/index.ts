import express, { Application, Request, Response } from "express";
import Database from "./config/database";
// import Auth from "./config/auth";
import UserRouter from "./router/UserRouter";
import AuthRouter from "./router/AuthRouter";

import cors from "cors";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.auth();
    this.dbSync();
    this.plugins();
    this.routes();
  }

  protected auth(): void {
    // this.app.use(cors({ credentials: true }));
    this.app.use(cors({ origin: "http://localhost:8080" })); // { origin: "http://localhost:8000" }

    this.app.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected dbSync(): void {
    const db = new Database();
    db.sequelize?.sync();
    // db.sequelize?.sync({ force: true }).then(() => {
    //   // FOR DEVELOPMENT
    //   console.log("Drop and Resync Db");
    // });
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("Welcome to my homepage!");
    });
    this.app.use("/api/user", UserRouter);
    this.app.use("/api/auth", AuthRouter);
  }
}

const port: number = 8000;
const app = new App().app;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
