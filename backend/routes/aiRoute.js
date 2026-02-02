const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

// 🛑 SAFE ENV CHECK
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY not found in environment variables");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


// ================= COVER LETTER =================
router.post("/cover-letter", async (req, res) => {
  try {
    const { name, jobRole, company, skills, experience } = req.body;

    const prompt = `
You are an expert career coach.

Write a professional, highly personalized cover letter.

Candidate Name: ${name}
Applying for Role: ${jobRole}
Company: ${company}
Skills: ${skills}
Experience: ${experience}

Make it:
- Human sounding
- Confident
- Not generic
- ATS friendly
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    res.json({ coverLetter: response.choices[0].message.content });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "AI cover letter generation failed" });
  }
});


// ================= RESUME IMPROVE =================
router.post("/resume-improve", async (req, res) => {
  try {
    const { resumeText } = req.body;

    const prompt = `
You are an ATS resume expert.

Analyze this resume and give:
1. Weak points
2. Missing skills
3. Better phrasing suggestions
4. ATS optimization tips

Resume:
${resumeText}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    });

    res.json({ feedback: response.choices[0].message.content });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "AI resume analysis failed" });
  }
});


// ================= ATS SCORE =================
router.post("/ats-score", async (req, res) => {
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

Job Description:
${jobDescription}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    res.json({ result: response.choices[0].message.content });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "ATS score generation failed" });
  }
});


// ================= SKILL GAP =================
router.post("/skill-gap", async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    const prompt = `
Find skill gap between resume and job description.

Return:
1. Missing Skills
2. Recommended Topics to Learn
3. Priority Order

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    });

    res.json({ gapAnalysis: response.choices[0].message.content });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Skill gap analysis failed" });
  }
});

// ================= RESUME AUTO REWRITE =================
router.post("/resume-rewrite", async (req, res) => {
  try {
    const { resumeText, jobRole } = req.body;

    const prompt = `
You are a professional resume writer and ATS expert.

Rewrite this resume to make it:
- More professional
- Achievement-focused
- ATS optimized
- Strong action verbs
- Better bullet points

Target Role: ${jobRole}

Original Resume:
${resumeText}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
    });

    res.json({ rewrittenResume: response.choices[0].message.content });

  } catch (err) {
    console.error("Resume Rewrite AI Error:", err.message);
    res.status(500).json({ msg: "Resume rewrite failed" });
  }
});

// ================= INTERVIEW QUESTION GENERATOR =================
router.post("/interview-questions", async (req, res) => {
  try {
    const { jobRole, experienceLevel } = req.body;

    const prompt = `
You are a senior technical interviewer.

Generate a structured interview preparation set.

Job Role: ${jobRole}
Experience Level: ${experienceLevel}

Provide:
1. Technical Questions
2. Scenario-based Questions
3. HR Questions
4. Rapid-fire Concepts

Make them realistic and industry-level.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    res.json({ questions: response.choices[0].message.content });

  } catch (err) {
    console.error("Interview AI Error:", err.message);
    res.status(500).json({ msg: "Interview question generation failed" });
  }
});

// ================= CAREER ROADMAP GENERATOR =================
router.post("/career-roadmap", async (req, res) => {
  try {
    const { targetRole, duration, currentSkills } = req.body;

    const prompt = `
You are an expert career mentor.

Create a step-by-step learning roadmap.

Target Role: ${targetRole}
Time Duration: ${duration}
Current Skills: ${currentSkills}

Provide:

1. Month-wise roadmap
2. Skills to learn
3. Tools & technologies
4. Project ideas
5. Interview preparation focus

Make it structured and practical.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    res.json({ roadmap: response.choices[0].message.content });

  } catch (err) {
    console.error("Roadmap AI Error:", err.message);
    res.status(500).json({ msg: "Roadmap generation failed" });
  }
});

module.exports = router;
