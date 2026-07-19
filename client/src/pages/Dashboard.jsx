import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../firebase/authService";

export default function Dashboard() {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const name = userProfile?.name || currentUser?.displayName || "Student";
  const email = userProfile?.email || currentUser?.email || "";
  const dreamCareer = userProfile?.dreamCareer || userProfile?.careerGoal || "";
  const careerStatus = userProfile?.careerStatus || "";
  const education = userProfile?.education || "Not specified";
  const studyHours = userProfile?.studyHours || "Not specified";
  const progress = userProfile?.progress || 0;
  const completedCount = userProfile?.completedTasks?.length || 0;

  // Format date of registration
  let joinDate = "Recently";
  if (userProfile?.createdAt) {
    try {
      if (userProfile.createdAt.seconds) {
        joinDate = new Date(userProfile.createdAt.seconds * 1000).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } else if (userProfile.createdAt.toDate) {
        // Firebase Timestamp toDate() function support
        joinDate = userProfile.createdAt.toDate().toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } else {
        joinDate = new Date(userProfile.createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    } catch (e) {
      console.error("Error formatting join date:", e);
      joinDate = "Recently";
    }
  }

  return (
    <div className="container mt-5">
      {/* Welcome Header */}
      <div className="row mb-5 align-items-center">
        <div className="col-md-8">
          <h1 className="display-5 fw-bold mb-2 text-primary" style={{ marginTop: "0" }}>
            Hello, {name}!
          </h1>
          <p className="lead text-muted mb-0">Track your progress and build your roadmap here.</p>
        </div>
        <div className="col-md-4 text-md-end mt-3 mt-md-0">
          <button onClick={handleLogout} className="btn btn-outline-danger rounded-pill px-4 fw-bold">
            <i className="bi bi-box-arrow-right me-2"></i>Logout
          </button>
        </div>
      </div>

      <div className="row g-4">
        {/* Profile Card */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-4 h-100 bg-white">
            <div className="text-center mb-3">
              <div
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: "80px", height: "80px", fontSize: "2rem", fontWeight: "bold" }}
              >
                {name.charAt(0).toUpperCase()}
              </div>
              <h4 className="fw-bold mb-1">{name}</h4>
              <p className="text-muted small mb-3">{email}</p>
              <span className="badge bg-light text-secondary border px-3 py-2 rounded-pill">
                Joined: {joinDate}
              </span>
            </div>
            <hr />
            <div className="mt-2">
              <p className="mb-2 text-secondary">
                <i className="bi bi-person-fill me-2 text-primary"></i>
                <strong>Name:</strong> {name}
              </p>
              <p className="mb-2 text-secondary">
                <i className="bi bi-mortarboard-fill me-2 text-info"></i>
                <strong>Education:</strong> {education}
              </p>
              <p className="mb-2 text-secondary">
                <i className="bi bi-briefcase-fill me-2 text-warning"></i>
                <strong>Dream Career:</strong> {careerStatus === "exploring" ? "Exploring Options" : (dreamCareer || "Not selected yet")}
              </p>
              <p className="mb-2 text-secondary">
                <i className="bi bi-clock-fill me-2 text-danger"></i>
                <strong>Study Hours:</strong> {studyHours} {studyHours !== "Not specified" ? "hrs/day" : ""}
              </p>
              <p className="mb-0 text-secondary">
                <i className="bi bi-check-circle-fill me-2 text-success"></i>
                <strong>Tasks Completed:</strong> {completedCount}
              </p>
            </div>
          </div>
        </div>

        {/* Career & Roadmap Overview */}
        <div className="col-md-8">
          {!dreamCareer && careerStatus !== "exploring" ? (
            <div className="card shadow-sm border-0 p-5 text-center h-100 bg-white d-flex flex-column justify-content-center align-items-center">
              <span className="fs-1 mb-3">🗺️</span>
              <h3 className="fw-bold mb-3">Plan Your Future</h3>
              <p className="text-muted mb-4" style={{ maxWidth: "500px" }}>
                You have not selected a career goal yet. Choose your dream career to generate your personalized roadmap.
              </p>
              <Link to="/select-career" className="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-sm">
                Set Career Goal
              </Link>
            </div>
          ) : (
            <div className="card shadow-sm border-0 p-4 h-100 bg-white d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="fw-bold mb-0 text-secondary">
                    {careerStatus === "exploring" ? "Career Exploration" : dreamCareer} Roadmap
                  </h4>
                  <span className="badge bg-success px-3 py-2 fs-6 rounded-pill">
                    {careerStatus === "exploring" ? "Exploring" : "Active Path"}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-bold text-muted">Goal Completion</span>
                    <span className="fw-bold text-success">{progress}%</span>
                  </div>
                  <div className="progress" style={{ height: "20px", borderRadius: "10px" }}>
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                      role="progressbar"
                      style={{ width: `${progress}%` }}
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>

                {careerStatus === "exploring" ? (
                  <div className="alert alert-warning border border-warning d-flex align-items-center py-3 px-4 mb-4 shadow-sm animate-pulse" role="alert">
                    <span className="fs-3 me-3">🧞‍♂️</span>
                    <div className="w-100 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center">
                      <div className="me-2">
                        <h6 className="fw-bold mb-1 text-dark">Discover Your Career Path</h6>
                        <small className="text-muted">Take our guided guide to identify your strengths and interests and select a suitable career path.</small>
                      </div>
                      <Link to="/student-profile" className="btn btn-warning btn-sm fw-bold px-3 py-2 mt-2 mt-sm-0 rounded-pill shadow-sm">
                        Discover My Career
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="alert alert-light border d-flex align-items-center py-3 px-4 mb-4" role="alert">
                    <span className="fs-3 me-3">🚀</span>
                    <div>
                      <h6 className="fw-bold mb-0 text-dark">You are on the right track!</h6>
                      <small className="text-muted">You have completed {completedCount} steps on your journey to becoming a {dreamCareer}.</small>
                    </div>
                  </div>
                )}
              </div>

              <div className="row g-2">
                <div className="col-sm-6">
                  <Link to="/roadmap" className="btn btn-primary w-100 py-3 fw-bold rounded-pill shadow-sm">
                    <i className="bi bi-map me-2"></i>View Roadmap
                  </Link>
                </div>
                <div className="col-sm-6">
                  <Link to="/profile" className="btn btn-outline-secondary w-100 py-3 fw-bold rounded-pill">
                    <i className="bi bi-pencil-square me-2"></i>Edit Profile
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
