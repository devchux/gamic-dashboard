import React from "react";

const UserCounts = ({
  dailyActiveUser,
  weeklyActiveUser,
  monthlyActiveUser,
}) => {
  return (
    <div className="user-counts">
      <div>
        <p>daily active user</p>
        <h4>{dailyActiveUser || 0}</h4>
      </div>
      <div>
        <p>weekly active user</p>
        <h4>{weeklyActiveUser || 0}</h4>
      </div>
      <div>
        <p>monthly active user</p>
        <h4>{monthlyActiveUser || 0}</h4>
      </div>
    </div>
  );
};

export default UserCounts;
