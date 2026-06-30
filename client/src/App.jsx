import React, { useState } from "react";
import "./App.css";
import { Navigate } from "react-router";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import DashboardLayout from "./pages/dashboard/components/layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Today from "./pages/Today";
import Tasks from "./pages/tasks/Tasks";
import Settings from "./pages/Settings";
import Stats from "./pages/Stats";
import Calendar from "./pages/Calendar";
import Projects from "./pages/Projects";
import UserProfile from "./pages/UserProfile";

const ProtectedLayout = () => {
  const { user, loading } = useAuth();
  console.log("ProtectedLayout - user:", user, "loading:", loading);
  if (loading) {
    return <div>Chargement de votre session...</div>;
  }
  if(!user) return <Navigate to="/login" replace/>

  return <DashboardLayout/>
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/*  Public Routes */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
         
          {/* Protected Routes, Require a valid Cookie */}
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/today" element={<Today />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/settings" element={<Settings/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
