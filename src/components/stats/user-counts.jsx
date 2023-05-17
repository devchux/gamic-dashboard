import React from "react";

const UserCounts = ({ data = [], lg }) => {
  return (
    <div className={`user-counts ${lg ? "lg" : ""}`}>
      {data?.map(({ title, amount }, i) => (
        <div key={i}>
          <p>{title}</p>
          <h4>{amount || 0}</h4>
        </div>
      ))}
    </div>
  );
};

export default UserCounts;
