import express from "express";
import { connectMongooseURI } from "./lib/db";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectMongooseURI();

// Routes
app.use("/api/auth", authRoutes);

app.use(globalErrorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
