const Group = require("../models/GroupModel");

const User = require("../models/UserModel");
const Post = require("../models/PostModel");
const { ObjectId } = require('mongodb');




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
			{ $push: { groups: { group: updatedGroup._id, role: 'Admin' } } },
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
		const groupData = await Group.find({}).populate('adminOrOwner').sort({ createdAt: -1 }).exec();
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
	try {
		const { groupId, moderators } = req.body;
		const group = await Group.findById(groupId);
		const userIds = JSON.parse(moderators).map(userId => userId);
		

		const updatedUser = await User.updateMany(
			{ _id: { $in: userIds } },
			{ $addToSet: { groups: { group: group._id, role: 'Moderator' } } },
			{ new: true })
			.populate("groups") //Populates the comment array with the comments document
			.exec();
		

		const updatedGroup = await Group.findByIdAndUpdate(groupId,
			{
				$addToSet: {
					moderator: JSON.parse(moderators).map(userId => new ObjectId(userId))
				  }
			},
			{ new: true })
			.populate("moderator") //Populates the comment array with the comments document
			.exec();

		

		return res.status(200).json({
			success: true,
			updatedGroup,
			updatedUser,

			message: "Moderators Added successfully",
		});


	}
	catch (err) {
		return res.status(400).json({
			error: "Error While adding moderators",
			message: err.message
		})
	}
}

exports.addMember = async (req, res) => {
	try {
		const { groupId, members } = req.body;
		const group = await Group.findById(groupId);
		const userIds = JSON.parse(members).map(userId => userId);
		

		const updatedUser = await User.updateMany(
			{ _id: { $in: userIds } },
			{ $addToSet: { groups: { group: group._id, role: 'Member' } } },
			{ new: true })
			.populate("groups") //Populates the comment array with the comments document
			.exec();
		

		const updatedGroup = await Group.findByIdAndUpdate(groupId,
			{
				$addToSet: {
					followersOrMembers: JSON.parse(members).map(userId => new ObjectId(userId))
				  }
			},
			{ new: true })
			.populate("followersOrMembers") //Populates the comment array with the comments document
			.exec();

		

		return res.status(200).json({
			success: true,
			updatedGroup,
			updatedUser,

			message: "Members Added successfully",
		});


	}
	catch (err) {
		return res.status(400).json({
			error: "Error While adding members",
			message: err.message
		})
	}
}





exports.getGroupPost = async (req, res) => {
    try {
		const id = req.body;
		const groupId = new ObjectId(id);

        const postData = await Post.find({groupId: groupId}).populate('user').sort({createdAt: -1}).exec();

        res.json({ success: true, data: postData });
    }
    catch (err) {
        return res.status(400).json({
            error: "Error While getting Post",
            message: err.message
        })
    }
}


