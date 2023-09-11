// console.log("hello from index ts");

import express, { Application, Request, Response } from "express";
import Database from "./config/database";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.dbSync();
    this.routes();
  }

  protected dbSync(): void {
    const db = new Database();
    db.sequelize?.sync();
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("Welcome to my homepage!");
    });
  }
}

const port: number = 8000;
const app = new App().app;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
