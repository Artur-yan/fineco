import * as t from "io-ts";
import { Column } from "./Column";
import { ImageFile } from "./Image";
import { VerticalAligment } from "./VerticalAlignment";

const SectionBase = t.type(
  {
    isMarginless: t.boolean,
    isPaddingless: t.boolean,
    backgroundColor: t.string,
    vertical_alignment: VerticalAligment,
    rows: t.array(t.array(Column)),
  },
  "SectionBase"
);

export type SectionBase = t.TypeOf<typeof SectionBase>;

export const COLUMNS_SECTION_TYPE = t.literal("columns_section_type");
export type COLUMNS_SECTION_TYPE = t.TypeOf<typeof COLUMNS_SECTION_TYPE>;

export const ColumnsSection = t.intersection(
  [
    SectionBase,
    t.type({
      type: COLUMNS_SECTION_TYPE,
      backgroundColor: t.string,
    }),
  ],
  "ColumnsSection"
);

export type ColumnsSection = t.TypeOf<typeof ColumnsSection>;

export const TitleWithColumnsSection = t.intersection(
  [
    SectionBase,
    t.type({
      type: t.literal("title_with_columns_section_type"),
      head: t.string,
      title: t.string,
      textColor: t.string,
      backgroundColor: t.string,
      rows: t.array(t.array(Column)),
    }),
  ],
  "TitleWithColumnsSection"
);

export type TitleWithColumnsSection = t.TypeOf<typeof TitleWithColumnsSection>;

export const TitleSection = t.intersection(
  [
    SectionBase,
    t.type({
      type: t.literal("title_section_type"),
      title: t.string,
      textColor: t.string,
      backgroundColor: t.string,
    }),
  ],
  "TitleSection"
);

export type TitleSection = t.TypeOf<typeof TitleSection>;

export const FullSizeSection = t.intersection(
  [
    SectionBase,
    t.type({
      type: t.literal("full_size_section_type"),
    }),
  ],
  "FullSizeSection"
);

export type FullSizeSection = t.TypeOf<typeof FullSizeSection>;

export const ProjectSection = t.intersection([
  SectionBase,
  t.type(
    {
      type: t.literal("project_section_type"),
      title: t.string,
      titleColor: t.string,
      subtitle: t.string,
      slug: t.string,
      image: ImageFile,
    },
    "ProjectSection"
  ),
]);
export type ProjectSection = t.TypeOf<typeof ProjectSection>;

export const ProjectsSection = t.type(
  {
    type: t.literal("projects_section_type"),
    projects: t.array(t.string),
  },
  "ProjectSection"
);
export type ProjectsSection = t.TypeOf<typeof ProjectsSection>;

export const Section = t.union(
  [
    FullSizeSection,
    ProjectSection,
    ProjectsSection,
    ColumnsSection,
    TitleWithColumnsSection,
    TitleSection,
  ],
  "Section"
);

export type Section = t.TypeOf<typeof Section>;
