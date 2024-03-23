const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileuploadParser = require("express-fileupload");


//files
const cloudinary = require("./config/cloudinary");

//routes
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const paymentRoutes = require("./routes/payment");
const courseRoutes = require("./routes/courses");

//database
const database = require("./config/database");

//port
const PORT = process.env.PORT || 4000;

//database se connection
database.connect();

//middlewares
app.use(cookieParser())
app.use(express.json());
app.use(
    cors({
        origin:"http://study-notion-liard.vercel.app",
        credentials:true
    })
);

app.use(fileuploadParser({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));

//cloudinary se connection
cloudinary.cloudinaryConnect();
console.log("cloudinary connection successful!")

//routes ki mounting
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/courses", courseRoutes);

//default route
app.use("/", (req,res) => {
    return res.json({
        success:true,
        message:"app is live and running..."
    })
})

//server ko live krdo
app.listen(PORT,() => {
    console.log(`app is running at ${PORT}`);
})
