import { useState, useCallback, useRef } from "react";
import TaskHeader from "./components/Header/TaskHeader";
import FilterBar from "./components/Filters/FilterBar";
import DailySuggestion from "./components/Suggestion/DailySuggestion";
import PriorityReminder from "./components/Reminder/PriorityReminder";
import FocusView from "./components/Views/FocusView";
import FlowView from "./components/Views/FlowView";
import ListView from "./components/Views/ListView";
import TaskDetailsPanel from "./components/TaskPanel/TaskDetailsPanel";
import DayOverview from "./components/Overview/DayOverview";
import SearchBar from "./components/Header/SearchBar";
import "./Tasks.css";
import { Filter } from "lucide-react";

const TESTITEMS = ["java", "Javascript", "Python", "React", "Flutter"];

const INITIAL_TASKS = [
  {
    id: "task-1",
    title: "Finaliser le rapport de projet",
    description: "Rédiger la conclusion et relire l'ensemble du document.",
    priority: "high",
    status: "En cours",
    duration: "2h",
    dueDate: "12 Juin",
    label: "Moyenne",
    tag: "Travail",
    tags: ["Travail", "Urgente"],
    notes: "",
    subtasks: [
      { id: "sub-1", title: "Finaliser le rapport de projet", completed: false },
    ],
  },
  {
    id: "task-2",
    title: "Apprendre React : Hooks avancés",
    description: "Étudier useReducer, useCallback et useMemo.",
    priority: "medium",
    status: "À faire",
    duration: "1h",
    dueDate: "Aujourd'hui",
    label: "Moyenne",
    tag: "Apprentissage",
    tags: ["Apprentissage"],
    notes: "",
    subtasks: [],
  },
  {
    id: "task-3",
    title: "Réviser les structures de données",
    description: "Arbres binaires, graphes et algorithmes de tri.",
    priority: "low",
    status: "À faire",
    duration: "1h 30",
    dueDate: "Demain",
    label: "À planifier",
    tag: "Apprentissage",
    tags: ["Apprentissage"],
    notes: "",
    subtasks: [],
  },
  {
    id: "task-4",
    title: "Préparer la revue avec le client",
    description: "Préparer les slides et les points d'aborder.",
    priority: "medium",
    status: "En cours",
    duration: "45 min",
    dueDate: "14 Juin",
    label: "Urgente",
    tag: "Travail",
    tags: ["Travail", "Réunion"],
    notes: "",
    subtasks: [],
  },
];

export default function Tasks() {
  const [currentMode, setCurrentMode] = useState("focus");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const showToast = useCallback((message, action, duration = 3500) => {
    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current);
    }
    setToast({ message, action });
    toastTimer.current = window.setTimeout(() => setToast(null), duration);
  }, []);

  const addTask = useCallback((newTask) => {
    setTasks((prev) => [...prev, newTask]);
  }, []);

  const deleteTask = useCallback((taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    showToast(
      "Tâche supprimée",
      () => {
        if (task) {
          setTasks((prev) => [...prev, task]);
        }
        showToast("Suppression annulée");
      },
      5000,
    );
  }, [tasks, showToast]);

  const duplicateTask = useCallback((taskId) => {
    setTasks((prev) => {
      const task = prev.find((t) => t.id === taskId);
      if (!task) return prev;
      const clone = {
        ...task,
        id: `task-${Date.now()}`,
        title: `${task.title} (copie)`,
      };
      return [...prev, clone];
    });
  }, []);

  const archiveTask = useCallback((taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    showToast("Tâche archivée");
  }, [showToast]);

  const updateTask = useCallback((updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
    );
  }, []);

  const handleNewTask = () => {
    setIsCreating(true);
    setSelectedTask(null);
  };

  const handleClosePanel = () => {
    setSelectedTask(null);
    setIsCreating(false);
  };

  const filteredItems = TESTITEMS.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="tasks-page">
      <TaskHeader
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="task-upper-body">
        <FilterBar onNewTask={handleNewTask} />
        <PriorityReminder />
        <DailySuggestion />
      </div>
      <section
        className={`task-main-body${
          selectedTask || isCreating ? " has-selected-task" : ""
        }`}
      >
        {searchQuery ? (
          <ul style={{ marginTop: "20px", paddingLeft: "20px" }}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <li key={index} style={{ padding: "6px 0", fontSize: "16px" }}>
                  {item}
                </li>
              ))
            ) : (
              <p style={{ color: "#777" }}>No results found.</p>
            )}
          </ul>
        ) : (
          <div className="task-content">
            {currentMode === "focus" && (
              <FocusView
                tasks={tasks}
                onSelectTask={setSelectedTask}
                onDeleteTask={deleteTask}
                onDuplicateTask={duplicateTask}
                onArchiveTask={archiveTask}
                onUpdateTask={updateTask}
              />
            )}
            {currentMode === "flow" && (
              <FlowView
                tasks={tasks}
                onSelectTask={setSelectedTask}
                onDeleteTask={deleteTask}
                onDuplicateTask={duplicateTask}
                onUpdateTask={updateTask}
              />
            )}
            {currentMode === "list" && (
              <ListView
                tasks={tasks}
                onSelectTask={setSelectedTask}
                onDeleteTask={deleteTask}
                onDuplicateTask={duplicateTask}
                onUpdateTask={updateTask}
              />
            )}
            {currentMode !== "flow" && <DayOverview />}
          </div>
        )}

        {(selectedTask || isCreating) && (
          <TaskDetailsPanel
            key={selectedTask?.id || "creating"}
            task={selectedTask}
            isCreating={isCreating}
            onClose={handleClosePanel}
            onDeleteTask={deleteTask}
            onDuplicateTask={duplicateTask}
            onUpdateTask={updateTask}
            onAddTask={addTask}
          />
        )}

        {toast && (
          <div className="task-toast" role="status" aria-live="polite">
            <span>{toast.message}</span>
            {toast.action && (
              <button type="button" onClick={toast.action}>
                Annuler
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
