import remark from "remark";
import remarkHTML from "remark-html";
import { Column } from "@models/Column";
import { ImageFile } from "@models/Image";
import { Section } from "@models/Section";
import { VideoFile } from "@models/Video";

const r = remark().use(remarkHTML);

const toHTML = (value: string) => r.processSync(value).toString();

export const parseImage = (image: string): ImageFile => {
  return {
    publicURL: image,
    childImageSharp: {
      fluid: {
        src: image,
      },
    },
  };
};

export const parseVideoEntry = (video: string): VideoFile => {
  return { publicURL: video, extension: video.split(".").pop() ?? "mp4" };
};

export const parseColumn = (c: Column): Column => {
  switch (c.type) {
    case "video_type": {
      return {
        ...c,
        video: parseVideoEntry(c.video as any),
      };
    }
    case "background_image_type":
    case "image_type": {
      return {
        ...c,
        image: parseImage(c.image as any),
      };
    }
    case "markdown_type": {
      return {
        ...c,
        markdown: toHTML(c.markdown),
      };
    }
    default:
      return c;
  }
};

export const parseEntrySection = (section: Section): Section => {
  switch (section.type) {
    case "title_with_columns_section_type":
    case "columns_section_type":
    case "full_size_section_type": {
      return {
        ...section,
        rows: (section.rows ?? []).map((columns) => {
          return (columns ?? []).map(parseColumn);
        }),
      };
    }

    case "project_section_type": {
      return {
        ...section,
        image: parseImage(section.image as any),
        rows: (section.rows ?? []).map((c) => {
          return (c ?? []).map(parseColumn);
        }),
      };
    }
    default: {
      return section;
    }
  }
};
