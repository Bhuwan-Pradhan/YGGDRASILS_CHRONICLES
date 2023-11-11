// Import the Mongoose library
const mongoose = require("mongoose");

// Define the group schema using the Mongoose Schema constructor
const groupSchema = new mongoose.Schema(
	{
		// Define the name field with type String, required, and trimmed
		name: {
            type: String,
            required: true,
            trim: true,
        },
	
		admin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},

		
		member: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "user",
			},
		],
        role: {
			type: String,
			enum: ["Admin", "Moderator", "Member"],
			required: true,
		},
        followers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "user",
			},
		],

        post: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "post",
			},
		],
        repost: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "post",
			},
		],
		image: {
			type: String,
			required: true,
		},
		

	
	},
	
);

// Export the Mongoose model for the group schema, using the name "group"
module.exports = mongoose.model("group", groupSchema);