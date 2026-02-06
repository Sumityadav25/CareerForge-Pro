import React, { useState } from "react";
import "./auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg);
        return;
      }

      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";

    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-bg">
      <div className="floating-shape s1"></div>
      <div className="floating-shape s2"></div>
      <div className="floating-shape s3"></div>

      <div className="auth-card">
        <h2>Welcome Back 👋</h2>

        <form onSubmit={loginUser}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>
          New user? <a href="/signup">Create an account</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
