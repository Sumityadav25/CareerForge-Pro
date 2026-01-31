const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  plan: {
    type: String,
    default: "FREE",
  },
});

module.exports = mongoose.model("User", userSchema);
