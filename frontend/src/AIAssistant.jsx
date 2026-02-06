import { useState } from "react";
import axios from "./api";
import UpgradeAlert from "./components/UpgradeAlert";
import "./assistant.css";

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const plan = localStorage.getItem("plan");

  const handleAskAI = () => {
    if (plan !== "PRO") {
      setShowUpgrade(true);
    } else {
      alert("AI chat feature coming next phase 🚀");
    }
  };

  const handleUpgrade = async () => {
    const res = await axios.post("/payment/create-checkout-session");
    window.location.href = res.data.url;
  };

  return (
    <>
      <div className="ai-fab" onClick={() => setOpen(!open)}>🤖</div>

      {open && (
        <div className="ai-popup">
          <h4>AI Career Assistant</h4>
          <p>Need help with resume, jobs, or interview prep?</p>
          <button onClick={handleAskAI}>Ask AI</button>
        </div>
      )}

      <UpgradeAlert
        show={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        onUpgrade={handleUpgrade}
      />
    </>
  );
}
