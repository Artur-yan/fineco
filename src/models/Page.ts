import * as t from "io-ts";
import { Section } from "./Section";
import { VideoElement } from "./Video";

export const Page = t.type(
  {
    frontmatter: t.type(
      {
        title: t.string,
        head: t.string,
        video: VideoElement,
        sections: t.array(Section)
      },
      "Frontmatter"
    ),
    html: t.string
  },
  "Page"
);

export type Page = t.TypeOf<typeof Page>;
