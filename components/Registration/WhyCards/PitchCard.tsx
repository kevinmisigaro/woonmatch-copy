import { useRouter } from "next/router";
import React from "react";

export default function PitchCard() {
  const router = useRouter();

  return (
    <div className="rounded flex flex-col bg-gray-100 opacity-90 justify-between overflow-hidden shadow-lg hover:border hover:border-primary">
      <div className="px-8 py-9 text-black">
        <div className="font-medium mb-2">Woonwagen of Standplaats</div>
        <hr className="bg-black mb-2" />
        <p className="text-sm font-light mb-16">
          De gemeente Purmerend beheert de woonwagens en standplaatsen via
          Woonmatch Waterland.
          <br />
          <br />
          Wilt u in aanmerking komen woonwagen of standplaats dan kunt u zich
          hier inschrijven. U wordt op de wachtlijst geplaatst.
        </p>
      </div>
      <div
        onClick={() => router.push("/waitlist/steps/initialstep")}
        className="text-center cursor-pointer py-2 bg-slate-700 text-white border-slate-700">
        Ik zoek een Woonwagen of Standplaats
      </div>
    </div>
  );
}
