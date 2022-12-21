import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Waitlist from "..";
import SlidingSwitchButton from "../../../components/ui/SlidingSwitchButton";
import { waitlistStepAtom } from "../../../store/atoms/waitlistAtom";
import BackButton from "../BackButton";
import { BsArrowRight } from "react-icons/bs";
import { RegisterStepButton } from "../../../components/Registration/RegisterStepButton";

export default function SecondStep() {
  const [values, setValues] = useState({
    currentlyLive: false,
    wonder: false,
  });

  const router = useRouter();
  const [_, setWaitlistStep] = useAtom(waitlistStepAtom);

  const changePage = () => {
    setWaitlistStep(i => i + 1);
    router.push("third");
  };

  const titles = ["Kies", "Meer", "Mevrow", "Anders"];
  const inputClasses: string =
    "border-b border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-full py-1";

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
        <div className="grid grid-cols-2 justify-items-start pb-5 space-x-1">
          <div>
            <p className="text-primary font-light text-base">
              U wilt zich inschrijven
            </p>
            <p className="font-light text-base text-gray-400 pb-4">
              Deze tekst moet nog worden door een uitleg over <br />
              welk effect dit heeft op de sociale inschrijving, en <br />
              waarom sommige mensen niet in aanmerking <br /> komen.
            </p>

            <p className="text-gray-400 italic font-light text-base pb-8">
              En een uitleg wanner wie welke punten krigt.
            </p>
          </div>

          <div className="flex flex-col gap-y-10 mb-5">
            <div>
              <label className="flex items-start space-x-2 mb-1 font-medium text-sm">
                <img src="/icons/mailbox.svg" className="w-3.5" />
                <span>
                  Woont u zelf op dit moment p een woonwagenstandplaats?
                </span>
              </label>
              <div className="mt-5 ml-1 flex flex-row gap-5">
                <SlidingSwitchButton
                  onChange={handleCurrentlyLiveChange}
                  isOn={values.currentlyLive}
                />
                <p>{values.currentlyLive ? "Ja" : "Nee"}</p>
              </div>
            </div>

            <div>
              <label className="flex items-start space-x-2 mb-1 font-medium text-sm">
                <img src="/icons/mailbox.svg" className="w-3.5" />
                <span>
                  Heft u in het verleden op en woonwagenterrein in <br />{" "}
                  Purmerend genwoond?
                </span>
              </label>
              <div className="mt-5 ml-1 flex flex-row gap-5">
                <SlidingSwitchButton
                  onChange={handleWonderChange}
                  isOn={values.wonder}
                />
                <p>{values.wonder ? "Ja" : "Nee"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-20 pb-5 w-full">
          <p className="text-primary font-light text-base">
            Welk adres was dit?
          </p>

          <div className="w-full">
            <div className="grid grid-cols-2 gap-y-8 gap-x-10">
              <div>
                <label className="flex items-start space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/mailbox.svg" className="w-3.5" />
                  <span>Postcode</span>
                </label>
                <input className={inputClasses} />
              </div>

              <div>
                <label className="flex items-start space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/mailbox.svg" className="w-3.5" />
                  <span>Huisnummer</span>
                </label>
                <input className={inputClasses} />
              </div>

              <div>
                <label className="flex items-start space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/mailbox.svg" className="w-3.5" />
                  <span>Straa</span>
                </label>

                <input className={inputClasses} />
              </div>

              <div>
                <label className="flex items-start space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/mailbox.svg" className="w-3.5" />
                  <span>Woonplaats</span>
                </label>

                <input className={inputClasses} />
              </div>

              <div>
                <p className="text-sm font-normal">
                  Vanaf welk jaar tot welk jaar?
                </p>
                <input className={inputClasses} />
              </div>
            </div>

            <div className="mt-10">
              <label className="flex items-start space-x-1 mb-1 font-medium text-sm">
                <img src="/icons/mailbox.svg" className="w-3.5" />
                <span>
                  Women of wonder uw orders of grootoouders op even
                  <br />
                  woonwagenstandplaats
                </span>
              </label>
              <div className="mt-5 ml-1 flex flex-row gap-5">
                <SlidingSwitchButton
                  onChange={handleWonderChange}
                  isOn={values.wonder}
                />
                <p>{values.wonder ? "Ja" : "Nee"}</p>
              </div>
            </div>

            <div className="mt-10">
              <label className="flex items-start space-x-1 mb-1 font-medium text-sm">
                <img src="/icons/mailbox.svg" className="w-3.5" />
                <span>
                  Woonden uw orders of groontoouders tuseen 1968 en 1977 <br />
                  op een woonwagenterrein in Nederland?
                </span>
              </label>

              <div className="mt-5 ml-1 flex flex-row gap-5">
                <SlidingSwitchButton
                  onChange={handleCurrentlyLiveChange}
                  isOn={values.currentlyLive}
                />
                <p>{values.currentlyLive ? "Ja" : "Nee"}</p>
              </div>
            </div>

            <div className="flex flex-col mt-10">
              <label className="flex items-start space-x-1 mb-1 font-medium text-sm">
                <img src="/icons/002-calendar.svg" className="w-3.5" />
                <span>Geboortedatum moeder</span>
              </label>
              <input
                className="border-b border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-1/2 py-1"
                type="date"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-20 pb-5 w-full">
          <p className="text-primary font-light text-base">Wie is uw vader?</p>

          <div className="w-full">
            <div className="grid grid-cols-2 gap-y-8 gap-x-12">
              <div>
                <label className="flex items-start space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/002-calendar.svg" className="w-3.5" />
                  <span>Spreek mij aan als *</span>
                </label>
                <select className="border-gray-300 bg-gray-100 px-2 py-1 w-full mt-2 focus:border-primary focus:outline-none">
                  {titles.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-start space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/mailbox.svg" className="w-3.5" />
                  <span>Achternaam *</span>
                </label>

                <input className={inputClasses} />
              </div>

              <div>
                <label className="flex items-start space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/mailbox.svg" className="w-3.5" />
                  <span>Voorletters *</span>
                </label>

                <input className={inputClasses} />
              </div>

              <div>
                <label className="flex items-start space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/mailbox.svg" className="w-3.5" />
                  <span>Geboortedatum *</span>
                </label>

                <input className={inputClasses} type="date" />
              </div>

              <div>
                <label className="flex items-start space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/mailbox.svg" className="w-3.5" />
                  <span>Heft u de Nederlandse nationaliteit?</span>
                </label>
                <div className="mt-5 ml-1 flex flex-row gap-5">
                  <SlidingSwitchButton
                    onChange={handleWonderChange}
                    isOn={values.wonder}
                  />
                  <p>{values.wonder ? "Ja" : "Nee"}</p>
                </div>
              </div>

              <div>
                <label className="flex items-start space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/mailbox.svg" className="w-3.5" />
                  <span>Upload een identiteits document</span>
                </label>
                <div className="mt-5 ml-1 flex flex-row gap-5">
                  <input
                    type="file"
                    className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-1 file:px-4
                  file:rounded file:border file:border-primary
                  file:text-sm file:font-light placeholder:border placeholder:border-gray-400
                  file:bg-green-50 file:text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-20 pb-5 w-full">
          <p className="text-primary font-light text-base">
            Op welk adres woonden uw <br />
            ouders ook het moment dat u. <br />
            Werd geboren?
          </p>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <label className="flex items-start space-x-1 mb-1 font-medium text-sm">
                <img src="/icons/mailbox.svg" className="w-3.5" />
                <span>Postcode</span>
              </label>
              <input className={inputClasses} />
            </div>

            <div>
              <label className="flex items-start space-x-1 font-medium text-sm">
                <img src="/icons/003-home (1).svg" className="w-4" />
                <span>Huisnummer</span>
              </label>
              <input className={inputClasses} />
            </div>

            <div>
              <label className="flex items-start space-x-1 mb-1 font-medium text-sm">
                <img src="/icons/005-user-1.svg" className="w-3.5" />
                <span>Straat</span>
              </label>

              <input className={inputClasses} />
            </div>

            <div>
              <label className="flex items-start space-x-1 mb-1 font-medium text-sm">
                <img src="/icons/004-building.svg" className="w-3.5" />
                <span>Woonplaats</span>
              </label>

              <input className={inputClasses} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-20 pb-5 w-full">
          <div>
            <p className="text-primary font-light text-base">Uw voorkeuren</p>
            <p className="font-light text-base text-gray-400 pb-10">
              Hier uit u opgeven naar wat voor soort <br />
              wooonwagenstandplaats u op zoek bent
            </p>
          </div>

          <div className="w-full">
            <label className="flex items-start space-x-1 mb-1 font-medium text-sm">
              <img src="/icons/mailbox.svg" className="w-3.5" />
              <span>
                Bent u op zoek naar alien een standplaats, een standplaats{" "}
                <br />
                met een woonwagen van de corporatie er op, of beide?
              </span>
            </label>

            <div className="flex flex-row justify-start w-full gap-x-14 mt-2">
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
                  className="w-3 h-3 text-primary bg-gray-100 rounded focus:accent-green-400 border-gray-300 focus:ring-primary focus:ring-0"
                />
                <label className="ml-2 text-xs font-light text-gray-400">
                  Standplaats met Woonagen
                </label>
              </div>
            </div>

            <div className="mt-6">
              <label className="flex items-start space-x-1 mb-1 font-medium text-sm">
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

                <div className="flex items-center mb-4 ml-9">
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

        <div className="grid grid-cols-2 justify-items-start mt-0 pb-8">
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
