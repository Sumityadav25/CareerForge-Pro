import { useState } from "react";
import API from "./api";
import "./ai.css";

export default function ResumeScore() {
  const [resumeText, setResumeText] = useState("");
  const [scoreData, setScoreData] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkScore = async () => {
    if (!resumeText.trim()) {
      alert("Paste resume first");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/ai/resume-score", { resumeText });

      // Safety check
      if (!res.data || !res.data.score) {
        alert("AI response invalid");
        console.log(res.data);
        return;
      }

      setScoreData(res.data);

    } catch (err) {
      console.log("Score error:", err.response?.data || err.message);
      alert("Resume scoring failed (server error)");
    }

    setLoading(false);
  };

  return (
    <div className="score-container">
      <div className="score-card">
        <h2 className="score-title">📊 Resume Strength Analyzer</h2>

        <textarea
          className="score-textarea"
          rows="6"
          placeholder="Paste your resume here..."
          onChange={(e) => setResumeText(e.target.value)}
        />

        <button className="score-button" onClick={checkScore}>
          Analyze Resume
        </button>

        {loading && <div className="ai-loader">🤖 AI analyzing...</div>}

        {scoreData && (
          <div className="result-card">
            <h3>Score: {scoreData.score}/100</h3>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${scoreData.score}%` }}
              ></div>
            </div>

            <div className="ai-result">
              <b>Strengths:</b>
              <ul>
                {scoreData.strengths?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>

              <b>Improvements:</b>
              <ul>
                {scoreData.improvements?.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
