import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./navbar.css";

function Navbar() {
  const token = localStorage.getItem("token");
  const plan = localStorage.getItem("plan");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <motion.div
      className="nav-container"
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="nav-left" onClick={() => navigate("/dashboard")}>
        <span className="logo-main">CareerForge</span>
        <span className="logo-pro">Pro</span>
        {plan === "PRO" && <span className="pro-badge">PRO</span>}
      </div>

      {token && (
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/resume-builder">Resume</Link>
          <Link to="/interview-prep">Interview AI</Link>
          <Link to="/career-roadmap">Roadmap AI</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/job-match">Job Match</Link>

          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default Navbar;
