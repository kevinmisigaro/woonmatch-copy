import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HouseRegister from "..";
import { RegisterStepButton } from "../../../components/Registration/RegisterStepButton";
import SlidingSwitchButton from "../../../components/ui/SlidingSwitchButton";
import { houseRegisterStep } from "../../../store/atoms/HouseRegisterAtom";
import HelpSection from "../HelpSection";
import HouseRegisterBackButton from "../HouseRegisterBackButton";

export default function Third() {
  const [_, setStep] = useAtom(houseRegisterStep);
  const router = useRouter();
  const changePage = () => {
    localStorage.setItem("partnerDob", values.partnerDob);
    localStorage.setItem("partnerEmail", values.partnerEmail);

    setStep((i) => i + 1);
    router.push("fifth");
  };

  const [values, setValues] = useState({
    currentlyLive: false,
    wonder: false,
    partnerEmail: "",
    partnerDob: "",
  });

  const handleEmailChange = (e) => {
    e.persist();
    setValues({
      ...values,
      partnerEmail: e.target.value,
    });
  };

  const handleDobChange = (e) => {
    e.persist();
    setValues({
      ...values,
      partnerDob: e.target.value,
    });
  };

  const handleCurrentlyLiveChange = () => {
    setValues({
      ...values,
      currentlyLive: !values.currentlyLive,
    });
  };

  const handleWonderChange = () => {
    setValues({
      ...values,
      wonder: !values.wonder,
    });
  };

  useEffect(() => {
    setValues({
      ...values,
      partnerEmail: localStorage.getItem("partnerEmail")
        ? localStorage.getItem("partnerEmail")
        : "",
      partnerDob: localStorage.getItem("partnerDob")
        ? localStorage.getItem("partnerDob")
        : "",
    });
  }, []);

  const inputClasses: string =
    "border-b border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-5/6 py-1";

  return (
    <HouseRegister>
      <div className="flex flex-row justify-between w-4/5">
        <h3 className="text-3xl font-medium">Zoekt u same met een partner?</h3>
        <HelpSection />
      </div>

      <div>
        <p className="font-light text-base text-gray-400 pb-10 mt-3">
          Zoekt u samen met een partner een woning? Dan is het nodig dat u
          allebei ingeschreven staat als <br /> woningzoekende. U kunt daardoor
          reageren op woningen die passend zijn bij het gezamenlijke <br />
          huishoudienkomen en het aantal personen van het huishouden.
        </p>
      </div>

      <div className="flex flex-row gap-x-20 mt-20 pb-5">
        <p className="text-primary font-light text-base basis-1/4">
          Wilt u zich same met <br /> iemand anders inschrijven?
        </p>
        <div className="grid grid-cols-2 justify-items-start w-dull basis-3/4">
          <div>
            {/* <p className="text-sm font-normal">
              Wilt u zich same met iemand <br /> anders inschrijven?
            </p> */}
            <div className="mt-5 ml-1 flex flex-row gap-5">
              <SlidingSwitchButton
                onChange={handleCurrentlyLiveChange}
                isOn={values.currentlyLive}
              />
              <p>{values.currentlyLive ? "Ja" : "Nee"}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-normal">
              Heeft uw partner al een inschrijving?
            </p>
            <div className="mt-10 ml-1 flex flex-row gap-5">
              <SlidingSwitchButton
                onChange={handleWonderChange}
                isOn={values.wonder}
              />
              <p>{values.wonder ? "Ja" : "Nee"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-x-20 mt-20 pb-5">
        <p className="text-primary font-light text-base basis-1/4">
          Wat is het e-emailadres en de <br /> geboortedatum van uw <br />{" "}
          partner?
        </p>
        <div className="w-full basis-3/4">
          <div className="w-full">
            <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
              <img src="/icons/gmail.svg" className="w-3.5" />
              <span>E-mailadres</span>
            </label>
            <input
              onChange={handleEmailChange}
              value={values.partnerEmail}
              className={inputClasses}
            />
          </div>

          <div className="w-full mt-8">
            <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
              <img src="/icons/002-calendar.svg" className="w-3" />
              <span>Geboortedatum</span>
            </label>
            <input
              className={inputClasses}
              value={values.partnerDob}
              onChange={handleDobChange}
              type="date"
            />
          </div>

          <div className="mt-5 w-10/12 grid grid-cols-2 justify-items-start text-center gap-x-3 text-sm">
            <div className="border border-tertiary rounded w-full py-1 text-primary cursor-pointer hover:bg-tertiary hover:text-white">
              Overslaan en later koppelen
            </div>
            <div className="border border-tertiary rounded w-full py-1 text-white bg-tertiary cursor-pointer">
              Haal inschrijving op
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between mt-0 pb-8 w-11/12">
        <HouseRegisterBackButton />

        <div className="flex flex-row justify-end items-end w-full mr-9">
          <RegisterStepButton text="Uw gezin" action={changePage} />
        </div>
      </div>
    </HouseRegister>
  );
}
