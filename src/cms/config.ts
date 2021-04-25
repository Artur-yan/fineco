import { CmsConfig, CmsCollection, CmsCollectionFile } from "netlify-cms-core";
import {
  CmsFieldV2,
  ColorField,
  StringField,
  ImageField,
} from "./helpers/field";
import {
  RowsField,
  RowsSection,
  FullSizeSection,
  TitleWithColumnsSection,
  ProjectsSection,
} from "./helpers/section";

interface CmsCollectionFileV2 extends CmsCollectionFile {
  fields: CmsFieldV2[];
}

interface CmsCollectionV2 extends CmsCollection {
  path?: string;
  title: string;
  media_folder?: string;
  files?: CmsCollectionFileV2[];
  fields?: CmsFieldV2[];
  delete?: boolean;
}

interface CmsConfigV2 extends CmsConfig {
  local_backend?: boolean | { url: string; allowed_hosts?: string[] };
  load_config_file?: boolean;
}

const colorCollection: CmsCollectionV2 = {
  label: "Color",
  name: "colors",
  title: "colors",
  folder: "src/colors",
  summary: "{{fields.name}}",
  create: true,
  fields: [
    { label: "Name", name: "name", widget: "string" },
    { label: "Color", name: "color", widget: "string" },
  ],
};

const videoRatiosCollection: CmsCollectionV2 = {
  label: "Video Ratios",
  name: "video_ratios",
  folder: "src/ratios",
  title: "video-ratios",
  summary: "{{fields.ratioWidth}}/{{fields.ratioHeight}}",
  create: true,
  fields: [
    {
      label: "Width ratio",
      name: "ratioWidth",
      widget: "number",
      required: true,
    },
    {
      label: "Height ratio",
      name: "ratioHeight",
      widget: "number",
      required: true,
    },
  ],
};

const navbarOptions: CmsCollectionV2 = {
  label: "Options",
  name: "options",
  title: "options",
  files: [
    {
      label: "Navbar Options",
      name: "navbarOptions",
      file: "content/options/navbar.md",
      fields: [
        ColorField({ name: "textColor", label: "Text Color" }),
        ColorField({ name: "textOutlineColor", label: "Background Color" }),
        ColorField({ name: "textColorHover", label: "Text Color Hover" }),
        ColorField({
          name: "textOutlineColorHover",
          label: "Text Outline Color Hover",
        }),
        ColorField({ name: "textColorActive", label: "Text Color Active" }),
        ColorField({
          name: "textOutlineColorActive",
          label: "Background Color Active",
        }),
      ],
    },
  ],
};

const pageFields: CmsFieldV2[] = [
  {
    label: "Template Key",
    name: "templateKey",
    widget: "hidden",
    default: "index-page",
  },
  {
    label: "Contact Form Claim",
    name: "contactFormClaim",
    widget: "string",
  },
  {
    label: "Sections",
    name: "sections",
    widget: "list",
    types: [
      FullSizeSection,
      RowsSection,
      TitleWithColumnsSection,
      ProjectsSection,
    ],
  },
];

const HomePageCollectionFile: CmsCollectionFileV2 = {
  file: "src/pages/index.md",
  label: "Home Page",
  name: "index",
  fields: pageFields,
};

const AboutPageCollectionFile = {
  file: "src/pages/about/index.md",
  label: "About",
  name: "about",
  fields: pageFields,
};

const ContactPageCollectionFile = {
  file: "src/pages/contact/index.md",
  label: "Contact",
  name: "contact",
  fields: pageFields,
};

const pagesCollection: CmsCollectionV2 = {
  name: "pages",
  title: "pages",
  label: "Pages",
  files: [
    HomePageCollectionFile,
    AboutPageCollectionFile,
    ContactPageCollectionFile,
  ],
};

const projectsCollection: CmsCollectionV2 = {
  name: "projects",
  title: "projects",
  label: "Projects",
  folder: "content/projects",
  create: true,
  fields: [
    { label: "Draft", name: "draft", widget: "boolean", default: true },
    { label: "Type", name: "type", widget: "hidden", default: "project" },
    StringField({ label: "Slug", name: "slug" }),
    StringField({ name: "title" }),
    ColorField({ name: "titleColor", label: "Title Color" }),
    StringField({ name: "subtitle", label: "Subtitle" }),
    ImageField({ name: "image" }),
    ColorField({ name: "backgroundColor", label: "Background Color" }),
    RowsField,
  ],
};

const local_backend = true;

const publish_mode = "simple";

export const config: CmsConfigV2 = {
  media_folder: "static/img",
  public_folder: "/img",
  local_backend,
  publish_mode,
  backend: {
    name: "git-gateway",
    branch: "master",
    commit_messages: {
      create: "Create {{collection}} “{{slug}}”",
      update: "Update {{collection}} “{{slug}}”",
      delete: "Delete {{collection}} “{{slug}}”",
      uploadMedia: "[skip ci] Upload “{{path}}”",
      deleteMedia: "[skip ci] Delete “{{path}}”",
    },
  } as any,
  collections: [
    colorCollection,
    videoRatiosCollection,
    pagesCollection,
    projectsCollection,
    navbarOptions,
  ],
};
