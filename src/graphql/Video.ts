import { graphql } from "gatsby";

export const Video = graphql`
  fragment Video on File {
    publicURL
    extension
  }
`;
