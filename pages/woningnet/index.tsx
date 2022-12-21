import React, { useState } from "react";
import GreyLayout from "../../components/Layouts/GreyLayout";
import WoningnetFirstPopUp from "../../components/Profile/WoningnetFirstPopUp";

export default function Index() {
  
  const [show, setShow] = useState(false);
  return (
    <>
      <GreyLayout>
        <div className="h-screen">
          <div className="container mt-20">
            <p className="text-3xl text-primary font-medium">
              Koppelen WoningNet account
            </p>

            <p className="mt-10 text-3xl font-base text-gray-500">
              Heeft u ook een account bij WoningNet Stadsregio Amsterdam? Dan
              kunt u eenvoudig uw WoningNet account koppelen met uw Woonmatch
              account.
            </p>

            <p className="mt-10 text-3xl font-base text-gray-500">
              Door te koppelen met uw WoningNet account worden uw opgebouwde
              samengevoegd. U gebruikt het beste totaal aantal punten voor
              wacht-en zoekpunten. Als u ook situatiepunten heeft, worden deze
              punten meegenomen.
            </p>

            <div onClick={() => setShow(true)} className="bg-tertiary text-white px-8 py-4 cursor-pointer font-light w-1/3 text-center rounded mt-14">
              Koppel mijn WoningNet account
            </div>
          </div>
        </div>
      </GreyLayout>

      {show && (
        <WoningnetFirstPopUp show={show} onClose={() => setShow(false)} />
      )}
    </>
  );
}
