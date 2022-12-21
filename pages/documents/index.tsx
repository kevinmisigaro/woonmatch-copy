import React, { useEffect, useState } from "react";
import GreyLayout from "../../components/Layouts/GreyLayout";
import NewUploadDocument from "../../components/Documents/NewUploadDocument";

export default function Index() {
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
    <GreyLayout>
      <div className="flex flex-row">
        <div
          className="hidden md:block md:basis-1/5 bg-primary bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage:
              "url(/bg-images/brooke-cagle-xcgh5_-QIXc-unsplash.png)",
          }}></div>

        <div className="basis-5/5 md:basis-4/5">
          <div className="bg-tertiary h-32 w-full"></div>

          <div className="px-20 py-10">
            <div className="text-3xl font-medium">Documenten</div>

            <div className="text-base font-light my-5">
              Als u in aanmerking komt voor een woning, dan vraagt de corporatie
              u om documenten aan te leveren. Deze documenten hebben o.a
              betrekking op uw inkomen en woonsituatie.
            </div>

            <div className="text-base font-light my-5">
              Als u een voorlopige aanbieding voor een woning krijgt, dan heeft
              u slechts korte tijd om deze documenten aan te leveren. Als u hoog
              op de lijst komt en dus een kansrijke kandidaat bent is het
              verstangid, is het verstandig om de documenten alvast te
              verzamelen.
            </div>

            {documents.map((g) => (
              <div key={g.id} className="flex flex-col md:flex-row mt-20">
                <div className="text-primary font-light text-xl basis-2/5">
                  <div className="w-3/4">{g.name}</div>
                </div>

                <div className="basis-3/5">
                  <NewUploadDocument types={g.types} />
                </div>
              </div>
            ))}

            {/* <div className="flex flex-row mt-24 justify-end">
              <div className="bg-tertiary px-10 py-3 text-white rounded-md">
                Accepteren
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </GreyLayout>
  );
}
