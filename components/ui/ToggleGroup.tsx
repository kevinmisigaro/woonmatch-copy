import React from "react";

export interface ToggleSwitchItem {
  value: string | number;
  label: string;
}

interface props {
  items: ToggleSwitchItem[];
  selectedValue: "";
  onClick: any;
}

export const ToggleGroup = ({ items, selectedValue, onClick }: props) => {
  return (
    <div className="flex items-center space-x-4">
      {items.map((item: ToggleSwitchItem, index: number) => (
        <button
          key={index}
          className="flex items-center space-x-3"
          onClick={() => onClick(item)}>
          <div>
            <ToggleButton isActive={item.value == selectedValue} />
          </div>
          <div>{item.label}</div>
        </button>
      ))}
    </div>
  );
};

export const ToggleButton = ({ isActive = false }: { isActive: boolean }) => {
  return (
    <div
      className={` ${
        isActive ? "border-tertiary" : "border-gray-400"
      } border-2   rounded-full aspect-square`}>
      <div
        className={` ${
          isActive ? "bg-tertiary" : "bg-white"
        } w-4 rounded-full m-1 aspect-square`}></div>
    </div>
  );
};
