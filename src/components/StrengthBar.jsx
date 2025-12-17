import React from "react";

export default function StrengthBar({ strength }) {
  // Sets colours for strength 
  const map = {
    "too-short": { color: "#b00020", label: "Too short" },
    "weak": { color: "#d32f2f", label: "Weak" },
    "medium": { color: "#f9a825", label: "Medium" },
    "strong": { color: "#2e7d32", label: "Strong" },
  }[strength];

  // Line width based on strength
  const width =
    strength === "strong"
      ? "100%"
      : strength === "medium"
      ? "66%"
      : strength === "weak"
      ? "33%"
      : "15%";

  return (
    <div className="mt-2 w-full">
      <div className="h-2 bg-gray-300 rounded">
        <div
          style={{ width, backgroundColor: map.color, height: "100%", borderRadius: "6px" }}
        />
      </div>
      <p className="mt-1 font-semibold" style={{ color: map.color }}>
        {map.label}
      </p>
    </div>
  );
}
