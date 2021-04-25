import {
  CmsFieldV2,
  TextField,
  ImageField,
  ImageTypeField,
  VideoTypeField,
  MarkdownTypeField,
  ColorField,
  MapField,
  NumberField,
  VimeoVideoTypeField,
  ProjectField,
} from "./field";

const VerticalAlignment: CmsFieldV2 = {
  label: "Vertical Alignment",
  name: "vertical_alignment",
  widget: "select",
  options: ["top", "center", "bottom"],
};

export const ImageTypeSection = ImageTypeField({ name: "image" });
export const BackgrounImageTypeSection = ImageTypeField({ name: "image " });

const WidthPercentageField = NumberField({
  name: "column_size",
  label: "Column Size",
  default: 12,
  valueType: "int",
  min: 1,
  max: 12,
  required: false,
});

const ImageColumn: CmsFieldV2 = {
  label: "Image Column",
  name: "image_type",
  summary: "Image Column",
  fields: [WidthPercentageField, ImageField({ name: "image" })],
};

const BackgroundImageColumn: CmsFieldV2 = {
  label: "Background Image Column",
  name: "background_image_type",
  summary: "Background Image Column",
  fields: [WidthPercentageField, ImageField({ name: "image" })],
};

const MapColumn: CmsFieldV2 = {
  label: "Map Column",
  name: "map_type",
  summary: "Map Column",
  fields: [
    WidthPercentageField,
    NumberField({ label: "Map Height", name: "map_height" }),
    MapField({ name: "map" }),
  ],
};

const MarkdownColumn: CmsFieldV2 = {
  label: "Markdown Column",
  name: "markdown_type",
  summary: "Markdown Column",
  fields: [
    WidthPercentageField,
    ...(MarkdownTypeField({ name: "markdown" }).fields ?? []),
  ],
};

const VideoColumn: CmsFieldV2 = {
  label: "Video Column",
  summary: "Video Column",
  name: "video_type",
  fields: [
    WidthPercentageField,
    ...(VideoTypeField({ name: "video" }).fields ?? []),
  ],
};

const VimeoVideoColumn: CmsFieldV2 = {
  label: "Vimeo Video Column",
  summary: "Vimeo Video Column",
  name: "vimeo_video_type",
  fields: [WidthPercentageField, ...(VimeoVideoTypeField.fields ?? [])],
};

export const RowsField: CmsFieldV2 = {
  label: "Rows",
  name: "rows",
  widget: "list",
  field: {
    label: "Columns",
    name: "columns",
    widget: "list",
    summary: "{{fields.name}}",
    types: [
      BackgroundImageColumn,
      ImageColumn,
      MapColumn,
      MarkdownColumn,
      VideoColumn,
      VimeoVideoColumn,
    ],
  },
};

// Sections

export const FullSizeSection: CmsFieldV2 = {
  label: "Full Size Section",
  name: "full_size_section_type",
  field: RowsField,
};

export const RowsSection: CmsFieldV2 = {
  label: "Rows Section",
  name: "columns_section_type",
  fields: [
    ColorField({ name: "textColor", label: "Text Color" }),
    ColorField({
      name: "backgroundColor",
      label: "Background Color",
      required: false,
    }),
    VerticalAlignment,
    RowsField,
  ],
};

export const ProjectsSection: CmsFieldV2 = {
  label: "Projects Section",
  name: "projects_section_type",
  fields: [ProjectField({ multiple: true })],
};

export const TitleSection: CmsFieldV2 = {
  label: "Title Section",
  name: "title_section_type",
  summary: "{{fields.title}}",
  fields: [
    TextField({ name: "title", label: "Title" }),
    ColorField({ name: "textColor", label: "Text Color" }),
    ColorField({ name: "backgroundColor", label: "Background Color" }),
  ],
};

export const TitleWithColumnsSection: CmsFieldV2 = {
  label: "Title with Columns Section",
  name: "title_with_columns_section_type",
  summary: "{{fields.head}} - {{fields.title}}",
  fields: [
    TextField({ name: "head", label: "Head", required: false }),
    TextField({ name: "title", label: "Title" }),
    ColorField({ name: "textColor", label: "Text Color" }),
    ColorField({ name: "backgroundColor", label: "Background Color" }),
    RowsField,
  ],
};
