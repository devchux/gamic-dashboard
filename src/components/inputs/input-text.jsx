import React, { forwardRef, useState } from "react";

const InputText = forwardRef(
  (
    {
      wrapperClassName,
      hasError = false,
      type,
      isPhone = false,
      isMulti = false,
      label,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => setShowPassword(!showPassword);

    if (type === "password")
      return (
        <>
          {label && <label className="mb-2">{label}</label>}
          <div
            className={`auth-input-wrapper auth-password-input ${
              hasError ? "has-error" : ""
            } ${wrapperClassName || ""}`}
          >
            <input
              type={showPassword ? "text" : "password"}
              {...rest}
              ref={ref}
            />
            <button
              type="button"
              className="toggle-button"
              onClick={togglePassword}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>
        </>
      );

    return (
      <>
        {label && <label className="mb-2">{label}</label>}
        <div
          className={`auth-input-wrapper ${hasError ? "has-error" : ""} ${
            wrapperClassName || ""
          }`}
        >
          <input type={type} ref={ref} {...rest} />
        </div>
      </>
    );
  }
);

export default InputText;
