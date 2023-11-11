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

// Like a Post
exports.likePost = async (req, res) => {
    try {
        const { post} = req.body;
       const user = req.user.id;
        const like = new Like({
            post ,
            user
        });
        const savedLike = await like.save();
        console.log(savedLike);

        // Update Post Collection basis on this
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $push: { likes: savedLike._id } },
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
