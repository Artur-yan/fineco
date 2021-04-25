import * as React from "react";
import { AboutPageTemplate } from "../../templates/AboutPageTemplate";
import { parseEntrySection } from "../helpers/entry";

export const AboutPagePreview = ({ entry }: any) => {
  const sections = entry
    .getIn(["data", "sections"])
    .toJS()
    .map(parseEntrySection);

  const props = { sections };
  return <AboutPageTemplate {...props} />;

};
