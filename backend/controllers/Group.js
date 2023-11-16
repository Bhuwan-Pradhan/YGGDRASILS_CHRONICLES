const Group = require("../models/GroupModel");




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




		const group = await Group.create({
			name,
            admin,
            role: 'Admin',

			image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
		});

		return res.status(200).json({
			success: true,
			group,
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