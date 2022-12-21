import React, { useState } from "react";
import { PopUp } from "../../components/ui/PopUp";

export const WaitPoints = () => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-col justify-between text-black py-3 px-8">
          <div className="font-bold text-primary mt-4">Uw wachtpunten</div>
          <div className="text-gray-600 text-20">
            U krijgt een wachtpunt voor ieder jaar dat u bij ons ingeschreven
            staat. U staat ingeschreven sinds 1 juni 2019.
          </div>
          <div
            onClick={() => {
              setShowPopup(true);
            }}
            className="text-20 cursor-pointer mt-3 text-primary">
            kijk voor meer uitleg
          </div>
        </div>
        <div className="flex-1 text-black  text-20 relative grid grid-cols-5  overflow-hidden">
          <div className="col-span-5 relative bg-gray-100">
            <div className="px-8 py-6 space-y-3 text-gray-600">
              <div className="flex space-x-2 items-center">
                <img src="images/handpointer-right.svg" />
                <p>U ontvangt 1 wachtpunt per jaar</p>
              </div>
              <div className="flex space-x-2 items-center">
                <img src="images/handpointer-right.svg" />
                <p>
                  Wachtpunten bouwt u op vanaf de datum dat u ingeschreven staat
                </p>
              </div>
              <div className="flex space-x-2 items-center">
                <img src="images/handpointer-right.svg" />
                <p>Wachtpunten blijft u altijd opbouwen</p>
              </div>
              <div className="flex space-x-2 items-center">
                <img src="images/handpointer-right.svg" />
                <p>
                  Wachtpunten vervallen als u een sociale huurwoning accepteert
                </p>
              </div>
              <div className="flex space-x-2 items-center">
                <img src="images/handpointer-right.svg" />
                <p>
                  Uw huidige inschrijftijd en woonduur wordt automatisch omgezet
                  in wachtpunten
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PopUp
        onClose={() => {
          setShowPopup(false);
        }}
        show={showPopup}
        className={"lg:w-[80%] sm:w-2/3  text-left"}
        titleClassName={"text-left mt-2"}
        title={"Wachtpunten"}>
        <div className="bg-white  text-gray-500 p-20 max-h-[70vh] overflow-auto">
          <section className="space-y-6">
            <div className="flex space-x-2 items-center">
              <img src="images/disc.svg" />
              <p>Uw wachtpunten zijn gebaseerd op uw woonduur.</p>
            </div>
            <div className="flex space-x-2 items-center">
              <img src="images/disc.svg" />
              <p>
                U woont sinds 1-1-1995 in uw huidige woning. Deze 27 jaar worden
                omgezet in 27 punten.
              </p>
            </div>
            <div className="flex space-x-2 items-center">
              <img src="images/disc.svg" />
              <p>U staat ingeschreven bij Woonmatch sinds 1 juni 2019.</p>
            </div>
            <div className="flex space-x-2 items-center">
              <img src="images/disc.svg" />
              <p>U bouwt elk jaar 1 wachtpunt op.</p>
            </div>
            <div className="flex space-x-2 items-center">
              <img src="images/disc.svg" />
              <p>U ontvangt uw volgende wachtpunt op 1 juni 2022.</p>
            </div>
            <div className="flex space-x-2 items-center">
              <img src="images/disc.svg" />
              <p>
                Bent u tussentijds verhuisd dan is de datum van uw inschrijving
                bij Woonmatch basis voor de berekening van uw wachtpunten.
              </p>
            </div>
          </section>
        </div>
      </PopUp>
    </>
  );
};
