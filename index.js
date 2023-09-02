import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bookRoute from "./routes/booksRoutes.js";

dotenv.config();

const mongoDBURL = process.env.MONGO_DB_URL;
const PORT = process.env.PORT || 5555;

const app = express();
// middleware to parse request body
app.use(express.json());
// middleware to handle cors policy
app.use(
  cors({
    origin: "https://readit-now.vercel.app", //this url is only allowed to access the routes
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use("/books", bookRoute);

app.get("/", (req, res) => {
  res.status(234).json({
    message: "Welcome to the Backend of BookStoreApp",
  });
});

// DB connection
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("DB is connected");
    app.listen(PORT, () => {
      console.log("App started");
    });
  })
  .catch((error) => {
    console.log(error);
  });
