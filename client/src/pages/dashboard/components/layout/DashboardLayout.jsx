import { useState } from "react";
import SideBar from "./Sidebar";
import "./DashboardLayout.css";
import Dashboard from "../../Dashboard";
import { Outlet } from "react-router";

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <>
      <div className="dashboard-shell">
        <SideBar
          className={`dashboard-sidebar ${isCollapsed ? "collapsed" : ""} ${isMobileMenuOpen ? "mobile-open" : ""}`}
          isCollapsed={isCollapsed}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileCollapse={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          toggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />

        <div className="content-wrapper">
          {/* <header className="dashboard-header">
            <Header
              isCollapsed={isCollapsed}
              isMobileMenuOpen={isMobileMenuOpen}
              toggleMobileCollapse={() =>
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }
            />
          </header> */}

          <div className="dashboard-main-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
