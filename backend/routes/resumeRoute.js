const express = require("express");
const Resume = require("../models/Resume");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// SAVE RESUME
router.post("/save", auth, async (req, res) => {
  const { title, html } = req.body;

  const resume = await Resume.create({
    userId: req.user.id,
    title,
    html
  });

  res.json(resume);
});

// GET ALL USER RESUMES
router.get("/all", auth, async (req, res) => {
  const resumes = await Resume.find({ userId: req.user.id });
  res.json(resumes);
});

module.exports = router;
