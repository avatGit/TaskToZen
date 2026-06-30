import { useState } from "react";
import {
  X,
  Menu,
  ChevronLeft,
  ChevronRight,
  Home,
  Calendar,
  Folder,
  Settings,
  BarChart2,
  CheckSquare,
  LogOut,
  User,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import "./DashboardLayout";

export default function SideBar({
  className,
  isCollapsed,
  isMobileMenuOpen,
  toggleMobileCollapse,
  toggleCollapse,
}) {
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Calendar, label: "Aujourd'hui", path: "/today" },
    { icon: Folder, label: "Projets", path: "/projects" },
    { icon: CheckSquare, label: "Taches", path: "/tasks" },
    { icon: Calendar, label: "Calendrier", path: "/calendar" },
    { icon: BarChart2, label: "Statistiques", path: "/stats" },
    { icon: Settings, label: "Parametres", path: "/settings" },
  ];

  return (
    <>
      <aside className={className}>
        <div className="sidebar-header">
          {!isCollapsed && <h2>TaskToZen</h2>}

          <button onClick={toggleCollapse} className="sidebar-toggle-btn">
            {isCollapsed ? (
              <Menu size={24} />
            ) : (
              <X onClick={toggleMobileCollapse} size={24} />
            )}
          </button>
        </div>

        <div className="sidebar-profile">
          <div className="avatar">
            <User size={32} />
          </div>
          <Link to="/profile" className="profile-link">
            {!isCollapsed && <span>User</span>}
          </Link>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink key={item.path} to={item.path} className="nav-item">
              <item.icon size={24} />
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}

        <div className="sidebar-footer">
          <Link to="/login" className="nav-item logout">
            <LogOut size={24} />
            {!isCollapsed && <span>Se Deconnecter</span>}
          </Link>
        </div>
        <button
          className={` sidebar-toggle ${!isMobileMenuOpen ? "mobile-sidebar-closed" : "mobile-sidebar-open"}`}
          onClick={toggleMobileCollapse}
        >
          {isMobileMenuOpen ? (
            <ChevronLeft size={30} />
          ) : (
            <ChevronRight size={20} />
          )}
        </button>
      </aside>
    </>
  );
}
