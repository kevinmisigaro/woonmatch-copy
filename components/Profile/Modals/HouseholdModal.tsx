import React, { useEffect, useState } from "react";
import { ProfilePopUp } from "../ProfilePopUp";

export default function HouseholdModal({
  show,
  handleClose,
  partnerPoints,
  myPoints,
  partnerData,
}) {
  const [myData, setMyData] = useState({
    regNumber: "",
    lastname: "",
    initials: "",
    email: "",
    dob: "",
  });

  const [partnerDetails, setPartnerDetails] = useState({
    regNumber: "",
    lastName: "",
    initials: "",
    email: "",
    dob: "",
  });

  const loadData = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/api/auth/user", options);
    const json_response = await response.json();
    console.log(json_response.data);

    if (json_response.success) {
      setMyData({
        ...myData,
        regNumber: json_response.data.registrationnumber,
        lastname: json_response.data.lastname,
        initials: json_response.data.initials,
        email: json_response.data.email,
        dob: json_response.data.dob,
      });
    } else {
      console.log("user data load error");
    }

    const pResponse = await fetch("/api/profile/partner", options);
    const pjson_response = await pResponse.json();

    if (pjson_response.success) {
      setPartnerDetails({
        ...partnerDetails,
        regNumber: pjson_response.data.registrationnumber,
        lastName: pjson_response.data.lastname,
        initials: pjson_response.data.initials,
        dob: pjson_response.data.dob,
        email: pjson_response.data.email,
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const inputClasses: string =
    "border-b border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-5/6 py-1";

  return (
    <ProfilePopUp
      title="Mijn huishouden"
      show={show}
      onClose={handleClose}
      bgClass="bg-profile-one">
      <div className="flex flex-row gap-x-20 mt-8 pb-5">
        <p className="text-primary font-light text-base basis-1/4">
          Mijn Gegevens
        </p>

        <div className="w-full basis-3/4">
          <div>
            <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
              <img src="/icons/group.svg" className="w-3.5" />
              <span>Inschrijfnummer</span>
            </label>
            <input
              value={myData.regNumber}
              readOnly
              className="border-b border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-11/12 py-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-x-7 gap-y-8 w-full mt-5">
            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                <img src="/icons/007-user-2.svg" className="w-3.5" />
                <span>Achternaam</span>
              </label>
              <input
                value={myData.lastname}
                readOnly
                className={inputClasses}
              />
            </div>

            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                <img src="/icons/007-user-2.svg" className="w-3" />
                <span>Voorletters</span>
              </label>
              <input
                value={myData.initials}
                readOnly
                className={inputClasses}
              />
            </div>

            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                <img src="/icons/007-user-2.svg" className="w-3.5" />
                <span>E-mailadres</span>
              </label>
              <input value={myData.email} readOnly className={inputClasses} />
            </div>

            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                <img src="/icons/007-user-2.svg" className="w-3.5" />
                <span>Geboortedatum</span>
              </label>
              <input value={myData.dob} readOnly className={inputClasses} />
            </div>
          </div>
        </div>
      </div>

      {partnerData.email.length > 0 && (
        <div className="flex flex-row gap-x-20 mt-20 pb-5">
          <p className="text-primary font-light text-base basis-1/4">Partner</p>

          <div className="w-full basis-3/4">
            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                <img src="/icons/group.svg" className="w-3.5" />
                <span>Inschrijfnummer</span>
              </label>
              <input
                value={partnerDetails.regNumber}
                readOnly
                className="border-b border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-11/12 py-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-x-7 gap-y-8 w-full mt-5">
              <div>
                <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/007-user-2.svg" className="w-3.5" />
                  <span>Achternaam</span>
                </label>
                <input
                  readOnly
                  value={partnerDetails.lastName}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/007-user-2.svg" className="w-3" />
                  <span>Voorletters</span>
                </label>
                <input
                  readOnly
                  value={partnerDetails.initials}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/007-user-2.svg" className="w-3.5" />
                  <span>E-mailadres</span>
                </label>
                <input
                  value={partnerDetails.email}
                  readOnly
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/007-user-2.svg" className="w-3.5" />
                  <span>Geboortedatum</span>
                </label>
                <input
                  value={partnerDetails.dob}
                  readOnly
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="border border-primary text-primary text-center w-full mt-6 py-1 text-base rounded-md hover:bg-primary hover:text-white cursor-pointer">
              Partner loskoppelen
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-row gap-x-20 mt-20 pb-5">
        <p className="text-primary font-light text-base basis-1/4">
          Huishouden punten
        </p>
        <div className="w-full basis-3/4">
          <table className="table-auto w-full border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-200 py-3 font-light bg-gray-200"></th>
                <th className="border border-gray-200 py-3 font-light bg-gray-200">
                  Wachtpunten
                </th>
                <th className="border border-gray-200 py-3 font-light bg-gray-200">
                  Zoekpunten
                </th>
                <th className="border border-gray-200 py-3 font-light bg-gray-200">
                  Situatiepunten
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="py-3">
                <th className="border border-gray-200 py-4 font-light bg-gray-200">
                  {myData.initials} {myData.lastname}
                </th>
                <td className="border border-gray-200 text-primary text-center py-4">
                  {myPoints.wait}
                </td>
                <td className="border border-gray-200 text-primary text-center py-4">
                  {myPoints.search}
                </td>
                <td className="border border-gray-200 text-primary text-center py-4">
                  {myPoints.situation}
                </td>
              </tr>
              {partnerData.email.length > 0 && (
                <tr>
                  <th className="border border-gray-200 py-4 font-light bg-gray-200">
                    {partnerDetails.initials} {partnerDetails.lastName}
                  </th>
                  <td className="border border-gray-200 text-primary text-center py-4">
                    {partnerPoints.wait}
                  </td>
                  <td className="border border-gray-200 text-primary text-center py-4">
                    {partnerPoints.search}
                  </td>
                  <td className="border border-gray-200 text-primary text-center py-4">
                    {partnerPoints.situation}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-row justify-end my-5">
        <div
          onClick={handleClose}
          className="bg-tertiary text-white px-4 py-2 mt-3 rounded text-sm cursor-pointer">
          Opslaan
        </div>
      </div>
    </ProfilePopUp>
  );
}
