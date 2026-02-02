const express = require("express");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/job-match", auth, async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ msg: "Data missing" });
    }

    const resumeWords = resumeText.toLowerCase().split(/\W+/);
    const jdWords = jobDescription.toLowerCase().split(/\W+/);

    const uniqueResume = [...new Set(resumeWords)];
    const uniqueJD = [...new Set(jdWords)];

    const matched = uniqueJD.filter(word => uniqueResume.includes(word));

    const matchPercent = ((matched.length / uniqueJD.length) * 100).toFixed(2);

    const missing = uniqueJD.filter(word => !uniqueResume.includes(word));

    res.json({
      matchPercent,
      matchedKeywords: matched.slice(0, 15),
      missingKeywords: missing.slice(0, 15)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Match calculation failed" });
  }
});

module.exports = router;
