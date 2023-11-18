const Group = require("../models/GroupModel");

const User = require("../models/UserModel");





exports.createGroup = async (req, res) => {
	try {
		// Destructure fields from the request body
		const {
            name,
		} = req.body;
        const admin = req.user.id
		

		// Check if user already exists
		const existingGroup = await Group.findOne({ name });
		if (existingGroup) {
			return res.status(400).json({
				success: false,
				message: "Group already exists. Please change it  to continue.",
			});
		}



		const group = new Group({
			name,
            adminOrOwner: admin,
            

			image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
		});
		const savedGroup = await group.save();
		
		
		const updatedGroup = await Group.findByIdAndUpdate(savedGroup._id, { $push: { moderator: admin } },
            { new: true })
            .populate("adminOrOwner") //Populates the comment array with the comments document
            .exec();
		
            
		const updatedUser = await User.findByIdAndUpdate(admin, 
			{ $push: { groups: {group: updatedGroup._id, role: 'Admin' } }},
            { new: true })
            .populate("groups") //Populates the comment array with the comments document
            .exec();

      
		return res.status(200).json({
			success: true,
			updatedGroup,
			updatedUser,
			
			message: "Group Created successfully",
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "Group is not created. Please try again.",
		});
	}
};


exports.getAllGroup = async (req, res) => {
    try {
        const groupData = await Group.find({}).populate('adminOrOwner').sort({createdAt: -1}).exec();
        res.json({ success: true, data: groupData });
    }
    catch (err) {
        return res.status(400).json({
            error: "Error While getting Group",
            message: err.message
        })
    }
}

exports.addModerator = async (req, res) => {
	try{
		const {groupId, userId} = req.body;
		const group = await Group.findById(groupId);

		const existingModerator = group.moderator.find((memberId) => memberId.toString() === userId.toString());
		if (existingModerator) {
			return res.status(400).json({
				success: false,
				message: "User is already a Moderator of Group",
			});
		}
		const updatedUser = await User.findByIdAndUpdate(userId, 
			{ $push: { groups: {group: group._id, role: 'Moderator' } }},
            { new: true })
            .populate("groups") //Populates the comment array with the comments document
            .exec();
		console.log("pass 1");
		
		const updatedGroup = await Group.findByIdAndUpdate(groupId, 
			{ $push:{moderator: updatedUser._id}},
            { new: true })
            .populate("moderator") //Populates the comment array with the comments document
            .exec();
		
		console.log('pass 2');
	
		res.status(200).json({
			success: true,
			updatedGroup,
			updatedUser,
			
			message: "Member Added successfully",
		});
	}
	catch(err){
		return res.status(400).json({
            error: "Error While adding member",
            message: err.message
        })
	}
}

exports.addMember = async (req, res) => {
	try{
		const {groupId, userId} = req.body;
		const group = await Group.findById(groupId);
		const existingMember = group.followersOrMembers.find((memberId) => memberId.toString() === req.user.id.toString());
		if (existingMember) {
			return res.status(400).json({
				success: false,
				message: "User is already a Member of Group",
			});
		}

		const updatedUser = await User.findByIdAndUpdate(userId, 
			{ $push: { groups: {group: group._id, role: 'Member' } }},
            { new: true })
            .populate("groups") //Populates the comment array with the comments document
            .exec();
		console.log("pass 1");
		
		const updatedGroup = await Group.findByIdAndUpdate(groupId, 
			{ $push:{followersOrMembers: updatedUser._id}},
            { new: true })
            .populate("followersOrMembers") //Populates the comment array with the comments document
            .exec();
		
		console.log('pass 2');
	
		return res.status(200).json({
			success: true,
			updatedGroup,
			updatedUser,
			
			message: "Member Added successfully",
		});
	
		
	}
	catch(err){
		return res.status(400).json({
            error: "Error While adding member",
            message: err.message
        })
	}
}


exports.searchMember = async (req, res) => {
	try{
		const { query } = req.query;

    // Use a regex to perform a case-insensitive search
    const users = await User.find({  $or: [
        { firstName: { $regex: new RegExp(query, 'i') } },
        { lastName: { $regex: new RegExp(query, 'i') } },
      ], });

    res.status(200).json({ success: true, users });
	
		
	}
	catch(err){
		return res.status(400).json({
            error: "Error While searching member",
            message: err.message
        })
	}
}


