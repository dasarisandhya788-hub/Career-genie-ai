import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero bg-white border-bottom py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-3">
                Your Personalized <br />
                <span className="text-primary">Career Roadmap</span>
              </h1>
              <p className="lead text-muted mb-4">
                Confused after Intermediate or B.Tech? Career Genie AI helps
                you discover the right career, build the right skills, and
                follow a personalized roadmap to achieve your dream job.
              </p>
              <Link to="/auth" className="btn btn-lg btn-primary shadow-sm px-5 rounded-pill fw-bold">
                Get Started
              </Link>
            </div>
            <div className="col-lg-6 text-center">
              <img
                src="/images/career-girl.png"
                className="img-fluid rounded shadow-sm"
                alt="Career Journey"
                style={{ maxWidth: "85%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="container my-5 py-4">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Why Choose Career Genie AI?</h2>
          <p className="text-muted lead">
            Everything a student needs to plan and achieve their dream career.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-4 h-100">
              <div className="fs-1 mb-3">🧭</div>
              <h5 className="fw-bold">Personalized Roadmaps</h5>
              <p className="text-muted mb-0">Create step-by-step learning paths based on your goals.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-4 h-100">
              <div className="fs-1 mb-3">🤖</div>
              <h5 className="fw-bold">AI Career Mentor</h5>
              <p className="text-muted mb-0">Ask questions and get AI-powered career guidance.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-4 h-100">
              <div className="fs-1 mb-3">📚</div>
              <h5 className="fw-bold">Learning Resources</h5>
              <p className="text-muted mb-0">Access free courses, videos, and practice platforms.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-4 h-100">
              <div className="fs-1 mb-3">📈</div>
              <h5 className="fw-bold">Track Progress</h5>
              <p className="text-muted mb-0">Monitor your learning journey and stay motivated.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
