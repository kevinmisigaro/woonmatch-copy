import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { RegisterLoadingSpinner } from "../../../components/Registration/LoadingSpinner";
import { houseRegisterStep } from "../../../store/atoms/HouseRegisterAtom";
import HelpSection from "../HelpSection";
import HouseRegisterBackButton from "../HouseRegisterBackButton";
import HouseRegister from "../index";
import Select from "react-dropdown-select";
import Rekunhelp from "../../../components/Registration/Modals/Rekunhelp";
import Tax from "../../../components/Registration/Modals/Tax";
import { RegisterPopUp } from "../../../components/Registration/RegisterPopUp";
import moment from "moment";
import RegistrationDob from "../../../components/Registration/RegistrationDob";

export default function First() {
  const titles = [
    {
      value: "M",
      text: "Meneer",
    },
    {
      value: "F",
      text: "Mevrouw",
    },
    {
      value: "B",
      text: "Anders",
    },
  ];
  const [_, setStep] = useAtom(houseRegisterStep);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const changePage = () => {
    setStep((i) => i + 1);
    router.push("second");
    localStorage.setItem("zipcode", values.zipcode);
    localStorage.setItem("housenumber", values.housenumber);
    localStorage.setItem("street", values.street);
    localStorage.setItem("city", values.residence);
  };
  const [zipcodeError, setZipcodeError] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [errors, setErrors] = useState([]);
  const [showError, setShowError] = useState(false);

  const inputClasses: string =
    "border-b border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-5/6 py-1";

  const getZipcode = async () => {
    setZipcodeError(false);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        zipcode: values.zipcode,
        housenumber: values.housenumber,
      }),
    };

    const response = await fetch("/api/zipcode", options);
    const json_response = await response.json();

    if (json_response.success) {
      setValues({
        ...values,
        street: json_response.data.street,
        residence: json_response.data.city,
      });
      setZipcodeError(false);
    } else {
      setValues({
        ...values,
        street: "",
        residence: "",
      });
      setZipcodeError(true);
    }
  };

  const initialsInput = useRef(null);

  const [showLookingModal, setShowLookingModal] = useState<boolean>(false);
  const [showIncomeModal, setShowIncomeModal] = useState<boolean>(false);
  const [values, setValues] = useState({
    addressMe: "",
    lastName: "",
    initials: "",
    initialsTrue: "",
    dob: "",
    day: "",
    month: "",
    year: "",
    email: "",
    ccEmail: "",
    phoneNumber: "",
    landline: "",
    zipcode: "",
    housenumber: "",
    street: "",
    residence: "",
    income: "",
    initialsTestDisplay: false,
  });

  const dayOnChange = (e) => {
    e.persist();
    setValues({
      ...values,
      day: e.target.value,
    });
  };

  const monthOnChange = (e) => {
    e.persist();
    setValues({
      ...values,
      month: e.target.value,
    });
  };

  const yearOnChange = (e) => {
    e.persist();
    setValues({
      ...values,
      year: e.target.value,
    });
  };

  const handleAddressMeOnChange = (e) => {
    setValues({
      ...values,
      addressMe: e[0].value,
    });

    setSelectedValues(e);
  };

  const handleLastName = (e) => {
    e.persist();
    setValues({
      ...values,
      lastName: e.target.value,
    });
  };

  const handleInitialChange = (e) => {
    e.persist();
    setValues({
      ...values,
      initials:
        e.target.value.length > 0 ? `${e.target.value.toUpperCase()}.` : "",
      initialsTestDisplay: e.target.value.length > 4 ? true : false,
    });
  };

  const handleDobChange = (e) => {
    e.persist();
    setValues({
      ...values,
      dob: e.target.value,
    });
  };

  const handleEmailChange = (e) => {
    e.persist();
    setValues({
      ...values,
      email: e.target.value,
    });
  };

  const handleCcEmailChange = (e) => {
    e.persist();
    setValues({
      ...values,
      ccEmail: e.target.value,
    });
  };

  const handlePhoneNumberChange = (e) => {
    e.persist();
    setValues({
      ...values,
      phoneNumber: e.target.value,
    });
  };

  const handleLandLineChange = (e) => {
    e.persist();
    setValues({
      ...values,
      landline: e.target.value,
    });
  };

  const handleZipcodeChange = (e) => {
    e.persist();
    setValues({
      ...values,
      zipcode: e.target.value,
    });
  };

  const handleHouseNumberChange = (e) => {
    e.persist();
    setValues({
      ...values,
      housenumber: e.target.value,
    });
  };

  const handleIncomeChange = (e: any) => {
    e.persist();
    setValues({
      ...values,
      income: e.target.value,
    });
  };

  const handleIncomeWithCalculator = (c) => {
    setValues({
      ...values,
      income: c,
    });
  };

  const loadUserData = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/api/auth/user", options);
    const json_response = await response.json();

    if (json_response.data.letterhead.length > 0) {
      setSelectedValues([
        {
          value: json_response.data.letterhead,
          label: titles.find((x) => x.value == json_response.data.letterhead)
            .text,
        },
      ]);
    }

    setValues({
      ...values,
      addressMe: json_response.data.letterhead,
      lastName: json_response.data.lastname,
      initials: json_response.data.initials,
      day: moment(json_response.data.dob).format("MM"),
      month: moment(json_response.data.dob).format("DD"),
      year: moment(json_response.data.dob).format("Y"),
      ccEmail: json_response.data.cc_email,
      phoneNumber: json_response.data.phone.mobile,
      landline: json_response.data.phone.landline,
      zipcode: json_response.data.zipcode,
      housenumber: json_response.data.housenumber,
      street: json_response.data.street,
      residence: json_response.data.city,
      email: json_response.data.email,
      initialsTrue: json_response.data.initials,
      income: json_response.data.income || 0,
    });
  };

  useEffect(() => {
    loadUserData();
    setValues({
      ...values,
      addressMe: titles[0].value,
    });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    const data = {
      letterhead: values.addressMe,
      city: values.residence,
      gender: values.addressMe,
      email: values.email,
      phone: {
        mobile: values.phoneNumber,
        landline: values.landline,
      },
      initials: values.initials.toLocaleUpperCase(),
      lastname: values.lastName,
      cc_email: values.ccEmail,
      zipcode: values.zipcode,
      housenumber: values.housenumber,
      street: values.street,
      income: values.income,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch("/api/auth/registersteps/first", options);
    const jsonResponse = await response.json();

    console.log(jsonResponse.message);

    if (jsonResponse.success) {
      setLoading(false);
      changePage();
    } else {
      setErrors([...jsonResponse.message.errors]);
      setShowError(true);
      setLoading(false);
    }
  };

  return (
    <>
      <HouseRegister>
        <div className="flex flex-row justify-between w-11/12">
          <h3 className="text-4xl font-medium">Wie bent u?</h3>
          <HelpSection />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-row gap-x-20 mt-20 pb-5 w-full">
            <p className="text-primary font-light text-lg basis-1/4">
              Wat zijn uw gegevens?
            </p>
            <div className="grid grid-cols-2 gap-x-2 gap-y-8 w-full basis-3/4">
              <div>
                <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/005-user-1.svg" className="w-3" />
                  <span>Spreek mij aan als *</span>
                </label>

                <Select
                  options={titles.map((x) => ({
                    value: x.value,
                    label: x.text,
                  }))}
                  placeholder="Kies.."
                  color="green"
                  style={{
                    width: "83%",
                  }}
                  values={selectedValues}
                  onChange={handleAddressMeOnChange}
                />
              </div>

              <div>
                <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/007-user-2.svg" className="w-3.5" />
                  <span>Achternaam *</span>
                </label>
                <input
                  value={values.lastName}
                  onChange={handleLastName}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/007-user-2.svg" className="w-3" />
                  <span>Voorletters *</span>
                </label>
                <input
                  ref={initialsInput}
                  value={values.initials}
                  onChange={(e) => handleInitialChange(e)}
                  className={inputClasses}
                />
                {values.initials.length > 5 && (
                  <>
                    {" "}
                    <br />
                    <small className="text-red-400 text-sm">
                      U moet hier uw initialen invullen. Mogelijk vult u nu uw
                      voornaam in.
                    </small>
                  </>
                )}
              </div>

              <div>
                <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/002-calendar.svg" className="w-3" />
                  <span>Geboortedatum *</span>
                </label>
                <RegistrationDob
                  day={values.day}
                  month={values.month}
                  year={values.year}
                  dayOnChange={dayOnChange}
                  monthOnChange={monthOnChange}
                  yearOnChange={yearOnChange}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-x-20 mt-20 pb-5">
            <p className="text-primary font-light text-lg basis-1/4">
              Hoe kunnen we u bereiken?
            </p>
            <div className="grid grid-cols-2 gap-x-2 gap-y-8  w-full basis-3/4">
              <div>
                <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/gmail.svg" className="w-3.5" />
                  <span>E-mailadres</span>
                </label>
                <input
                  value={values.email}
                  onChange={handleEmailChange}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/gmail.svg" className="w-3.5" />
                  <span>Mail ook naar</span>
                </label>
                <input
                  value={values.ccEmail}
                  onChange={handleCcEmailChange}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                  <img src="/images/phone.svg" className="w-3.5" />

                  <span>Telefoonnummer</span>
                </label>
                <input
                  value={values.phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                  <img src="/images/phone.svg" className="w-3.5" />

                  <span>Telefoonnummer</span>
                </label>

                <input
                  value={values.landline}
                  onChange={handleLandLineChange}
                  className={inputClasses}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-x-20 mt-20 pb-5">
            <p className="text-primary font-light text-lg basis-1/4">
              Waar woont u nu?
            </p>
            <div className="grid grid-cols-2 gap-x-2 gap-y-8  w-full basis-3/4">
              <div>
                <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/mailbox.svg" className="w-3.5" />
                  <span>Postcode</span>
                </label>
                <input
                  value={values.zipcode}
                  onChange={handleZipcodeChange}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/003-home (1).svg" className="w-3.5" />
                  <span>Huisnummer</span>
                </label>
                <input
                  onKeyUp={getZipcode}
                  value={values.housenumber}
                  onChange={handleHouseNumberChange}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/005-user-1.svg" className="w-3.5" />
                  <span>Straat</span>
                </label>
                <input
                  value={values.street}
                  readOnly
                  className={inputClasses}
                />
                <br />
                {zipcodeError && (
                  <small className="text-xs text-red-300">
                    Adres niet gevonden
                  </small>
                )}
              </div>

              <div>
                <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/004-building.svg" className="w-3.5" />
                  <span>Woonplaats</span>
                </label>

                <input
                  value={values.residence}
                  readOnly
                  className={inputClasses}
                />
                <br />
                {zipcodeError && (
                  <small className="text-xs text-red-300">
                    Adres niet gevonden
                  </small>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-x-20 mt-20 pb-5 w-full">
            <div className="basis-1/4">
              <p className="text-primary font-light text-lg">
                Wat is uw inkomen?
              </p>
              <p className="font-light text-sm text-gray-400 pb-4 text-left">
                Vul hier uw totale persoonlijke inkomen in. Dat staat vermeld
                als 'Verzamelinkomen' op uw persoonlijke inkomensverklaring die
                u gratis kunt opvragen bij de Belastingdienst. U kunt uw inkomen
                ook eenvoudig uitrekenen met de rekenhulp. Wij zijn verplicht uw
                inkomen om te rekenen naar het huidige jaar. Dit doen wij door
                de Rijksoverheid vastgestelde percentage. De omrekenfactor voor
                2021 is 1,1002 en voor 2022 is dit 1,0802.
              </p>
            </div>
            <div className="basis-3/4">
              <div className="w-11/12">
                <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/euro.svg" className="w-4" />
                  <span>Mijn inkomen</span>
                </label>

                <div className="relative">
                  <small
                    className={`absolute top-1 ${
                      values.income.toString().length > 0 ? "block" : "hidden"
                    }`}>
                    €
                  </small>
                  <input
                    value={values.income}
                    type="number"
                    onChange={handleIncomeChange}
                    className={`border-b border-gray-500 ${
                      values.income.toString().length > 0 && "pl-4"
                    } text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-full py-1`}
                  />
                </div>
              </div>

              <div className="mt-4 w-11/12 grid grid-cols-2 justify-items-start text-center gap-x-3 text-sm">
                <div
                  onClick={() => setShowLookingModal(true)}
                  className="border border-tertiary rounded w-full py-1 text-primary cursor-pointer hover:bg-tertiary hover:text-white">
                  Rekenhulp
                </div>
                <div
                  onClick={() => setShowIncomeModal(true)}
                  className="border border-tertiary rounded w-full py-1 text-primary cursor-pointer hover:bg-tertiary hover:text-white">
                  Belastingdienst
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between mt-0 pb-8 mr-12">
            <HouseRegisterBackButton />

            <div className="flex flex-row justify-end items-end w-full">
              {loading ? (
                <div className="btn bg-tertiary items-center text-white font-light text-sm px-16 max-w-md flex flex-row justify-between gap-x-2 py-1.5 rounded">
                  <RegisterLoadingSpinner />
                </div>
              ) : (
                <button
                  type="submit"
                  className="btn bg-tertiary items-center text-white font-light text-sm px-5 max-w-md flex flex-row justify-between gap-x-2 py-1.5 rounded">
                  Uw partner <BsArrowRight size={15} />
                </button>
              )}
            </div>
          </div>
        </form>
      </HouseRegister>

      <RegisterPopUp
        show={showError}
        onClose={() => setShowError(false)}
        title="Let op!">
        <div className="px-10 py-5 h-72">
          <ul className="list-disc">
            {errors.map((e, i) => (
              <li key={i}>{e.text}</li>
            ))}
          </ul>
        </div>
      </RegisterPopUp>

      <Rekunhelp
        show={showLookingModal}
        handleClose={() => setShowLookingModal(false)}
        setIncome={handleIncomeWithCalculator}
      />
      <Tax
        show={showIncomeModal}
        handleClose={() => setShowIncomeModal(false)}
      />
    </>
  );
}
