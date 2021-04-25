import cx from "classnames";
import * as React from "react";
import { Column } from "./Column/Column";
import { ColumnsSection as ColumnsSectionModel } from "@models/Section";
import "./columns.scss";

export const Columns: React.FC<Omit<ColumnsSectionModel, "type">> = ({
  backgroundColor,
  isMarginless,
  isPaddingless,
  rows,
}) => {
  return (
    <div
      className="columns-container container"
      style={{ backgroundColor, width: "100%" }}
    >
      {(rows ?? []).map((columns, i) => (
        <div
          key={i}
          className={cx("columns", {
            "is-marginless": isMarginless,
            "is-paddingless": isPaddingless,
          })}
        >
          {(columns ?? []).map((column, k) => (
            <Column key={k} column={column} />
          ))}
        </div>
      ))}
    </div>
  );
};
