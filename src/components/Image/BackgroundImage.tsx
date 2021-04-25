import * as React from "react";
import { ImageFile } from "@models/Image";

interface BackgroundImageProps {
  image: ImageFile;
  style?: React.CSSProperties
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({ image }) => {
 return ( <div
    style={{
      display: "flex",
      backgroundPosition: "center",
      backgroundSize: "cover",
      height: '100%',
      width: "100%",
      backgroundImage: `url(${image.childImageSharp.fluid.src})`
    }}
  />
  )
};
