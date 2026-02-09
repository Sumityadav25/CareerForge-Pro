const express = require("express");
const router = express.Router();
const axios = require("axios");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// ================= AI HELPER (HUGGINGFACE) =================
const askAI = async (prompt) => {
  try {
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        inputs: `<s>[INST] ${prompt} [/INST]`,
        parameters: {
          max_new_tokens: 400,
          temperature: 0.7,
          return_full_text: false
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data[0]?.generated_text || "AI did not return response.";

  } catch (err) {
    console.error("🔥 HF ERROR:", err.response?.data || err.message);
    throw err;
  }
};




// ================= PRO ACCESS =================
const checkProAccess = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const now = new Date();

    if (user.plan === "PRO") return next();

    if (!user.trialStart) {
      user.trialStart = now;
      user.trialUsed = true;
      await user.save();
      return next();
    }

    const trialDays = (now - user.trialStart) / (1000 * 60 * 60 * 24);
    if (trialDays <= 7) return next();

    return res.status(403).json({ msg: "Trial expired. Upgrade to PRO." });

  } catch (err) {
    res.status(500).json({ msg: "Access control failed" });
  }
};

// ================= USAGE TRACK =================
const trackUsage = async (req) => {
  await User.findByIdAndUpdate(req.user.id, { $inc: { aiUsage: 1 } });
};



// ========== ROUTES (SAME AS BEFORE, AI SOURCE CHANGED) ==========

router.post("/interview-questions", authMiddleware, async (req, res) => {
  try {
    const { jobRole, experienceLevel } = req.body;
    const questions = await askAI(`Generate interview questions for ${jobRole}, ${experienceLevel}`);
    await trackUsage(req);
    res.json({ questions });
  } catch {
    res.status(500).json({ msg: "Interview AI failed" });
  }
});

router.post("/career-roadmap", authMiddleware, checkProAccess, async (req, res) => {
  try {
    const { targetRole, duration, currentSkills } = req.body;
    const roadmap = await askAI(`Roadmap to become ${targetRole} in ${duration}. Skills:${currentSkills}`);
    await trackUsage(req);
    res.json({ roadmap });
  } catch {
    res.status(500).json({ msg: "Roadmap failed" });
  }
});

router.post("/cover-letter", authMiddleware, async (req, res) => {
  try {
    const { name, jobRole, company, skills, experience } = req.body;
    const coverLetter = await askAI(`Write cover letter for ${jobRole} at ${company}. Skills:${skills}`);
    await trackUsage(req);
    res.json({ coverLetter });
  } catch {
    res.status(500).json({ msg: "Cover letter failed" });
  }
});

router.post("/resume-improve", authMiddleware, async (req, res) => {
  try {
    const { resumeText } = req.body;
    const feedback = await askAI(`Give ATS improvement tips:\n${resumeText}`);
    await trackUsage(req);
    res.json({ feedback });
  } catch {
    res.status(500).json({ msg: "Resume analysis failed" });
  }
});

module.exports = router;
