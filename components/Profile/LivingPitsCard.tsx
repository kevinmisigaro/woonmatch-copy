import Link from "next/link";
import React from "react";

export default function LivingPitsCard({ myPoints }) {
  return (
    <>
      <div className="block w-full bg-white rounded-md shadow-md mb-7 relative overflow-hidden">
        <div className="py-4 pl-4 rounded-t-md bg-tertiary text-base text-white">
          Mijn woonpunten
        </div>
        <div className="text-sm px-6 py-4 text-black font-normal items-center flex flex-row gap-x-24 justify-between">
          <div>
            <p className="mt-2">
              Totaal punten:{" "}
              <span className="font-medium">{myPoints.total}</span>
            </p>
            <br />

            <Link href="/points">
              <div className="text-sm group mt-16 text-primary flex items-center flex-row justify-start gap-x-1 font-light cursor-pointer hover:underline">
                Ga naar mijn Punten
              </div>
            </Link>
          </div>
          <div className="absolute -bottom-2 -right-2">
            <img src="/bg-images/profile/Wooningpunten.svg" className="w-40" />
          </div>
        </div>
      </div>

      {/* <MyProfileModal show={show} onClose={handleClose} /> */}
    </>
  );
}
