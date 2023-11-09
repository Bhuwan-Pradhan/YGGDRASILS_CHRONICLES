const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require("./routes/UserRoutes");
const database = require("./config/database");
const dotenv = require("dotenv");
var cors = require("cors");

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


app.use("/api/auth", userRoutes);

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