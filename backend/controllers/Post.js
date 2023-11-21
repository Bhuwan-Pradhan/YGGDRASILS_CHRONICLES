const Post = require("../models/PostModel");
const User = require("../models/UserModel");

const Comment = require("../models/CommentModel");

const { uploadMediaToCloudinary } = require('./FileUploader');
const { ObjectId } = require('mongodb');


exports.createPost = async (req, res) => {
    try {
      const { title, tagUser } = req.body;
      const user = await User.findById(req.user.id);
 
      const displayFile = req.files.displayFile;
      const media_type = req.files.displayFile.mimetype;
      console.log(media_type)
  console.log("pass1")
  const file = await uploadMediaToCloudinary(displayFile, process.env.FOLDER_NAME, media_type);
  console.log("pass2")
      const post = new Post({
        user: user._id,
        userImage: user.image,
        author: user.firstName + " " + user.lastName,
        title,
        body: file.secure_url,
        tagUser: JSON.parse(tagUser).map((tagUserId) =>
          new ObjectId(tagUserId)
        ),
        media: media_type,
      });
  
      const savedPost = await post.save();
  
      const updatedUser = await User.findByIdAndUpdate(
        user,
        { $push: { post: savedPost._id } },
        { new: true }
      )
        .populate("post")
        .exec();
  
      res.json({
        user: updatedUser,
        post: savedPost,
      });
    } catch (err) {
      return res.status(400).json({
        error: "Error While Creating Post",
        message: err.message,
      });
    }
  };

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


exports.deletePost = async (req, res) => {

    const {postId} =req.body;

    const post = await Post.findById(postId);

    if (!post) {
        console.log("Post not found");
        return;
      }

  // Remove the post from the user's post array
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { post: postId } },
      { new: true }
    );
    console.log("User updated:", user);
  } catch (error) {
    console.error("Error updating user:", error);
  }

  // Remove the post from the post collection
  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    console.log("Deleted post:", deletedPost);
    res.json({ success: true, message: "Deleted Post successfully"  });
  } catch (error) {
    console.error("Error deleting post:", error);
  }

}



  
