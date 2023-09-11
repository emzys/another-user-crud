import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
dotenv.config();

class Database {
  public sequelize: Sequelize | undefined;

  private POSTGRES_DB = process.env.POSTGRES_DB as string;
  // private POSTGRES_USER = process.env.POSTGRES_USER as string;
  private POSTGRES_USER = process.env.POSTGRES_USER as unknown as string;
  private POSTGRES_PASSWORD = process.env
    .POSTGRES_PASSWORD as unknown as string;
  private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
  private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;

  constructor() {
    this.connectPostgreSQL();
  }

  private async connectPostgreSQL() {
    this.sequelize = new Sequelize({
      database: this.POSTGRES_DB,
      username: this.POSTGRES_USER,
      password: this.POSTGRES_PASSWORD,
      host: this.POSTGRES_HOST,
      port: this.POSTGRES_PORT,
      dialect: "postgres",
    });

    // try {
    //   await this.sequelize.authenticate();
    //   console.log("Connection has been established successfully.");
    // } catch (error) {
    //   console.error("Unable to connect to the database :>>", error);
    // }

    await this.sequelize
      .authenticate()
      .then(() => {
        console.log("Connected to PostgreSQL");
      })
      .catch((err) => {
        console.log("PortgreSQL database connection error :>> ", err);
      });
  }
}

export default Database;
