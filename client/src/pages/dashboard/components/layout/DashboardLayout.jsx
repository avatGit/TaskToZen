import { useState } from "react";
import SideBar from "./Sidebar";
import Header from "./Header";
import Dashboard from "../../Dashboard";
import "./DashboardLayout.css";
import { useAuth } from "../../../../hooks/useAuth";

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="dashboard-shell">
        <aside
          className={`dashboard-sidebar ${isCollapsed ? "collapsed" : ""} ${isMobileMenuOpen ? "mobile-open" : ""}`}
        >
          <SideBar
            isCollapsed={isCollapsed}
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileCollapse={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            toggleCollapse={() => setIsCollapsed(!isCollapsed)}
          />
        </aside>

        <div className="content-wrapper">
          <header className="dashboard-header">
            <Header
              isCollapsed={isCollapsed}
              isMobileMenuOpen={isMobileMenuOpen}
              toggleMobileCollapse={() =>
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }
            />
          </header>

          <div className="dashboard-main-content">
            {/* {children} */}
            <Dashboard />
          </div>
        </div>
      </div>
    </>
  );
}
