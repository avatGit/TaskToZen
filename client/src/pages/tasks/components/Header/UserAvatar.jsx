import { useState } from "react";
import { User, Settings, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./UserAvatar.css";

export default function UserAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implémenter la logique de logout (effacer token, etc.)
    console.log("Logout clicked");
    setIsOpen(false);
    // navigate("/login");
  };

  return (
    <div className="user-avatar-wrapper">
      <button
        className="avatar-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Profil utilisateur"
      >
        <div className="avatar-circle">S</div>
      </button>

      {isOpen && (
        <div className="user-dropdown">
          <Link
            to="/profile"
            className="dropdown-item"
            onClick={() => setIsOpen(false)}
          >
            <User size={18} />
            <span>Profil</span>
          </Link>

          <Link
            to="/settings"
            className="dropdown-item"
            onClick={() => setIsOpen(false)}
          >
            <Settings size={18} />
            <span>Paramètres</span>
          </Link>

          <div className="dropdown-separator"></div>

          <button className="dropdown-item logout" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Se déconnecter</span>
          </button>
        </div>
      )}
    </div>
  );
}
