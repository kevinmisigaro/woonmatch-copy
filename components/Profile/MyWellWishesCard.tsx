import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { RegisterLoadingSpinner } from "../Registration/LoadingSpinner";
import HousingWishesModal from "./Modals/HousingWishesModal";

export default function MyWellWishesCard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [details, setDetails] = useState({
    rooms: 0,
    cities: 0,
    models: 0,
    minRent: 0,
    maxRent: 0,
    loading: true
  })

  const loadData = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/api/auth/registersteps/preferences", options);
    const data = await response.json();
    setDetails({
      ...details,
      maxRent: data.data.currentSettings.rent.max,
      minRent: data.data.currentSettings.rent.min,
      rooms: data.data.currentSettings.rooms,
      cities: data.data.currentSettings.cities.length,
      models: data.data.currentSettings.models.length,
      loading: false
    });
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <div className="block w-full bg-white rounded-md shadow-md mb-7 relative overflow-hidden">
        <div className="py-4 pl-4 rounded-t-md bg-tertiary text-base text-white">
          Mijn woonwensen
        </div>
        {
          details.loading ? <div className="flex flex-row items-center h-2/3 justify-center">
            <RegisterLoadingSpinner />
          </div>
            : <div className="text-sm px-6 py-4 text-black font-normal items-center flex flex-row gap-x-24 justify-between">
              <div>
                <div className="flex flex-col gap-y-2">
                  <p>{details.rooms} slaapkamers</p>
                  <p>{details.models} voorkeurstypes</p>
                  <p>{details.cities} voorkeursplaatsen</p>
                  <p>Huur van €{details.minRent} to €{details.maxRent}</p>
                </div>
                <div
                  onClick={handleShow}
                  className="text-sm mt-5 group text-primary flex items-center flex-row justify-start gap-x-1 font-light cursor-pointer hover:underline">
                  Wijzigen{" "}
                  <span className="hidden group-hover:block underline">
                    <BsArrowRight size={12} />
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-2 -right-2">
                <img src="/bg-images/profile/Woonwensen.svg" className="w-40" />
              </div>
            </div>
        }
      </div>

      <HousingWishesModal show={show} handleClose={handleClose} />
    </>
  );
}
