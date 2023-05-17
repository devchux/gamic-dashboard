import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ModalContent = ({ title, children, toggle }) => {
  return (
    <div className="modal-content-wrapper">
      <div className="heading">
        <h3>{title}</h3>
        <button onClick={toggle}>&times;</button>
      </div>
      <div className="modal-content">{children}</div>
    </div>
  );
};

const Modal = ({ isOpen, toggle, children, className = "", title = "" }) => {
  const [isReady, setIsReady] = useState(false);

  const createElement = (element, elementClassName = "") => {
    const el = document.createElement(element);
    el.className = elementClassName;

    return el;
  };

  const modal = createElement("div", `modal-wrapper ${className}`);

  useEffect(() => {
    let wrapper;
    if (isOpen) {
      wrapper = createElement("div", "custom-modal-wrapper");
      wrapper.appendChild(modal);
      document.body.appendChild(wrapper);
      setIsReady(true);
    } else {
      setIsReady(false);
      wrapper && document.body.removeChild(wrapper);
    }

    return () => {
      setIsReady(false);
      wrapper && document.body.removeChild(wrapper);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    isReady &&
    createPortal(
      <ModalContent title={title} toggle={toggle}>
        {children}
      </ModalContent>,
      document.querySelector(".modal-wrapper")
    )
  );
};

export default Modal;
