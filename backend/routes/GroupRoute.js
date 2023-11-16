const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions


const { createGroup} = require("../controllers/Group");
const { auth } = require("../middlewares/auth")

//Route for user signup


router.post("/createGroup", auth, createGroup);

module.exports = router;
