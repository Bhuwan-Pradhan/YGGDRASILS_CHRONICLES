const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions
const {
    signup,
    login,
    searchMember,
    follow,
    unfollow,
    getUserById
} = require("../controllers/Auth");

const {auth} = require("../middlewares/auth");


//Route for user signup
router.post("/signup", signup);

router.post("/login", login);

router.get("/searchMember", searchMember);
router.post("/follow",auth, follow);
router.post("/unfollow", auth, unfollow);
router.post("/getUserDetails", getUserById);



module.exports = router