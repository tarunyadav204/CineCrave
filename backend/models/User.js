import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },       // Clerk user ID as the document _id
    name: { type: String, required: true },      // Full name (first + last)
    email: { type: String, required: true },     // Primary email address
    image: { type: String, required: true }      // Profile image URL
});

const User = mongoose.model('User', userSchema);

export default User;
