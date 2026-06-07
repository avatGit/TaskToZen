import { useState } from "react";
import { X, Menu, UserRound } from "lucide-react";
import { Link } from "react-router";

export default function SideBar() {
  const [profile, setProfile] = useState({
    name: "User",
    avatar: null,
  });

  const [isOpen, setIspoen] = useState(false);
  const toggleMenu = () => {
    setIspoen(!isOpen);
  };
  const defaultAvatar = profile.name
    ? profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : null;

  return (
    <>
      <div style={{ position: "relative" }}>
        {/*  The Menu Icon Button */}
        <button
          onClick={() => toggleMenu()}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            color: "#3b3a36",
          }}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* The Floating Dropdown Box */}
        {isOpen && (
          <div
            style={{
              position: "absolute",
              right: "0",
              top: "50px",
              zIndex: 999 /* Places it safely on top of main content */,
              backgroundColor: "#3b3a36",
              color: "#ffffff",
              width: "260px",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <div className="profile-preview" style={{ marginBottom: "15px" }}>
              <UserRound size={48} className="text-green-500" />
              <h3>{profile.name}</h3>
            </div>

            <div
              className="sidebar-shortcuts"
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Dashboard
              </Link>
              <Link
                to="/today"
                onClick={() => setIsOpen(false)}
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Aujourd'hui
              </Link>
              <Link
                to="/tasks"
                onClick={() => setIsOpen(false)}
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Taches
              </Link>
              <Link
                to="/projects"
                onClick={() => setIsOpen(false)}
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Projets
              </Link>
              <Link
                to="/calendar"
                onClick={() => setIsOpen(false)}
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Calendrier
              </Link>
              <Link
                to="/stats"
                onClick={() => setIsOpen(false)}
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Statistiques
              </Link>
              <Link
                to="/settings"
                onClick={() => setIsOpen(false)}
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Parametres
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
