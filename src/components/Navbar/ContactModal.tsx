import * as React from "react";
import closeIcon from "../../img/icon-nav-plus-black-mobile-primary.svg";
import ContactForm from "../ContactForm";
import ModalPortal from "../ModalPortal";
import "./contact-modal.scss";

type Props = {
  onClose: () => void;
};

const ContactModal: React.FC<Props> = (props) => {
  return (
    <ModalPortal>
      <div className="centered">
        <div className="modal-inner">
          <button
            onClick={props.onClose}
            style={{
              backgroundImage: `url(${closeIcon})`,
            }}
            className="close-button"
            aria-label="close button"
          ></button>
          <ContactForm onSuccess={() => setTimeout(props.onClose, 2500)} />
        </div>
      </div>
    </ModalPortal>
  );
};

export default ContactModal;
