import React from "react";

export const PointsSelector = ({ points, label, icon, click, isActive }) => {
  return (
    <div
      onClick={click}
      className={`cursor-pointer  ${
        isActive ? "bg-primary text-white " : "bg-white text-black "
      }   justify-between h-full`}>
      <div className="flex pt-2 justify-center">
        <div className=" font-bold">
          <div className="text-center 3xl:text-[25px] xl:text-[16px] text-[12px]">
            {label}
          </div>
          <div
            className={`3xl:text-[50px] ${
              isActive ? "text-white" : "text-primary"
            } xl:text-[37px] text-[20px] text-right`}>
            {points}
          </div>
        </div>
      </div>
      <div>
        <div className="w-1/2 aspect-square grid place-content-center 3xl:rounded-tr-[70px] xl:rounded-tr-[52px]  rounded-tr-[34px]  bg-gray-100">
          <img src={icon} className="3xl:h-[60px] xl:h-[35px] h-[25px]" />
        </div>
      </div>
    </div>
  );
};
