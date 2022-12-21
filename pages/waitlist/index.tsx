import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import PlainLayout from "../../components/Layouts/PlainLayout";
import { waitlistStepAtom } from "../../store/atoms/waitlistAtom";
import WaitlistStepper from "./stepper";
import WaitlistBottomSection from "./waitlistbottomsection";
import WaitlistTopSection from "./waitlisttopsection";

export default function Waitlist({ children }) {
  const [waitlistStep] = useAtom(waitlistStepAtom);
  const [bgClass, setBgClass] = useState("");

  useEffect(() => {

    switch (waitlistStep) {
      case 0:
        setBgClass("bg-waitlist-one bg-right bg-cover bg-no-repeat");
        break;

      case 1:
        setBgClass("bg-waitlist-one bg-right-top");
        break;

      case 2:
        setBgClass("bg-waitlist-one bg-top bg-auto bg-no-repeat");
        break;

      case 3:
        setBgClass("bg-waitlist-one bg-right-top");
        break;

      default:
        setBgClass("bg-waitlist-one bg-right bg-cover bg-no-repeat");
        break;
    }
  }, []);

  return (
    <PlainLayout title="Register">
      <div className="flex flex-row flex-wrap min-h-screen w-screen">
        <div className={`basis-1/6 ${bgClass}`}></div>
        <div className="basis-5/6 bg-white max-h-screen overflow-auto">
          <div className="bg-gradient-to-r from-tertiary to-primary py-3">
            <img
              src="/images/logo-white.svg"
              alt="image"
              className="w-40 lg:w-64 pl-12 h-auto mt-8 pt-5 lg:mt-0 mb-8"
            />
          </div>

          <div className="w-full md:max-w-4xl lg:max-w-4xl 2xl:max-w-7xl bg-white py-10 px-4 md:px-8 xl:px-16">
            <div className="py-3">
              <WaitlistStepper />
            </div>
            <WaitlistTopSection />
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
