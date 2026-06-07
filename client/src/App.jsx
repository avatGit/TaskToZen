import React, { useState } from "react";
import "./App.css";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router";
import DashboardLayout from "./pages/dashboard/components/layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Today from "./pages/Today";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import Stats from "./pages/Stats";
import Calendar from "./pages/Calendar";
import Projects from "./pages/Projects";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/today" element={<Today />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
