import * as React from "react";
import Loader from "../Loader";
import "./initial-modal.scss";

const InitialModal: React.FC = () => (
  <div className="initial-modal centered">
    <Loader palette="secondary" />
  </div>
);

export default InitialModal;
