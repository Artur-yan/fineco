import { graphql } from "gatsby";

export const ColumnsSection = graphql`
  fragment ColumnsSection on MarkdownRemarkFrontmatterSections {
    type
    backgroundColor
    vertical_alignment

    rows {
      ...Row
    }
  }
`;

export const FullSizeSection = graphql`
  fragment FullSizeSection on MarkdownRemarkFrontmatterSections {
    type
    backgroundColor

    rows {
      ...Row
    }
  }
`;

export const TitleWithColumnsSection = graphql`
  fragment TitleWithColumnsSection on MarkdownRemarkFrontmatterSections {
    head
    title
    type
    textColor
    backgroundColor

    rows {
      ...Row
    }
  }
`;

export const Project = graphql`
  fragment Project on MarkdownRemarkFrontmatterSections {
    draft
    title
    titleColor
    subtitle
    backgroundColor

    image {
      ...Image
    }
    rows {
      type
      column_size

      textColor
      markdown

      image {
        ...Image
      }

      video {
        ...Video
      }
      video_controls
      video_muted
      full_page
      video_autoplay
      video_loop
      vimeo_id
      video_ratio
    }
  }
`;

export const ProjectsSection = graphql`
  fragment ProjectsSection on MarkdownRemarkFrontmatterSections {
    type
    projects
  }
`;

export const Sections = graphql`
  fragment Sections on MarkdownRemarkFrontmatterSections {
    type
    ...FullSizeSection
    ...ColumnsSection
    ...TitleWithColumnsSection
    ...ProjectsSection
  }
`;
