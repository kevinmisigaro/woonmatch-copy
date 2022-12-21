import React from "react";
import PlainLayout from "../../components/Layouts/PlainLayout";
import LookingForHouseCard from "../../components/Registration/WhyCards/LookingForHouse";
import PitchCard from "../../components/Registration/WhyCards/PitchCard";
import PointsCard from "../../components/Registration/WhyCards/Points";

export default function Why() {
  return (
    <PlainLayout title="Register">

      <div className="w-full bg-why max-h-min">
        <div className="bg-gradient-to-r from-tertiary to-primary pb-0.5">
          <img
            src="/images/logo-white.svg"
            alt="logo"
            className="w-60 lg:w-64 pl-20 h-auto mt-8 pt-5 lg:mt-0 mb-8"
          />
        </div>
        <div className="pt-2">
          <div className="text-center py-6">
            <h2 className="text-3xl font-medium">Waarom schrijft u zich in?</h2>
          </div>
          <div className="mx-10 grid grid-rows-3 md:grid-cols-3 gap-5 mt-10 pb-10">
            <LookingForHouseCard />
            <PointsCard />
            <PitchCard />
          </div>
        </div>
      </div>
    </PlainLayout>
  );
}
