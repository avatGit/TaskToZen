import { Clock, List, CircleCheck } from "lucide-react";

export default function RecentActivity() {
  const activity = [
    {
      type: "completed",
      label: "Tache completée",
      description: "Lire le chapitre 5 - React",
      timeDone: "10:30",
    },
    {
      type: "added",
      label: "Nouvelle tache ajoutée",
      description: "Preparer la presentation",
      timeDone: "09:35",
    },
    {
      type: "completed_alt",
      label: "Tache completée",
      description: "Exercice Python",
      timeDone: "Hier",
    },
  ];
  const renderIcon = (type) => {
    switch (type) {
      case "completed":
        return <Clock />;
      case "added":
        return <List />;
      case "completed_alt":
        return <CircleCheck />;
      default:
        return null;
    }
  };
  return (
    <div className="recent-activity-container">
      <h2 style={{ marginTop: "0" }}>Activité récente</h2>
      <div>
        {activity.map((item) => {
          return (
            <div className="activity-item" key={item.type}>
              <div className="activity-left-part">
                {renderIcon(item.type)}
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
      <button className="view-all-btn">Voir toute l'acitivité</button>
    </div>
  );
}
