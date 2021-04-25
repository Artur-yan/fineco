import * as t from "io-ts";
import { ImageFile } from "./Image";

export const SectionQuery = t.type(
  {
    id: t.string,
    relativeDirectory: t.string,
    childMarkdownRemark: t.type({
      id: t.string,
      frontmatter: t.type({
        fullName: t.string,
        username: t.string,
        color: t.string,
        avatar: ImageFile
      }),
      htmlAst: t.object
    })
  },
  "SectionQuery"
);

export type SectionQuery = t.TypeOf<typeof SectionQuery>;
