import * as React from "react";
import * as ReactDOM from "react-dom";
import { getMenuWrapper } from "../../utils/dom";

const MenuPortal: React.FunctionComponent = ({ children }) => {
  const [menuWrapper, setMenuWrapper] = React.useState<Element | null>(null);

  React.useEffect(() => {
    setMenuWrapper(getMenuWrapper());
  }, []);

  return menuWrapper === null
    ? null
    : ReactDOM.createPortal(children, menuWrapper);
};

export default MenuPortal;
