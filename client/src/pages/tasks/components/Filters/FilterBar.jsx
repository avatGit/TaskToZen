import "./FilterBar.css";
import FilterDropdown from "./FilterDropdown";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function FilterBar({ onNewTask }) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  return (
    <div className="filter-bar">
      <div className="filter-bar-left">
        <div className="filter-bar-left-desktop">
          <FilterDropdown
            label="Priorite"
            options={["Haute", "Moyenne", "Basse"]}
          />
          <FilterDropdown
            label="Status"
            options={["A Faire", "En cours", "Terminée"]}
          />
          <FilterDropdown
            label="Etiquettes"
            options={["Travail", "Apprentissage", "Personnel"]}
          />
          <FilterDropdown
            label="Durée"
            options={["< 30min", "30min - 1h", "1h - 2h", "> 2h"]}
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
                <input
                  type="checkbox"
                  id="priorite-haute"
                  class="filtre-input"
                />
                <label htmlFor="priorite-haute" class="filtre-label">
                  Haute
                </label>

                <input
                  type="checkbox"
                  id="priorite-moyen"
                  class="filtre-input"
                />
                <label htmlFor="priorite-moyen" class="filtre-label">
                  Moyenne
                </label>

                <input
                  type="checkbox"
                  id="priorite-basse"
                  class="filtre-input"
                />
                <label htmlFor="priorite-basse" class="filtre-label">
                  Basse
                </label>
              </div>

              <h4>Status</h4>

              <div className="filtre-items">
                <input type="checkbox" id="status-faire" class="filtre-input" />
                <label htmlFor="status-faire" class="filtre-label">
                  A Faire
                </label>

                <input type="checkbox" id="status-cours" class="filtre-input" />
                <label htmlFor="status-cours" class="filtre-label">
                  En Cours
                </label>

                <input
                  type="checkbox"
                  id="status-terminee"
                  class="filtre-input"
                />
                <label htmlFor="status-terminee" class="filtre-label">
                  Terminee
                </label>
              </div>

              <h4>Etiquettes</h4>

              <div className="filtre-items">
                <input type="checkbox" id="travail" class="filtre-input" />
                <label htmlFor="travail" class="filtre-label">
                  Travail
                </label>

                <input type="checkbox" id="learn" class="filtre-input" />
                <label htmlFor="learn" class="filtre-label">
                  Apprentissage
                </label>

                <input type="checkbox" id="personnel" class="filtre-input" />
                <label htmlFor="personnel" class="filtre-label">
                  Personnel
                </label>
              </div>

              <h4>Duree</h4>

              <div className="filtre-items">
                <input type="checkbox" id="30min" class="filtre-input" />
                <label htmlFor="30min" class="filtre-label">
                  &lt; 30min
                </label>

                <input type="checkbox" id="1h" class="filtre-input" />
                <label htmlFor="1h" class="filtre-label">
                  30min - 1h
                </label>

                <input type="checkbox" id="2h" class="filtre-input" />
                <label htmlFor="2h" class="filtre-label">
                  1h - 2h
                </label>

                <input type="checkbox" id="plus2h" class="filtre-input" />
                <label htmlFor="plus2h" class="filtre-label">
                  &gt; 2h
                </label>
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
