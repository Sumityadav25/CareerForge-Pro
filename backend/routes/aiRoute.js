const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// ================= OPENAI =================
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ================= AI HELPER =================
const askAI = async (prompt, temperature = 0.5) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature,
  });
  return response.choices[0].message.content;
};

// ================= TRIAL + PRO ACCESS =================
const checkProAccess = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const now = new Date();

    if (user.plan === "PRO") return next();

    // Start trial automatically
    if (!user.trialStart) {
      user.trialStart = now;
      user.trialUsed = true;
      await user.save();
      return next();
    }

    const trialDays = (now - user.trialStart) / (1000 * 60 * 60 * 24);

    if (trialDays <= 7) return next();

    return res.status(403).json({ msg: "Trial expired. Upgrade to PRO." });
  } catch {
    res.status(500).json({ msg: "Access control failed" });
  }
};

// ================= AI USAGE TRACK =================
const trackUsage = async (req) => {
  await User.findByIdAndUpdate(req.user.id, { $inc: { aiUsage: 1 } });
};



// ===================================================
// 📝 COVER LETTER (FREE)
// ===================================================
router.post("/cover-letter", authMiddleware, async (req, res) => {
  try {
    const { name, jobRole, company, skills, experience } = req.body;

    const prompt = `Write a professional cover letter.\nName:${name}\nRole:${jobRole}\nCompany:${company}\nSkills:${skills}\nExperience:${experience}`;

    const coverLetter = await askAI(prompt, 0.7);
    await trackUsage(req);

    res.json({ coverLetter });
  } catch {
    res.status(500).json({ msg: "Cover letter generation failed" });
  }
});


// ===================================================
// 📄 RESUME IMPROVE (FREE)
// ===================================================
router.post("/resume-improve", authMiddleware, async (req, res) => {
  try {
    const { resumeText } = req.body;
    const prompt = `Analyze resume & give ATS improvement tips.\nResume:${resumeText}`;

    const feedback = await askAI(prompt, 0.4);
    await trackUsage(req);

    res.json({ feedback });
  } catch {
    res.status(500).json({ msg: "Resume analysis failed" });
  }
});


// ===================================================
// 🎯 ATS SCORE (TRIAL + PRO)
// ===================================================
router.post("/ats-score", authMiddleware, checkProAccess, async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    const prompt = `Compare resume vs job. Return ATS score + suggestions.\nResume:${resumeText}\nJob:${jobDescription}`;

    const result = await askAI(prompt, 0.3);
    await trackUsage(req);

    res.json({ result });
  } catch {
    res.status(500).json({ msg: "ATS score failed" });
  }
});


// ===================================================
// 🧠 SKILL GAP (TRIAL + PRO)
// ===================================================
router.post("/skill-gap", authMiddleware, checkProAccess, async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    const gapAnalysis = await askAI(`Find skill gap.\nResume:${resumeText}\nJob:${jobDescription}`);
    await trackUsage(req);

    res.json({ gapAnalysis });
  } catch {
    res.status(500).json({ msg: "Skill gap failed" });
  }
});


// ===================================================
// ✍ RESUME REWRITE (TRIAL + PRO)
// ===================================================
router.post("/resume-rewrite", authMiddleware, checkProAccess, async (req, res) => {
  try {
    const { resumeText, jobRole } = req.body;

    const rewrittenResume = await askAI(`Rewrite resume for ${jobRole}.\n${resumeText}`);
    await trackUsage(req);

    res.json({ rewrittenResume });
  } catch {
    res.status(500).json({ msg: "Resume rewrite failed" });
  }
});


// ===================================================
// 🎤 INTERVIEW QUESTIONS (FREE)
// ===================================================
router.post("/interview-questions", authMiddleware, async (req, res) => {
  try {
    const { jobRole, experienceLevel } = req.body;

    const questions = await askAI(`Generate interview questions for ${jobRole}, ${experienceLevel}`);
    await trackUsage(req);

    res.json({ questions });
  } catch {
    res.status(500).json({ msg: "Interview questions failed" });
  }
});


// ===================================================
// 🛣 CAREER ROADMAP (TRIAL + PRO)
// ===================================================
router.post("/career-roadmap", authMiddleware, checkProAccess, async (req, res) => {
  try {
    const { targetRole, duration, currentSkills } = req.body;

    const roadmap = await askAI(`Create roadmap to become ${targetRole} in ${duration}. Skills:${currentSkills}`);
    await trackUsage(req);

    res.json({ roadmap });
  } catch {
    res.status(500).json({ msg: "Roadmap failed" });
  }
});


// ===================================================
// 🎯 RESUME TAILOR (TRIAL + PRO)
// ===================================================
router.post("/tailor-resume", authMiddleware, checkProAccess, async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    const tailoredResume = await askAI(`Tailor resume to job.\n${jobDescription}\n${resumeText}`);
    await trackUsage(req);

    res.json({ tailoredResume });
  } catch {
    res.status(500).json({ msg: "Resume tailoring failed" });
  }
});

module.exports = router;
