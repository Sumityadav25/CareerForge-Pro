const User = require("../models/User");

module.exports = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.plan === "PRO") return next();

  const now = new Date();

  // Start trial automatically
  if (!user.trialStart) {
    user.trialStart = now;
    user.trialUsed = true;
    await user.save();
    return next();
  }

  const trialDays = (now - user.trialStart) / (1000 * 60 * 60 * 24);

  if (trialDays <= 7) return next();

  return res.status(403).json({ message: "Trial expired. Upgrade to PRO." });
};
