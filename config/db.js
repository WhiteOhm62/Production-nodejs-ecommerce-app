import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL environment variable is not set");
    }

    await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${mongoose.connection.host}`.green);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`.bgRed.white);
    process.exit(1); // Exit the process with a non-zero exit code
  }
};

export default connectDB;
