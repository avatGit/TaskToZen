import { useState } from "react";
import { Bell } from "lucide-react";
import "./NotificationBell.css";

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    message: "Tâche urgente: Rapport à rendre",
    timestamp: "À l'instant",
  },
  {
    id: 2,
    message: "Deadline approche: Présentation client",
    timestamp: "Il y a 5 min",
  },
  {
    id: 3,
    message: "Vous avez une nouvelle mention",
    timestamp: "Il y a 1h",
  },
];

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = MOCK_NOTIFICATIONS.length;

  return (
    <div className="notification-bell-wrapper">
      <button
        className="notification-bell-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell size={22} />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notifications</h3>
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
              title="Fermer"
            >
              ✕
            </button>
          </div>

          <div className="notification-list">
            {MOCK_NOTIFICATIONS.map((notif) => (
              <div key={notif.id} className="notification-item">
                <p className="notification-message">{notif.message}</p>
                <span className="notification-time">{notif.timestamp}</span>
              </div>
            ))}
          </div>

          <div className="notification-footer">
            <button className="see-all-btn">Voir tout</button>
          </div>
        </div>
      )}
    </div>
  );
}
