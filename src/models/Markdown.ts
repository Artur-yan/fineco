import * as t from "io-ts";
import { TextAlign } from "./TextAlign";

export const Markdown = t.type(
  {
    textColor: t.string,
    backgroundColor: t.string,
    markdown: t.string,
    textAlign: TextAlign
  },
  "Markdown"
);
export type Markdown = t.TypeOf<typeof Markdown>;

export const MarkdownElement = t.type(
  {
    type: t.literal("markdown_type"),
    ...Markdown.props
  },
  "MarkdownElement"
);

export type MarkdownElement = t.TypeOf<typeof MarkdownElement>;
