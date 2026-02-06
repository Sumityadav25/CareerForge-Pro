import React, { useState } from "react";
import API from "./api";
import { motion } from "framer-motion";
import "./roadmap.css";

function CareerRoadmap() {
  const [role, setRole] = useState("");
  const [duration, setDuration] = useState("");
  const [skills, setSkills] = useState("");
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {
    if (!role || !duration || !skills) return;

    setLoading(true);
    setRoadmap("");

    try {
      const res = await API.post("/ai/career-roadmap", {
        targetRole: role,
        duration,
        currentSkills: skills,
      });

      setRoadmap(res.data.roadmap);
    } catch {
      setRoadmap("⚠️ Unable to generate roadmap. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="roadmap-bg">
      <div className="roadmap-layout">

        {/* LEFT FORM PANEL */}
        <motion.div
          className="roadmap-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2>🛣 AI Career Roadmap Planner</h2>

          <div className="input-group">
            <label>Target Role</label>
            <input
              placeholder="Full Stack Developer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Time Duration</label>
            <input
              placeholder="6 Months"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Your Current Skills</label>
            <textarea
              placeholder="HTML, CSS, JavaScript..."
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          <button onClick={generateRoadmap} className="generate-btn">
            Generate Roadmap
          </button>

          {loading && <div className="ai-loader">🤖 AI is building your roadmap...</div>}
        </motion.div>

        {/* RIGHT RESULT PANEL */}
        <motion.div
          className="roadmap-result"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {roadmap ? (
            <div className="roadmap-output">{roadmap}</div>
          ) : (
            <div className="placeholder">
              Your AI roadmap will appear here ✨
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}

export default CareerRoadmap;
