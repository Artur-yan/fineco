import * as React from "react";
import * as ReactDOM from "react-dom";

interface Props {
  node: Element;
}

const Portal: React.FunctionComponent<Props> = ({ node, children }) => {
  return ReactDOM.createPortal(children, node);
};

export default Portal;
