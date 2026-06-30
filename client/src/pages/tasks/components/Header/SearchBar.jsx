import React from "react";
import { FiSearch } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import "../../Tasks.css";

// Reusable SearchBar
export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="search-container">
      <span className="search-icon">
        <FiSearch size={18} />
      </span>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Rechercher une tache..."
        className="search-input"
      />
      {searchQuery && (
        <button className="search-clear-btn" onClick={() => setSearchQuery("")}>
          <RxCross2 size={15} />
        </button>
      )}
    </div>
  );
}
