import { useState } from "react";
import "./PriorityReminder.css";
import { AlertCircle, X } from "lucide-react";

export default function PriorityReminder() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <aside className="priority-reminder">
      <div className="reminder-content">
        <AlertCircle
          className="reminder-alert-icon"
          size={16}
          aria-hidden="true"
        />
        <h2 title="Finaliser le rapport de projet">
          Finaliser le rapport de projet
        </h2>
      </div>
      <button
        type="button"
        className="reminder-close"
        onClick={() => setIsVisible(false)}
        aria-label="Fermer le rappel de priorité"
      >
        <X size={16} />
      </button>
    </aside>
  );
}
