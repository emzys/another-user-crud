"use strict";
// console.log("hello from index ts");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.routes();
    }
    routes() {
        this.app.route("/").get((req, res) => {
            res.send("homepage");
        });
    }
}
const port = 8000;
const app = new App().app;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
