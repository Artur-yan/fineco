import * as React from "react";
import { TitleSection as TitleSectionModel } from "@models/Section";
import "./title-section.scss";

export const TitleSection: React.FC<TitleSectionModel> = ({
  type,
  title,
  textColor,
  backgroundColor,
}) => {
  return (
    <div
      className={`title-section ${title.toLowerCase()}`}
      style={{ backgroundColor, color: textColor }}
    >
      <div className="title-section-content">
        <h3 className="title-section-title">{title}</h3>
      </div>
    </div>
  );
};
