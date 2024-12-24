import React from "react";
import "./card.css";

type CardProps = {
  color?: string; 
  children?: React.ReactNode;
};

export function Card({ color = "#5ddcff", children }: CardProps) {
  return (
    <div
      className="card"
      style={{
        "--primary-color": color, 
      } as React.CSSProperties}
    >
      {children || "Magic Card"}
    </div>
  );
}
