import { useState } from "react";
import { motion } from "framer-motion";
import API from "./api";
import "./tailor.css";

export default function JobTailor() {
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const tailorResume = async () => {
    if (!resumeText || !jobDesc) return;

    setLoading(true);
    setResult("");

    try {
      const res = await API.post("/ai/tailor-resume", {
        resumeText,
        jobDescription: jobDesc,
      });

      setResult(res.data.tailoredResume);
    } catch {
      setResult("⚠️ Failed to tailor resume. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="tailor-bg">
      <div className="tailor-layout">

        {/* LEFT INPUT PANEL */}
        <motion.div
          className="tailor-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2>🎯 AI Resume Tailor</h2>

          <div className="input-group">
            <label>Your Resume</label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume content..."
            />
          </div>

          <div className="input-group">
            <label>Job Description</label>
            <textarea
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste job description..."
            />
          </div>

          <button onClick={tailorResume} className="generate-btn">
            Optimize Resume
          </button>

          {loading && <div className="ai-loader">🤖 AI tailoring resume...</div>}
        </motion.div>

        {/* RIGHT OUTPUT PANEL */}
        <motion.div
          className="tailor-result"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {result ? (
            <div className="tailor-output">{result}</div>
          ) : (
            <div className="placeholder">
              Optimized resume will appear here ✨
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
