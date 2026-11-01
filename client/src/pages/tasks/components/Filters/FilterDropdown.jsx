import React, { useEffect, useRef, useState } from "react";
import "./FilterDropdown.css";
import { ChevronDown } from "lucide-react";

export default function FilterDropdown({ label, options }) {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isDropOpen) return;

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropOpen]);

  const normalizedOptions = options.map((option) => {
    if (typeof option === "string") {
      return { value: option, label: option };
    }
    return option;
  });

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button
        className="filter-button"
        onClick={() => setIsDropOpen(!isDropOpen)}
      >
        <span>{label}</span>
        <ChevronDown size={16} />
      </button>
      {isDropOpen && (
        <div className="drop-items">
          {normalizedOptions.map((option) => (
            <div key={option.value} className="drop-option">
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
