import * as React from "react";
import { Section } from "@components/Section/Section";
import { Section as SectionModel } from "@models/Section";
import "./page-container.scss";

interface PageContainerProps {
  containerId: string;
  sections: SectionModel[];
}

export const PageContainer: React.FC<PageContainerProps> = ({
  containerId,
  sections,
}) => {
  return (
    <div
      id={containerId}
      className={"page-container"}
      style={{ width: "100%", display: "flex" }}
    >
      {sections.map((s, i) => (
        <Section key={i} section={s} index={i} />
      ))}
    </div>
  );
};
