import React, { useState } from "react";
import LookingModal from "../Modals/LookingModal";
import { RegisterPopUp } from "../RegisterPopUp";

export default function PointsCard() {
  const [showPointsModal, setShowPointsModal] = useState(false);

  const closeLookingModal = () => {
    setShowPointsModal(!showPointsModal);
  };

  return (
    <>
      <div className="rounded overflow-hidden bg-gray-100 opacity-90 shadow-lg flex flex-col justify-between hover:border hover:border-primary">
        <div className="px-8 py-9 text-black">
          <div className="font-medium mb-2">Ik wil graag punten opbouwen</div>
          <hr className="text-white mb-2" />
          <p className="text-sm font-light mb-16">
            U heeft op dit moment al een huis. U wilt graag wachtpunten gaan
            opbouwen voor later. U hoeft alleen een account aan te maken.
          </p>
          <h4 className="font-medium mb-2">Wat gaat u doen</h4>
          <ol className="list-decimal font-light text-sm pl-3 mb-4 leading-7">
            <li>Vul uw persoonlijke gegevens in</li>
            <li>Vul de gegevens van uw partner in (optioneel)</li>
            <li>U gaat akkoord met de privacyverklaring</li>
          </ol>
          <p className="text-sm font-light mb-16">
            Ik wil wachtpunten opbouwen
          </p>
        </div>
        <div
          onClick={() => setShowPointsModal(true)}
          className="text-center cursor-pointer py-2 bg-green-600 text-white border-green-600">
          Bouw punten op
        </div>
      </div>

      <RegisterPopUp
        title="Rekenhulp"
        show={showPointsModal}
        onClose={() => setShowPointsModal(false)}>
        <LookingModal />
      </RegisterPopUp>
    </>
  );
}
