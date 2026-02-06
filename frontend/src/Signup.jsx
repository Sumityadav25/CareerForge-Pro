import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";
import "./auth.css";
import Toast from "./Toast";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);

  const getStrength = () => {
    if (password.length > 10) return "Strong 💪";
    if (password.length > 6) return "Medium 🙂";
    return "Weak 😬";
  };

  const signupUser = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", { name, email, password });

      setToast({ message: "Signup successful! Please login.", type: "success" });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setToast({
        message: err.response?.data?.msg || "Signup failed",
        type: "error",
      });
    }
  };

  return (
    <div className="auth-bg">
      <div className="floating-shape s1"></div>
      <div className="floating-shape s2"></div>
      <div className="floating-shape s3"></div>

      <div className="auth-card">
        <h2>Create Your Account 🚀</h2>

        <form onSubmit={signupUser}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <div className="password-strength">
            Password Strength: {getStrength()}
          </div>

          <button type="submit">Signup</button>
        </form>

        <p>
          Already have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}

export default Signup;
