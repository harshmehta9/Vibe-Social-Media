import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

//Register User 
export const register = async (req, res) => {
    try {
        const {firstName, lastName, email, password, picturePath, friends, location, occupation} = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewProfile: 0,
            impresssion: 0,
        })

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// login 

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "User not found. Please Register"});
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Your password is not correct"});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: "24h" });
        delete user.password;
        res.status(200).json({token, user}) 
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}