const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");
const authMiddleware = require("../middleware/authMiddleware"); // 🔥 THIS LINE WAS MISSING


// ================= SAVE RESUME =================
router.post("/save", authMiddleware, async (req, res) => {
  try {
    const { title, html } = req.body;

    const resume = new Resume({
      userId: req.user.id,
      title,
      html,
    });

    await resume.save();
    res.json({ msg: "Resume saved" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ================= GET ALL RESUMES =================
// Get all resumes of logged in user
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id });
    res.json(resumes);
  } catch {
    res.status(500).json({ msg: "Failed to fetch resumes" });
  }
});


module.exports = router;
