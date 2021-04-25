import * as t from "io-ts";

const CENTER = t.literal("center");
const LEFT = t.literal("left");
const RIGHT = t.literal("right");

export const TextAlign = t.union([LEFT, CENTER, RIGHT]);
export type TextAlign = t.TypeOf<typeof TextAlign>;
