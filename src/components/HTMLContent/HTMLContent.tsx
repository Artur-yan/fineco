import * as React from "react";
import remark from "remark";
import remarkHTML from "remark-html";
import "./html-content.scss";

interface HTMLContentProps {
  className?: string;
  style?: React.CSSProperties;
  content: string;
  render?: boolean;
}

const r = remark().use(remarkHTML);

const toHTML = (value: string) => r.processSync(value).toString();

export const HTMLContent: React.FC<HTMLContentProps> = ({
  content,
  style,
  render
}) => (
  <div
    style={style}
    className="html-content"
    dangerouslySetInnerHTML={{
      __html: render === true ? toHTML(content) : content
    }}
  />
);
