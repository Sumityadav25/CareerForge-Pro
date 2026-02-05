const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    // FREE | PRO
    plan: { type: String, default: "FREE" },

    // 🆓 Trial system
    trialStart: { type: Date },
    trialUsed: { type: Boolean, default: false },

    // 📊 AI usage tracking (for limits)
    aiUsage: { type: Number, default: 0 },

    // 💳 Stripe integration
    stripeCustomerId: { type: String },
    subscriptionId: { type: String },

    // 📅 For future expiry logic
    planExpiry: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
