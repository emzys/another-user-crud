"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
// import Auth from "./config/auth";
const UserRouter_1 = __importDefault(require("./router/UserRouter"));
const AuthRouter_1 = __importDefault(require("./router/AuthRouter"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.auth();
        this.dbSync();
        this.plugins();
        this.routes();
    }
    auth() {
        // this.app.use(cors({ credentials: true }));
        this.app.use((0, cors_1.default)({ origin: "http://localhost:8080" })); // { origin: "http://localhost:8000" }
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
            next();
        });
    }
    plugins() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    dbSync() {
        const db = new database_1.default();
        db.sequelize?.sync();
        // db.sequelize?.sync({ force: true }).then(() => {
        //   // FOR DEVELOPMENT
        //   console.log("Drop and Resync Db");
        // });
    }
    routes() {
        this.app.route("/").get((req, res) => {
            res.send("Welcome to my homepage!");
        });
        this.app.use("/api/user", UserRouter_1.default);
        this.app.use("/api/auth", AuthRouter_1.default);
    }
}
const port = 8000;
const app = new App().app;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
