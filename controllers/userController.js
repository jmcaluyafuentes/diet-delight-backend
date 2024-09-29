import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User.js'

const router = express.Router();

router.post("/add-user", async(req, res) => {
    const { username, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        
        const newUser = new User({
            username: username,
            password: password
        })

        await newUser.save();

        res.status(201).json({ 
            message: 'User created successfully',
            username: newUser.username
        });
    } catch (error) {
        console.log('Error adding user: ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;