const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions


const { createGroup, getAllGroup, addModerator, addMember, searchMember, getGroupPost, inviteMember, requestToJoinGroup, acceptJoinRequest } = require("../controllers/Group");
const { auth, isAdmin, isModerator } = require("../middlewares/auth")

//Route for user signup


router.post("/createGroup", auth, createGroup);
router.get("/getAllGroup", getAllGroup);
router.post("/addModerator", auth, isAdmin, addModerator);
router.post("/addMember", auth, isModerator, addMember);
router.post("/allPost", getGroupPost);
router.post("/invite",auth, isModerator, inviteMember);
router.post("/request",auth, requestToJoinGroup);
router.post("/accept", acceptJoinRequest);


module.exports = router;
