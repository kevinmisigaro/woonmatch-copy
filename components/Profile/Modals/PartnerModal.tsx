import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-dropdown-select";
import { FaCheck } from "react-icons/fa";
import { RegisterLoadingSpinner } from "../../Registration/LoadingSpinner";
import Rekunhelp from "../../Registration/Modals/Rekunhelp";
import Tax from "../../Registration/Modals/Tax";
import RegistrationDob from "../../Registration/RegistrationDob";
import SlidingSwitchButton from "../../ui/SlidingSwitchButton";
import { ProfilePopUp } from "../ProfilePopUp";

export default function PartnerModal({
  show,
  handleClose,
  setDetails,
  originalPartnerDetails,
}) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showError, setShowError] = useState(false);
  const initialsInput = useRef("");

  const handleSubmitWithPartnerId = async () => {
    const newData = {
      partner: values.partnerId,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    };

    const response = await fetch("/api/auth/partnerConnection", options);
    const jsonResponse = await response.json();

    if (jsonResponse.success) {
      setLoading(false);
      return handleClose();
    } else {
      setLoading(false);
      console.log(jsonResponse.data);
    }
  };

  const handleSubmit = async () => {
    if (!values.partner) {
      return handleClose();
    }

    let partnerMethod = values.partnerExists ? "PUT" : "POST";

    setLoading(true);
    setErrors([]);

    if (values.partnerId.length > 0) {
      return handleSubmitWithPartnerId();
    }

    const data = {
      letterhead: values.addressMe,
      city: values.partnerResidence,
      gender: values.addressMe,
      email: values.partnerEmail,
      dob: `${
        values.day.charAt(0) === "0" ? values.day.substring(1) : values.day
      }-${
        values.month.charAt(0) === "0"
          ? values.month.substring(1)
          : values.month
      }-${values.year}`,
      phone: {
        mobile: values.phoneNumber,
        landline: values.landline,
      },
      initials: values.initials.toLocaleUpperCase(),
      lastname: values.lastName,
      cc_email: values.ccEmail,
      zipcode: values.partnerZipCode,
      housenumber: values.partnerHousenumber,
      street: values.partnerStreet,
      income: values.income,
    };

    const options = {
      method: partnerMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch("/api/auth/partnerNew", options);
    const jsonResponse = await response.json();

    if (jsonResponse.success) {
      setDetails({
        ...originalPartnerDetails,
        street: values.partnerStreet,
        initials: values.initials,
        lastname: values.lastName,
        housenumber: values.partnerHousenumber,
        email: values.partnerEmail,
      });

      setLoading(false);
      handleClose();
    } else {
      console.log(jsonResponse.message);
      setErrors([...jsonResponse.message.errors]);
      setShowError(true);
      setLoading(false);
    }
  };

  const [values, setValues] = useState({
    partner: false,
    partnerExists: false,
    partnerRegistration: true,
    sameAddress: false,
    notSameAddress: false,
    partnerEmail: "",
    partnerId: "",
    partnerDob: "",
    addressMe: "",
    lastName: "",
    initials: "",
    ccEmail: "",
    day: "",
    month: "",
    year: "",
    phoneNumber: "",
    landline: "",
    zipcode: "",
    partnerZipCode: "",
    partnerHousenumber: "",
    partnerStreet: "",
    housenumber: "",
    street: "",
    residence: "",
    partnerResidence: "",
    income: "0",
    initialsTestDisplay: false,
    partnerIsRegistered: false,
    partnerIsNotRegistered: false,
  });

  const loadUserData = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/api/auth/user", options);
    const json_response = await response.json();

    console.log(json_response.data);

    setValues({
      ...values,
      zipcode: json_response.data.zipcode,
      residence: json_response.data.city,
      housenumber: json_response.data.housenumber,
      street: json_response.data.street,
    });

    const partnerOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const partnerResponse = await fetch("/api/profile/partner", partnerOptions);
    const jsonPartnerResponse = await partnerResponse.json();

    setValues({
      ...values,
      partner: jsonPartnerResponse.data.exists ? true : false,
      partnerExists: jsonPartnerResponse.data.exists,
      day: "1",
      month: "1",
      year: "1900",
    });

    if (jsonPartnerResponse.data.exists) {
      setSelectedValues([
        {
          value: json_response.data.letterhead,
          label: titles.find((x) => x.value == json_response.data.letterhead)
            .text,
        },
      ]);

      setValues({
        ...values,
        partner: true,
        addressMe: json_response.data.letterhead,
        partnerRegistration: false,
        partnerExists: true,
        initials: jsonPartnerResponse.data.initials,
        partnerEmail: jsonPartnerResponse.data.email,
        partnerDob: jsonPartnerResponse.data.dob,
        day: moment(jsonPartnerResponse.data.dob).format("DD"),
        month: moment(jsonPartnerResponse.data.dob).format("MM"),
        year: moment(jsonPartnerResponse.data.dob).format("Y"),
        phoneNumber: jsonPartnerResponse.data.phone.mobile,
        landline: jsonPartnerResponse.data.phone.landline,
        partnerStreet: jsonPartnerResponse.data.street,
        partnerZipCode: jsonPartnerResponse.data.zipcode,
        partnerHousenumber: jsonPartnerResponse.data.housenumber,
        income: jsonPartnerResponse.data.income,
        lastName: jsonPartnerResponse.data.lastname,
        ccEmail: jsonPartnerResponse.data.cc_email,
        partnerResidence: jsonPartnerResponse.data.city,
      });
    }
  };

  const formatInitials = (str: string) => {
    let result = "";
    if (str.length) {
      let splitArr = str.split("");
      splitArr.forEach((character, i) => {
        if (/[a-zA-Z]/.test(character)) {
          result += character.toUpperCase() + ".";
        }
      });
    }
    return result;
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleSameAddress = (bool: boolean) => {
    if (bool) {
      setValues({
        ...values,
        sameAddress: true,
        notSameAddress: false,
        partnerHousenumber: localStorage.getItem("housenumber"),
        partnerZipCode: localStorage.getItem("zipcode"),
        partnerStreet: localStorage.getItem("street"),
        partnerResidence: localStorage.getItem("city"),
      });
    } else {
      setValues({
        ...values,
        sameAddress: false,
        notSameAddress: true,
        partnerHousenumber: "",
        partnerZipCode: "",
        partnerStreet: "",
        partnerResidence: "",
      });
    }
  };

  const handleEmailChange = (e) => {
    e.persist();
    setValues({
      ...values,
      partnerEmail: e.target.value,
    });
  };

  const handleDobChange = (e) => {
    e.persist();
    setValues({
      ...values,
      partnerDob: e.target.value,
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

    let value = e.target.value;

    if (value == initialsInput.current) {
      value = e.target.value.slice(0, -2);
    }

    setValues({
      ...values,
      initials: formatInitials(value),
      initialsTestDisplay: e.target.value.length > 4 ? true : false,
    });

    initialsInput.current = e.target.value;
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

  const handleIncomeWithCalculator = (c) => {
    setValues({
      ...values,
      income: c,
    });
  };

  const handleHouseNumberChange = (e) => {
    e.persist();
    setValues({
      ...values,
      housenumber: e.target.value,
    });
  };

  const [zipcodeError, setZipcodeError] = useState<boolean>(false);
  const [showLookingModal, setShowLookingModal] = useState<boolean>(false);
  const [showIncomeModal, setShowIncomeModal] = useState<boolean>(false);

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

  const getZipcode = async () => {
    setZipcodeError(false);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        zipcode: values.partnerZipCode,
        housenumber: values.partnerHousenumber,
      }),
    };

    const response = await fetch("/api/zipcode", options);
    const json_response = await response.json();

    if (json_response.success) {
      setValues({
        ...values,
        partnerStreet: json_response.data.street,
        partnerResidence: json_response.data.city,
      });
      setZipcodeError(false);
    } else {
      setValues({
        ...values,
        partnerStreet: "",
        partnerResidence: "",
      });
      setZipcodeError(true);
    }
  };

  const handleIncomeChange = (e: any) => {
    e.persist();
    setValues({
      ...values,
      income: e.target.value,
    });
  };

  const handlePartnerChange = () => {
    setValues({
      ...values,
      partner: !values.partner,
    });
  };

  const handlePartnerRegistrationChange = (value: boolean) => {
    setValues({
      ...values,
      partnerId: value ? values.partnerId : "",
      partnerIsRegistered: value ? true : false,
      partnerIsNotRegistered: value ? false : true,
      partnerRegistration: value,
    });

    console.log(values.partnerId);
  };

  const [partnerLoading, setPartnerLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState("");

  const checkIfPartnerExisting = async () => {
    setErrorText("");

    setPartnerLoading(true);
    const data = {
      dob: moment(values.partnerDob).format("DD-MM-YYYY"),
      email: values.partnerEmail,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch("/api/auth/partnerExisting", options);
    const json_response = await response.json();

    console.log(json_response);

    if (json_response.success) {
      console.log(json_response.data);
      setValues({
        ...values,
        partnerId: json_response.data.id,
      });
    } else {
      setErrorText(json_response.message.errors[0].text);
    }

    setPartnerLoading(false);
  };

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

  const [selectedValues, setSelectedValues] = useState([]);

  const inputClasses: string =
    "border-b border-gray-5rder-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-full py-1";

  return (
    <ProfilePopUp
      title="Zoekt u samen met een partner?"
      show={show}
      onClose={handleClose}
      bgClass="bg-profile-two">
      <>
        <p className="font-light text-base text-gray-400 pb-10 mt-3">
          Zoekt u samen met een partner een woning? Dan is het nodig dat u
          allebei ingeschreven staat als woningzoekende. <br /> U kunt daardoor
          reageren op woningen die passend zijn bij het gezamenlijke
          huishoudinkomen en het aantal
          <br /> personen van het huishouden.
        </p>

        <div className="flex flex-row mt-20 pb-5">
          <p className="text-primary font-light text-base basis-1/3">
            Wilt u zich samen met <br />
            iemand anders inschrijven?
          </p>
          <div>
            <div className="mt-5 basis-2/3 flex flex-row gap-5">
              <SlidingSwitchButton
                onChange={handlePartnerChange}
                isOn={values.partner}
              />
              <p>{values.partner ? "Ja" : "Nee"}</p>
            </div>
          </div>
        </div>

        {values.partner && (
          <div className="flex flex-row mt-20 pb-5">
            <p className="text-primary font-light text-base basis-1/3">
              Heeft uw partner al een inschrijving?
            </p>
            <div className="mt-0 w-full flex flex-row gap-5 mb-10 basis-2/3">
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  checked={values.partnerIsRegistered}
                  onChange={() => handlePartnerRegistrationChange(true)}
                  className="h-4 w-4 focus:ring-2 focus:ring-primary accent-primary"
                />
                <label className="text-sm font-medium text-gray-900 ml-2 block">
                  Ja
                </label>
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  checked={values.partnerIsNotRegistered}
                  onChange={() => handlePartnerRegistrationChange(false)}
                  className="h-4 w-4 focus:ring-2 focus:ring-primary accent-primary"
                />
                <label className="text-sm font-medium text-gray-900 ml-2 block">
                  Nee
                </label>
              </div>
            </div>
          </div>
        )}

        {values.partnerRegistration && values.partner && (
          <div className="flex flex-row gap-x-20 mt-20 pb-5">
            <p className="text-primary font-light text-base basis-1/4">
              Wat is het e-emailadres en de <br /> geboortedatum van uw <br />{" "}
              partner?
            </p>
            <div className="w-full basis-3/4">
              <div className="w-full">
                <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/gmail.svg" className="w-3.5" />
                  <span>E-mailadres</span>
                </label>
                <div className="relative">
                  {values.partnerId.length > 0 && (
                    <FaCheck className="absolute bottom-1 right-28 text-tertiary" />
                  )}
                  <input
                    onChange={handleEmailChange}
                    value={values.partnerEmail}
                    className={inputClasses}
                  />
                </div>
              </div>

              <div className="w-full mt-8">
                <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/002-calendar.svg" className="w-3" />
                  <span>Geboortedatum</span>
                </label>
                <input
                  className={inputClasses}
                  value={values.partnerDob}
                  onChange={handleDobChange}
                  type="date"
                />
              </div>

              {errorText.length > 0 && (
                <div className="mt-1 text-red-400 text-sm">{errorText}</div>
              )}

              <div className="mt-5 w-10/12 grid grid-cols-2 justify-items-start text-center gap-x-3 text-sm">
                <div className="border border-tertiary rounded w-full py-1 text-primary cursor-pointer hover:bg-tertiary hover:text-white">
                  Overslaan en later koppelen
                </div>
                {partnerLoading ? (
                  <div className="border border-tertiary flex flex-row justify-center rounded w-full py-1 text-white bg-tertiary cursor-pointer">
                    <RegisterLoadingSpinner />
                  </div>
                ) : (
                  <div
                    onClick={checkIfPartnerExisting}
                    className="border border-tertiary rounded w-full py-1 text-white bg-tertiary cursor-pointer">
                    Haal inschrijving op
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {!values.partnerRegistration && values.partner && (
          <>
            {" "}
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
                    value={values.initials}
                    onChange={handleInitialChange}
                    className={inputClasses}
                  />
                  {initialsInput.current.length > 5 && (
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
                    value={values.partnerEmail}
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

              <div className="basis-3/4">
                <div className="mt-0  w-full flex flex-row gap-5 mb-10">
                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      checked={values.sameAddress}
                      onChange={(e) => handleSameAddress(true)}
                      className="h-4 w-4 focus:ring-2 focus:ring-primary accent-primary"
                    />
                    <label className="text-sm font-medium text-gray-900 ml-2 block">
                      Mijn adres is {localStorage.getItem("street")}{" "}
                      {localStorage.getItem("housenumber")}
                    </label>
                  </div>

                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      checked={values.notSameAddress}
                      onChange={() => handleSameAddress(false)}
                      className="h-4 w-4 focus:ring-2 focus:ring-primary accent-primary"
                    />
                    <label className="text-sm font-medium text-gray-900 ml-2 block">
                      Ander adres
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-2 gap-y-8 w-full">
                  <div>
                    <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                      <img src="/icons/mailbox.svg" className="w-3.5" />
                      <span>Postcode</span>
                    </label>
                    <input
                      value={values.partnerZipCode}
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
                      value={values.partnerHousenumber}
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
                      value={values.partnerStreet}
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
                      value={values.partnerResidence}
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
            </div>
            <div className="flex flex-row gap-x-20 mt-20 pb-5 w-full">
              <div className="basis-1/4">
                <p className="text-primary font-light text-lg">
                  Wat is uw inkomen?
                </p>
                <p className="font-light text-sm text-gray-400 pb-4">
                  Vul hier uw totale persoonlijke inkomen <br />
                  in. Dat staat vermeld als 'Verzamelinkomen' op uw persoonlijke{" "}
                  <br />
                  inkomensverklaring die u gratis kunt opvragen bij de
                  Belastingdiesnt. U kunt <br />
                  uw inkomen ook eenvoudig uitrekenen met de rekenhulp.
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
                        values.income.toString().length > 0 && "pl-3"
                      } text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-full py-1`}
                    />
                  </div>
                </div>

                <div className="mt-8 w-11/12 grid grid-cols-2 justify-items-start text-center gap-x-3 text-sm">
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
          </>
        )}

        <div className="flex flex-row justify-end mt-5 mb-20">
          {loading ? (
            <div className="bg-tertiary flex flex-row justify-center text-white px-4 py-2 mt-3 rounded text-sm">
              <RegisterLoadingSpinner />
            </div>
          ) : (
            <div
              onClick={handleSubmit}
              className="bg-tertiary text-white px-4 py-2 mt-3 rounded text-sm cursor-pointer">
              Opslaan
            </div>
          )}
        </div>

        <Rekunhelp
          show={showLookingModal}
          setIncome={handleIncomeWithCalculator}
          handleClose={() => setShowLookingModal(false)}
        />
        <Tax
          show={showIncomeModal}
          handleClose={() => setShowIncomeModal(false)}
        />
      </>
    </ProfilePopUp>
  );
}
