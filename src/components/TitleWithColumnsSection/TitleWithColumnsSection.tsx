import cx from "classnames";
import * as React from "react";
import { getSlug } from "../../utils/getSlug";
import { Columns } from "../Columns/Columns";
import { TitleWithColumnsSection as TitleWithColumnsSectionModel } from "@models/Section";
import "./title-with-columns-section.scss";

export const TitleWithColumnsSection: React.FC<TitleWithColumnsSectionModel> = ({
  head,
  title,
  textColor,
  backgroundColor,
  vertical_alignment,
  rows,
}) => {
  return (
    <div
      className={cx("title-with-columns-section", getSlug(head))}
      style={{ backgroundColor, color: textColor }}
    >
      <div className="title-with-columns-section-content">
        <div className="title-with-columns-section-head centered">{head}</div>

        <h3 className="title-with-columns-section-title">{title}</h3>

        <Columns
          isMarginless={true}
          isPaddingless={true}
          backgroundColor={backgroundColor}
          rows={rows}
          vertical_alignment={vertical_alignment}
        />
      </div>
    </div>
  );
};
