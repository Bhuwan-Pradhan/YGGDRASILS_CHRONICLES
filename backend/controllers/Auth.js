const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup Controller for Registering USers

exports.signup = async (req, res) => {
	try {
		// Destructure fields from the request body
		const {
			userName,
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
		} = req.body;
		// Check if All Details are there or not
		if (
			!userName ||
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword
		) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}
		// Check if userName already exists
		const existingUserName = await User.findOne({ userName });
		// Check if password and confirm password match
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message:
					"Password and Confirm Password do not match. Please try again.",
			});
		}

		else if (existingUserName) {
			return res.status(400).json({
				success: false,
				message: "UserName already exists. Please try another one.",
			});
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}


		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);


		const user = await User.create({
			userName,
			firstName,
			lastName,
			email,
			password: hashedPassword,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
		});

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};


// Login controller for authenticating users
exports.login = async (req, res) => {
	try {
		// Get email and password from request body
		const { email, password } = req.body;

		// Check if email or password is missing
		if (!email || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

		// Find user with provided email
		const user = await User.findOne({ email });

		// If user not found with provided email
		if (!user) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
		}

		// Generate JWT token and Compare Password
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ email: user.email, id: user._id },
				process.env.JWT_SECRET,
				{
					expiresIn: "24h",
				}
			);

			// Save token to user document in database

			user.token = token;
			user.password = undefined;
			// Set cookie for token and return success response
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});
		} else {
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
		}
	} catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
	}
};


exports.searchMember = async (req, res) => {
	try {
		const { query } = req.query;

		// Use a regex to perform a case-insensitive search
		const users = await User.find({});

		res.status(200).json({ success: true, users });


	}
	catch (err) {
		return res.status(400).json({
			error: "Error While searching member",
			message: err.message
		})
	}
}


exports.follow = async (req, res) => {
	const { userId } = req.body;
	const  followerId  = req.user.id;
 
	try {
	
      
	
  
	  // Update the user's followers and the follower's following
	  const updatedUser = await User.findByIdAndUpdate(userId, { $push: { followers: followerId } },
		{ new: true })
		.populate("followers") 
		.exec();
		const updatedFollower = await User.findByIdAndUpdate(followerId, { $push: { following: userId } },
			{ new: true })
			.populate("following") //Populates the comment array with the comments document
			.exec();
	 
  
	  
  
	  return res.status(200).json({ success: true , updatedUser, updatedFollower});
	} catch (error) {
	  console.error(error.message);
	  return res.status(500).json({ error: 'Internal Server Error' });
	}
}


exports.unfollow = async (req, res) => {
	const { userId } = req.body;
	const  followerId  = req.user.id;
  
	try {
		
	
	
	
		// Remove the follower from the user's followers and the following from the follower
	 
	  const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { followers: followerId } },
		{ new: true })
		.populate("followers") 
		.exec();
		const updatedFollower = await User.findByIdAndUpdate(followerId, { $pull: { following: userId } },
			{ new: true })
			.populate("following") //Populates the comment array with the comments document
			.exec();
	
		
	
		return res.status(200).json({ success: true , updatedUser, updatedFollower});
	  } catch (error) {
		console.error(error.message);
		return res.status(500).json({ error: 'Internal Server Error' });
	  }
	
}


