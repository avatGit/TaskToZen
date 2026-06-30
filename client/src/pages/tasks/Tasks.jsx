import { useState } from "react";
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

export default function Tasks() {
  const [currentMode, setCurrentMode] = useState("focus");
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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

      <div className="tasks-toolbar-row">
        <div className="toolbar-left">
          <FilterBar />
          <button className="new-task-btn">Nouvelle tache</button>
        </div>
        <PriorityReminder />
      </div>

      <DailySuggestion />

      <section className="task-main-body">
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
              <FocusView onSelectedTask={setSelectedTask} />
            )}
            {currentMode === "flow" && (
              <FlowView onSelectTask={setSelectedTask} />
            )}
            {currentMode === "list" && (
              <ListView onSelectTask={setSelectedTask} />
            )}
            {currentMode !== "flow" && <DayOverview />}
          </div>
        )}

        {selectedTask && (
          <TaskDetailsPanel
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
          />
        )}
      </section>
    </div>
  );
}
