import mongoose from "mongoose";

export const connectMongooseURI = async () => {
  const uri = process.env.MONGO_URI;
  try {
    if (!uri) {
      throw new Error("MONGO_URI is not defined");
    }
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
