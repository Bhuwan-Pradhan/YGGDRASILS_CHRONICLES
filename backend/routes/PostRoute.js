const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions


const { createPost, getAllPost, likePost, createComment,  getCommentById, getPostById, deletePost, dislikePost, repost, updatePost} = require("../controllers/Post");
const { auth } = require("../middlewares/auth");

//Route for user signup


router.post("/newPost", auth, createPost);
router.get("/getAllPost", getAllPost);
router.post("/like", auth, likePost);
router.post("/dislike", auth, dislikePost);
router.post("/comment", auth, createComment);
router.post("/getComment", getCommentById);
router.post("/getPost",auth, getPostById);
router.post("/delete", auth, deletePost);
router.post("/repost", auth, repost);
router.post("/update", auth, updatePost);





module.exports = router