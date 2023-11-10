const mongoose = require("mongoose");

// Define the post schema
const postSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
        ref: "user"
	},
    auther:{
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body : {
        type : String,
        required : true
    } ,
    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "like",
    }],
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "comment",
    }],
    tagUser : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
    }],
});

// Export the post model
module.exports = mongoose.model("post", postSchema);
