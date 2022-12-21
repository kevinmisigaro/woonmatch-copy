import { range } from "lodash";
import moment from "moment";
import React from "react";

export default function RegistrationDob({
  dayOnChange,
  monthOnChange,
  yearOnChange,
  day,
  month,
  year,
}) {
  const days = Array.from(Array(32).keys())
    .filter((x) => x > 0)
    .map((x) => (x < 10 ? `0${x}` : x));
  const months = [
    {
      text: "Januari",
      value: "01",
    },
    {
      text: "Februari",
      value: "02",
    },
    {
      text: "Maart",
      value: "03",
    },
    {
      text: "April",
      value: "04",
    },
    {
      text: "Mei",
      value: "05",
    },
    {
      text: "Juni",
      value: "06",
    },
    {
      text: "Juli",
      value: "07",
    },
    {
      text: "Augustus",
      value: "08",
    },
    {
      text: "September",
      value: "09",
    },
    {
      text: "Oktober",
      value: "10",
    },
    {
      text: "November",
      value: "11",
    },
    {
      text: "December",
      value: "12",
    },
  ];
  const years = range(
    1900,
    parseInt(moment().subtract(15, "years").format("YYYY"))
  );

  return (
    <div className="flex flex-row gap-x-3">
      <select
        onChange={dayOnChange}
        value={day}
        className="border-b border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-1/4 py-1">
        {days.map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ))}
      </select>
      <select
        onChange={monthOnChange}
        value={month}
        className="border-b border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-1/4 py-1">
        {months.map((x) => (
          <option key={x.value} value={x.value}>
            {x.text}
          </option>
        ))}
      </select>
      <select
        onChange={yearOnChange}
        value={year}
        className="border-b border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-1/4 py-1">
        {years.map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ))}
      </select>
    </div>
  );
}
