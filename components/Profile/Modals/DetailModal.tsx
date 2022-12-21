import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-dropdown-select";
import { RegisterLoadingSpinner } from "../../Registration/LoadingSpinner";
import { ProfilePopUp } from "../ProfilePopUp";

export default function DetailModal({ show, handleClose, details, setDetails }) {
  const inputClasses: string =
    "border-b border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-10/12 py-1";

  const initialsInput = useRef("");

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [values, setValues] = useState({
    lastname: "",
    initials: "",
    dob: "",
    email: "",
    cc_email: "",
    mobile: "",
    landline: "",
    zipcode: "",
    housenumber: "",
    street: "",
    city: "",
    income: 0,
    addressMe: "",
    gender: "",
    letterhead: "",
    initialsTestDisplay: false,
  });

  const handleLastName = (e: any) => {
    e.persist();
    setValues({
      ...values,
      lastname: e.target.value,
    });
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

  const handleInitials = (e: any) => {
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

  const handleDOB = (e: any) => {
    e.persist();
    setValues({
      ...values,
      dob: e.target.value,
    });
  };

  const handleEmail = (e: any) => {
    e.persist();
    setValues({
      ...values,
      email: e.target.value,
    });
  };

  const handleCCEmail = (e: any) => {
    e.persist();
    setValues({
      ...values,
      cc_email: e.target.value,
    });
  };

  const handleMobile = (e: any) => {
    e.persist();
    setValues({
      ...values,
      mobile: e.target.value,
    });
  };

  const handleLandline = (e: any) => {
    e.persist();
    setValues({
      ...values,
      landline: e.target.value,
    });
  };

  const handleZipcode = (e: any) => {
    e.persist();
    setValues({
      ...values,
      zipcode: e.target.value,
    });
  };

  const handleHousenumber = (e: any) => {
    e.persist();
    setValues({
      ...values,
      housenumber: e.target.value,
    });
  };

  const handleStreet = (e: any) => {
    e.persist();
    setValues({
      ...values,
      street: e.target.value,
    });
  };

  const handleCity = (e: any) => {
    e.persist();
    setValues({
      ...values,
      city: e.target.value,
    });
  };

  const handleAddressMeOnChange = (e) => {
    console.log(e);

    setValues({
      ...values,
      letterhead: e[0].value,
    });

    setSelectedValues(e);
  };

  const handleIncome = (e: any) => {
    e.persist();
    setValues({
      ...values,
      income: e.target.value,
    });
  };

  useEffect(() => {
    if (show) {
      setValues({
        ...values,
        zipcode: details.zipcode,
        housenumber: details.housenumber,
        street: details.street,
        city: details.city,
        income: details.income,
        initials: details.initials,
        lastname: details.lastname,
        dob: moment(details.dob).format('DD-MM-YYYY'),
        email: details.email,
        cc_email: details.cc_email,
        mobile: details.phone.mobile,
        landline: details.phone.landline,
        letterhead: details.letterhead,
      });

      setSelectedValues([
        {
          value: details.letterhead,
          label: titles.find((x) => x.value == details.letterhead).text,
        },
      ]);
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      letterhead: values.letterhead,
      city: values.city,
      gender: values.addressMe,
      email: values.email,
      phone: {
        mobile: values.mobile,
        landline: values.landline,
      },
      initials: values.initials.toLocaleUpperCase(),
      lastname: values.lastname,
      cc_email: values.cc_email,
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

    if (jsonResponse.success) {
      setLoading(false);
      setDetails(data)
      handleClose();
    } else {
      setLoading(false);
    }
  };

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

  return (
    <ProfilePopUp
      title="Wie bent u?"
      show={show}
      onClose={handleClose}
      bgClass="bg-profile-one">
      {/* Qn section */}
      <div className="flex flex-row mb-12 gap-x-28">
        <div className="basis-1/4 text-primary font-light text-lg">
          Wat zijn uw gegevens?
        </div>
        <div className="basis-3/4">
          <div className="grid grid-cols-2 gap-x-2 gap-y-8 w-full">
            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm text-gray-500">
                <img src="/icons/007-user-2.svg" className="w-3.5" />
                <span>Spreek mij aan als</span>
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
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm text-gray-500">
                <img src="/icons/007-user-2.svg" className="w-3.5" />
                <span>Achternaam *</span>
              </label>
              <input
                value={values.lastname}
                onChange={handleLastName}
                className={inputClasses}
              />
            </div>

            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm text-gray-500">
                <img src="/icons/007-user-2.svg" className="w-3" />
                <span>Voorletters *</span>
              </label>
              <input
                value={values.initials}
                onChange={handleInitials}
                className={inputClasses}
              />
            </div>

            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm text-gray-500">
                <img src="/icons/002-calendar.svg" className="w-3" />
                <span>Geboortedatum *</span>
              </label>
              <input
                readOnly
                value={values.dob}
                className={inputClasses}
              />
            </div>
          </div>
        </div>
      </div>
      {/* End of Qn section */}

      {/* Qn section */}
      <div className="flex flex-row mb-8 gap-x-28">
        <div className="basis-1/4 text-primary font-light text-lg">
          Wat zijn uw gegevens?
        </div>
        <div className="basis-3/4">
          <div className="grid grid-cols-2 gap-x-2 gap-y-8 w-full mb-14">
            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm text-gray-500">
                <img src="/icons/gmail.svg" className="w-3.5" />
                <span>E-mailadres</span>
              </label>
              <input
                value={values.email}
                onChange={handleEmail}
                className={inputClasses}
              />
            </div>

            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm text-gray-500">
                <img src="/icons/gmail.svg" className="w-3.5" />
                <span>Mail ook naar</span>
              </label>
              <input
                value={values.cc_email}
                onChange={handleCCEmail}
                className={inputClasses}
              />
            </div>

            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm text-gray-500">
                <img src="/images/phone.svg" className="w-3" />
                <span>Telefoonnummer</span>
              </label>
              <input
                value={values.mobile}
                onChange={handleMobile}
                className={inputClasses}
              />
            </div>

            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm text-gray-500">
                <img src="/images/phone.svg" className="w-3" />
                <span>Telefoonnummer</span>
              </label>
              <input
                value={values.landline}
                onChange={handleLandline}
                className={inputClasses}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-8 w-full mb-14">
            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm text-gray-500">
                <img src="/icons/mailbox.svg" className="w-3.5" />
                <span>Postcode</span>
              </label>
              <input
                value={values.zipcode}
                onChange={handleZipcode}
                className={inputClasses}
              />
            </div>

            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm text-gray-500">
                <img src="/icons/003-home (1).svg" className="w-3.5" />
                <span>Huisnummer</span>
              </label>
              <input
                value={values.housenumber}
                onChange={handleHousenumber}
                className={inputClasses}
              />
            </div>

            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm text-gray-500">
                <img src="/icons/005-user-1.svg" className="w-3" />
                <span>Straat</span>
              </label>
              <input
                value={values.street}
                onChange={handleStreet}
                className={inputClasses}
              />
            </div>

            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm text-gray-500">
                <img src="/icons/004-building.svg" className="w-3" />
                <span>Woonplaats</span>
              </label>
              <input
                value={values.city}
                onChange={handleCity}
                className={inputClasses}
              />
            </div>
          </div>
        </div>
      </div>
      {/* End of Qn section */}

      {/* Qn section */}
      <div className="flex flex-row mb-12 gap-x-28">
        <div className="basis-1/4">
          <div className="text-primary font-light text-lg">
            Wat zijn uw gegevens?
          </div>
          <div className="text-extralight text-sm mt-3 text-gray-400">
            Vul hier uw totale persoonlijke inkomen in. Dat staat vermeld als
            'Verzamelinkomen' op uw persoonlijke inkomensverklaring die u gratis
            kunt opvragen bij de Belastingdiest. U kunt uw inkomen ook eenvoudig
            uitrekenen met de rekenhulp.
          </div>
        </div>
        <div className="basis-3/4">
          <div className="mb-4">
            <label className="flex items-center space-x-1 mb-1 font-medium text-sm text-gray-500">
              <img src="/icons/euro.svg" className="w-3.5" />
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
                onChange={handleIncome}
                className={`border-b ${
                  values.income.toString().length > 0 ? "pl-3" : ""
                } border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-full py-1`}
              />
            </div>
          </div>

          <div className="flex flex-row justify-end">
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
        </div>
      </div>
      {/* End of Qn section */}
    </ProfilePopUp>
  );
}
