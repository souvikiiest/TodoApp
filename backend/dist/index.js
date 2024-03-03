"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const Db_Actions_1 = require("./Db_Actions");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//SIGNUP
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.userName;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const signinres = yield (0, Db_Actions_1.CheckUser)(userName);
    if (signinres) {
        res.json(false);
    }
    else {
        const createRes = yield (0, Db_Actions_1.createUser)(userName, firstName, lastName, password);
        if (createRes) {
            res.status(200).json(true);
        }
        else {
            res.status(200).json(false);
        }
    }
}));
//SIGNIN
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.userName;
    const password = req.body.password;
    const signinres = yield (0, Db_Actions_1.findUser)(userName, password);
    if (!signinres) {
        res.json(false);
    }
    else {
        const token = yield (0, authMiddleware_1.signJwt)(signinres.id);
        res.status(200).json({ response: signinres, token: token });
    }
}));
//FETCHING TODOS
app.get("/gettodo", authMiddleware_1.authUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const todoRes = yield (0, Db_Actions_1.GetTodo)(userId);
    res.json(todoRes);
}));
//ADDING TODOS
app.post("/addtodo", authMiddleware_1.authUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const title = req.body.title;
    const description = req.body.description;
    const addtodoRes = yield (0, Db_Actions_1.addTodo)(userId, title, description);
    if (addtodoRes) {
        res.json(addtodoRes);
    }
    else {
        res.json({ msg: "Todo was not added" });
    }
}));
//MARK TODO AS COMPLETE
app.post("/done", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Todoid = req.body.Todoid;
    const todoRes = yield (0, Db_Actions_1.DoneTodo)(Todoid);
    if (todoRes) {
        res.status(200).json({ success: true });
    }
    else {
        res.status(400).json({ success: false, message: "Update failed" });
    }
}));
//UPDATE TODOs
app.post("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Todoid = req.body.Todoid;
    const title = req.body.title;
    const description = req.body.description;
    const isdelete = req.body.isdelete;
    const todoRes = yield (0, Db_Actions_1.UpdateTodo)(Todoid, title, description, isdelete);
    if (todoRes) {
        res.status(200).json({ success: true });
    }
    else {
        res.status(400).json({ success: false, message: "Update failed" });
    }
}));
app.listen(3000);
