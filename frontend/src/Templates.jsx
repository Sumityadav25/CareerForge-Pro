import "./ai.css";

export default function Templates() {
  const templates = ["Modern", "Minimal", "Professional", "Tech"];

  return (
    <div className="ai-container">
      <div className="ai-title">Choose Resume Template</div>

      <div className="card-grid">
        {templates.map((t, i) => (
          <div key={i} className="dash-card">
            <div className="dash-title">{t} Template</div>
            <div>Preview coming soon</div>
          </div>
        ))}
      </div>
    </div>
  );
}
