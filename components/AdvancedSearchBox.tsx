import React, { useEffect, useState } from "react";
import InputRangeSliderSlider from "./ui/InputRangeSlider/InputRangeSlider";

interface props {
  darkTheme: boolean;
  currentMinPrice: number;
  currentMaxPrice: number;
  onSubmit?: ({
    rentMin,
    rentMax,
  }: {
    rentMin: number | null;
    rentMax: number | null;
  }) => void;
}
const AdvancedSearchBox: React.FC<any> = ({
  darkTheme = false,
  onSubmit,
  currentMinPrice,
  currentMaxPrice,
}: props) => {
  const minAmountLimit = 0;
  const maxAmountLimit = 1250;
  const lowerRent = 752.33;
  const higherRent = 753;

  const [inputRangeActive, setInputRangeActive] = useState(true);

  const [inputMinAmount, setInputMinAmount] = useState(0);
  const [inputMaxAmount, setInputMaxAmount] = useState(maxAmountLimit);
  const [selectedRent, setSelectedRent] = useState({
    amount: 0,
    level: null,
  });

  const getAmountWithinLimits = (amount) => {
    let value = amount;
    if (amount < 0) {
      value = 0;
    }

    if (amount >= maxAmountLimit) {
      value = maxAmountLimit;
    }

    return value;
  };

  useEffect(() => {
    setInputRangeActive(false);
    switch (selectedRent.level) {
      case "high":
        setInputMinAmount(selectedRent.amount);
        setInputMaxAmount(maxAmountLimit);
        break;

      case "low":
        setInputMaxAmount(selectedRent.amount);
        setInputMinAmount(minAmountLimit);
        break;

      default:
        if (currentMinPrice || currentMaxPrice) {
          let setCurrent = true;
          if (
            currentMinPrice == higherRent &&
            currentMaxPrice == maxAmountLimit
          ) {
            setSelectedRent({ amount: higherRent, level: "high" });
            setCurrent = false;
          }

          if (currentMinPrice == 0 && currentMaxPrice == lowerRent) {
            selectedRent.level == "low";
            setSelectedRent({ amount: lowerRent, level: "low" });
            setCurrent = false;
          }

          if (setCurrent) {
            setInputMinAmount(currentMinPrice);
            setInputMaxAmount(currentMaxPrice);
          }
        } else {
          setInputMinAmount(minAmountLimit);
          setInputMaxAmount(maxAmountLimit);
        }
        break;
    }

    setTimeout(() => {
      setInputRangeActive(true);
    }, 1000);
  }, [selectedRent]);

  const handleRentSelectionClick = (level) => {
    if (level == "high") {
      if (selectedRent.level == "high") {
        setSelectedRent({ amount: 0, level: null });
      } else {
        setSelectedRent({ amount: higherRent, level });
      }
    }

    if (level == "low") {
      if (selectedRent.level == "low") {
        setSelectedRent({ amount: 0, level: null });
      } else {
        setSelectedRent({ amount: lowerRent, level });
      }
    }
  };

  const clear = () => {
    setInputRangeActive(false);
    setInputMinAmount(minAmountLimit);
    setInputMaxAmount(maxAmountLimit);
  };
  return (
    <div
      className={`${
        darkTheme ? "bg-gray-100" : "bg-white"
      }  w-full  rounded-md overflow-hidden`}>
      <section className="px-[25px]  xl:px-[40px] 3xl:px-[55px] py-[20px] xl:py-[40px] 3xl:py-[45px]">
        <h2 className="text-primary ">
          Zoek je een sociale huurwoning of lets anders?
        </h2>

        <div className="w-full sm:w-2/3 mt-[20px] xl:mt-[34px] 3xl:mt-[45px]">
          <div className="flex space-x-5 ">
            <div className="">
              <AmountInput
                onFocus={(e) => {
                  e.target.select();
                  setInputRangeActive(false);
                }}
                onBlur={() => {
                  setInputMinAmount(inputMinAmount);
                  setInputRangeActive(true);
                }}
                value={inputMinAmount}
                label={"Minimaal"}
                onChange={(value) => {
                  setInputMinAmount(getAmountWithinLimits(value));
                }}
              />
            </div>
            <div className=" ">
              <AmountInput
                onFocus={(e) => {
                  e.target.select();
                  setInputRangeActive(false);
                }}
                onBlur={(e) => {
                  setInputMaxAmount(inputMaxAmount);
                  setInputRangeActive(true);
                }}
                value={inputMaxAmount}
                label={"Maximaal"}
                onChange={(value) => {
                  setInputMaxAmount(getAmountWithinLimits(value));
                }}
              />
            </div>
          </div>
          <div className="flex mt-[30px] xl:mt-[45px] 3xl:mt-[55px]">
            <InputRangeSliderSlider
              minLimit={minAmountLimit}
              maxLimit={maxAmountLimit}
              inputMinVal={inputMinAmount}
              inputMaxVal={inputMaxAmount}
              onChange={(v) => {
                if (inputRangeActive) {
                  setInputMaxAmount(v.max);
                  setInputMinAmount(v.min);
                }
              }}
            />
          </div>
        </div>

        <div className="flex space-x-4 mt-[26px] xl:mt-[40px] 3xl:mt-[50px] text-gray-500">
          <div className="flex-1">
            <div>
              <button
                onClick={() => handleRentSelectionClick("low")}
                className={`search-inner-button${
                  selectedRent.level == "low" ? "-active" : ""
                }`}>
                Sociale huur tot €{" "}
                {lowerRent.toLocaleString("nl-NL", {
                  minimumFractionDigits: 2,
                })}{" "}
                per maand
              </button>
            </div>
          </div>
          <div className="flex-1 ">
            <div className="flex justify-end">
              <button
                onClick={() => handleRentSelectionClick("high")}
                className={`search-inner-button${
                  selectedRent.level == "high" ? "-active" : ""
                }`}>
                Vrije sector huur hoger dan €{" "}
                {higherRent.toLocaleString("nl-NL", {
                  minimumFractionDigits: 2,
                })}{" "}
                per maand
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2  mt-[26px] xl:mt-[40px] 3xl:mt-[50px] text-gray-500">
          <div className="w-full border-r-[.5px] border-[#EFEFE">
            <div className="pr-2 sm:pr-10 ">
              <p className=" mb-6">
                Deze woningen zijn bedoeld voor woningzoekenden met een
                verzamelinkomen tot € 44.655
              </p>

              <ul className="space-y-2">
                <li className="flex items-center ">
                  <span className="search-list-icon"></span>
                  <p>Recente inkomensverklaring </p>
                </li>
                <li className="flex items-center ">
                  <span className="search-list-icon"></span>
                  <p>Spelregels namens de regio</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full border-l-[.5px] border-[#EFEFEF] ">
            <div className="pl-2 sm:pl-10  ">
              <p className=" mb-6">
                Deze woningen zijn bedoeld voor woningzoekenden met een
                verzamelinkomen tot € 44.655
              </p>

              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="search-list-icon"></span>
                  <p>Eventueel aanvullende voorwaarden</p>
                </li>
                <li className="flex items-center">
                  <span className="search-list-icon"></span>
                  <p>Corporatie bepaait toewijzing</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-0">
        <button
          onClick={() => {
            clear();
            onSubmit({
              rentMin: null,
              rentMax: null,
            });
          }}
          className="search-inner-button-bottom text-tertiary border  rounded-bl-md ">
          Wis
        </button>
        <button
          onClick={() => {
            onSubmit
              ? onSubmit({
                  rentMin: inputMinAmount,
                  rentMax: inputMaxAmount,
                })
              : null;
          }}
          className="search-inner-button-bottom text-white bg-tertiary ">
          Ok
        </button>
      </div>
    </div>
  );
};

export const AmountInput = ({
  label,
  value,
  onChange,
  onFocus,
  onBlur,
}: {
  label: string;
  value?: number;
  onChange: Function;
  onFocus: any;
  onBlur: any;
}) => {
  return (
    <div className="flex items-center w-full">
      <label className="text-fuscous-gray-400" htmlFor={label}>
        {label}
      </label>
      <div className="flex items-center relative">
        <input
          type="number"
          min="0"
          name={label}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value == null ? "" : value}
          onChange={(e) => onChange(e.target.value)}
          className="ml-3 h-[32px] xl:h-[50px]  3xl:h-[66px] w-full border-fuscous-gray-200 rounded  py-2 pl-8 pr-2 focus:outline-none focus:border-fuscous-gray-500 drop-shadow-lg"
        />
        <span className="text-fuscous-gray-200 absolute left-6">&euro;</span>
      </div>
    </div>
  );
};

export default AdvancedSearchBox;
