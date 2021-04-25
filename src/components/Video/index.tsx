import cx from "classnames";
import * as React from "react";
import Speaker from "../icons/Speaker";
import { VideoFile } from "@models/Video";
import "./video.scss";
interface VideoProps {
  video: VideoFile;
  controls: boolean;
  autoPlay: boolean;
  muted: boolean;
  fullPage: boolean;
  loop: boolean;
  style?: React.CSSProperties;
}

export const Video: React.FC<VideoProps> = ({
  video,
  controls,
  autoPlay,
  loop,
  muted,
  style,
  fullPage,
}) => {
  const [runtimeMuted, setRuntimeMuted] = React.useState(muted);

  return (
    <div
      className={cx("video", {
        "full-page": fullPage,
      })}
      style={style}
    >
      <video
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        muted={runtimeMuted}
        controlsList="nodownload"
        ref={(video) => {
          video?.addEventListener(
            "loadeddata",
            function () {
              const modal = document.querySelector(".initial-modal");
              modal && modal.classList.add("closed");
            },
            false
          );
        }}
      >
        <source src={video.publicURL} type={`video/${video.extension}`} />
      </video>

      {!controls && (
        <Speaker
          active={!runtimeMuted}
          color="#fff"
          style={{
            width: 25,
            height: 25,
            position: "absolute",
            bottom: 20,
            left: 20,
          }}
          onClick={() => setRuntimeMuted(!runtimeMuted)}
        />
      )}
    </div>
  );
};
