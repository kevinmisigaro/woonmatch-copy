import React from "react";

export const InfoCard = ({
  title = null,
  titleChild = null,
  children = null,
}) => {
  return (
    <div className="bg-white">
      <div className="border-b border-l border-r rounded-md overflow-hidden shadow-sm">
        <div className="flex justify-between items-center py-4 px-4 lg:px-8 bg-limeade">
          <h2 className="text-white text-xl lg:text-2xl font-medium">
            {title}
          </h2>
          <div>{titleChild}</div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export const InfoCardList = ({ items }) => {
  return (
    <ul className="divide-y divide-[#EFEFEF] text-gray-500 px-4">
      {items.map((item, i) => (
        <ListItem
          key={i}
          icon={item.icon}
          infoField={item.field}
          infoValue={item.value}
        />
      ))}
    </ul>
  );
};

export const ListItem = ({ icon, infoField, infoValue }) => {
  return (
    <li className="grid grid-cols-8 items-center space-x-4 lg:space-x-8 px-2 lg:px-4">
      <div className="flex whitespace-nowrap col-span-4 sm:col-span-3 items-center space-x-3 w-auto md:w-1/3 lg:w-1/5 py-2 font-medium">
        <img
          src={"/images/" + icon}
          className="h-[10px] xl:h-[16px] 3xl:h-[22px] w-auto"
        />
        <span>{infoField}:</span>
      </div>
      <div className="col-span-4 sm:col-span-5 text-left">
        <p className="">{infoValue}</p>
      </div>
    </li>
  );
};
