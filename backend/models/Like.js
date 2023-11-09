// Import Mongoose 
const mongoose = require('mongoose')


// Route Handler 
const likeSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "post" //reference to the post model
    },
	user: {
		type: mongoose.Schema.Types.ObjectId,
        ref: "user"
	},   
})


// Export 
module.exports = mongoose.model("like",likeSchema)