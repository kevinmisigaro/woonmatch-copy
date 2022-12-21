import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import DocumentModal from "./Modals/DocumentModal";
import WaitingPointsModal from "./Modals/WaitingPointsModal";

export default function MyDocumentCard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showWaitingModal, setShowWaitingModal] = useState(false);
  const handleCloseWaitingModal = () => setShowWaitingModal(false);
  const handleShowWaitingModal = () => setShowWaitingModal(true);

  const router = useRouter();

  return (
    <>
      <div className="block w-full bg-white rounded-md shadow-md mb-7 relative overflow-hidden">
        <div className="py-4 pl-4 rounded-t-md bg-tertiary text-base text-white">
          Mijn documenten
        </div>
        <div className="text-sm px-6 py-4 text-black font-normal items-center flex flex-row gap-x-24 justify-between">
          <div>
            <p
              onClick={() => router.push('/documents')}
              className="hover:text-primary hover:underline cursor-pointer">
              Inkomensverklaring
            </p>
            <hr className="my-2" />
            <p
              onClick={() => router.push('/documents')}
              className="hover:text-primary hover:underline cursor-pointer">
              Verhuurdersverklaring
            </p>
            <hr className="my-2" />
            <p
              onClick={() => router.push('/documents')}
              className="hover:text-primary hover:underline cursor-pointer">
              Definitieve aanslag
            </p>
            <br />
            <div
              onClick={() => router.push("/documents")}
              className="text-sm group text-primary flex items-center flex-row justify-start gap-x-1 font-light cursor-pointer hover:underline">
              Wijzigen{" "}
              <span className="hidden group-hover:block underline">
                <BsArrowRight size={12} />
              </span>
            </div>
          </div>

          <div className="absolute -bottom-2 -right-2">
            <img src="/bg-images/profile/Mijndocumenten.svg" className="w-40" />
          </div>
        </div>
      </div>

      <WaitingPointsModal
        show={showWaitingModal}
        handleClose={handleCloseWaitingModal}
      />

      <DocumentModal title="Documenten" show={show} onClose={handleClose} />
    </>
  );
}
