const PRIORITY_CLASSES = {
  Elevée: "priority-high",
  Moyenne: "priority-medium",
  Basse: "priority-low",
};
export default function UpComingDeadLine() {
  const deadLines = [
    {
      id: 1,
      date: { day: "10", month: "Juin" },
      label: "Presentation de projet",
      category: "Travail",
      deadLine: "Dans 2 jours",
      priorityType: "Elevée",
    },
    {
      id: 2,
      date: { day: "15", month: "Juin" },
      label: "Examen Structures de Donnees",
      category: "Revision",
      deadLine: "Dans 7 jours",
      priorityType: "Moyenne",
    },
    {
      id: 3,
      date: { day: "20", month: "Juin" },
      label: "Projet Web-Livraison",
      category: "Travail",
      deadLine: "Dans 12 jours",
      priorityType: "Elevée",
    },
  ];
  return (
    <div className="deadline-container">
      <h2>Prochaines Echeances</h2>
      <div className="deadline-items">
        {deadLines.map((item) => {
          const priorityClass =
            PRIORITY_CLASSES[item.priorityType] || "priority-default";
          return (
            <div className="deadline-item" key={item.id}>
              <div className="deadline-left-part">
                <div className="deadline-date">
                  <p>{item.date.day}</p>
                  <p>{item.date.month}</p>
                </div>
                <p className="roboto-text">{item.label}</p>
                <p className="deadline-category">{item.category}</p>
              </div>
              <div className="deadline-right-part">
                <p className="until-deadline">{item.deadLine}</p>
                <div className={`priority-type ${priorityClass} `}>
                  {item.priorityType}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
