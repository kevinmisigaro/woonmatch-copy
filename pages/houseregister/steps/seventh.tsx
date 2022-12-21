import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import HouseRegister from "..";
import { RegisterLoadingSpinner } from "../../../components/Registration/LoadingSpinner";
import { houseRegisterStep } from "../../../store/atoms/HouseRegisterAtom";
import HouseRegisterBackButton from "../HouseRegisterBackButton";

export default function Seventh() {
  const [_, setStep] = useAtom(houseRegisterStep);
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    localStorage.clear();
    router.push("/");
  };

  const [situation, setSituation] = useState({
    adviceText: "",
    adviceRent: "",
    doorstromerShow: false,
    doorstromerStatus: false,
    spoedzoekerShow: false,
    spoedzoekerStatus: false,
    paymentShow: false,
    paymentComplete: false,
  });

  const [relatives, setRelatives] = useState([]);
  const [hasPartner, setHasPartner] = useState<boolean>(false);
  const [values, setValues] = useState({
    name: "",
    regno: "",
    partner: "",
    zipcode: "",
    houseno: "",
    street: "",
    residence: "",
    income: "",
    advice: "",
    maxrent: "",
  });

  const loadUserData = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/api/auth/registersteps/summary", options);
    const json_response = await response.json();

    setValues({
      ...values,
      name: `${json_response.data.person.initials} ${json_response.data.person.lastname}`,
      regno: json_response.data.person.registrationnumber,
      partner: `${json_response.data.partner.initials} ${json_response.data.partner.lastname}`,
      houseno: json_response.data.address.housenumber,
      street: json_response.data.address.street,
      residence: json_response.data.address.city,
      income: json_response.data.grossincome,
      zipcode: `${json_response.data.address.zipcode}`,
      advice: `${json_response.data.situation.advice.text}`,
      maxrent: `${json_response.data.situation.advice.maxrent}`,
    });

    setRelatives([...json_response.data.extraPeople.info]);
    setHasPartner(json_response.data.partner.hasPartner);

    setSituation({
      ...situation,
      adviceText: json_response.data.situation.advice.text,
      adviceRent: json_response.data.situation.advice.maxrent,
    });
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const inputClasses: string =
    "border-b border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-5/6 py-1";

  return (
    <HouseRegister>
      <div className="flex flex-row justify-between">
        <h3 className="text-3xl font-medium">Samenvatting</h3>
        <div className="flex flex-row justify-end">
          <div className="text-primary text-sm font-light mr-14">
            <p className="cursor-pointer hover:underline">Help</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-x-20 mt-16 pb-5">
        <p className="text-primary font-light text-base basis-1/4">
          Uw gezin bestaat uit
        </p>
        <div className="grid grid-cols-2 gap-x-7 gap-y-8 w-full basis-3/4">
          <div>
            <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
              <img src="/icons/007-user-2.svg" className="w-3" />
              <span>U bent</span>
            </label>
            <input value={values.name} readOnly className={inputClasses} />
          </div>

          <div>
            <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
              <img src="/icons/group.svg" className="w-3.5" />
              <span>Inschrijfnummer</span>
            </label>
            <input value={values.regno} readOnly className={inputClasses} />
          </div>

          <div>
            <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
              <img src="/icons/002-calendar.svg" className="w-3" />
              <span>Max huurprijs</span>
            </label>
           <div className="relative">
           <small className="absolute top-1">€</small>
            <input value={values.maxrent} readOnly className="border-b pl-3 border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-5/6 py-1" />
           </div>
          </div>

          {hasPartner && (
            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                <img src="/icons/001-user.svg" className="w-3.5" />
                <span>Uw partner is</span>
              </label>
              <input value={values.partner} readOnly className={inputClasses} />
            </div>
          )}
        </div>
      </div>

      {relatives.length > 0 && (
        <div className="flex flex-row gap-x-20 mt-16">
          <p className="text-primary font-light text-base basis-1/4">
            Relaties
          </p>

          <div className="basis-3/4">
            {relatives.length > 0 &&
              relatives.map((p, i) => (
                <div key={i} className="mb-10">
                  <div className="grid grid-cols-2 gap-x-7 gap-y-8 w-full mt-0">
                    <div className="mb-2">
                      <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                        <img src="/icons/002-calendar.svg" className="w-3.5" />
                        <span>Geboortedatum</span>
                      </label>
                      <input value={p.dob} readOnly className={inputClasses} />
                    </div>

                    <div className="mb-2">
                      <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                        <img src="/icons/002-calendar.svg" className="w-3.5" />
                        <span>Relatie</span>
                      </label>
                      <input
                        value={p.relation}
                        readOnly
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {p.income > 0 && (
                    <div className="w-full mt-2">
                      <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                        <img src="/icons/group.svg" className="w-3.5" />
                        <span>Inkomen</span>
                      </label>
                      <div className="relative">
                        <small className={`absolute top-1`}>€</small>
                        <input
                          type="number"
                          value={p.income}
                          readOnly
                          className={`
          border-b pl-3 border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-11/12 py-1
          `}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="flex flex-row gap-x-20 mt-16 pb-5">
        <p className="text-primary font-light text-base basis-1/4">
          U woont nu
        </p>
        <div className="grid grid-cols-2 gap-x-7 gap-y-8 w-full basis-3/4">
          <div>
            <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
              <img src="/icons/mailbox.svg" className="w-3" />
              <span>U woont nu in</span>
            </label>
            <input className={inputClasses} readOnly value={values.residence} />
          </div>

          <div>
            <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
              <img src="/icons/003-home (1).svg" className="w-3" />
              <span>Huisnummer</span>
            </label>
            <input className={inputClasses} readOnly value={values.houseno} />
          </div>

          <div>
            <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
              <img src="/icons/005-user-1.svg" className="w-3" />
              <span>Straat</span>
            </label>
            <input className={inputClasses} readOnly value={values.street} />
          </div>

          <div>
            <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
              <img src="/icons/004-building.svg" className="w-3" />
              <span>Postcode</span>
            </label>
            <input className={inputClasses} readOnly value={values.zipcode} />
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-x-20 mt-16 pb-5">
        <p className="text-primary font-light text-base basis-1/4">
          Uw inkomen is
        </p>
        <div className="basis-3/4">
          <div>
            <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
              <img src="/icons/euro.svg" className="w-3.5" />
              <span>Uw inkomen</span>
            </label>

            <div className="relative">
              <small className="absolute top-1">€</small>
              <input
                value={values.income}
                type="number"
                readOnly
                className="border-b border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-11/12 py-1 pl-3"
              />
            </div>
          </div>

          <div className="w-11/12 px-5 py-4 rounded bg-gray-100 mt-10 shadow-lg flex flex-row justify-start items-start gap-x-1">
            <FaInfoCircle />
            <div>
              <h5 className="text-xs font-medium">
                Huurmogelijkheden op basis van inkomen en huishouden
              </h5>
              <p className="text-xs font-light mt-3">{situation.adviceText}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between mt-2 pb-8">
        <HouseRegisterBackButton />

        <div className="flex flex-row justify-end items-end mr-16">
          {submitting ? (
            <div className="btn bg-tertiary items-center text-white font-light text-sm px-16 max-w-md flex flex-row justify-between gap-x-2 py-1.5 rounded">
              <RegisterLoadingSpinner />
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn bg-tertiary text-white font-light text-sm px-6 py-2 rounded">
              Bevestig inschrijving
            </button>
          )}
        </div>
      </div>
    </HouseRegister>
  );
}
