import React, { useState } from "react";
import API from "./api";
import Toast from "./Toast";
import { motion } from "framer-motion";
import "./builder.css";

function ResumeBuilder() {
  const [resumeInput, setResumeInput] = useState(`Name: Enter Your Name
Email: example@email.com
Phone: 123*****90

Skills:
Add Your Skills Here

Experience:
Write Your Experience Here

Education:
Add Education Details

Hobby:
-Cricket
-Chess`);


  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const rewriteResume = async () => {
  if (!targetRole) {
    setToast({ message: "Enter target job role", type: "error" });
    return;
  }

  setLoading(true);
  try {
    const res = await API.post("/ai/resume-rewrite", {
      resumeText: resumeInput,
      jobRole: targetRole,
    });

    setResumeInput(res.data.result); // FIXED
    setToast({ message: "Resume optimized!", type: "success" });
  } catch (err) {
    console.log(err.response?.data);
    setToast({ message: "AI rewrite failed", type: "error" });
  }
  setLoading(false);
};

  const saveResume = async () => {
    try {
      await API.post("/resume/save", {
        title: "My Resume",
        html: resumeInput,
      });
      setToast({ message: "Resume saved!", type: "success" });
    } catch {
      setToast({ message: "Save failed", type: "error" });
    }
  };

  const downloadPDF = async () => {
  try {
    const res = await API.post(
      "/pdf/generate",
      { content: resumeInput }, // FIXED
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.pdf";
    a.click();
  } catch (err) {
    console.log(err.response?.data);
    setToast({ message: "PDF download failed", type: "error" });
  }
};


  return (
    <div className="builder-bg">
      <div className="builder-layout">

        {/* LEFT EDITOR */}
        <motion.div className="builder-left" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2>✍ Resume Editor</h2>

          <input
            type="text"
            placeholder="Target Job Role"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="builder-input"
          />

          <textarea
            value={resumeInput}
            onChange={(e) => setResumeInput(e.target.value)}
            className="builder-textarea"
          />

          <div className="builder-buttons">
            <button onClick={rewriteResume} className="ai-button">✨ AI Rewrite</button>
            <button onClick={saveResume} className="ai-button">💾 Save</button>
            <button onClick={downloadPDF} className="ai-button">📄 PDF</button>
          </div>

          {loading && <div className="ai-loader">🤖 Optimizing...</div>}
        </motion.div>

        {/* RIGHT PREVIEW */}
        <motion.div className="builder-right" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2>📄 Live Preview</h2>
          <div className="preview-box">{resumeInput}</div>
        </motion.div>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}

export default ResumeBuilder;
