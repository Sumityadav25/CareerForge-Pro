import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "./api";
import useUserPlan from "./hooks/useUserPlan";
import "./ai.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useUserPlan();

  if (!user) return null;

  const isPro = user.plan === "PRO";

  const trialDays =
    user.trialStart
      ? (Date.now() - new Date(user.trialStart)) / (1000 * 60 * 60 * 24)
      : 0;

  const trialActive = !isPro && trialDays <= 7;
  const trialLeft = Math.max(0, Math.ceil(7 - trialDays));

  const handleUpgrade = async () => {
    const res = await axios.post("/payment/create-checkout-session");
    window.location.href = res.data.url;
  };

  const cards = [
    { title: "My Resume", path: "/resume-builder", icon: "📄" },
    { title: "Resume Score", path: "/resume-score", icon: "📊", pro: true },
    { title: "Job Tailor AI", path: "/job-tailor", icon: "🎯", pro: true },
    { title: "Interview Prep", path: "/interview-prep", icon: "🎤" },
    { title: "Career Roadmap", path: "/career-roadmap", icon: "🧠", pro: true },
    { title: "Profile", path: "/profile", icon: "⚙️" },
    {
      title: "Cover Letter AI",
      desc: "Generate AI-powered cover letters",
      path: "/cover-letter",
      icon: "✉️",
    },

    {
      title: "Job Match AI",
      desc: "Check how well your resume matches a job",
      path: "/job-match",
      icon: "🎯",
      pro: true
    }

  ];

  return (
    <div className="dashboard-wrapper">
      <motion.h1 className="dashboard-title">Welcome to CareerForge Pro</motion.h1>

      {!isPro && (
        <div className="trial-banner">
          {trialActive
            ? `Your PRO trial ends in ${trialLeft} days`
            : "Trial expired — Upgrade to PRO"}
          <button onClick={handleUpgrade}>Upgrade</button>
        </div>
      )}

      <div className="dashboard-grid">
        {cards.map((card, i) => {
          const locked = card.pro && !isPro && !trialActive;

          return (
            <motion.div
              key={i}
              className={`dashboard-card ${locked ? "locked" : ""}`}
              whileHover={!locked ? { y: -8 } : {}}
              onClick={() => !locked && navigate(card.path)}
            >
              <div className="card-icon">{card.icon}</div>
              <h2>{card.title}</h2>

              {locked ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpgrade();
                  }}
                  className="locked-btn"
                >
                  Upgrade to PRO
                </button>
              ) : (
                <button className="card-btn">
                  {card.pro && trialActive ? "Continue Trial" : "Open"}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
