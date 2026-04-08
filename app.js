import express from 'express';
import {PORT} from './config/env.js';
import usersRouter from './src/routes/users.route.js';
import subscriptionsRouter from './src/routes/subscriptions.route.js';  
import authRouter from './src/routes/auth.route.js';
import connectDB from './db/mongodb.js';
import cookieParser from 'cookie-parser';
import errorMiddleware from './src/middlewares/error.middleware.js';    
import arcjetMiddleware from './src/middlewares/arcjet.js';


const app = express();



app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(arcjetMiddleware);


app.use('/api/v1/users' , usersRouter);
app.use('/api/v1/subscriptions' , subscriptionsRouter);
app.use('/api/v1/auth' , authRouter);

app.use(errorMiddleware);

app.listen(PORT , async () => {
    console.log(`Server is running on the local host http://localhost:${PORT}`);

    await connectDB();
})

export default app;