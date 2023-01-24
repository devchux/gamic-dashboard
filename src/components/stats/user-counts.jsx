import React from "react";

const UserCounts = ({
  dailyActiveUser,
  weeklyActiveUser,
  monthlyActiveUser,
}) => {
  return (
    <div className="user-counts">
      <div>
        <p>Daily Active Users</p>
        <h4>{dailyActiveUser || 0}</h4>
      </div>
      <div>
        <p>Weekly Active Users</p>
        <h4>{weeklyActiveUser || 0}</h4>
      </div>
      <div>
        <p>Monthly Active Users</p>
        <h4>{monthlyActiveUser || 0}</h4>
      </div>
    </div>
  );
};

export default UserCounts;
