import { noop } from "lodash";
import React from "react";

type Props = {
  width: number
  color: string
  onClick?: () => void
}

const Mail: React.FC<Props> = ({ width, color, onClick = noop }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0"
    y="0"
    fill={color}
    onClick={onClick}
    width={width}
    enableBackground="new 0 0 241.061 241.061"
    version="1.1"
    viewBox="0 0 241.061 241.061"
    xmlSpace="preserve"
  >
    <path d="M198.602 70.402l-78.063 68.789-78.08-68.79a7.5 7.5 0 10-9.916 11.255l83.039 73.159c1.417 1.248 3.188 1.872 4.958 1.872s3.542-.624 4.959-1.873l83.022-73.159a7.502 7.502 0 00.668-10.586 7.505 7.505 0 00-10.587-.667z"></path>
    <path d="M218.561 38.529H22.5c-12.406 0-22.5 10.093-22.5 22.5v119.002c0 12.407 10.094 22.5 22.5 22.5h196.061c12.406 0 22.5-10.093 22.5-22.5V61.029c0-12.406-10.094-22.5-22.5-22.5zm7.5 141.502c0 4.135-3.364 7.5-7.5 7.5H22.5c-4.136 0-7.5-3.365-7.5-7.5V61.029c0-4.135 3.364-7.5 7.5-7.5h196.061c4.136 0 7.5 3.365 7.5 7.5v119.002z"></path>
  </svg>
);

export default Mail;
