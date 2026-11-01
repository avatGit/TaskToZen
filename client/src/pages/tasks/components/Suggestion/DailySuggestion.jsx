import "./DailySuggestion.css";
import { Lightbulb } from "lucide-react";

export default function DailySuggestion() {
  return (
    <div className="daily-suggestion">
      <div className="suggestion-left">
        <div className="lightbulb-icon">
          <Lightbulb
            size={28}
            color="#d6bb41"
            fill="#fff8d9"
            className="icon-glow"
          />
        </div>
        <div className="suggestion-text">
          <span>Suggestion du jour</span>
          <p>Commence par "Apprendre React Hooks" · 1h · Priorité moyenne</p>
        </div>
      </div>
      <button className="btn-pourquoi">Voir pourquoi</button>
    </div>
  );
}
