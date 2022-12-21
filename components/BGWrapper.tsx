import React from "react";

export const BGWrapper = ({
  className,
  image,
  children,
  gradientOverLay = true,
}) => {
  return (
    <div
      style={{
        backgroundImage: `url("${image}")`,
      }}
      className={`${className}  relative w-full h-full bg-no-repeat bg-center bg-cover bg-gray-600 `}>
      <div
        className={`h-full ${
          gradientOverLay
            ? "bg-gradient-to-r from-[#000000]/80  to-[#000000]/0"
            : ""
        }`}>
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
};
