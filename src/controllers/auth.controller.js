import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/users.model.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY, JWT_EXPIRES_IN } from '../../config/env.js';

export const signup = async (req ,next , res) => {
    const session = await mongoose.startSession();     
    session.startTransaction();

    try {
        const { username, email, password } = req.body;
        const exitingUser = await User.findOne({ email });
        if (exitingUser) {
            throw new Error('User already exists with this email');
            error.statusCode = 400;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create([{ username, email, password: hashedPassword }], { session });


        const token = jwt.sign({ id: newUser[0]._id }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
        await session.commitTransaction();

        session.endSession();

        res.status(201).json({
            success: true,
            token,
            user: {
                id: newUser[0]._id,
                username: newUser[0].username,
                email: newUser[0].email
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};
export const signin = async (req ,next , res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }  
        const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });     
    } catch (error) {
        next(error);
    }
};
export const signout = async (req ,next , res) => {};