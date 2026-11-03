import "./FilterBar.css";
import FilterDropdown from "./FilterDropdown";
import { Plus } from "lucide-react";
import { useState, useCallback } from "react";

const PRIORITY_MAP = {
  Haute: "high",
  Moyenne: "medium",
  Basse: "low",
};

const STATUS_MAP = {
  "A Faire": "À faire",
  "En cours": "En cours",
  Terminee: "Terminée",
};

export default function FilterBar({ onNewTask, onFiltersChange }) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priority: [],
    status: [],
    label: [],
    duration: [],
  });

  const handleFilterChange = useCallback((category, values) => {
    setFilters((prev) => ({ ...prev, [category]: values }));
    onFiltersChange?.({ ...filters, [category]: values });
  }, [filters, onFiltersChange]);

  return (
    <div className="filter-bar">
      <div className="filter-bar-left">
        <div className="filter-bar-left-desktop">
          <FilterDropdown
            label="Priorite"
            options={["Haute", "Moyenne", "Basse"]}
            selected={Object.entries(PRIORITY_MAP)
              .filter(([, val]) => filters.priority.includes(val))
              .map(([key]) => key)}
            onChange={(values) => {
              const normalized = values.map((v) => PRIORITY_MAP[v]).filter(Boolean);
              handleFilterChange("priority", normalized);
            }}
          />
          <FilterDropdown
            label="Status"
            options={["A Faire", "En cours", "Terminée"]}
            selected={Object.entries(STATUS_MAP)
              .filter(([, val]) => filters.status.includes(val))
              .map(([key]) => key)}
            onChange={(values) => {
              const normalized = values.map((v) => STATUS_MAP[v]).filter(Boolean);
              handleFilterChange("status", normalized);
            }}
          />
          <FilterDropdown
            label="Etiquettes"
            options={["Travail", "Apprentissage", "Personnel"]}
            selected={filters.label}
            onChange={(values) => handleFilterChange("label", values)}
          />
          <FilterDropdown
            label="Durée"
            options={["< 30min", "30min - 1h", "1h - 2h", "> 2h"]}
            selected={filters.duration}
            onChange={(values) => handleFilterChange("duration", values)}
          />
        </div>
        <div className="filter-bar-left-mobile">
          <button onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}>
            Filtres
          </button>
          {isMobileFilterOpen && (
            <div className="filter-mobile-options">
              <h4>Priorite</h4>
              <div className="filtre-items">
                {["Haute", "Moyenne", "Basse"].map((label) => (
                  <label key={label} className="filtre-label">
                    <input
                      type="checkbox"
                      class="filtre-input"
                      checked={filters.priority.includes(PRIORITY_MAP[label])}
                      onChange={() => {
                        const val = PRIORITY_MAP[label];
                        const next = filters.priority.includes(val)
                          ? filters.priority.filter((v) => v !== val)
                          : [...filters.priority, val];
                        handleFilterChange("priority", next);
                      }}
                    />
                    {label}
                  </label>
                ))}
              </div>

              <h4>Status</h4>
              <div className="filtre-items">
                {["A Faire", "En cours", "Terminee"].map((label) => (
                  <label key={label} className="filtre-label">
                    <input
                      type="checkbox"
                      class="filtre-input"
                      checked={filters.status.includes(STATUS_MAP[label])}
                      onChange={() => {
                        const val = STATUS_MAP[label];
                        const next = filters.status.includes(val)
                          ? filters.status.filter((v) => v !== val)
                          : [...filters.status, val];
                        handleFilterChange("status", next);
                      }}
                    />
                    {label === "Terminee" ? "Terminée" : label}
                  </label>
                ))}
              </div>

              <h4>Etiquettes</h4>
              <div className="filtre-items">
                {["Travail", "Apprentissage", "Personnel"].map((label) => (
                  <label key={label} className="filtre-label">
                    <input
                      type="checkbox"
                      class="filtre-input"
                      checked={filters.label.includes(label)}
                      onChange={() => {
                        const next = filters.label.includes(label)
                          ? filters.label.filter((v) => v !== label)
                          : [...filters.label, label];
                        handleFilterChange("label", next);
                      }}
                    />
                    {label}
                  </label>
                ))}
              </div>

              <h4>Duree</h4>
              <div className="filtre-items">
                {["< 30min", "30min - 1h", "1h - 2h", "> 2h"].map((label) => (
                  <label key={label} className="filtre-label">
                    <input
                      type="checkbox"
                      class="filtre-input"
                      checked={filters.duration.includes(label)}
                      onChange={() => {
                        const next = filters.duration.includes(label)
                          ? filters.duration.filter((v) => v !== label)
                          : [...filters.duration, label];
                        handleFilterChange("duration", next);
                      }}
                    />
                    {label}
                  </label>
                ))}
              </div>

              <button onClick={() => setIsMobileFilterOpen(false)}>OK</button>
            </div>
          )}
        </div>
      </div>
      <button className="new-task-btn" type="button" onClick={onNewTask}>
        <Plus size={18} />
        <span>Nouvelle tâche</span>
      </button>
    </div>
  );
}
