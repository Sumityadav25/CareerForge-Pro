import React, { useEffect, useState } from "react";
import API from "./api";
import { motion } from "framer-motion";
import "./profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await API.get("/auth/profile");
      setUser(res.data);
      setForm({ name: res.data.name, email: res.data.email, password: "" });
    };
    fetchProfile();
  }, []);

  const updateProfile = async () => {
    const res = await API.put("/auth/profile", form);
    setUser(res.data);
    setEditMode(false);
  };

  const handleUpgrade = async () => {
    const res = await API.post("/payment/create-checkout-session");
    window.location.href = res.data.url;
  };

  if (!user) return <div className="profile-loading">Loading...</div>;

  const trialDays =
    user.trialStart
      ? (Date.now() - new Date(user.trialStart)) / (1000 * 60 * 60 * 24)
      : 0;

  const trialLeft = Math.max(0, Math.ceil(7 - trialDays));

  return (
    <div className="profile-wrapper">
      <motion.div
        className="profile-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Account Center</h2>

        <div className="profile-section">
          <h3>Subscription</h3>
          <div className="profile-row">
            <span>Current Plan</span>
            <b className={user.plan === "PRO" ? "pro-plan" : "free-plan"}>
              {user.plan}
            </b>
          </div>

          {user.plan !== "PRO" && (
            <div className="profile-row">
              <span>Trial Left</span>
              <b>{trialLeft} days</b>
            </div>
          )}

          {user.plan !== "PRO" && (
            <button className="upgrade-btn-profile" onClick={handleUpgrade}>
              Upgrade to PRO
            </button>
          )}
        </div>

        <div className="profile-section">
          <h3>Usage Stats</h3>
          <div className="profile-row">
            <span>AI Usage</span>
            <b>{user.aiUsage || 0} requests</b>
          </div>
        </div>

        <div className="profile-section">
          <h3>Account Info</h3>

          {!editMode ? (
            <>
              <div className="profile-row">
                <span>Name</span>
                <b>{user.name}</b>
              </div>

              <div className="profile-row">
                <span>Email</span>
                <b>{user.email}</b>
              </div>

              <button
                className="primary-btn"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <div className="input-group">
                <label>Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label>Email</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="Optional"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>

              <div className="btn-group">
                <button className="primary-btn" onClick={updateProfile}>
                  Save
                </button>
                <button
                  className="secondary-btn"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;
