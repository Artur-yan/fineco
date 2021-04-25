import * as React from "react";
import {
  IndexPageTemplate,
  projectsTitle,
} from "../../templates/IndexTemplate";
import { parseEntrySection } from "cms/helpers/entry";

const IndexPagePreview: React.FC = ({ entry, fieldsMetaData }: any) => {
  const sectionsRaw = entry.getIn(["data", "sections"]).toJS();
  const projects = fieldsMetaData.toJS()?.sections?.projects?.projects ?? [];

  const sections = sectionsRaw
    .flatMap((section: any) =>
      section.type === "projects_section_type"
        ? [
            projectsTitle,
            ...(section.projects ?? []).map((projectSlug: string) => ({
              ...projects[projectSlug],
              type: "project_section_type",
            })),
          ]
        : [section]
    )
    .map(parseEntrySection);

  return (
    <IndexPageTemplate location={window.location as any} sections={sections} />
  );
};

export default IndexPagePreview;
