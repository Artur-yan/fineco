import * as React from "react";
import "./dot-index.scss";

interface DotsIndexProps {
  dots: number;
  active: number;
}

interface DotProps {
  active: boolean;
}
const Dot = ({ active }: DotProps) => (
  <div className="dot-container">
    <div className={active ? "dot active" : "dot"} />
  </div>
);

export const DotIndex: React.FC<DotsIndexProps> = ({ dots, active }) => {
  return (
    <div className="dot-index">
      {Array(dots)
        .fill(null)
        .map((_, i) => (
          <Dot key={i} active={i === active} />
        ))}
    </div>
  );
};
