import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { RegisterLoadingSpinner } from "../Registration/LoadingSpinner";
import PartnerModal from "./Modals/PartnerModal";

export default function MyPartnerCard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [details, setDetails] = useState<any>();

  const fetchDetails = async () => {
    const response = await fetch("/api/profile/partner");
    const data = await response.json();
    setDetails(data.data);
    console.log(data.data);
    
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
      <div className="block w-full bg-white rounded-md shadow-md mb-7 relative overflow-hidden">
        <div className="py-4 pl-4 rounded-t-md bg-tertiary text-base text-white">
          Mijn partner
        </div>
        {
          details == null ?  <div className="flex flex-row items-center h-2/3 justify-center">
          <RegisterLoadingSpinner />
        </div> : <div className="text-sm px-6 py-4 text-black font-normal items-center flex flex-row gap-x-24 justify-between">
            { details?.email == '' ?
            (
                <div>
                  <p className="font-light">
                      U heeft geen partner opgegeven
                  </p>
                  <div
                      onClick={handleShow}
                      className="text-sm mt-5 group text-primary flex items-center flex-row justify-start gap-x-1 font-light cursor-pointer hover:underline">
                    Wijzigen{" "}
                    <span className="hidden group-hover:block underline">
                      <BsArrowRight size={12} />
                    </span>
                  </div>
                </div>
            ) : (
              <div>
              <p>
                  {details?.initials} {details?.lastname}
                </p>
                <p>
                  {" "}
                  {details?.street} {details?.housenumber}
                </p>
                <span className="underline decoration-gray-300">
                  {details?.email}
                </span>
                <div
                  onClick={handleShow}
                  className="text-sm mt-5 group text-primary flex items-center flex-row justify-start gap-x-1 font-light cursor-pointer hover:underline">
                  Wijzigen{" "}
                  <span className="hidden group-hover:block underline">
                    <BsArrowRight size={12} />
                  </span>
                </div>
              </div>
                )}

          <div className="absolute -bottom-2 -right-2">
            <img src="/bg-images/profile/Group11576.svg" className="w-40" />
          </div>
        </div>

        }


        
      </div>

      <PartnerModal originalPartnerDetails={details} show={show} handleClose={handleClose} setDetails={setDetails} />
    </>
  );
}
