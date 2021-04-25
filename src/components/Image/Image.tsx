import * as React from "react";
import { Image as ImageModel } from "@models/Image";
import Img from "gatsby-image";

interface ProjectImageProps extends ImageModel {
  isTablet: boolean;
  style?: React.CSSProperties;
}

export const Image: React.FC<ProjectImageProps> = ({ alt, image, style }) => (
  <Img style={style} alt={alt} fluid={image.childImageSharp.fluid as any} />
);
