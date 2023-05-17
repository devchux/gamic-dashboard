import React from "react";
import {
  DownArrowIcon,
  ParallelArrowIcon,
  UpArrowIcon,
  WalletIcon,
} from "../../assets/svgs";

const OverviewCard = ({ amount, title, rating, variant }) => {
  const icons = {
    wallet: WalletIcon,
    deposit: UpArrowIcon,
    withdrawal: DownArrowIcon,
    swapped: ParallelArrowIcon,
  };
  const Icon = icons[variant];
  return (
    <div className="overview-card">
      <div className="overview-card-text-content">
        <h4>{amount}</h4>
        <h5>{title}</h5>
        <p className={variant === "deposit" ? "danger" : "success"}>{rating}</p>
      </div>
      <div className="overview-card-label-image">
        <Icon />
      </div>
    </div>
  );
};

export default OverviewCard;
