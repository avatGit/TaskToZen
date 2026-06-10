import React, { useState } from "react";
import "./App.css";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import DashboardLayout from "./pages/dashboard/components/layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Today from "./pages/Today";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import Stats from "./pages/Stats";
import Calendar from "./pages/Calendar";
import Projects from "./pages/Projects";
import UserProfile from "./pages/UserProfile";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading your session...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />} />
          {/* Authentification Pages */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes, Require a valid Cookie */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/today" element={<Today />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>

          <Route path="/calendar" element={<Calendar />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
