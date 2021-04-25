import * as React from "react";
import { ContentTypeRenderer } from "@components/ContentTypeRenderer";
import { Element } from "@models/Elements";
import { FullSizeSection as FullSizeSectionModel } from "@models/Section";
import { useMediaQuery, tabletQuery } from "@utils/index";
import "./full-size-section.scss";

const getStyleByElementType = (
  element: Element,
  style: React.CSSProperties
): React.CSSProperties => {
  const isTablet = useMediaQuery(tabletQuery);

  switch (element.type) {
    case "markdown_type": {
      return {
        minHeight: style.height,
        width: style.width,
        display: "flex",
        padding: isTablet ? "3rem 2rem" : "4rem 5rem",
        alignItems: "center",
        justifyItems: "center",
        textAlign: element.textAlign,
        color: element.textColor,
        backgroundColor: element.backgroundColor,
      };
    }
    case "video_type": {
      const isHeightMaxThanWidth = (style.height ?? 0) > (style.width ?? 0);
      return {
        ...style,
        width: isHeightMaxThanWidth ? "auto" : style.width,
        height: isHeightMaxThanWidth ? "auto" : undefined,
      };
    }
    default: {
      return style;
    }
  }
};

interface FullSizeSectionProps extends FullSizeSectionModel {}

export const FullSizeSection: React.FC<FullSizeSectionProps> = ({
  ...section
}) => {
  const element = section.rows[0][0];
  const style = getStyleByElementType(element, {});

  return (
    <div
      className="full-size-section"
      style={{
        width: "100%",
        backgroundColor: section.backgroundColor,
      }}
    >
      <ContentTypeRenderer element={element} style={style} />
    </div>
  );
};
