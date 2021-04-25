import CMS from "netlify-cms-app";
import { config } from "./config";
import { AboutPagePreview } from "./preview-templates/AboutPagePreview";
import ColorPreview from "./preview-templates/ColorPreview";
import ContactPagePreview from "./preview-templates/ContactPagePreview";
import IndexPagePreview from "./preview-templates/IndexPagePreview";
import NavbarPreview from "./preview-templates/NavbarPreview";
import ProjectPagePreview from "./preview-templates/ProjectPagePreview";
import withStyledComponentsRendered from "./withStyledComponentsRendered";

// eslint-disable-next-line import/no-webpack-loader-syntax, @typescript-eslint/no-var-requires
const globalStyles = require("!css-loader!sass-loader!../style/global.scss");
const previewStyles = require("!css-loader!sass-loader!./preview.scss");

CMS.registerPreviewStyle(previewStyles.toString(), { raw: true });
CMS.registerPreviewStyle(globalStyles.toString(), { raw: true });

CMS.registerPreviewTemplate(
  "index",
  withStyledComponentsRendered(IndexPagePreview)
);
CMS.registerPreviewTemplate(
  "about",
  withStyledComponentsRendered(AboutPagePreview)
);
CMS.registerPreviewTemplate(
  "contact",
  withStyledComponentsRendered(ContactPagePreview)
);
CMS.registerPreviewTemplate(
  "projects",
  withStyledComponentsRendered(ProjectPagePreview)
);
CMS.registerPreviewTemplate(
  "navbarOptions",
  withStyledComponentsRendered(NavbarPreview)
);
CMS.registerPreviewTemplate(
  "colors",
  withStyledComponentsRendered(ColorPreview)
);

CMS.init({
  config,
});
