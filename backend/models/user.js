const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  plan: { type: String, default: "FREE" }
});

module.exports = mongoose.model("User", userSchema);
