import { GeoJSONPoint } from "ol/format/GeoJSON";
import * as React from "react";
import { HTMLContent } from "./HTMLContent/HTMLContent";
import { BackgroundImage } from "./Image/BackgroundImage";
import { Image } from "./Image/Image";
import { GMap } from "./Map/GMap";
import { Video } from "./Video";
import { Element } from "@models/Elements";
import { tabletQuery, useMediaQuery } from "@utils/index";
import { VimeoVideo } from "./VimeoVideo";

export const getStyleByElementType = (
  element: Element,
  style: React.CSSProperties
): React.CSSProperties => {
  const isTablet = useMediaQuery(tabletQuery);

  switch (element.type) {
    case "markdown_type": {
      return {
        minHeight: style.height,
        width: style.width,
        display: "flex",
        padding: isTablet ? "2rem" : "3rem 4rem",
        alignItems: "center",
        justifyItems: "center",
        textAlign: element.textAlign,
        color: element.textColor,
        backgroundColor: element.backgroundColor,
      };
    }
    case "video_type": {
      const isHeightMaxThanWidth = (style.height ?? 0) > (style.width ?? 0);
      return {
        ...style,
        width: isHeightMaxThanWidth ? "auto" : style.width,
        height: isHeightMaxThanWidth ? "auto" : undefined,
      };
    }
    default: {
      return style;
    }
  }
};

const gMapKey = `AIzaSyDRrg8cxQF6RArE4T1aDVoc2SZHKsuxzMQ`;
interface ContentTypeRendererProps {
  element: Element;
  style?: React.CSSProperties;
}

export const ContentTypeRenderer: React.FC<ContentTypeRendererProps> = ({
  element,
  style,
  ...props
}) => {
  switch (element.type) {
    case "background_image_type":
      return <BackgroundImage image={element.image} style={style} />;
    case "image_type":
      return (
        <Image
          style={style}
          alt={element.alt}
          image={element.image}
          isTablet={false}
        />
      );
    case "map_type": {
      let point: GeoJSONPoint = {
        type: "Point",
        coordinates: [0, 0],
      };
      try {
        point = JSON.parse(element.map);
      } catch (e) {}

      // return <LazyMap height={element.map_height} point={point} />;
      return (
        <GMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${gMapKey}&v=3.exp`}
          options={{
            disableDefaultUI: true,
          }}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={
            <div style={{ height: `${element.map_height}px` }} />
          }
          mapElement={<div style={{ height: `100%` }} />}
          point={point}
          height={element.map_height}
        />
      );
    }
    case "markdown_type":
      return (
        <HTMLContent style={style} content={element.markdown} render={true} />
      );
    case "video_type": {
      return (
        <Video
          video={element.video}
          style={style}
          controls={element.video_controls}
          autoPlay={element.video_autoplay}
          muted={element.video_muted}
          fullPage={element.full_page}
          loop={element.video_loop}
        />
      );
    }
    case "vimeo_video_type": {
      return (
        <VimeoVideo
          videoLink={element.vimeo_id}
          videoRatio={element.video_ratio}
          style={style}
          controls={element.video_controls}
          autoPlay={element.video_autoplay}
          muted={element.video_muted}
          fullPage={element.full_page}
          loop={element.video_loop}
        />
      );
    }
    default:
      return null;
  }
};
