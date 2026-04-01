import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , 'Name is required'],
        minLength : 2,
        maxLength : 50,
        trim : true
    },
    emai : {
        type : String ,
        required : [true  , 'Email is required'],
        minLength : 9,
        maxLength : 240,
        unique : true,
        lowercase : true,
        match : [/\S+@\S+\.\S+/, 'Please fill the valid email']
    },
    password : {
        type : String ,
        required : [true  , 'password is required'],
        minLength : 9,
        maxLength : 10
    }

}, { timestamps : true});

const User = mongoose.model('User' , userSchema);

export default User;