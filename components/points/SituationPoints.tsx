import React, { useState } from "react";
import { PopUp } from "../../components/ui/PopUp";

export const SituationPoints = () => {
  const [playVideo, setPlayVideo] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div
        className={`  ${
          !playVideo ? " h-1/2 flex" : "h-0 -mt-6"
        } flex-col reative justify-between text-black py-3 px-8 transition-all duration-500`}>
        {!playVideo && (
          <>
            <div className="font-bold text-primary mt-4">
              Uitleg over het nieuwe puntensysteem
            </div>
            <div className="text-gray-600">
              Het systeem is veranderd
              <br /> Dit heeft invloed op de snelheid waarmee u een woning
              vindt.
            </div>
            <div
              onClick={() => {
                setShowPopup(true);
              }}
              className="text-primary cursor-pointer">
              Lees meer
            </div>
          </>
        )}
        {playVideo && (
          <div
            onClick={() => {
              setPlayVideo(!playVideo);
            }}
            className="absolute z-10 right-12 h-8 cursor-pointer aspect-square rounded-full bg-primary text-white grid place-content-center">
            <img src="/images/close-x.svg" />
          </div>
        )}
      </div>
      <div
        className={` ${
          !playVideo ? "grid h-1/2" : "h-full"
        }  cursor-pointer relative  place-content-center transition-all duration-500 overflow-hidden`}>
        {!playVideo && (
          <img src="/images/points-video.png" className="scale-[1.1]" />
        )}
        {playVideo && (
          <div className="w-full h-full">
            <Player />
          </div>
        )}
        {!playVideo && (
          <div
            onClick={() => setPlayVideo(true)}
            className="absolute inset-0 grid place-content-center">
            <img src="/images/play-green.svg" className="scale-[1.1]" />
          </div>
        )}
      </div>
      <PopUp
        onClose={() => {
          setShowPopup(false);
        }}
        show={showPopup}
        className={"lg:w-[80%] sm:w-2/3  text-left"}
        titleClassName={"text-left mt-2"}
        title={"Situatiepunten"}>
        <div className="bg-white  text-gray-500 p-20 max-h-[70vh] overflow-auto">
          <section>
            <p className="mb-5">
              Mogelijk komt u in aanmerking voor situatiepunten. Doe de check
              via www.vraagpuntenaan.nl
            </p>

            <h3 className="mt-5  font-bold">Opbouw van situatiepunten</h3>
            <ul className="list-disc list-inside ">
              <li>U ontvangt één situatiepunt per maand</li>
              <li>U kunt maximaal 12 situatiepunten opbouwen.</li>
            </ul>

            <h3 className="mt-5  font-bold">Afbouw van situatiepunten</h3>

            <ul className="list-disc list-inside ">
              <li>
                Kunt u situatiepunten krijgen, dan kunt u drie jaar
                situatiepunten opbouwen
              </li>
              <li>
                Na tweeëneenhalf jaar kunt u een verlenging aanvragen van weer
                drie jaar
              </li>
              <li>Verlengt u niet, dan vervallen alle punten</li>
            </ul>
            <h3 className="mt-5 font-bold">
              Er zijn twee situaties waarbij alle situatiepunten vervallen:
            </h3>
            <ol className="list-decimal list-inside ">
              <li>
                U heeft een uitnodiging gekregen voor een bezichtiging en u komt
                niet. Als u daar geen geldige reden voor kun geven dan vervallen
                alle zoekpunten
              </li>
              <li>
                U hebt twee keer een woning bekeken en twee keer een woning
                geweigerd. Ook dan vervallen al uw zoekpunten
              </li>
            </ol>
          </section>
        </div>
      </PopUp>
    </>
  );
};

export const Player = () => {
  return (
    <iframe
      className="w-full h-full"
      src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
  );
};
