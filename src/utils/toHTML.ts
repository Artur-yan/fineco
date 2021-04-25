import remark from "remark";
import remarkHTML from "remark-html";

export const toHTML = (value: string): string =>
  remark().use(remarkHTML).processSync(value).toString();
