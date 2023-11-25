const jwt = require("jsonwebtoken");
const Group = require("../models/GroupModel");
require("dotenv").config();
const { ObjectId } = require('mongodb');


//auth
exports.auth = async (req, res, next) => {
    try {

        console.log("BEFORE ToKEN EXTRACTION");
        //extract token
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorization").replace("Bearer ", "");
        console.log("AFTER ToKEN EXTRACTION");
   console.log("dsdsdsd");

        //if token missing, then return response
        if (!token) {
            console.log("token miss");
            return res.status(401).json({
                success: false,
                message: 'TOken is missing',
            });
        }

        //verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch (err) {
            //verification - issue
            return res.status(401).json({
                success: false,
                message: 'token is invalid',
            });
        }
        next();
    }
    catch (error) {
        console.log(error.message);
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while validating the token',
        });
    }
}

exports.isAdmin = async (req, res, next) => {
    const { groupId } = req.body;
  
    try {
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ success: false, message: 'Group not found.' });
      }
  
      
      const userId = new ObjectId(req.user.id);
      
      if (group.adminOrOwner.equals(userId)) {
        // User is a Admin, proceed to the next middleware or route handler
       
        next();
      } else {
        // User is not a member, send a forbidden response
        res.status(403).json({ success: false, message: 'Permission denied.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
  };

exports.isModerator = async (req, res, next) => {
    const groupId  = req.body.id;
   
  
    try {
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ success: false, message: 'Group not found.' });
      }
      
      
      const userRole = group.moderator.find((moderatorId) => moderatorId.toString() === req.user.id.toString());
      
      if (userRole) {
        // User is an admin, proceed to the next middleware or route handler
        
        next();
      } else {
        // User is not an admin, send a forbidden response
        res.status(403).json({ success: false, message: 'Permission denied.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
  };
  
  exports.isMember = async (req, res, next) => {
    const { groupId } = req.body;
  
    try {
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ success: false, message: 'Group not found.' });
      }
  
      const userRole = group.followersOrMembers.find((member) => member.equals(req.user._id));
      if (userRole) {
        // User is a member, proceed to the next middleware or route handler
        next();
      } else {
        // User is not a member, send a forbidden response
        res.status(403).json({ success: false, message: 'Permission denied.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
  };
  
 