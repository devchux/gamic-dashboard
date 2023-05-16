import React from "react";

const UserCounts = ({
  onlineUserCount,
  last24HourActiveUser,
  weeklyActiveUser,
  monthlyActiveUser,
}) => {
  return (
    <div className="user-counts">
      <div>
        <p>Online Users</p>
        <h4>{onlineUserCount || 0}</h4>
      </div>

      <div>
        <p>Daily Active Users</p>
        <h4>{last24HourActiveUser || 0}</h4>
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
