import { Router } from "express";


const subscriptionsRouter = Router();

subscriptionsRouter.get('/' , (req , res) => {
    res.send("Get all subscriptions");
})  

export default subscriptionsRouter;