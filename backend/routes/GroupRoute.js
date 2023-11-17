const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions


const { createGroup, getAllGroup} = require("../controllers/Group");
const { auth } = require("../middlewares/auth")

//Route for user signup


router.post("/createGroup", auth, createGroup);
router.get("/getAllGroup", getAllGroup);

module.exports = router;
