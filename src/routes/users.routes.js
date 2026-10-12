import 'dotenv/config';
import express from 'express';
import { prisma } from "../lib/prisma.js";

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(401).json({
            message: 'All fields must be filled!'
        });
    };

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        return res.status(401).json({
            message: 'User already exist!'
        });
    };

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    });

    res.status(201).json({
        message: 'Register successfully!',
        data: newUser
    });
});

export default userRouter;