const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions


const { createGroup, getAllGroup, addModerator, addMember,  getGroupPost, inviteMember, requestToJoinGroup, acceptInviteRequest, declineInviteRequest, acceptJoinRequest, declineJoinRequest, getGroupById } = require("../controllers/Group");
const { auth, isAdmin, isModerator } = require("../middlewares/auth")

//Route for user signup


router.post("/createGroup", auth, createGroup);
router.get("/getAllGroup", getAllGroup);
router.post("/addModerator", auth, isAdmin, addModerator);
router.post("/addMember", auth,  addMember);
router.post("/allPost", getGroupPost);
router.post("/invite",auth,  inviteMember);
router.post("/request",auth, requestToJoinGroup);
router.post("/acceptInvite", acceptInviteRequest);
router.post("/declineInvite", declineInviteRequest);
router.post("/acceptJoin", auth, isModerator, acceptJoinRequest);
router.post("/declineJoin", auth, isModerator, declineJoinRequest);
router.post("/getGroup", getGroupById);


module.exports = router;
