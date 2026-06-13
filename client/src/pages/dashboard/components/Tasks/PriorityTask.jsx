import TaskItem from "./TaskItem";

export default function PriorityTask() {
  const tasks = [
    {
      priorityColor: "red",
      label: "Finaliser le rapport de projet",
      category: "travail",
      duration: "2h",
    },
    {
      priorityColor: "orange",
      label: "Apprendre React: Hooks avances",
      category: "Apprentissage",
      duration: "1h",
    },
    {
      priorityColor: "green",
      label: "Reviser les structure de donnees",
      category: "Revision",
      duration: "1h30",
    },
  ];
  return (
    <div className="task-priority-container">
      <h2 style={{ marginTop: "0" }}>Mes 3 Priorites du Jour</h2>
      <div className="tasks">
        {tasks.map((item) => {
          return (
            <TaskItem
              key={item.label}
              priorityColor={item.priorityColor}
              label={item.label}
              category={item.category}
              duration={item.duration}
            />
          );
        })}
      </div>
      <button className="view-all-btn">Voir toutes mes Taches</button>
    </div>
  );
}
