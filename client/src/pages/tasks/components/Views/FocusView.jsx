import { useState } from "react";
import { Archive, Clock, Flame, Trash2, Users, Copy } from "lucide-react";
import "./FocusView.css";

export default function FocusView({
  tasks = [],
  onSelectTask,
  onDeleteTask,
  onDuplicateTask,
  onArchiveTask,
}) {
  const [completedTasks, setCompletedTasks] = useState([]);
  const activeTaskCount = tasks.length - completedTasks.length;

  const toggleCompleted = (taskId) => {
    setCompletedTasks((currentTasks) =>
      currentTasks.includes(taskId)
        ? currentTasks.filter((id) => id !== taskId)
        : [...currentTasks, taskId],
    );
  };

  const stopCardClick = (event) => {
    event.stopPropagation();
  };

  return (
    <section className="focus-view" aria-labelledby="focus-view-title">
      <header className="focus-view-header">
        <div className="focus-view-heading">
          <Flame size={20} aria-hidden="true" />
          <h2 id="focus-view-title">Mes priorités du moment</h2>
          <span
            className="focus-view-count"
            aria-label={`${activeTaskCount} tâches actives`}
          >
            {activeTaskCount}
          </span>
        </div>
      </header>

      <div className="focus-task-list">
        {tasks.map((task) => {
          const isCompleted = completedTasks.includes(task.id);
          const visibleCollaborators = task.collaborators?.slice(0, 2) || [];
          const additionalCollaborators =
            (task.collaborators?.length || 0) - visibleCollaborators.length;

          return (
            <article
              key={task.id}
              className={`focus-task-card priority-${task.priority}${isCompleted ? " is-completed" : ""}`}
              onClick={() => onSelectTask?.(task)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelectTask?.(task);
                }
              }}
              tabIndex={0}
              aria-label={`Ouvrir les détails de ${task.title}`}
            >
              <input
                className="focus-task-checkbox"
                type="checkbox"
                checked={isCompleted}
                onChange={() => toggleCompleted(task.id)}
                onClick={stopCardClick}
                onKeyDown={stopCardClick}
                aria-label={`Marquer ${task.title} comme terminée`}
              />
              <div className="focus-task-content">
                <div className="focus-task-title-row">
                  <h3>{task.title}</h3>
                  <span className="focus-task-category">{task.category}</span>
                </div>
                <div className="focus-task-details">
                  <span>{task.dueDate}</span>
                  <span className="focus-task-duration">
                    <Clock size={14} aria-hidden="true" />
                    {task.duration}
                  </span>
                  {task.collaborators && task.collaborators.length > 0 && (
                    <span
                      className="focus-task-collaborators"
                      aria-label="Collaborateurs"
                    >
                      <Users size={14} aria-hidden="true" />
                      <span className="focus-task-avatars">
                        {visibleCollaborators.map((collaborator, index) => (
                          <span
                            key={`${task.id}-${collaborator}-${index}`}
                            className="focus-task-avatar"
                            aria-label={`Collaborateur ${collaborator}`}
                          >
                            {collaborator.slice(0, 2)}
                          </span>
                        ))}
                        {additionalCollaborators > 0 && (
                          <span className="focus-task-avatar focus-task-avatar-more">
                            +{additionalCollaborators}
                          </span>
                        )}
                      </span>
                    </span>
                  )}
                </div>
                <div className="focus-task-progress">
                  <span>{task.progress || 0}%</span>
                  <div
                    className="focus-task-progress-track"
                    role="progressbar"
                    aria-label={`Progression de ${task.title}`}
                    aria-valuenow={task.progress || 0}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <span style={{ width: `${task.progress || 0}%` }} />
                  </div>
                </div>
              </div>
              <div
                className="task-actions"
                onClick={stopCardClick}
                onKeyDown={stopCardClick}
              >
                <button
                  type="button"
                  aria-label={`Archiver ${task.title}`}
                  onClick={() => onArchiveTask?.(task.id)}
                >
                  <Archive size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label={`Dupliquer ${task.title}`}
                  onClick={() => onDuplicateTask?.(task.id)}
                >
                  <Copy size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label={`Supprimer ${task.title}`}
                  onClick={() => onDeleteTask?.(task.id)}
                >
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
