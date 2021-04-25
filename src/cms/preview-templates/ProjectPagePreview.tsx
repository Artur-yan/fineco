import * as React from "react";
import { parseEntrySection } from "../helpers/entry";
import ProjectPageTemplate from "templates/ProjectTemplate";

const ProjectPagePreview = ({ entry }: any) => {
  const project = parseEntrySection({
    ...entry.getIn(["data"]).toJS(),
    type: "project_section_type",
  }) as any;

  return (
    <ProjectPageTemplate data={{ markdownRemark: { frontmatter: project } }} />
  );
};

export default ProjectPagePreview;
