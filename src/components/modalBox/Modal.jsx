import React, { useEffect, useRef, useState } from "react";
import './modal.css'
import { createPortal } from "react-dom";

const CustomModal = ({
  open, onClose,
  tapOutsidemodal = false,
  children,
  shadow=true,
  animation = false,
  width = 400, backdrop = 0 }) => {

  const backdropValue = backdrop > 0 ? `blur(${backdrop}px)` : "none";


  if (!open) return null;
  const header = React.Children.toArray(children)
    .find(child => child.type === CustomModal.Header);

  const body = React.Children.toArray(children)
    .find(child => child.type === CustomModal.Body);

  const footer = React.Children.toArray(children)
    .find(child => child.type === CustomModal.Footer);

  return createPortal(
    <div
      className="modal"
      onClick={tapOutsidemodal ? onClose : undefined}
      style={{
        backdropFilter: backdropValue
      }}
    >
      <div
        style={{
          width,
          ...(shadow && { boxShadow: "0 10px 20px rgba(0,0,0,0.4)" })
        }}
        onClick={(e) => e.stopPropagation()}
        className={`modalbox ${animation && "animation"}`}>
        <div className="wrapper">
          {header}
          {body}
          {footer}
        </div>
      </div>
    </div>,
    document.body
  );
};

CustomModal.Header = ({ children }) => {
  // console.log(children)
  return <div className="modal-header">{children}</div>
};

CustomModal.Body = ({ children }) => (
  <div className="modal-body">{children}</div>
);

CustomModal.Footer = ({ children }) => (
  <div className="modal-footer">{children}</div>
);

export default CustomModal;
