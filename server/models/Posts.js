import mongoose from "mongoose";
import User from "./User.js";
const postSchema = mongoose.Schema({
    userId: {
        type: String,
        ref: User,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    location: String,
    description: String, 
    picturePath: String, 
    userPicturePath: String, 
    likes:{
        type: Map, 
        of: Boolean,
    },
    comments: {
        type: Array, 
        default: [],
    }
}, {timestamps: true} )


const Post = mongoose.model("Post", postSchema);

export default Post;