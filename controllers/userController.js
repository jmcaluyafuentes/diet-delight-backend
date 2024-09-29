import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User.js'

const router = express.Router();

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
            username,
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

router.get('/all-users',  async (req, res) => {
    try {
        const users = await User.find();

        if (!users.length) {
            return res.status(404).json({ message: 'No users found'})
        }

        res.status(200).json(users.map((user) => user.username));
    } catch (error) {
        console.error('Error retrieving all users', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.delete('/all-users', async (req, res) => {
    try {
        const users = await User.find();

        if (!users.length) {
            return res.status(404).json({ message: 'No users found' });
        }

        await User.deleteMany();

        res.status(200).json({ message: 'All users successfully deleted'})
    } catch (error) {
        console.error('Error deleting the users', error);
        res.status(500).json({ message: 'Internal server error' })
    }
})

export default router;