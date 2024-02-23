import React, { useState, FC } from "react";

interface DropdownProps {
  selected: string; // Initial selected value ("easy", "medium", or "hard")
  onChange: (value: string) => void; // Callback for value changes
  label?: string; // Optional label for the dropdown
  styles?: React.CSSProperties; // Optional styles for the component
}

const DropdownComponent: React.FC<DropdownProps> = ({
  selected,
  onChange,
  label = "Difficulty",
  styles = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div style={styles}>
      {label && <label htmlFor="difficulty">{label}</label>}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "relative",
          display: "inline-block",
          cursor: "pointer",
          backgroundColor: isOpen ? "#ddd" : "#f1f1f1",
          border: "none",
          padding: "12px 20px",
          borderRadius: "8px",
        }}
      >
        {selected}
        <svg
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
          }}
          width="8px"
          height="13px"
          viewBox="0 0 8 13"
          fill="black"
        >
          <polyline points="0,0 8,6.5 0,13" />
        </svg>
      </button>
      {isOpen && (
        <ul
          style={{
            position: "absolute",
            backgroundColor: "#f1f1f1",
            margin: 0,
            padding: 0,
            listStyle: "none",
            zIndex: 1,
          }}
        >
          <li onClick={() => handleClick("easy")}>Easy</li>
          <li onClick={() => handleClick("medium")}>Medium</li>
          <li onClick={() => handleClick("hard")}>Hard</li>
        </ul>
      )}
    </div>
  );
};

export default DropdownComponent;
