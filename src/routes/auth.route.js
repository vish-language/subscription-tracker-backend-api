import  { Router } from "express";

const authRouter = Router();

authRouter.post('/' , (req , res) => {
    res.send("Register route");
})

export default authRouter;