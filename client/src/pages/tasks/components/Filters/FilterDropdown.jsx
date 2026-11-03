import React, { useEffect, useRef, useState } from "react";
import "./FilterDropdown.css";
import { ChevronDown, Check } from "lucide-react";

export default function FilterDropdown({ label, options, selected = [], onChange }) {
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

  const isSelected = (value) => selected.includes(value);

  const toggleOption = (value) => {
    if (isSelected(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button
        className="filter-button"
        onClick={() => setIsDropOpen(!isDropOpen)}
        aria-label={label}
        aria-expanded={isDropOpen}
      >
        <span>{label}</span>
        <ChevronDown size={16} />
      </button>
      {isDropOpen && (
        <div className="drop-items">
          {normalizedOptions.map((option) => (
            <div
              key={option.value}
              className={`drop-option${isSelected(option.value) ? " is-selected" : ""}`}
              onClick={() => toggleOption(option.value)}
              role="checkbox"
              aria-checked={isSelected(option.value)}
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  toggleOption(option.value);
                }
              }}
            >
              {isSelected(option.value) && (
                <Check size={14} aria-hidden="true" className="drop-check" />
              )}
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
