import React from "react";
import HelpSection from "../houseregister/HelpSection";

export default function WaitlistTopSection() {
  return (
    <div className="mt-20">
      <div className="flex flex-row justify-between w-full">
        <div>
          <div className="text-2xl tracking-normal font-medium">
            Inschrijven voor de wachtlijst
            <br />
            Woonwagen of een Standplaats.
          </div>
        </div>
       <HelpSection />
      </div>
      <div className="mt-3 font-light text-base text-gray-400">
        <p>
          De gemeente Purmerend beheert via Woonmatch Waterland haar <br/>
          woonwagenstandplaatsen. Wilt u in aanmerking komen voor een
          woonwagenstandplaats,<br/> dan dient u zicht in te schrijven op de
          wachtlijst.
        </p>
        <p className="mt-10">
            Hireronder vindt u meer informatie.
        </p>
      </div>
    </div>
  );
}
