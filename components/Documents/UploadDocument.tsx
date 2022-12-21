import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { BsCloudUpload } from "react-icons/bs";
import SingleFile from "./SingleFile";

export default function UploadDocument({
  currentDocs,
  documentGuid = null,
  isPartner = false,
}) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setFiles(currentDocs);
  }, []);

  const uploadDocOnApi = async (element) => {
    const tokenOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const tokenResponse = await fetch(`/api/auth/getcookietoken`, tokenOptions);
    const json_tokenResponse = await tokenResponse.json();

    let token = json_tokenResponse.data;

    const formdata = new FormData();
    formdata.append("id", documentGuid);
    formdata.append("note", element.name);
    formdata.append("payload", element, element.name);
    formdata.append("partner", isPartner.toString());

    const config = {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/document`, formdata, config)
      .then(() => {
        setFiles((files) => [
          ...files,
          {
            note: element.name,
            id: element.name,
          },
        ]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const uploadDoc = async (acceptedFiles) => {
    acceptedFiles.forEach((element) => {
      uploadDocOnApi(element);
    });
  };

  return (
    <div className="bg-gray-100 shadow-lg">
      <Dropzone onDrop={uploadDoc}>
        {({ getRootProps, getInputProps }) => (
          <section className="px-3 py-3 w-full">
            <div
              {...getRootProps({
                className:
                  "border border-dashed border-gray-400 flex flex-col items-center text-center gap-y-3 py-10 px-4 w-full",
              })}>
              <input {...getInputProps()} />
              <BsCloudUpload size={40} className="text-primary" />
              <p className="text-sm">Drag and drop</p>
              <p className="text-sm">of</p>
              <div className="text-white cursor-pointer bg-tertiary px-2 w-1/4 rounded-sm py-2 text-center text-xs">
                Browse files
              </div>
            </div>
          </section>
        )}
      </Dropzone>

      {files?.length > 0 && (
        <div className={`mt-3 flex flex-col ${files.length == 0 && "hidden"} `}>
          {files.length > 0 &&
            files.map((f, index) => (
              <div key={index}>
                <SingleFile file={f} setFiles={setFiles} files={files} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
