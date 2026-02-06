import { useState } from "react";
import { motion } from "framer-motion";
import API from "./api";
import Toast from "./Toast";
import "./score.css";

export default function ResumeScore() {
  const [resumeText, setResumeText] = useState("");
  const [scoreData, setScoreData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const checkScore = async () => {
    if (!resumeText.trim()) {
      setToast({ message: "Paste resume first", type: "error" });
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/ai/resume-score", { resumeText });
      setScoreData(res.data);
    } catch {
      setToast({ message: "Resume scoring failed", type: "error" });
    }

    setLoading(false);
  };

  return (
    <div className="score-bg">
      <div className="score-layout">

        {/* LEFT INPUT PANEL */}
        <motion.div className="score-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2>📊 Resume Strength Analyzer</h2>

          <textarea
            placeholder="Paste your resume here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />

          <button onClick={checkScore} className="generate-btn">
            Analyze Resume
          </button>

          {loading && <div className="ai-loader">🤖 AI analyzing...</div>}
        </motion.div>

        {/* RIGHT RESULT PANEL */}
        <motion.div className="result-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {scoreData ? (
            <div className="result-card">
              <h3>Score: {scoreData.score}/100</h3>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${scoreData.score}%` }}
                ></div>
              </div>

              <div className="analysis">
                <b>Strengths:</b>
                <ul>
                  {scoreData.strengths?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>

                <b>Improvements:</b>
                <ul>
                  {scoreData.improvements?.map((i, idx) => <li key={idx}>{i}</li>)}
                </ul>
              </div>
            </div>
          ) : (
            <div className="placeholder">AI analysis results appear here ✨</div>
          )}
        </motion.div>

      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
