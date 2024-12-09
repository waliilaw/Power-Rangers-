import React from "react";
import "./card.css";

type CardProps = {
  color?: string; // Accept a primary color as a prop
  children?: React.ReactNode; // For the card's content
};

export function Card({ color = "#5ddcff", children }: CardProps) {
  return (
    <div
      className="card"
      style={{
        "--primary-color": color, // Pass the color to a CSS variable
      } as React.CSSProperties}
    >
      {children || "Magic Card"}
    </div>
  );
}