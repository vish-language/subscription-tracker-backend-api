import { Router } from "express";
import { signup } from "../controllers/auth.controller.js";
import {signin} from "../controllers/auth.controller.js";
import {signout} from "../controllers/auth.controller.js"; 

const authRouter = Router();

authRouter.post('/sign-up' , signup)  

authRouter.post('/sign-in' , signin)  

authRouter.post('/sign-out' , signout)  

export default authRouter;