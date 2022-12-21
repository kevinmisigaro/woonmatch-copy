import React, { useState } from "react";
import NewUploadDocument from "./NewUploadDocument";
import UploadDocument from "./UploadDocument";

export const DocumentsListComponent = ({ documents, filter = [] }) => {
  console.log(documents)
  const getCurrentDocs = (types: any[]) => {
    let currentDocs = [];
    for (let i = 0; i < types.length; i++) {
      let cd = types[i].currentDocuments;
      if (cd?.length > 0) {
        currentDocs.push([...cd]);
      }
    }
    return currentDocs;
  };

  return (
    <div>
      {documents.map((document, index) => (filter.length === 0 || filter.includes(document.id)) && (
        <div key={index}>
          {document.required ? (
              <div className="flex flex-row mb-20">
                <div className="text-primary font-light text-xl basis-2/5">
                  {document.name}
                </div>
                <div className="basis-3/5">
                  <NewUploadDocument
                      types={document.types}
                      currentDocuments={getCurrentDocs(document.types)}
                  />
                </div>
              </div>
          ) : null}
        </div>
      ))}
      {documents.map((document, index) => (filter.length === 0 || filter.includes(document.id)) && (
        <div key={index + "2"}>
          {!document.required ? (
            <div className="flex flex-row mb-20">
              <div className="text-primary font-light text-xl basis-2/5">
                {document.name}
              </div>
              <div className="basis-3/5">
                <UploadDocument
                  documentGuid={document.id}
                  currentDocs={document.currentDocuments}
                  isPartner={false}
                />
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};
