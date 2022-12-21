import React from "react";

export const HouseFeature = ({ icon, text }) => {
  return (
    <div className="flex items-center space-x-4 py-2 px-3 bg-white shadow rounded-md">
      <img src={`/images/${icon}`} className="house-details-img" />
      <div>{text}</div>
    </div>
  );
};
