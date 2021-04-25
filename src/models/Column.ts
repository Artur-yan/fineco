import * as t from "io-ts";
import { ImageElement, BackgroundImageElement } from "./Image";
import { MarkdownElement } from "./Markdown";
import { VerticalAligment } from "./VerticalAlignment";
import { VideoElement, VimeoVideoElement } from "./Video";

export const ColumnBase = t.type(
  {
    backgroundColor: t.string,
    text_alignment: VerticalAligment,
    column_size: t.number,
  },
  "ColumnBase"
);

export const BackgroundImageColumn = t.intersection([
  ColumnBase,
  BackgroundImageElement,
]);

export const ImageColumn = t.intersection([ColumnBase, ImageElement]);
export const MarkdownColumn = t.intersection([ColumnBase, MarkdownElement]);
export const VideoColumn = t.intersection([ColumnBase, VideoElement]);
export const VimeoVideoColumn = t.intersection([ColumnBase, VimeoVideoElement]);

export const Column = t.union(
  [
    BackgroundImageColumn,
    ImageColumn,
    MarkdownColumn,
    VideoColumn,
    VimeoVideoColumn,
  ],
  "Column"
);
export type Column = t.TypeOf<typeof Column>;
