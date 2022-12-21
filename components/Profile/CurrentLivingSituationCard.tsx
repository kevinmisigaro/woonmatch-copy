import moment from "moment";
import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import HousingWishesModal from "./Modals/HousingWishesModal";

export default function CurrentLivingSituationCard({ details }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="block w-full bg-white rounded-md shadow-md mb-7 relative overflow-hidden">
        <div className="py-4 pl-4 rounded-t-md bg-tertiary text-base text-white">
          Huidige woonsituatie
        </div>
        <div className="text-sm px-6 py-4 text-black font-normal items-center flex flex-row gap-x-24 justify-between">
          <div>
            Huurwoning
            <br />
            <span className="font-light">
              Eigenaar: {details.initials} {details.lastname} <br />
              Sinds: {moment(details.ownedSince).format("DD-MM-YYYY")} <br />
            </span>
            <br />
            <span className="text-sm italic font-light">
              U laat deze woning bij <br />
              verhuizing leeg achter
            </span>
            <div
              onClick={handleShow}
              className="text-sm  mt-5 group text-primary flex items-center flex-row justify-start gap-x-1 font-light cursor-pointer hover:underline">
              Bekijken{" "}
              <span className="hidden group-hover:block underline">
                <BsArrowRight size={12} />
              </span>
            </div>
          </div>

          <div className="absolute -bottom-2 -right-2">
            <img src="/bg-images/profile/Woonsituatie.svg" className="w-40" />
          </div>
        </div>
      </div>

      <HousingWishesModal show={show} handleClose={handleClose} />
    </>
  );
}
