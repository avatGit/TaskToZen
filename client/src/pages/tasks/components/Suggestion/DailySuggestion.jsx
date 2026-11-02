import "./DailySuggestion.css";
import { Lightbulb, ArrowRight } from "lucide-react";

export default function DailySuggestion({ suggestedTask, onViewTask }) {
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
          {suggestedTask ? (
            <p>
              Commence par "{suggestedTask.title}" ·{" "}
              {suggestedTask.duration} · Priorité{" "}
              {suggestedTask.priority.charAt(0).toUpperCase() +
                suggestedTask.priority.slice(1)}
            </p>
          ) : (
            <p>Aucune tâche prioritaire suggérée aujourd'hui.</p>
          )}
        </div>
      </div>
      {suggestedTask && (
        <button
          className="btn-voir-tache"
          type="button"
          onClick={() => onViewTask(suggestedTask)}
          aria-label={`Voir la tâche ${suggestedTask.title}`}
        >
          <ArrowRight size={16} aria-hidden="true" />
          <span>Voir la tâche</span>
        </button>
      )}
    </div>
  );
}
