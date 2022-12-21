import React, { useState } from "react";
import HouseholdModal from "./Modals/HouseholdModal";

export default function HouseHoldCard({
  details,
  partnerDetails,
  myPoints,
  partnerPoints,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        className="block w-full bg-white rounded-md shadow-md mb-7"
        onClick={handleShow}>
        <div className="py-4 px-4 rounded-t-md bg-tertiary flex flex-row justify-between text-base text-white">
          <p>Mijn huishouden</p>
          <div className="text-xs cursor-pointer bg-white rounded-md font-light text-primary px-4 py-1">
            Overzicht
          </div>
        </div>
        <div className="text-sm  text-black  font-light">
          <div className="grid grid-cols-2 px-10 text-base py-2">
            <div className="text-xs font-light">
              Mijn naam <br />
              <span className="font-medium">
                {details.initials} {details.lastname}
              </span>
            </div>
            <div className="text-xs">
              Mijn punten
              <br />
              <span className="text-primary">{myPoints.total}</span>
            </div>
          </div>

          {
            partnerDetails.email.length > 0 &&  <>
             <div className="h-0.5 bg-gray-200 w-full mb-2"></div>
            <div className="grid grid-cols-2 px-10 text-base pb-3">
            <div className="text-xs">
              Mijn partner <br />
              <span className="font-medium">
                {partnerDetails?.initials + ' ' + partnerDetails?.lastname}
              </span>
            </div>
            <div className="text-xs">
              Punten <br />
              <span className="text-primary">{partnerPoints.total}</span>
            </div>
          </div>
            </>
          }

          <div className="flex flex-row text-base">
            <div className="basis-1/2 pl-4 bg-gray-200 py-2">
              <p style={{ fontSize: "0.7rem" }}>Totaal punten huishouden</p>
              <span
                className="italic"
                style={{ fontSize: "0.6rem", paddingTop: "-18px" }}>
                U gebruikt uw punten totaal om te reageren
              </span>
            </div>
            <div className="bg-primary py-2 text-white basis-1/2">
              <p className="mt-4 pl-5 font-semibold text-medium">
                {myPoints.total + partnerPoints.total}
              </p>
            </div>
          </div>
        </div>
      </div>
      

      {show && (
        <HouseholdModal
          partnerData={partnerDetails}
          show={show}
          handleClose={handleClose}
          myPoints={myPoints}
          partnerPoints={partnerPoints}
        />
      )}
    </>
  );
}
