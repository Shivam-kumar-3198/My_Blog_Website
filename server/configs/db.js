import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => 
      console.log("✅ Database Connected")
    );

    await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // stop server if DB connection fails
  }
};

export default connectDB;
