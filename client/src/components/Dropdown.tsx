import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  selectedValue?: string; //
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Dropdown: React.FC<DropdownProps> = ({
  selectedValue = "easy",
  onChange,
  label = "Difficulty",
  disabled = false,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  //NOTE - when clicked outside the div will close
  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} style={style}>
      <div className="dropdown-label" onClick={() => setIsOpen(!isOpen)}>
        {label}
        <span className={`dropdown-value ${isOpen ? "active" : ""}`}>
          {selectedValue}
        </span>
      </div>
      {isOpen && (
        <ul className="dropdown-options">
          <li onClick={() => handleOptionClick("easy")}>Easy</li>
          <li onClick={() => handleOptionClick("medium")}>Medium</li>
          <li onClick={() => handleOptionClick("hard")}>Hard</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
