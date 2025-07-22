import express from "express";
import { connectMongooseURI } from "./lib/db";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectMongooseURI();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use(globalErrorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
