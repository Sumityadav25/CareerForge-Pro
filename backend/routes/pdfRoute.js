const express = require("express");
const generatePDF = require("../services/pdfService");

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { html } = req.body;

    if (!html) return res.status(400).json({ error: "HTML content required" });

    const pdfBuffer = await generatePDF(html);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf",
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "PDF generation failed" });
  }
});

module.exports = router;
