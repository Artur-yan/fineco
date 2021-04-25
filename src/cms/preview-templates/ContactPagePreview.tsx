import * as React from "react";
import { parseEntrySection } from "../helpers/entry";
import { PageContainer } from "@components/PageContainer/PageContainer";

const ContactPagePreview = ({ entry }: any) => {
  const sections = entry
    .getIn(["data", "sections"])
    .toJS()
    .map(parseEntrySection);

  const props = { sections };

  return (
    <PageContainer
      {...props}
      containerId="contact-page-preview"
    />
  );
};

export default ContactPagePreview;
