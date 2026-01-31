const express = require("express");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/cover-letter", auth, async (req, res) => {
  try {
    if (req.user.plan !== "PRO")
      return res.status(403).json({ msg: "Upgrade to Pro" });

    // TEMP response until OpenAI key added
    res.json({
      letter:
        "AI service is temporarily disabled. Cover letter generation will be enabled once API key is added.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "AI route error" });
  }
});

module.exports = router;
