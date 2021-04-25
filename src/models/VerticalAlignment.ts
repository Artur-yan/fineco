import * as t from "io-ts";

export const TOP = t.literal("top");
export const CENTER = t.literal("center");
export const BOTTOM = t.literal("bottom");

export const VerticalAligment = t.union(
  [TOP, CENTER, BOTTOM],
  "VerticalAlignment"
);
