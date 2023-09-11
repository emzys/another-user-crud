// console.log("hello from index ts");

import express, { Application, Request, Response } from "express";

class App {
  public app: Application;

  constructor() {
    this.app = express();
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("homepage");
    });
  }
}
