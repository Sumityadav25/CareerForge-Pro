const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// ================= OPENAI SETUP =================
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY missing");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ================= PRO PLAN CHECK =================
const proOnly = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.plan !== "PRO") {
      return res.status(403).json({ msg: "PRO plan required" });
    }
    next();
  } catch {
    res.status(500).json({ msg: "Authorization failed" });
  }
};

// ================= AI HELPER =================
const askAI = async (prompt, temperature = 0.5) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature,
  });

  return response.choices[0].message.content;
};



// ===================================================
// 📝 COVER LETTER (FREE)
// ===================================================
router.post("/cover-letter", authMiddleware, async (req, res) => {
  try {
    const { name, jobRole, company, skills, experience } = req.body;

    const prompt = `
Write a professional, ATS-friendly cover letter.

Name: ${name}
Role: ${jobRole}
Company: ${company}
Skills: ${skills}
Experience: ${experience}
`;

    const coverLetter = await askAI(prompt, 0.7);
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

    const prompt = `
Analyze resume and give:
- Weak areas
- Missing skills
- Better phrasing
- ATS tips

Resume:
${resumeText}
`;

    const feedback = await askAI(prompt, 0.4);
    res.json({ feedback });
  } catch {
    res.status(500).json({ msg: "Resume analysis failed" });
  }
});



// ===================================================
// 🎯 ATS SCORE (PRO)
// ===================================================
router.post("/ats-score", authMiddleware, proOnly, async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    const prompt = `
Compare resume with job description.

Return:
ATS Score (0–100)
Missing Keywords
Matching Skills
Suggestions

Resume:
${resumeText}

Job:
${jobDescription}
`;

    const result = await askAI(prompt, 0.3);
    res.json({ result });
  } catch {
    res.status(500).json({ msg: "ATS score failed" });
  }
});



// ===================================================
// 🧠 SKILL GAP (PRO)
// ===================================================
router.post("/skill-gap", authMiddleware, proOnly, async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    const prompt = `
Find skill gap and learning path.

Resume:
${resumeText}

Job:
${jobDescription}
`;

    const gapAnalysis = await askAI(prompt, 0.5);
    res.json({ gapAnalysis });
  } catch {
    res.status(500).json({ msg: "Skill gap failed" });
  }
});



// ===================================================
// ✍ RESUME REWRITE (PRO)
// ===================================================
router.post("/resume-rewrite", authMiddleware, proOnly, async (req, res) => {
  try {
    const { resumeText, jobRole } = req.body;

    const prompt = `
Rewrite resume for ${jobRole}.
Achievement-focused, ATS optimized.

Resume:
${resumeText}
`;

    const rewrittenResume = await askAI(prompt, 0.6);
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

    const prompt = `
Generate interview prep set.

Role: ${jobRole}
Experience: ${experienceLevel}
`;

    const questions = await askAI(prompt, 0.7);
    res.json({ questions });
  } catch {
    res.status(500).json({ msg: "Interview questions failed" });
  }
});



// ===================================================
// 🛣 CAREER ROADMAP (PRO)
// ===================================================
router.post("/career-roadmap", authMiddleware, proOnly, async (req, res) => {
  try {
    const { targetRole, duration, currentSkills } = req.body;

    const prompt = `
Create roadmap.

Target Role: ${targetRole}
Duration: ${duration}
Skills: ${currentSkills}
`;

    const roadmap = await askAI(prompt, 0.7);
    res.json({ roadmap });
  } catch {
    res.status(500).json({ msg: "Roadmap failed" });
  }
});



// ===================================================
// 🎯 RESUME TAILORING (ULTRA PRO FEATURE)
// ===================================================
router.post("/tailor-resume", authMiddleware, proOnly, async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    const prompt = `
Tailor resume to job description with ATS optimization.

Job:
${jobDescription}

Resume:
${resumeText}
`;

    const tailoredResume = await askAI(prompt, 0.5);
    res.json({ tailoredResume });
  } catch {
    res.status(500).json({ msg: "Resume tailoring failed" });
  }
});


module.exports = router;
