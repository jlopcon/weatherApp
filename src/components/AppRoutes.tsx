import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import HomePage from "../pages/Home/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import Topbar from "../components/Topbar/Topbar";
import { useAuthContext } from "../context/AuthProvider";
import ContactPage from "../pages/Contact/ContactPage";

const AppRoutes: React.FC = () => {
  const { loggedIn, logout } = useAuthContext();

  return (
    <Router>
      <Topbar showLogoutButton={loggedIn} onLogout={logout} />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <ContactPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
