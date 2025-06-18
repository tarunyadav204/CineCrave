import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}cineCrave`);
        //console.log(`${process.env.MONGODB_URL}cineCrave`);
        console.log("✅ MongoDB connected successfully to cineCrave");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1);
    }
};

export default connectDB;
