import cx from "classnames";
import * as React from "react";
import "./vimeo-video.scss";

interface VimeoVideoProps {
  videoLink: string;
  videoRatio: string;
  controls: boolean;
  autoPlay: boolean;
  muted: boolean;
  fullPage: boolean;
  loop: boolean;
  style?: React.CSSProperties;
}

export const VimeoVideo: React.FC<VimeoVideoProps> = ({
  videoLink,
  controls,
  autoPlay,
  loop,
  muted,
  style,
  fullPage,
  videoRatio,
}) => {
  const [containerWidth, setContainerWidth] = React.useState(0);
  const autoplaySwitch = autoPlay ? 1 : 0;
  const controlsSwitch = controls ? 1 : 0;
  const loopSwitch = loop ? 1 : 0;
  const mutedSwitch = muted ? 1 : 0;
  const [width, height] = videoRatio.split("-").map((v) => parseInt(v, 10));
  const ratio = height / width;
  const iframeHeight = containerWidth * ratio;

  return (
    <MemoizedContainer
      fullPage={fullPage}
      style={style}
      containerWidth={containerWidth}
      setContainerWidth={setContainerWidth}
    >
      <iframe
        style={{ height: iframeHeight }}
        src={`https://player.vimeo.com/video/${videoLink}?autoplay=${autoplaySwitch}&controls=${controlsSwitch}&loop=${loopSwitch}&muted=${mutedSwitch}`}
        width="100%"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      ></iframe>
    </MemoizedContainer>
  );
};

const MemoizedContainer = React.memo<{
  style?: React.CSSProperties;
  fullPage: boolean;
  children: React.ReactNode;
  containerWidth: number;
  setContainerWidth: React.Dispatch<React.SetStateAction<number>>;
}>(
  ({ children, fullPage, style, setContainerWidth, containerWidth }) => {
    return (
      <div
        className={cx("vimeo-video", {
          "full-page": fullPage,
        })}
        ref={(e) => {
          if (e !== null && containerWidth === 0) {
            setContainerWidth(e.getBoundingClientRect().width);
          }
        }}
        style={style}
      >
        {children}
      </div>
    );
  },
  () => false
);
