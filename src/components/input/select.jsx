import React from "react";

const Select = ({ options = [], fitContent, ...rest }) => {
  return (
    <select className={`custom-select ${fitContent ? "fit-content" : ''}`} {...rest}>
      {options.map((item, i) => (
        <option key={i} value={item?.value}>
          {item?.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
