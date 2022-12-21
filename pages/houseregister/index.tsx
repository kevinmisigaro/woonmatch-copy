import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import PlainLayout from "../../components/Layouts/PlainLayout";
import { houseRegisterStep } from "../../store/atoms/HouseRegisterAtom";
import WaitlistBottomSection from "../waitlist/waitlistbottomsection";
import HouseRegisterStepper from "./steppers";

export default function HouseRegister({ children }) {
  const [step] = useAtom(houseRegisterStep);
  const [bgClass, setBgClass] = useState("");

  useEffect(() => {
    switch (step) {
      case 0:
        setBgClass("bg-houseregister-one");
        break;

      case 1:
        setBgClass("bg-houseregister-two");
        break;

      case 2:
        setBgClass("bg-houseregister-three");
        break;

      case 3:
        setBgClass("bg-houseregister-four");
        break;

      case 4:
        setBgClass("bg-houseregister-five");
        break;

      case 5:
        setBgClass("bg-houseregister-six");
        break;

      case 6:
        setBgClass("bg-houseregister-seven");
        break;

      default:
        setBgClass("bg-houseregister-one");
        break;
    }
  }, []);

  return (
    <PlainLayout title="Register">
      <div className="flex flex-row flex-wrap min-h-screen w-screen">
        <div className={`hidden md:block md:basis-1/6 ${bgClass}`}></div>
        <div className="md:basis-5/6 bg-white max-h-screen overflow-auto">
          <div className="bg-gradient-to-r from-tertiary to-primary py-3">
            <img
              src="/images/logo-white.svg"
              alt="image"
              className="w-40 lg:w-64 pl-12 h-auto mt-8 pt-5 lg:mt-0 mb-8"
            />
          </div>

          <div className="w-full md:max-w-4xl lg:max-w-4xl 2xl:max-w-7xl bg-white pt-8 pb-20 px-4 md:px-8 xl:px-16">
            <HouseRegisterStepper />
          </div>

          <div className="w-full bg-white py-10 px-4 md:px-8 xl:px-16">
            {children}
          </div>
          <div className="w-full bg-stone-50 py-10 px-4 md:px-8 xl:px-16">
            <WaitlistBottomSection />
          </div>
        </div>
      </div>
    </PlainLayout>
  );
}
