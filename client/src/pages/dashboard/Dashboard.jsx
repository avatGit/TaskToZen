import React from "react";
import { useAuth } from "../../hooks/useAuth";
import "./Dashboard.css";
import "./components/layout/DashboardLayout.css";
import { Plus } from "lucide-react";
import NotificationBell from "../../components/NotificationBell";
import StatsCard from "./components/Stats/StatsCard.jsx";
import StatsGrid from "./components/Stats/StatsGrid";
import RecentActivity from "./components/Activity/RecentActivity";
import TaskItem from "./components/Tasks/TaskItem";
import PriorityTask from "./components/Tasks/PriorityTask";
import UpComingDeadLine from "./components/Tasks/UpComingDeadLine";
import TimeDistribution from "./components/Charts/TimeDistribution";

export default function Dashboard() {
  const { user } = useAuth();
  const userName = user?.name || "User";
  const today = new Date();
  const formatedDate = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(today);

  return (
    <div className="dashboard-container">
      <section className="dashboard-header">
        <h1>
          <span>TaskTo</span>
          <span>Zen</span>
        </h1>

        <div className="header-actions">
          <button className="header-button">
            <Plus size={15} strokeWidth={2.5} />
            <span>Nouvelle Tache</span>
          </button>
          <NotificationBell />
        </div>
      </section>

      <div className="dashboard-body-content">
        <section className="dashboard-welcome">
          <h1>
            Bonjour<span> {userName}</span>, pret a accomplir tes objectifs
            Aujourd'hui ?
          </h1>
          <div className="welcome-second-part">
            <h3 style={{ textTransform: "capitalize" }}>{formatedDate}</h3>
            <p>Tu as 3 taches prioritaires pour aujourd'hui</p>
          </div>
        </section>

        <section className="dashboard-stats-section">
          <StatsGrid />
        </section>

        <section className="dashboard-body">
          <div className="dashboard-left-column">
            <PriorityTask />
            <UpComingDeadLine />
          </div>
          <div className="dashboard-right-column">
            <RecentActivity />
            <TimeDistribution />
          </div>
        </section>
      </div>
    </div>
  );
}
