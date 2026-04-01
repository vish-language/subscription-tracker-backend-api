import mongoose from "mongoose";

import { mongoDBUrl } from "../config/env.js";

if(!mongoDBUrl){        
    throw new Error("MongoDB URL is not defined in environment variables.");
}

const connectDB = async () => {
    try {
        await mongoose.connect(mongoDBUrl, {});
        console.log("Connected to MongoDB successfully.");
    } catch (error) {           
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }   
}

export default connectDB;