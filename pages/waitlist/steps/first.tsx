import React, { useState } from "react";
import Waitlist from "../index";
import SlidingSwitchButton from "../../../components/ui/SlidingSwitchButton";
import { useRouter } from "next/router";
import BackButton from "../BackButton";
import { RegisterStepButton } from "../../../components/Registration/RegisterStepButton";
import { useAtom } from "jotai";
import { waitlistStepAtom } from "../../../store/atoms/waitlistAtom";

export default function FirstStep() {
  const [values, setValues] = useState({
    currentlyLive: false,
    wonder: false,
  });

  const router = useRouter();
  const [_, setStep] = useAtom(waitlistStepAtom);
  const changePage = () => {
    setStep(i => i + 1)
    router.push("second");
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

  return (
    <Waitlist>
      <div>
        <div className="grid grid-cols-2 justify-items-start pb-5">
          <div>
            <p className="text-primary font-light text-base">
              U wilt zich inschrijven
            </p>
            <p className="font-light text-base text-gray-400 pb-10">
              Deze tekst moet nog worden door een uitleg over <br />
              welk effect dit heeft op de sociale inschrijving, en <br />
              waarom sommige mensen niet in aanmerking <br /> komen.
            </p>
          </div>

          <div>
            <div>
              <label className="flex items-start space-x-2 mb-1 font-normal text-sm">
                <img src="/icons/mailbox.svg" className="w-3.5" />
                <span>
                  Woont u zelf op dit moment p een woonwagenstandplaats?
                </span>
              </label>
              <div className="mt-7 ml-1 flex flex-row gap-5">
                <SlidingSwitchButton
                  onChange={handleCurrentlyLiveChange}
                  isOn={values.currentlyLive}
                />
                <p>{values.currentlyLive ? "Ja" : "Nee"}</p>
              </div>
            </div>

            <div className="mt-10">
              <label className="flex items-start space-x-2 mb-1 font-normal text-sm">
                <img src="/icons/mailbox.svg" className="w-3.5" />
                <span>
                  Women of wonder uw orders of grootoouders op even
                  <br />
                  woonwagenstandplaats
                </span>
              </label>
              <div className="mt-7 ml-1 flex flex-row gap-5">
                <SlidingSwitchButton
                  onChange={handleWonderChange}
                  isOn={values.wonder}
                />
                <p>{values.wonder ? "Ja" : "Nee"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 justify-items-start mt-20">
          <div>
            <p className="text-primary font-light text-base">Uw voorkeuren</p>

            <p className="font-light text-base text-gray-400 pb-10">
              Hier uit u opgeven naar wat voor soort <br />
              wooonwagenstandplaats u op zoek bent
            </p>
          </div>

          <div>
            <label className="flex items-start space-x-2 mb-1 font-normal text-sm">
              <img src="/icons/mailbox.svg" className="w-3.5" />
              <span>
                Bent u op zoek naar alien een standplaats, een standplaats{" "}
                <br />
                met een woonwagen van de corporatie er op, of beide?
              </span>
            </label>

            <div className="flex flex-row justify-start gap-x-16 mt-2">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  value=""
                  className="w-3 h-3 text-primary bg-gray-100 rounded border-gray-300 focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-xs font-light text-gray-400">
                  Allen de standplaats
                </label>
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  value=""
                  className="w-3 h-3 text-primary bg-gray-100 rounded border-gray-300 focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-xs font-light text-gray-400">
                  Standplaats met Woonagen
                </label>
              </div>
            </div>

            <div className="mt-10">
              <label className="flex items-start space-x-2 mb-1 font-normal text-sm">
                <img src="/icons/mailbox.svg" className="w-3.5" />
                <span>Op welke terreinen zou u graag willen wonen?</span>
              </label>

              <div className="flex flex-row justify-start gap-x-16 mt-2">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    value=""
                    className="w-3 h-3 text-primary bg-gray-100 rounded border-gray-300 focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-xs font-light text-gray-400">
                    Vrouwenzandstraat
                  </label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    value=""
                    className="w-3 h-3 text-primary bg-gray-100 rounded border-gray-300 focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-xs font-light text-gray-400">
                    Slaperdijk
                  </label>
                </div>
              </div>
              <div className="flex flex-row justify-start gap-x-16">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    value=""
                    className="w-3 h-3 text-primary bg-gray-100 rounded border-gray-300 focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-xs font-light text-gray-400">
                    Akropolishof
                  </label>
                </div>

                <div className="flex items-center mb-4 ml-10">
                  <input
                    type="checkbox"
                    value=""
                    className="w-3 h-3 text-primary bg-gray-100 rounded border-gray-300 focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-xs font-light text-gray-400">
                    Veenweindestraat
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 justify-items-start mt-20 pb-8">
          <div>
            <BackButton />
          </div>

          <div className="flex flex-row justify-end w-4/6 items-end">
            <RegisterStepButton text="Inschrijven" action={changePage} />
          </div>
        </div>
      </div>
    </Waitlist>
  );
}
