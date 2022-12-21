import moment from "moment";
import React, { useState } from "react";
import { PopUp } from "../ui/PopUp";

export const TotalPoints = ({ points, lastUpdated }) => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      <div className="col-span-3 bg-tertiary group rounded-md flex flex-col justify-between p-[20px] xl:p-[30px] 3xl:p-[40px] h-full">
        <div className="font-bold">Totaal punten</div>
        <div>
          <div className="font-bold text-[40px] xl:text-[56px] 3xl:text-[58px]">
            {points}
          </div>
          <div className="flex justify-between items-center -mb-3">
            <button
              onClick={() => {
                setShowPopup(true);
              }}
              className="bg-white opacity-0 group-hover:opacity-100 translate-all duration-300 shadow-lg text-primary py-1 text-[12px] px-2 rounded-sm">
              Meer Uitleg
            </button>
            <div className="3xl:text-[18px] xl:text-[14px] group-hover:pr-2 translate-all duration-300 text-[9px] text-white/70">
              Je punten zijn bijgewerkt op:{" "}
              {moment(lastUpdated).format("DD MMMM YYYY [om] HH:mm")}
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
        title={"Uitleg over het nieuwe puntensysteem"}>
        <div className="bg-white  text-gray-500 p-16 max-h-[70vh] overflow-auto">
          <h2 className="font-bold">
            Welkom op uw persoonlijke pagina. Hier krijgt u een totaal overzicht
            van uw punten
          </h2>
          <section className="space-y-3 font-light mt-5">
            <div className="flex space-x-2 items-center">
              <img src="images/disc.svg" />
              <p> Ons nieuwe systeem werkt met punten.</p>
            </div>
            <div className="flex space-x-2 items-center">
              <img src="images/disc.svg" />
              <p>
                Als u staat ingeschreven bij WoningNet/Woonmatch bouwt u punten
                op
              </p>
            </div>
            <div className="flex space-x-2 items-center">
              <img src="images/disc.svg" />
              <p>
                Zoekpunten kunt u zelf opbouwen door regelmatig te reageren op
                woningen.
              </p>
            </div>
            <div className="flex space-x-2 items-center">
              <img src="images/disc.svg" />
              <p>
                Er zijn vier dringende omstandigheden waarmee u met
                situatiepunten kunt reageren
              </p>
            </div>
            <div className="flex space-x-2 items-center">
              <img src="images/disc.svg" />
              <p>
                Hebt u een jongerencontract? Dan kunt u startpunten krijgen.
              </p>
            </div>
            <div className="flex space-x-2 items-center">
              <img src="images/disc.svg" />
              <p>
                Alle punten bij elkaar opgeteld bepaalt hoe snel u een woning
                krijgt
              </p>
            </div>
          </section>
        </div>
      </PopUp>
    </>
  );
};
