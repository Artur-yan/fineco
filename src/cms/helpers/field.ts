import { CmsField } from "netlify-cms-core";

export interface CmsFieldV2 extends CmsField {
  collection?: string;
  title?: string;
  searchFields?: string[];
  displayFields?: string[];
  valueField?: string;
  multiple?: boolean;
  options?: string[];
  collapsed?: boolean;
  summary?: string;
  field?: CmsFieldV2;
  fields?: CmsFieldV2[];
  format?: string;
  default?: string | { label: string; value: string } | number | boolean;
  types?: CmsFieldV2[];
  valueType?: "int";
  min?: number;
  max?: number;
  widget?:
    | "relation"
    | "image"
    | "hidden"
    | "string"
    | "text"
    | "select"
    | "map"
    | "markdown"
    | "number"
    | "relation"
    | "object"
    | "boolean"
    | "file"
    | "list";
}

type GetField = (field: Partial<CmsFieldV2>) => CmsFieldV2;

const makeField = (obj: Partial<CmsFieldV2>): GetField => (field) =>
  ({
    ...obj,
    ...field,
  } as any);

/**
 * Fields
 */
export const ImageField = makeField({
  label: "Image",
  name: "image",
  widget: "image",
});
export const SelectField = makeField({
  label: "Select",
  name: "select",
  widget: "select",
});

export const MapField = makeField({
  label: "Map",
  summary: "Map",
  name: "map",
  widget: "map",
});

export const MarkdownField = makeField({
  label: "Body",
  name: "body",
  widget: "markdown",
});

export const NumberField = makeField({
  label: "Number",
  widget: "number",
});

export const RelationField = makeField({
  widget: "relation",
});

export const TextField = makeField({
  label: "Title",
  widget: "text",
});

export const StringField = makeField({
  label: "Title",
  widget: "string",
});

export const VideoField = makeField({
  label: "Video",
  name: "video",
  widget: "file",
});

export const ColorField: GetField = (field) =>
  RelationField({
    label: "Color",
    name: "color",
    collection: "colors",
    value_field: "color",
    search_fields: ["color", "name"],
    display_fields: ["{{name}} [{{color}}]"],
    ...field,
  });

export const ProjectField: GetField = (field) =>
  RelationField({
    label: "Projects",
    name: "projects",
    collection: "projects",
    value_field: "slug",
    search_fields: ["title"],
    display_fields: ["{{title}}"],
    ...field,
  });

export const RatioField: GetField = (field) =>
  RelationField({
    label: "Video Ratio",
    title: "Video Ratio",
    name: "video_ratio",
    collection: "video_ratios",
    valueField: "{{fields.ratioWidth}}-{{fields.ratioHeight}}",
    searchFields: ["ratioHeight", "ratioWidth"],
    displayFields: ["{{ratioWidth}}/{{ratioHeight}}"],
    ...field,
  });

/**
 * Type Fields
 */

export const ImageTypeField = (field: CmsFieldV2) =>
  makeField({
    label: "Image Type",
    widget: "object",
    fields: [ImageField(field)],
  })({ name: "image_type" });

export const MarkdownTypeField: GetField = (field) =>
  makeField({
    label: "Markdown Type",
    widget: "object",
    fields: [
      ColorField({ name: "textColor", label: "Text Color", required: false }),
      ColorField({
        name: "backgroundColor",
        label: "Background Color",
        required: false,
      }),
      SelectField({
        label: "Text Align",
        name: "textAlign",
        options: ["left", "center", "right"],
        required: false,
        default: "left",
      }),
      MarkdownField(field),
    ],
  })({ name: "markdown_type" });

export const VideoTypeField: GetField = (field) =>
  makeField({
    label: "Video Type",
    widget: "object",
    fields: [
      VideoField(field),
      {
        label: "Controls",
        name: "video_controls",
        widget: "boolean",
        required: false,
      },
      {
        label: "Muted",
        name: "video_muted",
        widget: "boolean",
        required: false,
      },
      {
        label: "Full page",
        name: "full_page",
        widget: "boolean",
        required: false,
      },
      {
        label: "Auto Play",
        name: "video_autoplay",
        widget: "boolean",
        required: false,
      },
      {
        label: "Loop",
        name: "video_loop",
        widget: "boolean",
        required: false,
      },
    ],
  })({ name: "video_type" });

export const VimeoVideoTypeField: CmsFieldV2 = {
  name: "vimeo_video_type",
  label: "Vimeo Video Type",
  widget: "object",
  fields: [
    {
      label: "Vimeo ID",
      name: "vimeo_id",
      widget: "number",
      required: true,
    },
    RatioField({ name: "video_ratio", label: "Video Ratio", required: true }),
    {
      label: "Controls",
      name: "video_controls",
      widget: "boolean",
      required: false,
    },
    {
      label: "Muted",
      name: "video_muted",
      widget: "boolean",
      required: false,
    },
    {
      label: "Full page",
      name: "full_page",
      widget: "boolean",
      required: false,
    },
    {
      label: "Auto Play",
      name: "video_autoplay",
      widget: "boolean",
      required: false,
    },
    {
      label: "Loop",
      name: "video_loop",
      widget: "boolean",
      required: false,
    },
  ],
};
