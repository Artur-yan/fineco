import * as t from "io-ts";

export const Map = t.type(
  {
    map_height: t.number,
    map: t.string
  },
  "Map"
);

export const MapElement = t.type(
  {
    type: t.literal("map_type"),
    ...Map.props
  },
  "MarkdownElement"
);
