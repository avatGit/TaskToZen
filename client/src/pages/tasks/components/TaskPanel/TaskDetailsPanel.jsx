import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlarmClock,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Edit,
  Expand,
  List,
  MoreHorizontal,
  Plus,
  Settings,
  Tag,
  Tags,
  Trash2,
  X,
  Users,
} from "lucide-react";
import "./TaskDetailsPanel.css";

const PRIORITIES = {
  high: { label: "Haute priorité", color: "high" },
  medium: { label: "Priorité moyenne", color: "medium" },
  low: { label: "Priorité basse", color: "low" },
};

const STATUS_OPTIONS = ["À faire", "En cours", "Terminée"];
const LABEL_OPTIONS = ["Moyenne", "Urgente", "À planifier"];
const TAG_OPTIONS = ["Travail", "Apprentissage", "Personnel"];

function getPriority(value) {
  if (Object.hasOwn(PRIORITIES, value)) {
    return value;
  }
  if (typeof value === "string" && value.toLowerCase().includes("basse")) {
    return "low";
  }
  if (typeof value === "string" && value.toLowerCase().includes("moyenne")) {
    return "medium";
  }
  return "high";
}

function createInitialTask(task) {
  const sourceTask = task || {};

  return {
    ...sourceTask,
    title: sourceTask.title || "",
    description: sourceTask.description || "",
    priority: getPriority(sourceTask.priority),
    status: sourceTask.status || "En cours",
    duration: sourceTask.duration || "",
    dueDate: sourceTask.dueDate || "",
    label: sourceTask.label || "Moyenne",
    tag: sourceTask.tag || sourceTask.category || "Travail",
    tags: sourceTask.tags || (sourceTask.category ? [sourceTask.category] : []),
    notes: sourceTask.notes || "",
    collaborators: sourceTask.collaborators || [],
    subtasks: sourceTask.subtasks || [
      {
        id: `${sourceTask.id || "task"}-subtask`,
        title:
          sourceTask.title === "Finaliser le rapport de projet"
            ? sourceTask.title
            : "Préparer les prochaines étapes",
        completed: false,
      },
    ],
  };
}

function sameTask(firstTask, secondTask) {
  return JSON.stringify(firstTask) === JSON.stringify(secondTask);
}

