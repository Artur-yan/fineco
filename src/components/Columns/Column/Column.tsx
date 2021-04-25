import cx from "classnames";
import * as O from "fp-ts/lib/Option";
import * as React from "react";
import { ContentTypeRenderer } from "@components/ContentTypeRenderer";
import { Column as ColumnModel } from "@models/Column";
import "./column.scss";

interface ColumnProps {
  column: ColumnModel;
}

export const Column: React.FC<ColumnProps> = ({ column }) => {
  return (
    <div
      className={cx("column", {
        [`is-${column.column_size}`]: O.isSome(
          O.fromNullable(column.column_size)
        ),
        "has-text-centered": column.text_alignment === "center",
      })}
    >
      <ContentTypeRenderer element={column} />
    </div>
  );
};
