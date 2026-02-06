export default function UsageBar({ used, limit }) {
  const percent = (used / limit) * 100;

  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ fontSize: "14px" }}>
        AI Usage: {used}/{limit}
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percent}%`, background: "#f59e0b" }}
        ></div>
      </div>
    </div>
  );
}
