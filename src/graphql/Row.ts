import { graphql } from "gatsby";

export const Row = graphql`
  fragment Row on MarkdownRemarkFrontmatterSectionsRows {
    type
    column_size
    vertical_alignment

    textColor
    backgroundColor
    textAlign
    markdown

    image {
      ...Image
    }

    video_controls
    video_muted
    full_page
    video_autoplay
    video_loop
    video {
      ...Video
    }

    map
    map_height
  }
`;
