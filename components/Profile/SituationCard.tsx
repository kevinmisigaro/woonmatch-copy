import React, { useState } from "react";

export default function SituationCard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="block w-full bg-white rounded-md shadow-md mb-7 relative overflow-hidden">
        <div className="py-4 pl-4 rounded-t-md bg-tertiary text-base text-white">
        Situatiepunten en startpunten
        </div>
        <div className="text-sm px-6 py-4 text-black font-normal items-center flex flex-row gap-x-24 justify-between">
          <div>
            <a
              className="hover:underline cursor-pointer"
              href="https://vraagpuntenaan.nl/">
              Vraag situatiepunten aan
            </a>
            <hr className="my-2" />
            <a
              className="hover:underline cursor-pointer"
              href="https://vraagpuntenaan.nl/"
            >
              Vraag startpunten aan
            </a>
            <br />
            <br />
            <br />
            <br />
          </div>
          <div className="absolute -bottom-2 -right-2">
            <img src="/bg-images/profile/Startpunten.svg" className="w-40" />
          </div>
        </div>
      </div>
    </>
  );
}
