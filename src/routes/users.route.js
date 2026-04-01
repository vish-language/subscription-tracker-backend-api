import { Router } from "express";

const usersRouter = Router();


usersRouter.get('/' , (req , res) => {
    res.send("Get all users");
})

export default usersRouter;