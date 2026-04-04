import { Router } from "express";
import { getUser , getUsers } from "../controllers/users.controller.js";
import authorize from "../middlewares/auth.middlewares.js";

const usersRouter = Router();


usersRouter.get('/' , getUsers);
usersRouter.get('/:id' , authorize , getUser);

export default usersRouter;