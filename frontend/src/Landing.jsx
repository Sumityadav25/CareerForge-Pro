import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-bg">

      {/* HERO */}
      <section className="hero">
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1>AI That Builds Your Career 🚀</h1>
          <p>
            Resume Optimization • ATS Score • Interview Prep • Career Roadmaps
          </p>
          <button onClick={() => navigate("/signup")}>
            Get Started Free
          </button>
        </motion.div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="mock-card">📄 Resume Score: 84/100</div>
          <div className="mock-card">🎯 Job Match: 92%</div>
          <div className="mock-card">🧠 Career Roadmap Ready</div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Powerful AI Career Tools</h2>
        <div className="feature-grid">
          <div className="feature-card">📊 ATS Resume Scoring</div>
          <div className="feature-card">🎯 Resume Tailoring AI</div>
          <div className="feature-card">🎤 Interview Prep AI</div>
          <div className="feature-card">🛣 Career Roadmap Planner</div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="steps">
        <h2>How CareerForge Works</h2>
        <div className="step-grid">
          <div className="step">1️⃣ Upload Resume</div>
          <div className="step">2️⃣ AI Analyzes Skills</div>
          <div className="step">3️⃣ Optimize & Apply</div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Start Building Your Dream Career Today</h2>
        <button onClick={() => navigate("/signup")}>
          Create Free Account
        </button>
      </section>

    </div>
  );
}
