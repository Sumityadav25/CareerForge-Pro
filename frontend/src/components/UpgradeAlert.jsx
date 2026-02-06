import { motion } from "framer-motion";
import "../assistant.css";

export default function UpgradeAlert({ show, onClose, onUpgrade }) {
  if (!show) return null;

  return (
    <div className="upgrade-overlay">
      <motion.div
        className="upgrade-modal"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h2>🚀 PRO Feature</h2>
        <p>Upgrade to PRO to use AI Assistant and unlock premium AI tools.</p>

        <div className="upgrade-actions">
          <button onClick={onUpgrade} className="upgrade-btn-modal">
            Upgrade to PRO
          </button>
          <button onClick={onClose} className="close-btn-modal">
            Later
          </button>
        </div>
      </motion.div>
    </div>
  );
}
