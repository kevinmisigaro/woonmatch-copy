import { useRouter } from "next/router";
import React from "react";
import Waitlist from "..";
import BackButton from "../BackButton";

export default function ThirdStep() {
  const router = useRouter()
  
  return (
    <Waitlist>
      <div>
        <div className="grid grid-cols-2 justify-items-start pb-5">
          <div>
            <p className="text-primary font-light text-lg">Uw huidige status</p>
            <p className="font-light text-sm text-gray-400 pb-4 mt-2">
              U staat WELL op de wachtlijst.
            </p>
          </div>

          <div className="bg-gradient-to-r from-tertiary to-primary text-white w-4/5 py-2 rounded">
            <div className="grid grid-cols-2 justify-items-start px-5 py-2">
              <p className="font-light text-sm">Ingeschreven sinds</p>
              <p>25-05-2022</p>
            </div>
            <hr className="bg-white " />

            <div className="grid grid-cols-2 justify-items-start px-5 py-2">
              <p className="font-light text-sm">Aantal punten</p>
              <p>100</p>
            </div>
            <hr className="bg-white " />

            <div className="grid grid-cols-2 justify-items-start px-5 py-2">
              <p className="font-light text-sm">Uw positie</p>
              <p>4</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 justify-items-start mt-20 pb-5">
          <div>
            <p className="text-primary font-light text-lg">Uw voorkeuren</p>
            <p className="font-light text-sm text-gray-400 pb-4 mt-2">
              Hier uit u opgeven naar wat voor soort <br />{" "}
              wooonwagenstandplaats u op zoek bent
            </p>
          </div>

          <div>
            <div>
              <p className="text-sm font-normal">
                Bent u op zoek naar alien een standplaats, een standplaats{" "}
                <br />
                met een woonwagen van de corporatie er op, of beide?
              </p>

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

              <div className="mt-6">
                <p className="text-sm font-normal">
                  Op welke terreinen zou u graag willen wonen?
                </p>

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

            <div className="mt-10 grid grid-cols-2 justify-items-start text-center gap-x-3 text-sm">
              <div className="border border-tertiary rounded w-full py-1 text-primary cursor-pointer hover:bg-tertiary hover:text-white">
                Uitschrijven
              </div>
              <div onClick={() => router.push("/")} className="border border-tertiary rounded w-full py-1 text-white bg-tertiary cursor-pointer">
                Voorkeuren aanpassen
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 justify-items-start mt-0 pb-8">
          <BackButton />
        </div>
      </div>
    </Waitlist>
  );
}
