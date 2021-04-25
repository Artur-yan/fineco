import * as t from "io-ts";

export const VideoFile = t.type(
  {
    publicURL: t.string,
    extension: t.string,
  },
  "VideoFile"
);

export type VideoFile = t.TypeOf<typeof VideoFile>;

export const VideoElement = t.type(
  {
    type: t.literal("video_type"),
    video_controls: t.boolean,
    video_muted: t.boolean,
    full_page: t.boolean,
    video_autoplay: t.boolean,
    video_loop: t.boolean,
    video: VideoFile,
  },
  "Video"
);
export type VideoElement = t.TypeOf<typeof VideoElement>;

export const VimeoVideoElement = t.type(
  {
    type: t.literal("vimeo_video_type"),
    video_controls: t.boolean,
    video_muted: t.boolean,
    full_page: t.boolean,
    video_autoplay: t.boolean,
    video_loop: t.boolean,
    vimeo_id: t.string,
    video_ratio: t.string,
  },
  "VimeoVideo"
);
export type VimeoVideoElement = t.TypeOf<typeof VimeoVideoElement>;
