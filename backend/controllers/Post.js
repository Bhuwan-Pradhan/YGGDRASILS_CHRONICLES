const Post = require("../models/PostModel");
const User = require("../models/UserModel");

const Comment = require("../models/CommentModel");

const { uploadImageToCloudinary } = require('./FileUploader');
const { ObjectId } = require('mongodb');
exports.createPost = async (req, res) => {
    try {
        const { title } = req.body;


        const user = await User.findById(req.user.id);


        const displayFile = req.files.displayFile
      console.log(displayFile)
     
        const file = await uploadImageToCloudinary(
            displayFile,
            process.env.FOLDER_NAME,
            1000,
            1000
          )
      
            console.log(file.secure_url);

        const post = new Post({ user: user._id, userImage: user.image, author: user.firstName + " " + user.lastName, title, body: file.secure_url });
        const savedPost = await post.save();


        const updatedUser = await User.findByIdAndUpdate(user, { $push: { post: savedPost._id } },
            { new: true })
            .populate("post") //Populates the comment array with the comments document
            .exec();

        res.json({
            post: updatedUser,
        });

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
        const postData = await Post.find({}).populate('user').sort({createdAt: -1}).exec();
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
   
        const commentData = await Comment.find({post: post}).populate('user').sort({createdAt: -1}).exec();
        res.json({ success: true, data: commentData,  });
    }
    catch (err) {
        return res.status(400).json({
            error: "Error While getting Comments",
            message: err.message
        })
    }
}


exports.getPostById = async (req, res) => {
    try {
        const id=req.body;
        const userId = new ObjectId(id);
   
        const postData = await Post.find({user: userId}).populate('user').sort({createdAt: -1}).exec();
        res.json({ success: true, data: postData,  });
    }
    catch (err) {
        return res.status(400).json({
            error: "Error While getting Posts",
            message: err.message
        })
    }
}




  
