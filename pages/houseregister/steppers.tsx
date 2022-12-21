import React, { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { useAtom } from "jotai";
import { houseRegisterStep } from "../../store/atoms/HouseRegisterAtom";

export default function HouseRegisterStepper() {
  const [step] = useAtom(houseRegisterStep);
  const [percentage, setPercentage] = useState("16.67%");
  const checkStyle = { fontSize: "10px" };

  useEffect(() => {
    switch (step) {
      case 0:
        setPercentage("16.67%");
        break;

      case 1:
        setPercentage("33.3%");
        break;

      case 2:
        setPercentage("33.3%");
        break;

      case 3:
        setPercentage("50%");
        break;

      case 4:
        setPercentage("66.7%");
        break;

      case 5:
        setPercentage("83.35%");
        break;

      case 6:
        setPercentage("100%");
        break;

      default:
        setPercentage("16.67%");
        break;
    }

    console.log(step);
  }, []);

  return (
    <div
      className="hidden md:block w-full md:w-5/6 bg-gray-200 rounded-full h-0.5 mb-4 dark:bg-gray-700"
      id="stepper">
      <div
        className="bg-tertiary h-0.5 rounded-full dark:bg-tertiary"
        style={{ width: `${percentage}` }}></div>

      <div className="flex flex-row justify-around text-center mt-2 text-xs">
        <div className="flex flex-row gap-x-1">
          <div
            className={`w-3 h-3 flex flex-row justify-center items-center ${
              step == 0 && "bg-primary"
            } rounded-2xl border
            border-primary`}>
            {step > 0 && (
              <span className="text-primary" style={checkStyle}>
                <BsCheck />
              </span>
            )}
          </div>
          <div className="text-light">Mijn gegevens</div>
        </div>

        <div className="flex flex-row gap-x-1">
          <div
            className={`w-3 h-3 flex flex-row justify-center items-center ${
              step == 2 && "bg-primary"
            } rounded-2xl border
            border-primary`}>
            {step > 2 && (
              <span className="text-primary" style={checkStyle}>
                <BsCheck />
              </span>
            )}
          </div>
          <div className="text-light">Partner</div>
        </div>

        <div className="flex flex-row gap-x-1">
          <div
            className={`w-3 h-3 flex flex-row justify-center items-center ${
              step == 3 && "bg-primary"
            } rounded-2xl border
            border-primary`}>
            {step > 3 && (
              <span className="text-primary" style={checkStyle}>
                <BsCheck />
              </span>
            )}
          </div>
          <div className="text-light">Gezin</div>
        </div>

        <div className="flex flex-row gap-x-1">
          <div
            className={`w-3 h-3 flex flex-row justify-center items-center ${
              step == 4 && "bg-primary"
            } rounded-2xl border
            border-primary`}>
            {step > 4 && (
              <span className="text-primary" style={checkStyle}>
                <BsCheck />
              </span>
            )}
          </div>
          <div className="text-light">Situatie</div>
        </div>

        <div className="flex flex-row gap-x-1">
          <div
            className={`w-3 h-3 flex flex-row justify-center items-center ${
              step == 5 && "bg-primary"
            } rounded-2xl border
            border-primary`}>
            {step > 5 && (
              <span className="text-primary" style={checkStyle}>
                <BsCheck />
              </span>
            )}
          </div>
          <div className="text-light">Woonwensen</div>
        </div>

        <div className="flex flex-row gap-x-1">
          <div
            className={`w-3 h-3 flex flex-row justify-center items-center ${
              step == 5 && "bg-primary"
            } rounded-2xl border
            border-primary`}></div>
          <div className="text-light">Samenvatting</div>
        </div>
      </div>
    </div>
  );
}
