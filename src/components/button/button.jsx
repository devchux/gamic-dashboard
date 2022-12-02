import React from "react";

const Button = ({ children, className = "", active = false, ...rest }) => {
  return (
    <button
      className={`custom-button ${active ? "active" : ""} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
