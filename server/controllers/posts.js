import Post from "../models/Posts.js";
import User from "../models/User.js";

export const createPost = async(req, res) => {
    try {
        const {userId, description, picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId, 
            firstName: user.firstName, 
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })

        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getFeedPosts = async(req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUserPosts = async(req, res) => {
    try {
        const {userId} = req.params;
        const userPosts = await Post.find({userId: userId});
        res.status(200).json(userPosts);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const likePost = async(req, res) => {
    try {
        const {id} = req.params; // particular post for likes;
        const {userId } = req.params; // fetching user;

        const post = await Post.findById(id);
        const user = await User.findById(userId)
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        );

        res.status(200).json(updatedPost);



    } catch (error) {
        res.status(500).json({message: error.message});
    }
}