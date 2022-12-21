import React from "react";
import Range from "rc-slider";
import "rc-slider/assets/index.css";

export default function RegisterInputSlider({
  onchange,
  rangevals,
  measurement,
}) {
  return (
    <div className="w-72">
      <div className="w-60">
        <Range
          min={0}
          max={6}
          step={1}
          onChange={onchange}
          railStyle={{ height: "14px" }}
          handleStyle={{
            backgroundColor: "white",
            height: "16px",
            width: "16px",
            marginTop: "0px",
            cursor: "pointer",
            border: "1px solid white",
          }}
          trackStyle={{ backgroundImage: "linear-gradient(to right, #535453, #8EB429)", height: "14px" }}
        />
      </div>
      <div className="flex flex-row w-full items-center">
        <div className="flex flex-row justify-between text-xs text-gray-400 mt-2 basis-10/12">
          {rangevals.map((r: number) => (
            <small key={r}>{r}</small>
          ))}
        </div>
        <div className="text-gray-400 ml-1 text-xs mt-1.5">
          <small>{measurement}</small>
        </div>
      </div>
    </div>
  );
}
