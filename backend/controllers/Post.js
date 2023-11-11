const Post = require("../models/PostModel");
const User = require("../models/UserModel");
const Like = require("../models/LikeModel");

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


