import { Focus, Zap, List } from "lucide-react";
import "./ViewModeToggle.css";

export default function ViewModeToggle({ currentMode, onModeChange }) {
  const modes = [
    { id: "focus", label: "Focus", icon: Focus },
    { id: "flow", label: "Flow", icon: Zap },
    { id: "list", label: "Liste", icon: List },
  ];

  return (
    <div className="view-mode-toggle">
      {modes.map((mode) => {
        const Icon = mode.icon;
        return (
          <button
            key={mode.id}
            className={`mode-btn ${currentMode === mode.id ? "active" : ""}`}
            onClick={() => onModeChange(mode.id)}
            title={mode.label}
          >
            <Icon size={20} />
            <span className="mode-label">{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
}
