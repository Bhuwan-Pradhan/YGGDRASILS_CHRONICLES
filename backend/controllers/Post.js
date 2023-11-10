const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async (req, res) => {
    try{
        const {title, body, } = req.body;
        

        const user = await User.findById(req.user.id);
        
        const post = new Post({user: user._id, auther: user.firstName+" "+user.lastName,title, body });
        const savedPost = await post.save();

        res.json({
            post : savedPost
        })
    }
    catch(err){
        return res.status(400).json({
            error : "Error While Creating Post",
            message: err.message
        })
    }
}