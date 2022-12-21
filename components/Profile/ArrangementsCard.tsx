import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import DetailModal from "./Modals/DetailModal";

export default function ArrangementsCard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  return (
    <>
      <div className="block w-full bg-white rounded-md shadow-md mb-7 relative overflow-hidden">
        <div className="py-4 pl-4 rounded-t-md bg-tertiary text-base text-white">
          Regelingen
        </div>
        <div className="text-sm px-6 py-4 text-black font-light items-center flex flex-row gap-x-24 justify-between">
          <div>
            U komt vanwege uw <br />
            woonsituatie niet in <br />
            aanmerking om voorrang te <br />
            verkrijgen op <br />
            nieuwe woningen
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
            <img src="/bg-images/profile/Regelingen.svg" className="w-40" />
          </div>
        </div>
      </div>
    </>
  );
}
