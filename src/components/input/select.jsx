import React from "react";

const Select = ({ options = [], ...rest }) => {
  return (
    <select className="custom-select" {...rest}>
      {options.map((item, i) => (
        <option key={i} value={item?.value}>
          {item?.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
