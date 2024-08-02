import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cloudinaryConfig from "./config/cloudinary.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}));

app.get("/", (req, res) => {
  res.send("server running...🚀");
});

const PORT = process.env.PORT || 5000;

cloudinaryConfig();

dbConnection().then((res) => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
  });
});
