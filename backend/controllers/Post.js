const Post = require("../models/PostModel");
const User = require("../models/UserModel");
const Like = require("../models/LikeModel");
const Comment = require("../models/CommentModel");
const mongoose = require("mongoose");

exports.createPost = async (req, res) => {
    try {
        const { title, body, } = req.body;


        const user = await User.findById(req.user.id);

        const post = new Post({ user: user._id, userImage: user.image, author: user.firstName + " " + user.lastName, title, body });
        const savedPost = await post.save();

        res.json({
            post: savedPost
        })
    }
    catch (err) {
        return res.status(400).json({
            error: "Error While Creating Post",
            message: err.message
        })
    }
}


exports.getAllPost = async (req, res) => {
    try {
        const postData = await Post.find({}).populate('user').exec();
        res.json({ success: true, data: postData });
    }
    catch (err) {
        return res.status(400).json({
            error: "Error While getting Post",
            message: err.message
        })
    }
}

// Like a Post
exports.likePost = async (req, res) => {
    try {
        const { post } = req.body;
        const user = req.user.id;




     

        // Update Post Collection basis on this

        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $push: { likes: user } },
            { new: true }
        )
            .populate("likes")
            .exec();

        res.json({
            post: updatedPost,
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            error: "Error While Like Post",
        });
    }
};


exports.createComment = async (req, res) => {
    try {
        // fetch data from request body 
        const { post, body } = req.body;
        const user = req.user.id
        // create comment object
        const comment = new Comment({
            post, user, body
        });

        // save the new comment object into the db 
        const savedComment = await comment.save();

        // Find the Post By Id and the new comment to its comment array 
        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { comments: savedComment._id } },
            { new: true })
            .populate("comments") //Populates the comment array with the comments document
            .exec();

        res.json({
            post: updatedPost,
        });
    }
    catch (err) {
        return res.status(500).json({
            error: "Error while creating comment",

        })
    }
}

exports.getCommentById = async (req, res) => {
    try {
        const {post} =req.body;
   
        const commentData = await Comment.find({post: post}).populate('user').exec();
        res.json({ success: true, data: commentData, message: 'mil gaya' });
    }
    catch (err) {
        return res.status(400).json({
            error: "Error While getting Comments",
            message: err.message
        })
    }
}
