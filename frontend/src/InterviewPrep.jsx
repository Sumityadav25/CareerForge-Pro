import React, { useState } from "react";
import API from "./api";
import { motion } from "framer-motion";
import "./interview.css";

function InterviewPrep() {
  const [jobRole, setJobRole] = useState("");
  const [level, setLevel] = useState("");
  const [questions, setQuestions] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQuestions = async () => {
    if (!jobRole || !level) return;

    setLoading(true);
    setQuestions("");

    try {
      const res = await API.post("/ai/interview-questions", {
        jobRole,
        experienceLevel: level,
      });

      setQuestions(res.data.questions);
    } catch {
      setQuestions("⚠️ Failed to generate interview questions.");
    }

    setLoading(false);
  };

  return (
    <div className="interview-bg">
      <div className="interview-layout">

        {/* LEFT INPUT PANEL */}
        <motion.div
          className="interview-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2>🎤 AI Interview Preparation</h2>

          <div className="input-group">
            <label>Job Role</label>
            <input
              placeholder="MERN Developer"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Experience Level</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="">Select Level</option>
              <option>Fresher</option>
              <option>1-3 Years</option>
              <option>Senior</option>
            </select>
          </div>

          <button onClick={generateQuestions} className="generate-btn">
            Generate Questions
          </button>

          {loading && (
            <div className="ai-loader">🤖 AI is preparing your questions...</div>
          )}
        </motion.div>

        {/* RIGHT OUTPUT PANEL */}
        <motion.div
          className="interview-result"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {questions ? (
            <div className="interview-output">{questions}</div>
          ) : (
            <div className="placeholder">
              Your AI interview questions will appear here ✨
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}

export default InterviewPrep;
