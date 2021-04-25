import * as t from "io-ts";

export const ImageSharp = t.type(
  {
    fluid: t.type({ src: t.string }, "fluid")
  },
  "ImageSharp"
);

export const ImageFile = t.type(
  {
    childImageSharp: ImageSharp,
    publicURL: t.string
  },
  "ImageFile"
);

export type ImageFile = t.TypeOf<typeof ImageFile>;

export type ImageSharp = t.TypeOf<typeof ImageSharp>;

export const Image = t.type(
  {
    alt: t.string,
    image: ImageFile
  },
  "Image"
);

export type Image = t.TypeOf<typeof Image>;

export const ImageElement = t.type(
  {
    type: t.literal("image_type"),
    ...Image.props
  },
  "ImageElement"
);

export type ImageElement = t.TypeOf<typeof ImageElement>;

export const BackgroundImageElement = t.type(
  {
    type: t.literal("background_image_type"),
    ...Image.props
  },
  "ImageElement"
);

export type BackgroundImageElement = t.TypeOf<typeof BackgroundImageElement>;
