import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/productivity_db`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully..!");
  } catch (error) {
    console.error("Failed to connect:", error);
    process.exit(1);
  }
};

export { connectDB };
