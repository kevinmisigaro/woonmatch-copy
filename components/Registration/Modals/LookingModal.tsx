import React, { useEffect, useRef, useState } from "react";
import SlidingSwitchButton from "../../ui/SlidingSwitchButton";
import { RegisterPopUp } from "../RegisterPopUp";
import CollectIncomeModal from "./CollectIncomeModal";

export default function LookingModal() {
  const [showIncomeModal, setShowIncomeModal] = useState(false);

  const weeks = [
    {
      value: "month",
      text: "Maand",
    },
    {
      value: "fourweeks",
      text: "4 weken",
    },
    {
      value: "week",
      text: "week",
    },
  ];

  const total = useRef(0);

  const [values, setValues] = useState({
    holidayPay: false,
    month: false,
    alimony: false,
    alimony_count: 0,
    alimony_interval: "month",
    income: 0,
    interval: "month",
    calcStart: false,
  });

  useEffect(() => {
    if (values.calcStart) {
      calculator();
      setValues({
        ...values,
        calcStart: !values.calcStart,
      });
    }
  }, [values.calcStart]);

  const calculator = () => {
    let subtotal = 0;
    let bruto = isNaN(parseFloat(values.income.toString()))
      ? 0
      : parseFloat(values.income.toString());
    let alimony = isNaN(parseFloat(values.alimony_count.toString()))
      ? 0
      : parseFloat(values.alimony_count.toString());

    if (values.interval == "month") {
      subtotal = bruto * 12;
    } else if (values.interval == "fourweeks") {
      subtotal = bruto * 13;
    } else if (values.interval == "week") {
      subtotal = bruto * 52;
    }

    if (values.month) {
      subtotal = (subtotal / 12) * 13;
    }

    if (values.holidayPay) {
      subtotal = subtotal * 1.08;
    }

    if (values.alimony) {
      if (values.alimony_interval == "month") {
        subtotal = subtotal + alimony * 12;
      } else if (values.alimony_interval == "fourweeks") {
        subtotal = subtotal + alimony * 13;
      } else if (values.alimony_interval == "week") {
        subtotal = subtotal + alimony * 52;
      }
    }

    total.current = Math.floor(subtotal);
  };

  const handleIntervalChange = (e) => {
    e.persist();
    setValues({
      ...values,
      interval: e.target.value,
      calcStart: !values.calcStart,
    });
  };

  const handleIncomeChange = (e: any) => {
    e.persist();
    setValues({
      ...values,
      income: e.target.value,
      calcStart: !values.calcStart,
    });
  };

  const handleHolidayPayChange = () => {
    setValues({
      ...values,
      holidayPay: !values.holidayPay,
      calcStart: !values.calcStart,
    });
  };

  const handle13thMonthChange = () => {
    setValues({
      ...values,
      month: !values.month,
      calcStart: !values.calcStart,
    });
  };

  const handleAlimonyChange = () => {
    setValues({
      ...values,
      alimony: !values.alimony,
      calcStart: !values.calcStart,
    });
  };

  const handleAlimonyCountChange = (e) => {
    e.persist();
    setValues({
      ...values,
      alimony_count: e.target.value,
      calcStart: !values.calcStart,
    });
  };

  const handleAlimonyIntervalChange = (e) => {
    e.persist();
    setValues({
      ...values,
      alimony_interval: e.target.value,
      calcStart: !values.calcStart,
    });
  };
  return (
    <>
      <div className="h-auto text-justify">
        <div className="space-y-8 px-8 md:px-16 my-10">
          <div className="mb-3">
            <p className="text-sm font-light text-gray-500">
              Met deze rekenhulp berekent u in een paar stappen eern goede
              schatting van uw jaarinkomen. Beantwoord de vragen zo zorgvuldig
              mogelijk omdat uw inkomen belangrijk is om te bepalen of u ip
              bepaalde geadverteerde woningen wel of niet mag reageren. U kunt
              uw inkomen later altijd weer aanpassen aan de actuele situatie.
              <br />
              <br />
              Uiteindelijk zult u officiele documenten moeten aanleveren om uw
              inkomen aan te tonen.
            </p>
          </div>
          <div className="flex flex-row justify-between mb-3">
            <div className="">
              <div className="flex flex-row justify-between mb-8">
                <p className="font-normal text-primary text-md">
                  Bruto Inkomen
                </p>
                <div className="input">
                  <span className="absolute left-20 top-1 font-light text-sm text-gray-400">
                    €
                  </span>
                  <input
                    type="number"
                    value={values.income}
                    onChange={handleIncomeChange}
                    onKeyUp={calculator}
                    className="border-b pl-5 pb-1 ml-20 border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-4/6"
                  />
                </div>
              </div>

              <div className="flex flex-row justify-between mb-8">
                <p className="font-normal text-primary text-md">
                  Ontvangt u <br /> vakantiegeld?
                </p>
                <div className="mt-2">
                  <SlidingSwitchButton
                    onChange={handleHolidayPayChange}
                    isOn={values.holidayPay}
                  />
                </div>
              </div>

              <div className="flex flex-row justify-between mb-8">
                <p className="font-normal text-primary text-md">
                  Krijgt u een 13e <br />
                  maand?
                </p>
                <div className="mt-2">
                  <SlidingSwitchButton
                    onChange={handle13thMonthChange}
                    isOn={values.month}
                  />
                </div>
              </div>

              <div className="flex flex-row justify-between mb-8">
                <p className="font-normal text-primary text-md">
                  Ontvangt u<br /> partneralimentatie?
                </p>
                <div className="mt-2">
                  <SlidingSwitchButton
                    onChange={handleAlimonyChange}
                    isOn={values.alimony}
                  />
                </div>
              </div>
            </div>
            <div className="">
              <select
                value={values.interval}
                onChange={handleIntervalChange}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-20 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state">
                {weeks.map((w) => (
                  <option key={w.value} value={w.value}>
                    {w.text}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {values.alimony && (
            <div className="flex flex-row justify-end mb-2 gap-x-5">
              <div className="relative">
                <span className="absolute text-gray-400 left-20">€</span>
                <input
                  type="number"
                  value={values.alimony_count}
                  onChange={handleAlimonyCountChange}
                  className="border-b pl-4 pb-1 ml-20 border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-2/4"
                />
              </div>
              <select
                value={values.alimony_interval}
                onChange={handleAlimonyIntervalChange}
                className="block appearance-none w-1/5 bg-gray-200 border border-gray-200 text-gray-700 py-1.5 pl-20 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                {weeks.map((w) => (
                  <option key={w.value} value={w.value}>
                    {w.text}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-row justify-end">
            <div className="max-w-md px-20 py-2 rounded bg-gray-100 shadow-lg">
              <div className="px-6 py-8 text-center text-tertiary">
                <h5 className="font-medium">Uw inkomen per jaar:</h5>
                <p>€ {total.current}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-center justify-center">
          <button className="py-4 px-4 text-primary hover:text-primary bg-transparent border-t border-primary w-full md:w-1/2">
            Annuleren
          </button>

          <button
            onClick={() => {
              localStorage.setItem("income", total.current.toString());
              setValues({
                ...values,
                holidayPay: false,
                month: false,
                alimony: false,
                alimony_count: 0,
                alimony_interval: "month",
                income: 0,
                interval: "month",
                calcStart: false,
              });
              total.current = 0;
              setShowIncomeModal(true);
            }}
            type="button"
            className="py-4 px-4 text-white bg-tertiary border-t border-tertiary w-full md:w-1/2">
            Neem gegevens over
          </button>
        </div>
      </div>

      <RegisterPopUp
        title="Inkomen ophalen bij Belastingdienst"
        show={showIncomeModal}
        onClose={() => setShowIncomeModal(false)}>
        <CollectIncomeModal />
      </RegisterPopUp>
    </>
  );
}
