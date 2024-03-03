import cors from "cors";
import express from "express";
import {
  addTodo,
  CheckUser,
  createUser,
  DoneTodo,
  findUser,
  GetTodo,
  UpdateTodo,
} from "./Db_Actions";
import { authUser, signJwt } from "./middlewares/authMiddleware";
const app = express();
app.use(express.json());

app.use(cors());
//SIGNUP
app.post("/signup", async (req: express.Request, res: express.Response) => {
  const userName: string = req.body.userName;
  const firstName: string = req.body.firstName;
  const lastName: string = req.body.lastName;
  const password: string = req.body.password;
  const signinres = await CheckUser(userName);
  if (signinres) {
    res.json(false);
  } else {
    const createRes = await createUser(userName, firstName, lastName, password);
    if (createRes) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  }
});

//SIGNIN
app.post("/signin", async (req: express.Request, res: express.Response) => {
  const userName: string = req.body.userName;
  const password: string = req.body.password;
  const signinres = await findUser(userName, password);
  if (!signinres) {
    res.json(false);
  } else {
    const token = await signJwt(signinres.id);
    res.status(200).json({ response: signinres, token: token });
  }
});
//FETCHING TODOS
app.get(
  "/gettodo",
  authUser,
  async (req: express.Request, res: express.Response) => {
    const userId: number = req.userId;
    const todoRes = await GetTodo(userId);
    res.json(todoRes);
  }
);

//ADDING TODOS
app.post(
  "/addtodo",
  authUser,
  async (req: express.Request, res: express.Response) => {
    const userId: number = req.userId;
    const title: string = req.body.title;
    const description: string = req.body.description;
    const addtodoRes = await addTodo(userId, title, description);
    if (addtodoRes) {
      res.json(addtodoRes);
    } else {
      res.json({ msg: "Todo was not added" });
    }
  }
);
//MARK TODO AS COMPLETE
app.post("/done", async (req: express.Request, res: express.Response) => {
  const Todoid: number = req.body.Todoid;
  const todoRes = await DoneTodo(Todoid);
  if (todoRes) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Update failed" });
  }
});
//UPDATE TODOs
app.post("/update", async (req: express.Request, res: express.Response) => {
  const Todoid: number = req.body.Todoid;
  const title: string = req.body.title;
  const description: string = req.body.description;
  const isdelete: boolean = req.body.isdelete;
  const todoRes = await UpdateTodo(Todoid, title, description, isdelete);
  if (todoRes) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Update failed" });
  }
});

app.listen(3000);
