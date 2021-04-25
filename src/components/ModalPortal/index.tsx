import * as React from "react";
import * as ReactDOM from "react-dom";
import { getModalWrapper } from "../../utils/dom";

const ModalPortal: React.FunctionComponent = ({ children }) => {
  const [modalWrapper, setModalWrapper] = React.useState<Element | null>(null);

  React.useEffect(() => {
    setModalWrapper(getModalWrapper());
  }, []);

  return modalWrapper === null
    ? null
    : ReactDOM.createPortal(children, modalWrapper);
};

export default ModalPortal;
