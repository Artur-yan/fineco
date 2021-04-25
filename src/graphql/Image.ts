import { graphql } from "gatsby";

export const Image = graphql`
  fragment Image on File {
    publicURL
    childImageSharp {
      fluid(maxWidth: 2048, quality: 75) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;
