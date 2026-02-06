import { useState } from "react";
import { motion } from "framer-motion";
import API from "./api";
import "./cover.css";

export default function CoverLetter() {
  const [jd, setJd] = useState("");
  const [skills, setSkills] = useState("");
  const [exp, setExp] = useState("");
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCoverLetter = async () => {
    if (!jd || !skills || !exp) return;

    setLoading(true);
    setLetter("");

    try {
      const res = await API.post("/ai/cover-letter", {
        name: "Candidate",
        jobRole: jd,
        company: "Hiring Company",
        skills,
        experience: exp,
      });

      setLetter(res.data.coverLetter);
    } catch {
      setLetter("⚠️ Failed to generate cover letter.");
    }

    setLoading(false);
  };

  return (
    <div className="cover-bg">
      <div className="cover-layout">

        {/* LEFT INPUT PANEL */}
        <motion.div
          className="cover-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2>✉️ AI Cover Letter Generator</h2>

          <div className="input-group">
            <label>Job Description / Role</label>
            <textarea value={jd} onChange={e => setJd(e.target.value)} />
          </div>

          <div className="input-group">
            <label>Your Skills</label>
            <textarea value={skills} onChange={e => setSkills(e.target.value)} />
          </div>

          <div className="input-group">
            <label>Your Experience</label>
            <textarea value={exp} onChange={e => setExp(e.target.value)} />
          </div>

          <button onClick={generateCoverLetter} className="generate-btn">
            Generate Cover Letter
          </button>

          {loading && <div className="ai-loader">🤖 Writing your cover letter...</div>}
        </motion.div>

        {/* RIGHT OUTPUT PANEL */}
        <motion.div
          className="cover-result"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {letter ? (
            <div className="cover-output">{letter}</div>
          ) : (
            <div className="placeholder">Your AI cover letter will appear here ✨</div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
