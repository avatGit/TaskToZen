import { Key } from "lucide-react";
import { Clock, List, CircleCheck } from "lucide-react";

export default function RecentActivity() {
  const activity = [
    {
      icon: Clock,
      label: "Tache completée",
      description: "Lire le chapitre 5 - React",
      timeDone: "10:30",
    },
    {
      icon: List,
      label: "Nouvelle tache ajoutée",
      description: "Preparer la presentation",
      timeDone: "09:35",
    },
    {
      icon: CircleCheck,
      label: "Tache completée",
      description: "Exercice Python",
      timeDone: "Hier",
    },
  ];
  return (
    <div className="recent-activity-container">
      <h2>Activité récente</h2>
      <div>
        {activity.map((item) => {
          return (
            <div className="activity-item" key={item.label}>
              <div className="activity-left-part">
                <item.icon size={26} />
                <div className="label-description">
                  <p className="roboto-text">{item.label}</p>
                  <p className="activity-desc">{item.description}</p>
                </div>
              </div>
              <p className="task-duration">{item.timeDone}</p>
            </div>
          );
        })}
      </div>
      <button className="view-all-btn">Voir toutes l'acitivité</button>
    </div>
  );
}
