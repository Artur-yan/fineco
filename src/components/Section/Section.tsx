import * as React from "react";
import { Columns } from "../Columns/Columns";
import { FullSizeSection } from "../FullSizeSection/FullSizeSection";
import { TitleSection } from "../TitleSection/TitleSection";
import { TitleWithColumnsSection } from "../TitleWithColumnsSection/TitleWithColumnsSection";
import { ProjectSection } from "@components/ProjectSection/ProjectSection";
import { Section as SectionModel } from "@models/Section";
import "./section.scss";

export interface SectionOptions {
  ["project_type"]: {
    onProjectActive: (slug: string | undefined) => void;
    activeProject: string | undefined;
  };
}

interface SectionProps {
  section: SectionModel;
  index: number;
}

const getSectionComponent = ({ section, index }: SectionProps) => {
  switch (section.type) {
    case "project_section_type": {
      const slug = section.slug;

      return (
        <ProjectSection
          key={index}
          slug={slug}
          title={section.title}
          titleColor={section.titleColor}
          projectIndex={index}
          subtitle={section.subtitle}
          rows={section.rows}
          image={section.image}
        />
      );
    }
    case "columns_section_type": {
      return (
        <div
          className="section"
          style={{ backgroundColor: section.backgroundColor }}
        >
          <Columns {...section} />
        </div>
      );
    }
    case "title_with_columns_section_type": {
      return <TitleWithColumnsSection {...section} />;
    }
    case "title_section_type": {
      return <TitleSection {...section} />;
    }
    case "full_size_section_type": {
      return <FullSizeSection {...section} />;
    }
    default: {
      return null;
    }
  }
};

export const Section: React.FC<SectionProps> = ({ section, ...props }) => {
  return getSectionComponent({ section, ...props });
};
