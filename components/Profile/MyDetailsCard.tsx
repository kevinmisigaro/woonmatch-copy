import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { RegisterLoadingSpinner } from "../Registration/LoadingSpinner";
import DetailModal from "./Modals/DetailModal";

export default function MyDetailsCard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [details, setDetails] = useState<any>();

  const fetchDetails = async () => {
    const response = await fetch("/api/auth/user");
    const data = await response.json();
    setDetails(data.data);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
      <div className="block w-full bg-white rounded-md shadow-md mb-7 relative overflow-hidden">
        <div className="py-4 pl-4 rounded-t-md bg-tertiary text-base text-white">
          Mijn gegevens
        </div>
        {details == null ? (
          <div className="flex flex-row items-center h-2/3 justify-center">
            <RegisterLoadingSpinner />
          </div>
        ) : (
          <div className="text-sm text-black font-normal items-center flex flex-row gap-x-24 justify-between">
            <div className="px-6 py-4">
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
                className="text-sm  mt-5 group text-primary flex items-center flex-row justify-start gap-x-1 font-light cursor-pointer hover:underline">
                Wijzigen{" "}
                <span className="hidden group-hover:block underline">
                  <BsArrowRight size={12} />
                </span>
              </div>
            </div>

            <div className="absolute -bottom-2 -right-2">
              <img src="/bg-images/profile/group11.svg" className="w-40" />
            </div>
          </div>
        )}
      </div>

      {show && (
        <DetailModal
          show={show}
          handleClose={handleClose}
          details={details!}
          setDetails={setDetails}
        />
      )}
    </>
  );
}
