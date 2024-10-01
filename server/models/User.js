import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        min: 2, 
        max: 50
    },
    lastName:{
        type: String,
        require: true, 
        min: 2,
        max: 50
    },
    email:{
        type: String,
        require: true,
        unique: true,
        min: 2,
        max: 60,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    password:{
        type: String,
        require: true,
        min: 8,
    },
    picturePath: {
        type: String,
        default:""
    },
    friends: {
        type: Array,
        default: []
    },
    location:{
        type: String, 
    },
    occupation: String, 
    viewProfile: {
        type: Number
    },
    impresssion: Number
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;