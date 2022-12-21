import moment, { Moment } from "moment";
import React, { useState } from "react";
import { MonthComponent } from "./MonthComponent";

export const Calendar = () => {
  const [initialDate1, setDate1] = useState(moment().subtract("1", "month"));
  const [initialDate2, setDate2] = useState(moment());

  const handleDate1Select = (date: Moment) => {
    console.log(date);
  };

  const handleDate2Select = (date: Moment) => {
    console.log(date);
  };
  return (
    <div className="border border-r-gray-300 bg-white rounded-md overflow-hidden shadow-xl">
      <div className="flex space-x-6">
        <div className="p-3">
          <MonthComponent
            defaultDate={initialDate2}
            onDateSelected={(date: Moment) => handleDate1Select(date)}
          />
        </div>
        <div className="p-3">
          <MonthComponent
            defaultDate={initialDate2}
            onDateSelected={(date: Moment) => handleDate2Select(date)}
          />
        </div>
        <div className="text-14 p-3 pr-10 min-w-[250px]">
          <div>Predefined periods:</div>
          <div>Last month</div>
          <div>Last 3 months</div>
        </div>
      </div>
      <div className="flex justify-between items-center text-14 p-2  border-t bordre-t-gray-400">
        <div className="px-2 py-1 rounded-md  bg-white border border-white transition-all duration-300 hover:border-gray-200 hover:shadow cursor-pointer ">
          Cancel
        </div>
        <div className="flex items-center space-x-3">
          <div className="font-bold">
            <span className="text-gray-400">Selected:</span>{" "}
            <span className="text-black">21 Days</span>
          </div>
          <div className="px-2 py-1 rounded-md shadow-md bg-tertiary cursor-pointer text-white">
            Done
          </div>
        </div>
      </div>
    </div>
  );
};
function useSate(): [any, any] {
  throw new Error("Function not implemented.");
}
