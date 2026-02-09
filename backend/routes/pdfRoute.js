const express = require("express");
const generatePDF = require("../services/pdfService");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate", auth, async (req, res) => {
  try {
    // Accept both keys (safe)
    const htmlContent = req.body.content || req.body.html;

    if (!htmlContent) {
      return res.status(400).json({ error: "Resume content required" });
    }

    const pdfBuffer = await generatePDF(htmlContent);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf",
    });

    res.send(pdfBuffer);

  } catch (error) {
    console.error("PDF ERROR:", error);
    res.status(500).json({ error: "PDF generation failed" });
  }
});

module.exports = router;
