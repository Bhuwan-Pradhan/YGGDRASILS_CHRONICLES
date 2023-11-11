// Import Mongoose 
const mongoose = require('mongoose')


// Route Handler 
const commentSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "post" //reference to the post model
    },
	user: {
		type: mongoose.Schema.Types.ObjectId,
        ref: "user"
	},     
    body: {
        type:String,
        required:true,
    }    
})


// Export 
module.exports = mongoose.model("comment",commentSchema)