export default function TaskDetailsPanel({
  task,
  onClose,
  isCreating = false,
  onDeleteTask,
  onDuplicateTask,
  onUpdateTask,
  onAddTask,
}) {
  const createEmptyTask = () => ({
    id: `task-${Date.now()}`,
    title: "Nouvelle tâche",
    description: "",
    priority: "medium",
    status: "À faire",
    duration: "",
    dueDate: "",
    label: "Moyenne",
    tag: "Travail",
    tags: [],
    collaborators: [],
    notes: "",
    subtasks: [],
  });

  const [initialTask, setInitialTask] = useState(() =>
    isCreating ? createEmptyTask() : createInitialTask(task),
  );
  const [currentTask, setCurrentTask] = useState(() =>
    isCreating ? createEmptyTask() : createInitialTask(task),
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [toast, setToast] = useState(null);
  const [deletedTask, setDeletedTask] = useState(null);
  const [showBalanceDialog, setShowBalanceDialog] = useState(false);
  const [showDueDateSelector, setShowDueDateSelector] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState("");
  const toastTimer = useRef(null);
  const hasChanges = !sameTask(initialTask, currentTask);

  const showToast = useCallback((message, action, duration = 3500) => {
    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current);
    }

    setToast({ message, action });
    toastTimer.current = window.setTimeout(() => setToast(null), duration);
  }, []);

  const updateTask = (field, value) => {
    setCurrentTask((current) => ({ ...current, [field]: value }));
  };

  const saveTask = useCallback(
    (source = "manual") => {
      if (isCreating) {
        onAddTask?.(currentTask);
        onClose();
      } else {
        onUpdateTask?.(currentTask);
        setInitialTask(currentTask);
      }
      showToast(isCreating ? "Tâche créée" : "Modifications enregistrées");
    },
    [currentTask, isCreating, onAddTask, onUpdateTask, onClose, showToast],
  );

  const cancelChanges = () => {
    setCurrentTask(initialTask);
    showToast("Modifications annulées");
  };

  useEffect(() => {
    if (!hasChanges || isCreating) {
      return undefined;
    }

    const timer = window.setTimeout(() => saveTask("auto"), 2000);
    return () => window.clearTimeout(timer);
  }, [currentTask, hasChanges, isCreating, saveTask]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        if (hasChanges) {
          saveTask();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasChanges, saveTask]);

  useEffect(
    () => () => {
      if (toastTimer.current) {
        window.clearTimeout(toastTimer.current);
      }
    },
    [],
  );

  if (!task && !isCreating) {
    return null;
  }

  const selectedPriority = PRIORITIES[currentTask.priority] || PRIORITIES.high;
  const completedSubtasks = currentTask.subtasks.filter(
    (subtask) => subtask.completed,
  );

  const toggleSubtask = (subtaskId) => {
    updateTask(
      "subtasks",
      currentTask.subtasks.map((subtask) =>
        subtask.id === subtaskId
          ? { ...subtask, completed: !subtask.completed }
          : subtask,
      ),
    );
  };

  const addSubtask = (event) => {
    event.preventDefault();
    const title = newSubtaskTitle.trim();

    if (!title) {
      return;
    }

    updateTask("subtasks", [
      ...currentTask.subtasks,
      {
        id: `${currentTask.id || "task"}-subtask-${Date.now()}`,
        title,
        completed: false,
      },
    ]);
    setNewSubtaskTitle("");
    setIsAddingSubtask(false);
  };

  const handleDelete = () => {
    const taskToDelete = currentTask;
    onDeleteTask?.(taskToDelete.id);
    setDeletedTask(taskToDelete);
    showToast(
      "Tâche supprimée",
      () => {
        onAddTask?.(taskToDelete);
        setDeletedTask(null);
        showToast("Suppression annulée");
      },
      5000,
    );
  };

  const handleDuplicate = () => {
    onDuplicateTask?.(currentTask.id);
    setShowActionMenu(false);
    showToast("Tâche dupliquée");
  };

  const handleArchive = () => {
    setShowActionMenu(false);
    showToast("Tâche archivée");
  };

  const handleBalanceYes = () => {
    setShowBalanceDialog(false);
    const subtask1 = {
      id: `${currentTask.id}-subtask-balance-1`,
      title: `${currentTask.title} – partie 1`,
      completed: false,
    };
    const subtask2 = {
      id: `${currentTask.id}-subtask-balance-2`,
      title: `${currentTask.title} – partie 2`,
      completed: false,
    };
    updateTask("subtasks", [subtask1, subtask2]);
    updateTask("duration", "1h");
    showToast("Tâche découpée en 2 sous-tâches");
  };

  const handleBalanceNo = () => {
    setShowBalanceDialog(false);
    showToast("Action annulée");
  };

  const addCollaborator = () => {
    const email = newCollaboratorEmail.trim();
    if (!email || currentTask.collaborators.includes(email)) {
      return;
    }
    updateTask("collaborators", [...currentTask.collaborators, email]);
    setNewCollaboratorEmail("");
  };

  const removeCollaborator = (email) => {
    updateTask(
      "collaborators",
      currentTask.collaborators.filter((e) => e !== email),
    );
  };

  const setDueDate = (dateValue) => {
    updateTask("dueDate", dateValue);
    setShowDueDateSelector(false);
    showToast(`Échéance fixée à ${dateValue}`);
  };

  const triggerAction = (actionName) => {
    if (actionName === "Équilibrer") {
      setShowBalanceDialog(true);
    } else if (actionName === "Échéance") {
      setShowDueDateSelector(true);
    } else if (actionName === "Actions") {
      setShowActionMenu(true);
    }
  };

  const updateTags = (value) => {
    updateTask(
      "tags",
      value
        .split(",")
        .map((tagName) => tagName.trim())
        .filter(Boolean),
    );
  };

  const fieldClassName = (field) =>
    `task-details-field${!sameTask(initialTask[field], currentTask[field]) ? " is-dirty" : ""}`;

  return (
    <aside
      className={`task-details-panel${isExpanded ? " is-expanded" : ""}`}
      aria-label="Détails de la tâche"
    >
      <header className="task-details-header">
        <h2>Task Details</h2>
        <div className="task-details-header-actions">
          <button
            type="button"
            className="task-details-icon-button"
            onClick={() => setIsExpanded((expanded) => !expanded)}
            aria-label={
              isExpanded ? "Réduire le panneau" : "Agrandir le panneau"
            }
          >
            <Expand size={18} />
          </button>
          <button
            type="button"
            className="task-details-icon-button"
            onClick={onClose}
            aria-label="Fermer le panneau de détails"
          >
            <X size={19} />
          </button>
        </div>
      </header>

      <div className="task-details-scroll-area">
        <div className={`task-details-title ${fieldClassName("title")}`}>
          <span
            className={`task-details-title-checkbox${currentTask.status === "Terminée" ? " is-checked" : ""}`}
            aria-hidden="true"
          >
            {currentTask.status === "Terminée" && <Check size={14} />}
          </span>
          <input
            className="task-details-title-input"
            value={currentTask.title}
            onChange={(event) => updateTask("title", event.target.value)}
            aria-label="Titre de la tâche"
          />
        </div>

        <div
          className={`task-details-description ${fieldClassName("description")}`}
        >
          <textarea
            value={currentTask.description}
            onChange={(event) => updateTask("description", event.target.value)}
            placeholder="Ajouter une description..."
            aria-label="Description"
          />
        </div>

        <div className="task-details-properties">
          <label
            className={`task-details-property ${fieldClassName("priority")}`}
          >
            <span className="task-details-property-label">
              <List size={17} aria-hidden="true" />
              Priorité
            </span>
            <span
              className={`task-details-select-wrap priority-${selectedPriority.color}`}
            >
              <span className="task-details-color-dot" aria-hidden="true" />
              <select
                aria-label="Priorité"
                value={currentTask.priority}
                onChange={(event) => updateTask("priority", event.target.value)}
              >
                {Object.entries(PRIORITIES).map(([value, option]) => (
                  <option key={value} value={value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} aria-hidden="true" />
            </span>
          </label>

          <label
            className={`task-details-property ${fieldClassName("status")}`}
          >
            <span className="task-details-property-label">
              <Clock3 size={17} aria-hidden="true" />
              Statut
            </span>
            <span className="task-details-select-wrap">
              <span
                className="task-details-color-dot status-dot"
                aria-hidden="true"
              />
              <select
                aria-label="Statut"
                value={currentTask.status}
                onChange={(event) => updateTask("status", event.target.value)}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} aria-hidden="true" />
            </span>
          </label>

          <label className={`task-details-property ${fieldClassName("label")}`}>
            <span className="task-details-property-label">
              <Tags size={17} aria-hidden="true" />
              Étiquettes
            </span>
            <span className="task-details-select-wrap label-select">
              <span
                className="task-details-color-dot label-dot"
                aria-hidden="true"
              />
              <select
                aria-label="Étiquette"
                value={currentTask.label}
                onChange={(event) => updateTask("label", event.target.value)}
              >
                {LABEL_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} aria-hidden="true" />
            </span>
          </label>

          <label className={`task-details-property ${fieldClassName("tag")}`}>
            <span className="task-details-property-label">
              <Tag size={17} aria-hidden="true" />
              Tag
            </span>
            <span className="task-details-select-wrap">
              <select
                aria-label="Tag"
                value={currentTask.tag}
                onChange={(event) => updateTask("tag", event.target.value)}
              >
                {TAG_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} aria-hidden="true" />
            </span>
          </label>

          <label
            className={`task-details-property ${fieldClassName("duration")}`}
          >
            <span className="task-details-property-label">
              <AlarmClock size={17} aria-hidden="true" />
              Durée
            </span>
            <input
              className="task-details-input"
              value={currentTask.duration}
              onChange={(event) => updateTask("duration", event.target.value)}
              placeholder="Ex. 2h"
              aria-label="Durée estimée"
            />
          </label>

          <label
            className={`task-details-property ${fieldClassName("dueDate")}`}
          >
            <span className="task-details-property-label">
              <CalendarDays size={17} aria-hidden="true" />
              Date limite
            </span>
            <input
              className="task-details-input"
              value={currentTask.dueDate}
              onChange={(event) => updateTask("dueDate", event.target.value)}
              placeholder="Ex. 12 Juin"
              aria-label="Date limite"
            />
          </label>

          <label className={`task-details-property ${fieldClassName("tags")}`}>
            <span className="task-details-property-label">
              <Tags size={17} aria-hidden="true" />
              Tags
            </span>
            <input
              className="task-details-input"
              value={currentTask.tags.join(", ")}
              onChange={(event) => updateTags(event.target.value)}
              placeholder="Séparer par des virgules"
              aria-label="Tags"
            />
          </label>

          <label className={`task-details-property ${fieldClassName("collaborators")}`}>
            <span className="task-details-property-label">
              <Users size={17} aria-hidden="true" />
              Collaborateurs
            </span>
            <div className="task-details-collaborators">
              {currentTask.collaborators.map((email) => (
                <span key={email} className="task-details-collaborator-chip">
                  {email}
                  <button
                    type="button"
                    className="task-details-icon-button"
                    onClick={() => removeCollaborator(email)}
                    aria-label={`Supprimer ${email}`}
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                </span>
              ))}
              <input
                className="task-details-input"
                value={newCollaboratorEmail}
                onChange={(event) => setNewCollaboratorEmail(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addCollaborator();
                  }
                }}
                placeholder="exemple@email.com"
                aria-label="Ajouter un collaborateur"
              />
              <button
                type="button"
                className="task-details-icon-button"
                onClick={addCollaborator}
                aria-label="Ajouter le collaborateur"
              >
                <Plus size={16} aria-hidden="true" />
              </button>
            </div>
          </label>
        </div>

        <section
          className={`task-details-subtasks ${fieldClassName("subtasks")}`}
          aria-labelledby="subtasks-title"
        >
          <div className="task-details-section-heading">
            <h4 id="subtasks-title">Subtasks</h4>
            <span className="task-details-subtask-count">
              {completedSubtasks.length}/{currentTask.subtasks.length}
            </span>
            <div className="task-details-section-actions">
              <button
                type="button"
                className="task-details-icon-button"
                onClick={() => setIsAddingSubtask((adding) => !adding)}
                aria-label="Ajouter une sous-tâche"
              >
                <Plus size={19} />
              </button>

              {/* Bouton qui supprime toutes les sous taches (Dangereux. A revoir) */}
              {/* <button
                type="button"
                className="task-details-icon-button task-details-danger"
                onClick={() => updateTask("subtasks", [])}
                aria-label="Supprimer toutes les sous-tâches"
              >
                <Trash2 size={17} />
              </button> */}
            </div>
          </div>

          {currentTask.subtasks.map((subtask) => (
            <div className="task-details-subtask" key={subtask.id}>
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() => toggleSubtask(subtask.id)}
                aria-label={`Terminer ${subtask.title}`}
              />
              <input
                className={subtask.completed ? "is-completed" : ""}
                type="text"
                value={subtask.title}
                onChange={(event) =>
                  updateTask(
                    "subtasks",
                    currentTask.subtasks.map((item) =>
                      item.id === subtask.id
                        ? { ...item, title: event.target.value }
                        : item,
                    ),
                  )
                }
                aria-label="Titre de la sous-tâche"
              />
              <div className="task-details-subtask-actions">
                <button
                  type="button"
                  className="task-details-icon-button"
                  onClick={() =>
                    updateTask(
                      "subtasks",
                      currentTask.subtasks.filter(
                        (item) => item.id !== subtask.id,
                      ),
                    )
                  }
                  aria-label={`Supprimer ${subtask.title}`}
                >
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>
          ))}

          {isAddingSubtask && (
            <form className="task-details-add-subtask" onSubmit={addSubtask}>
              <input
                autoFocus
                value={newSubtaskTitle}
                onChange={(event) => setNewSubtaskTitle(event.target.value)}
                placeholder="Nouvelle sous-tâche"
                aria-label="Nom de la nouvelle sous-tâche"
              />
              <button type="submit" aria-label="Enregistrer la sous-tâche">
                <Check size={16} />
              </button>
              <button
                type="button"
                onClick={() => setIsAddingSubtask(false)}
                aria-label="Annuler l'ajout"
              >
                <X size={16} />
              </button>
            </form>
          )}
        </section>

        <section
          className={`task-details-notes ${fieldClassName("notes")}`}
          aria-labelledby="task-notes-title"
        >
          <label htmlFor="task-notes" id="task-notes-title">
            Notes
          </label>
          <textarea
            id="task-notes"
            value={currentTask.notes}
            onChange={(event) => updateTask("notes", event.target.value)}
            placeholder="Voir un comment..."
          />
        </section>
      </div>

      <footer className="task-details-footer">
        {hasChanges || isCreating ? (
          <div className="task-details-save-actions">
            <button type="button" onClick={cancelChanges}>
              Annuler
            </button>
            <button
              type="button"
              className="task-details-footer-primary"
              onClick={() => saveTask()}
            >
              <Check size={16} />
              <span>{isCreating ? "Créer la tâche" : "Enregistrer"}</span>
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              className="task-details-footer-primary"
              onClick={() => triggerAction("Équilibrer")}
            >
              <AlarmClock size={16} />
              <span>Équilibrer</span>
            </button>
            <button type="button" onClick={() => triggerAction("Échéance")}>
              <CalendarDays size={16} />
              <span>Échéance</span>
            </button>
            <button type="button" onClick={() => triggerAction("Actions")}>
              <Settings size={16} />
              <span>Actions</span>
            </button>

            <button
              type="button"
              className="task-details-footer-icon task-details-danger"
              onClick={handleDelete}
              aria-label="Supprimer la tâche"
            >
              <Trash2 size={17} />
            </button>
          </>
        )}
      </footer>

      {toast && (
        <div className="task-details-toast" role="status" aria-live="polite">
          <span>{toast.message}</span>
          {toast.action && (
            <button type="button" onClick={toast.action}>
              Annuler
            </button>
          )}
        </div>
      )}

      {showBalanceDialog && (
        <div className="task-details-dialog-overlay" onClick={handleBalanceNo}>
          <div
            className="task-details-dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <p>
              Suggestion : Cette tâche prend 2h. Voulez-vous la découper en 2
              sous-tâches ?
            </p>
            <div className="task-details-dialog-actions">
              <button type="button" onClick={handleBalanceYes}>
                Oui
              </button>
              <button type="button" onClick={handleBalanceNo}>
                Non
              </button>
            </div>
          </div>
        </div>
      )}

      {showDueDateSelector && (
        <div
          className="task-details-dialog-overlay"
          onClick={() => setShowDueDateSelector(false)}
        >
          <div
            className="task-details-dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <p>Choisir une échéance rapide</p>
            <div className="task-details-dialog-actions">
              <button type="button" onClick={() => setDueDate("Aujourd'hui")}>
                Aujourd'hui
              </button>
              <button type="button" onClick={() => setDueDate("Demain")}>
                Demain
              </button>
              <button
                type="button"
                onClick={() => setDueDate("Semaine prochaine")}
              >
                Semaine prochaine
              </button>
            </div>
          </div>
        </div>
      )}

      {showActionMenu && (
        <div
          className="task-details-dialog-overlay"
          onClick={() => setShowActionMenu(false)}
        >
          <div
            className="task-details-dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <p>Actions sur la tâche</p>
            <div className="task-details-dialog-actions">
              <button type="button" onClick={handleDuplicate}>
                Dupliquer
              </button>
              <button type="button" onClick={handleArchive}>
                Archiver
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
