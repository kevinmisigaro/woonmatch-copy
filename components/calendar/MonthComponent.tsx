import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";

interface MonthArgs {
  onDateSelected?: Function;
  defaultDate?: Moment;
}

export const MonthComponent = ({ onDateSelected, defaultDate }: MonthArgs) => {
  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [date] = useState(defaultDate);
  const [calendar, setCalender] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());

  const getMonthCalendar = (_date) => {
    const calendar = [];
    const today = _date;
    const startDay = today.clone().startOf("month").startOf("week");
    const endDay = today.clone().endOf("month").endOf("week");

    let date = startDay.clone().subtract(1, "day");

    while (date.isBefore(endDay, "day"))
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => date.add(1, "day").clone()),
      });

    return calendar;
  };

  useEffect(() => {
    console.log("defaultDate", defaultDate);
    if (defaultDate) setCalender(getMonthCalendar(defaultDate));
    setCalender(getMonthCalendar(moment()));
  }, [defaultDate]);

  const monthBack = () => {
    let newDate = date.subtract(1, "months");
    setCalender(getMonthCalendar(newDate));
  };
  const monthForward = () => {
    let newDate = date.add(1, "months");
    setCalender(getMonthCalendar(newDate));
  };

  const selectDate = (day: Moment) => {
    setSelectedDate(day);
    if (onDateSelected) onDateSelected(day);
  };

  const isInSelectedtMonth = (day: Moment) => {
    return day.get("month") == date.get("month");
  };

  return (
    <div className="text-[14px] min-w-[250px] ">
      <div className="flex">
        <div
          onClick={() => {
            monthBack();
          }}
          className="aspect-square h-[30px] grid place-content-center cursor-pointer">
          <img src="/images/caret-left-green.svg" className="rotate-90" />
        </div>
        <div className="flex-1 text-center">{date.format("MMMM YYYY")}</div>
        <div
          onClick={() => {
            monthForward();
          }}
          className="aspect-square h-[30px] grid place-content-center cursor-pointer">
          <img src="/images/caret-right-green.svg" className="-rotate-90" />
        </div>
      </div>
      <div className="grid grid-cols-7 grid-rows-6">
        {weeks.map((week, i: number) => (
          <div key={i} className="text-center p-1 text-gray-400">
            {week}
          </div>
        ))}
        {calendar.map((monthWeek, j: number) =>
          monthWeek.days.map((day: Moment, k: number) => (
            <div
              onClick={() => selectDate(day)}
              key={k}
              className={`text-center ${
                day == selectedDate ? "bg-primary !text-white" : ""
              } 
                ${!isInSelectedtMonth(day) ? "text-gray-300" : "!text-gray-800"}
              p-1 h-[30px] grid place-content-center aspect-square cursor-pointer  hover:bg-primary hover:!text-white rounded-full`}>
              {day.format("D")}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
