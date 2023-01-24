import React from "react";

const Button = ({
  children,
  className = "",
  activated = false,
  colored = false,
  block = false,
  ...rest
}) => {
  return (
    <button
      className={`custom-button ${activated ? "active" : ""} ${
        block ? "block" : ""
      } ${colored ? "colored" : ""} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
