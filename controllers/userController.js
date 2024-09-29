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
        console.error('Error adding user: ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete("/delete-user", async (req, res) => {
    const { username } = req.body;
    
    try {
        const existingUSer = await User.findOne({ username });
        
        if (existingUSer) {
            await User.deleteOne({ username });
            return res.status(200).json({ message: 'User deleted successfully' });
        }

        res.status(404).json({ message: 'User not found' });
    } catch (error) {
        console.error('Error deleting user', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' })
        } 

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            username: username,
            password: hashedPassword
        })

        await newUser.save();

        res.status(200).json({
            message: 'User registered successfully',
            username: newUser.username
        })
    } catch (error) {
        console.error('Failed to registered a user')
        res.status(500).json({ message: 'Internal server error' })
    }
})

export default router;