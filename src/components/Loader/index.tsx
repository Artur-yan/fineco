import * as React from "react";
import cx from "classnames";
import "./loader.scss";

interface Props {
  palette?: "primary" | "secondary"
}

const Loader: React.FC<Props> = ({ palette = "primary" }) => (
  <div className={cx("squash-spinner", palette)}>
    <div className="bounce1"></div>
    <div className="bounce2"></div>
    <div className="bounce3"></div>
  </div>
);

export default Loader;
