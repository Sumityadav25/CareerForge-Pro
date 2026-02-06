import { useState } from "react";
import { motion } from "framer-motion";
import API from "./api";
import "./jobmatch.css";

export default function JobMatch() {
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkMatch = async () => {
    const resumeText =
      document.getElementById("resume-preview")?.innerText || "";

    if (!jd || !resumeText) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await API.post("/match/job-match", {
        resumeText,
        jobDescription: jd,
      });

      setResult(res.data);
    } catch {
      setResult({ error: "Failed to analyze match." });
    }

    setLoading(false);
  };

  return (
    <div className="match-bg">
      <div className="match-layout">

        {/* LEFT PANEL */}
        <motion.div
          className="match-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2>🎯 AI Job Match Analyzer</h2>

          <div className="input-group">
            <label>Job Description</label>
            <textarea
              placeholder="Paste job description here..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />
          </div>

          <button onClick={checkMatch} className="generate-btn">
            Analyze Match
          </button>

          {loading && <div className="ai-loader">🤖 AI analyzing job match...</div>}
        </motion.div>

        {/* RIGHT RESULT PANEL */}
        <motion.div
          className="match-result"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {result ? (
            result.error ? (
              <div className="error">{result.error}</div>
            ) : (
              <div className="match-output">
                <h3>Match Score: {result.matchPercent}%</h3>

                <div className="match-section">
                  <b>Matched Skills</b>
                  <p>{result.matchedKeywords.join(", ")}</p>
                </div>

                <div className="match-section">
                  <b>Missing Skills</b>
                  <p>{result.missingKeywords.join(", ")}</p>
                </div>
              </div>
            )
          ) : (
            <div className="placeholder">
              Your AI job match analysis will appear here ✨
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
