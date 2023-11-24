const mongoose = require("mongoose");

// Define the post schema
const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    repost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "group"
    },
    author: {
        type: String,
        required: true,
    },
    userImage: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    likes: [{
        type: String,
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
    }],
    tagUser: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    media: {
        type: String
    }
},
{ timestamps: true }
);

// Export the post model
module.exports = mongoose.model("post", postSchema);
