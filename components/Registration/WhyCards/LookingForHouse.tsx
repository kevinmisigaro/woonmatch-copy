import { useRouter } from "next/router";
import React from "react";

export default function LookingForHouseCard() {
  const router = useRouter();

  return (
    <>
      <div
        className="rounded relative overflow-hidden shadow-lg hover:border opacity-80 hover:border-primary"
        style={{ background: "#131313" }}>
        <div className="px-8 py-9 text-white">
          <div className="font-medium mb-2">Ik zoek een huis</div>
          <hr className="text-white mb-2" />
          <p className="text-sm font-light mb-16">
            U zoekt een huurwoning. Schrijft u zich gelijk in. Maak uw
            inschrijving gelijk compleet. Dan kunt u zoeken en reageren.
          </p>
          <h4 className="font-medium mb-2">Wat gaat u doen</h4>
          <ol className="list-decimal font-light text-sm pl-3 mb-4 leading-7">
            <li>Gegevens van u en uw partner invullen (optioneel).</li>
            <li>Vul in of er nog kinderen of andere personen meeverhuizen.</li>
            <li>Vragen beantwoorden over uw situatie.</li>
          </ol>
        </div>
        <div className="absolute bottom-0 w-full">
          <div
            className="text-center py-2 text-green-600 bg-white cursor-pointer"
            style={{ border: "1px solid lightgreen" }}
            onClick={() => {
              localStorage.setItem("process", "longer");
              router.push("/houseregister/steps/first");
            }}>
            Zoek een huis
          </div>
        </div>
      </div>
    </>
  );
}
