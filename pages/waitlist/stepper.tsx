import { useAtom } from "jotai";
import React from "react";
import { BsCheck } from "react-icons/bs";
import { waitlistStepAtom } from "../../store/atoms/waitlistAtom";

export default function WaitlistStepper() {
  const [waitlistStep] = useAtom(waitlistStepAtom);
  const checkStyle = { fontSize: "10px" };

  return (
    <div
      className="w-3/6 bg-gray-200 rounded-full h-0.5 mb-4 dark:bg-gray-700"
      id="stepper">
      <div
        className="bg-tertiary h-0.5 rounded-full dark:bg-tertiary"
        style={{ width: `${waitlistStep < 3 ? "50%" : "100%"}` }}></div>

      <div className="flex flex-row justify-around text-center mt-2 text-xs font-normal">
        <div className="flex flex-row gap-x-1">
          <div
            className={`w-3 h-3 flex flex-row justify-center items-center ${
              waitlistStep < 3 && "bg-primary"
            } rounded-2xl border
            border-primary`}>
            {waitlistStep == 3 && (
              <span className="text-primary" style={checkStyle}>
                <BsCheck />
              </span>
            )}
          </div>
          <div>Woonwagenstandplaatsen</div>
        </div>

        <div className="flex flex-row gap-x-1">
          <div
            className={`w-3 h-3 mt-0.5 ${
              waitlistStep == 3 && "bg-primary"
            } rounded-2xl border
            border-primary`}></div>
          <div>Samenvanting</div>
        </div>
      </div>
    </div>
  );
}
