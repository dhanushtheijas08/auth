import express from "express";
import { connectMongooseURI } from "./lib/db";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectMongooseURI();

// Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
