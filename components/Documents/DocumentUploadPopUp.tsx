import axios from "axios";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { BsCloudUpload } from "react-icons/bs";
import { RegisterLoadingSpinner } from "../Registration/LoadingSpinner";

export default function DocumentUploadPopUp({
  className = "",
  show = false,
  onClose = null,
  documentGuid,
  setFiles,
}) {
  const [isPartner, setIsPartner] = useState(false);
  const [userNote, setUserNote] = useState("");
  const [partnerNote, setPartnerNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUserNoteChange = (e) => {
    e.persist();
    setUserNote(e.target.value);
  };

  const handlePartnerNoteChange = (e) => {
    e.persist();
    setPartnerNote(e.target.value);
  };

  const uploadDocUser = async (acceptedFiles) => {
    setLoading(true);
    setIsPartner(false);

    acceptedFiles.forEach((element) => {
      uploadDocOnApi(element);
    });
  };

  const uploadDocPartner = async (acceptedFiles) => {
    setLoading(true);
    setIsPartner(true);
    acceptedFiles.forEach((element) => {
      uploadDocOnApi(element);
    });
  };

  const uploadDocOnApi = async (element) => {
    console.log("upload api function start");

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
    formdata.append("note", isPartner ? userNote : partnerNote);
    formdata.append("payload", element, element.name);
    formdata.append("partner", isPartner.toString());

    const config = {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        `${
          process.env.NEXT_PUBLIC_API_URL ||
          "https://acceptatie.woonmatchwaterland.nl/api_neo/v3/index.cfm?endpoint="
        }/document`,
        formdata,
        config
      )
      .then((res) => {
        console.log(res);
        setPartnerNote("");
        setUserNote("");
        setFiles((files) => [
          ...files,
          {
            note: element.name,
            id: element.name,
            partner: isPartner,
          },
        ]);
        onClose();
      })
      .catch((err) => {
        console.log(err.response);
        onClose();
      });
  };

  return (
    <>
      {show && (
        <div className="fixed z-50 inset-0 py-10 flex flex-col items-center justify-center bg-black/80">
          <div
            className={`${className} w-2/3 relative min-h-min overflow-x-hidden overflow-y-visible  bg-gradient-to-r from-tertiary to-primary text-white rounded-sm shadow-lg`}>
            <button
              onClick={() => {
                onClose();
              }}
              className="absolute top-0 right-0 h-10 grid place-content-center aspect-square ">
              <img src="/images/close-x.svg" className="w-3" />
            </button>
            <div
              className={`py-6 pl-16 bg-gradient-to-r from-tertiary to-primary`}></div>
            <div className={`w-full`}>
              <div className="mx-auto px-16">
                <div className="flex flex-row justify-center items-center gap-x-5">
                  <div className="w-full flex flex-col gap-y-4">
                    <Dropzone onDrop={uploadDocUser}>
                      {({ getRootProps, getInputProps }) => (
                        <section className="px-3 py-3 w-full">
                          <div
                            {...getRootProps({
                              className:
                                "border border-dashed border-white flex flex-col items-center text-center gap-y-3 py-10 px-4 w-full",
                            })}>
                            <input {...getInputProps()} />
                            <BsCloudUpload size={40} className="text-white" />
                            <div className="text-primary cursor-pointer bg-white px-2 rounded-sm py-2 text-center text-xs">
                              Upload your document
                            </div>
                          </div>
                        </section>
                      )}
                    </Dropzone>

                    <div>
                      <p className="text-white text-sm mb-2">
                        Toelichting (optioneel)
                      </p>
                      <textarea
                        onChange={handleUserNoteChange}
                        className="form-control w-full bg-green-100 text-black text-sm p-2"
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-y-4">
                    <Dropzone onDrop={uploadDocPartner}>
                      {({ getRootProps, getInputProps }) => (
                        <section className="px-3 py-3 w-full">
                          <div
                            {...getRootProps({
                              className:
                                "border border-dashed border-white flex flex-col items-center text-center gap-y-3 py-10 px-4 w-full",
                            })}>
                            <input {...getInputProps()} />
                            <BsCloudUpload size={40} className="text-white" />
                            <div className="text-primary cursor-pointer bg-white px-2 rounded-sm py-2 text-center text-xs">
                              Upload document partner
                            </div>
                          </div>
                        </section>
                      )}
                    </Dropzone>

                    <div>
                      <p className="text-white text-sm mb-2">
                        Toelichting (optioneel)
                      </p>
                      <textarea
                        onChange={handlePartnerNoteChange}
                        className="form-control w-full bg-green-100 text-black text-sm p-2"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-14 mb-16 w-full flex flex-row justify-center items-center">
                  <div className="bg-white rounded-md font-light text-primary px-20 py-2">
                    {loading ? <RegisterLoadingSpinner /> : "Document uploaden"}
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
