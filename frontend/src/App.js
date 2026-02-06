import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Landing from "./Landing";

import "./app-bg.css";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import ResumeBuilder from "./ResumeBuilder";
import InterviewPrep from "./InterviewPrep";
import CareerRoadmap from "./CareerRoadmap";
import PrivateRoute from "./PrivateRoute";
import Profile from "./Profile";
import JobTailor from "./JobTailor";
import ResumeScore from "./ResumeScore";
import CoverLetter from "./CoverLetter";
import JobMatch from "./JobMatch";

import AnimatedRoutes from "./AnimatedRoutes";
import ParticlesBg from "./ParticlesBg";
import AIAssistant from "./AIAssistant";

function AppWrapper() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      <ParticlesBg />
      {!isAuthPage && <Navbar />}

      <div className={!isAuthPage ? "app-bg" : ""}>
        <Routes location={location} key={location.pathname}>

          {/* ROOT ROUTE */}
          <Route
            path="/"
            element={token ? <Navigate to="/dashboard" /> : <Landing />}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/dashboard" element={<PrivateRoute><AnimatedRoutes><Dashboard /></AnimatedRoutes></PrivateRoute>} />
          <Route path="/resume-builder" element={<PrivateRoute><AnimatedRoutes><ResumeBuilder /></AnimatedRoutes></PrivateRoute>} />
          <Route path="/interview-prep" element={<PrivateRoute><AnimatedRoutes><InterviewPrep /></AnimatedRoutes></PrivateRoute>} />
          <Route path="/career-roadmap" element={<PrivateRoute><AnimatedRoutes><CareerRoadmap /></AnimatedRoutes></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><AnimatedRoutes><Profile /></AnimatedRoutes></PrivateRoute>} />
          <Route path="/job-tailor" element={<PrivateRoute><AnimatedRoutes><JobTailor /></AnimatedRoutes></PrivateRoute>} />
          <Route path="/resume-score" element={<PrivateRoute><AnimatedRoutes><ResumeScore /></AnimatedRoutes></PrivateRoute>} />
          <Route path="/cover-letter" element={<PrivateRoute><AnimatedRoutes><CoverLetter /></AnimatedRoutes></PrivateRoute>} />
          <Route path="/job-match" element={<PrivateRoute><AnimatedRoutes><JobMatch /></AnimatedRoutes></PrivateRoute>} />

        </Routes>
      </div>

      {!isAuthPage && <AIAssistant />}
    </>

  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
