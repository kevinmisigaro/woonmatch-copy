import React, { useEffect, useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import DocumentUploadPopUp from "./DocumentUploadPopUp";
import SingleFile from "./SingleFile";

export default function NewUploadDocument({ types, currentDocuments = [] }) {
  const [show, setShow] = useState(false);
  const [files, setFiles] = useState(currentDocuments);
  const [id, setId] = useState("");

  const openPopUp = (id: string) => {
    setId(id);
    setShow(true);
  };

  useEffect(() => {
    console.log(types);

    types.forEach((t) => {
      t.currentDocuments.forEach((element) => {
        setFiles([...files, element]);
      });
    });
  }, []);

  return (
    <>
      <div className="bg-gray-100 shadow-lg p-2">
        <div
          className="border border-dashed border-gray-400"
          onClick={() => setShow(true)}>
          <div className="w-full flex flex-col items-center gap-y-5 py-14">
            <BsCloudUpload size={40} className="text-primary" />
            <p className="text-sm">Upload hier uw documenten</p>
            {types?.map((t, index: number) => (
              <div
                key={index}
                className="flex flex-row justify-between w-full px-12">
                <p className="text-xs w-1/2">
                  {index + 1}. {t.name}
                </p>
                <div
                  onClick={() => openPopUp(t.id)}
                  className="text-white cursor-pointer bg-tertiary px-5 py-1 rounded-md text-xs text-center">
                  Document uploaden
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-3 flex flex-col ${files.length == 0 && "hidden"} `}>
          {files.length > 0 &&
            files.map((f) => (
              <div key={f.id}>
                <SingleFile file={f} setFiles={setFiles} files={files} />
              </div>
            ))}
        </div>
      </div>

      {show && (
        <DocumentUploadPopUp
          setFiles={setFiles}
          show={show}
          onClose={() => setShow(false)}
          documentGuid={id}
        />
      )}
    </>
  );
}
