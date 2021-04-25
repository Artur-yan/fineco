import * as t from "io-ts";
import { BackgroundImageElement, ImageElement } from "./Image";
import { MapElement } from "./Map";
import { MarkdownElement } from "./Markdown";
import { VideoElement, VimeoVideoElement } from "./Video";

export const Element = t.union(
  [
    BackgroundImageElement,
    ImageElement,
    MapElement,
    MarkdownElement,
    VideoElement,
    VimeoVideoElement,
  ],
  "Element"
);
export type Element = t.TypeOf<typeof Element>;
