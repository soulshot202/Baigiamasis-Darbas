import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes.js";

dotenv.config();
const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
