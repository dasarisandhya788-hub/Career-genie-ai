import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import StudentDetails from "./pages/StudentDetails";
import Roadmap from "./pages/Roadmap";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import SetupInstructions from "./pages/SetupInstructions";
import SelectCareer from "./pages/SelectCareer";
import DiscoverCareer from "./pages/DiscoverCareer";
import StudentProfile from "./pages/StudentProfile";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { isConfigMissing } from "./firebase/config";

function App() {
  // If required Firebase configuration environment variables are missing, 
  // immediately render helpful setup instructions instead of crashing the SDK.
  if (isConfigMissing) {
    return <SetupInstructions />;
  }

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public default landing route (About page) */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />

          {/* Authentication login/register route */}
          <Route
            path="/auth"
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          />

          {/* Onboarding route */}
          <Route
            path="/select-career"
            element={
              <ProtectedRoute>
                <SelectCareer />
              </ProtectedRoute>
            }
          />

          {/* Unsure Student Profile onboarding page */}
          <Route
            path="/student-profile"
            element={
              <ProtectedRoute>
                <StudentProfile />
              </ProtectedRoute>
            }
          />

          {/* Career Discovery wizard page */}
          <Route
            path="/discover-career"
            element={
              <ProtectedRoute>
                <DiscoverCareer />
              </ProtectedRoute>
            }
          />

          {/* Authenticated-only routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student"
            element={
              <ProtectedRoute>
                <StudentDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roadmap"
            element={
              <ProtectedRoute>
                <Roadmap />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
