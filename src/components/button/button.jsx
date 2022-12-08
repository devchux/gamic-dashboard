import React from "react";

const Button = ({ children, className = "", activated = false, ...rest }) => {
  return (
    <button
      className={`custom-button ${activated ? "active" : ""} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
