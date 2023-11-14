const express = require("express");
const app = express();

const userRoutes = require("./routes/UserRoutes");
const postRoutes = require("./routes/PostRoute");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
var cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(
    cors({
      origin: "*",
    })
  );

//database connect
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();

app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);

//default route

app.get("/", (req, res) =>{
    return res.json({
        success: true,
        message:'Our server is up and running...'
    });
});

app.listen(PORT, () =>{
    console.log(`App is running at ${PORT}`);
})