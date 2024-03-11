import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/UserRoutes.js";
import InputRoute from "./routes/InputRoutes.js";
import AuthRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
dotenv.config();

const app = express();

mongoose.connect("mongodb://localhost:27017/fullstack_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database Connected"));

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(UserRoute);
app.use(InputRoute);
app.use(AuthRoutes);


app.listen(8000, () => console.log("Server up and runnning..."));

