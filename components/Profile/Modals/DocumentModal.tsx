import React, { useEffect, useState } from "react";
import UploadDocument from "../../Documents/UploadDocument";

export default function DocumentModal({
  title = "",
  show = false,
  onClose = null,
}) {
  const [documents, setDocuments] = useState([]);

  const loadData = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/api/documents", options);
    const data = await response.json();
    setDocuments(data.data.groups);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {show && (
        <div className="fixed z-50 inset-0 py-10 flex flex-col items-center justify-center bg-black/80">
          <div
            className={`w-11/12 relative min-h-min overflow-x-hidden overflow-y-visible bg-white  text-black rounded-sm shadow-lg`}>
            <button
              onClick={() => {
                onClose();
              }}
              className="absolute top-6 right-0 h-10 grid place-content-center aspect-square ">
              <img src="/images/close-x.svg" className="w-3" />
            </button>

            <div
              className={`text-white font-normal py-10 bg-gradient-to-r from-primary to-tertiary`}></div>
            <div className={`bg-profile-four h-48`}></div>

            <div className={`w-full`}>
              <div className="px-20 py-10">
                <div className="text-3xl font-medium">Documenten</div>

                <div className="text-base font-light my-5">
                  Als u in aanmerking komt voor een woning, dan vraagt de
                  corporatie u om documenten aan te leveren. Deze documenten
                  hebben o.a betrekking op uw inkomen en woonsituatie.
                </div>

                <div className="text-base font-light my-5">
                  Als u een voorlopige aanbieding voor een woning krijgt, dan
                  heeft u slechts korte tijd om deze documenten aan te leveren.
                  Als u hoog op de lijst komt en dus een kansrijke kandidaat
                  bent is het verstangid, is het verstandig om de documenten
                  alvast te verzamelen.
                </div>

                {documents?.length > 0 &&
                  documents.reverse().map((x) =>
                    x.types.reverse().map((a) => (
                      <div key={a.id} className="flex flex-row mt-20">
                        <div className="text-primary font-light text-xl basis-2/5">
                          <div className="w-3/4">{a.name}</div>
                        </div>

                        <div className="basis-3/5">
                          <UploadDocument
                            currentDocs={a.currentDocuments}
                            documentGuid={a.id}
                            isPartner={false}
                          />
                        </div>
                      </div>
                    ))
                  )}
                <div className="flex flex-row mt-24 justify-end">
                  <div
                    onClick={onClose}
                    className="bg-tertiary px-10 py-3 text-white rounded-md">
                    Accepteren
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
