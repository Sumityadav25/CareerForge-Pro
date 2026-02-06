import React, { useState } from "react";
import "./builder.css";

function ResumeBuilder() {
  const [resumeInput, setResumeInput] = useState(`Name: Sumit Yadav
Email: sumit@email.com
Phone: 9876543210

Skills:
- React.js
- Node.js
- MongoDB

Experience:
Developed scalable web applications using MERN stack.

Education:
B.Tech CSE`);

  const [targetRole, setTargetRole] = useState("");
  const token = localStorage.getItem("token");

  const rewriteResume = async () => {
    if (!targetRole) {
      alert("Enter target job role");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/ai/resume-rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: resumeInput,
          jobRole: targetRole,
        }),
      });

      const data = await res.json();

      // 🔥 Safety check
      if (!data.rewrittenResume) {
        console.log("AI response error:", data);
        alert("AI rewrite failed. Check console.");
        return;
      }

      setResumeInput(data.rewrittenResume);

    } catch (err) {
      console.error(err);
      alert("AI request failed");
    }
  };


  const saveResume = async () => {
    const htmlContent = document.getElementById("resume-preview").innerHTML;

    await fetch("http://localhost:5000/api/resume/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: "My Resume", html: htmlContent }),
    });

    alert("Resume saved!");
  };

  const downloadPDF = async () => {
    const htmlContent = document.getElementById("resume-preview").innerHTML;

    const res = await fetch("http://localhost:5000/api/pdf/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ html: htmlContent }),
    });

    if (res.status === 403) return alert("Upgrade to Pro");

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.pdf";
    a.click();
  };

  return (
    <div className="builder-container">
      <div className="builder-left premium-card">
        <h2>✍ Resume Editor</h2>

        <input
          type="text"
          placeholder="Target Job Role"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          className="builder-input"
        />
        <textarea
          value={resumeInput || ""}
          onChange={(e) => setResumeInput(e.target.value)}
          className="builder-textarea"
        />

        <div className="builder-buttons">
          <button onClick={rewriteResume} className="ai-button">✨ AI Rewrite</button>
          <button onClick={saveResume} className="ai-button">💾 Save</button>
        </div>

        <div className="builder-buttons">
          <button onClick={downloadPDF} className="ai-button">📄 Download PDF</button>
        </div>
      </div>

      <div className="builder-right premium-card">
        <h2>📄 Live Preview</h2>
        <div id="resume-preview" className="preview-box">
          {resumeInput}
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
