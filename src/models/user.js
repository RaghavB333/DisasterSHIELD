const mongoose = require("mongoose");

const { Schema, model, models } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String },
    username: { type: String, required: true },
    profilepic: { type: String },
    coverpic: { type: String },
    razorpayid: { type: String },
    razorpaysecret: { type: String },
  },
  { timestamps: true } // Automatically manages createdAt & updatedAt
);

// Use existing model if already defined, otherwise create a new one
module.exports = models.User || model("User", userSchema);
