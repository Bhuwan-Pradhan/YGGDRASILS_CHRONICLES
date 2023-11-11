const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions


const { createPost, getAllPost, likePost} = require("../controllers/Post");
const { auth } = require("../middlewares/auth")

//Route for user signup


router.post("/newPost", auth, createPost)
router.get("/getAllPost", getAllPost)
router.get("/like", likePost)



module.exports = router