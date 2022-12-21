import React from "react";
import { RegisterPopUp } from "../../Registration/RegisterPopUp";

export const WaitingListDot = () => (
  <div className="w-3 h-3 bg-primary rounded-full flex flex-row justify-center items-center">
    <div className="h-1 w-1 bg-white rounded-full"></div>
  </div>
);

export default function WaitingPointsModal({ show, handleClose }) {
  return (
    <RegisterPopUp title="Wachtpunten" show={show} onClose={handleClose}>
      <div className="px-16 py-6">
        <ul className="list-inside list-none font-light leading-10 text-gray-500 text-sm">
          <li className="flex flex-row justify-start gap-x-4 items-center">
            <WaitingListDot />
            Uw wachtpunten zijn gebaseerd op uw woonduur
          </li>
          <li className="flex flex-row justify-start gap-x-4 items-center">
            <WaitingListDot />
            Uw woont sinds 1-1-1995 in uw huidige woning. Deze 27 jaar worden
            omgezet in 27 punten.
          </li>
          <li className="flex flex-row justify-start gap-x-4 items-center">
            <WaitingListDot />U staat ingeschreven bij Woonmatch sinds 1 juni
            2019
          </li>
          <li className="flex flex-row justify-start gap-x-4 items-center">
            <WaitingListDot />U bouwt elk jaar 1 wachtpunt op.
          </li>
          <li className="flex flex-row justify-start gap-x-4 items-center">
            <WaitingListDot />U ontvangt uw volgende wachtpunt op 1 juni 2022.
          </li>
          <li className="flex flex-row justify-start gap-x-4 items-center">
            <WaitingListDot />
            Bent u tussentijds verhuisd dan is de datum van uw inschrijving bij
            Woonmatch basis voor de berekening van uw watchtpunten.
          </li>
        </ul>
      </div>
    </RegisterPopUp>
  );
}
