import React, { useState } from "react";
import { react } from "../../pages/api/houses/react";
import { HouseFeature } from "../HouseFeature";
import { InfoCard, InfoCardList } from "./InfoCard";

export const OnSiteReactCard = ({ house, title, listItems, features }) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="grid col-span-2">
        <div className="bg-white shadow-lg rounded-b-lg">
          <ThumbnailWrapper thumbnail={undefined} />
          <div>
            <div>
              <div>Huurprijs</div>
              <div>€ 507,50 per maand</div>
            </div>
            <div>
              <div>Huurprijs</div>
              <div>€ 507,50 per maand</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid col-span-5">
        <InfoCard title={title}>
          <>
            <InfoCardList items={listItems} />
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <HouseFeature icon={feature.icon} text={feature.text} />
              ))}
            </div>
          </>
        </InfoCard>
      </div>
    </div>
  );
};

export const ThumbnailWrapper = ({ thumbnail }) => {
  const [isOver, setIsOver] = useState(false);
  const handleOnMouseOver = (isOver) => {
    setIsOver(isOver);
  };
  return (
    <div
      onMouseOver={() => handleOnMouseOver(true)}
      onMouseOut={() => handleOnMouseOver(false)}
      className={`relative aspect-video w-full`}>
      <div
        className={`w-full h-full grid place-content-center  overflow-hidden`}>
        <img
          style={{
            transform: isOver ? "scale(1.1)" : "scale(1)",
            transition: "transform .3s ease-out",
          }}
          src={thumbnail}
        />
      </div>
      <div
        className={`absolute top-0 house-card-bg right-0 bottom-0 left-0 flex flex-col justify-between w-full h-full text-white  2xl:p-[30px] p-[15px] xl:p-[20px]`}>
        <div className="flex justify-between space-x-4 ">
          <div className="space-y-[5px] xl:space-y-[7.5px] 3xl:space-y-[10px]"></div>
        </div>
        <div className="flex lg:flex-nowrap justify-between items-center  md:space-x-4 ">
          <div className="card-tag">Bekijk details woning</div>
        </div>
      </div>
    </div>
  );
};
