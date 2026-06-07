import { Children } from "react";
import SideBar from "./Sidebar";
import Header from "./Header";
import "./DashboardLayout.css";

export default function DashboardLayout({ children }) {
  return (
    <>
      <div className="dashboard-shell">
        <aside className="dashboard-sidebar">
          <SideBar />
        </aside>

        <div className="content-wrapper">
          <header className="dashboard-header">
            <Header />
          </header>

          <div className="dashboard-main-content">{children}</div>
        </div>
      </div>
    </>
  );
}
