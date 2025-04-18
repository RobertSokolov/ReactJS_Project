import express from 'express'
import  bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import User from '../models/User';

const router = express.Router();


// Register 

router.post('/register', async (req, res): Promise<any> => {

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await user.save();

        const token = jwt.sign({ id: user._id }, Buffer.from(process.env.JWT_Secret ?? "null"), { expiresIn: '6h' });

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,

            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/login', async (req, res): Promise<any> => {

    const { username,password} = req.body;

    const user = await User.findOne({username});

    if(!user){
        return res.status(400).json({message: "Invalid Credentials"});

    }


    const passwordCheck = await bcrypt.compare(password, user.password) 
    if(!passwordCheck) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id:user._id}, Buffer.from(process.env.JWT_Secret ?? "null"), {expiresIn: "6h"});

    res.json({
        token,
        user:{
            id:user._id,
            username:user.username,
        }
    });

});

export default router