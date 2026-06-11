import { Bell, Plus } from "lucide-react";

export default function Header({ isMobileMenuOpen, toggleMobileCollapse }) {
  return (
    <>
      <div>
        <h1>
          <span>TaskTo</span>
          <span>Zen</span>
        </h1>
      </div>

      <div className="header-actions">
        <button className="header-button">
          <Plus size={20} strokeWidth={2.5} />
          <span>Nouvelle Tache</span>
        </button>
        <button className="notification-badge">
          <Bell size={25} />
          <span className="badge">3</span>
        </button>
      </div>
    </>
  );
}
