import { useState, useEffect } from "react";
import { xhrRequest } from "../../network/network";
import { PartnerDetails } from "../../interfaces/index";
import ProfileLayout from "../../components/Layouts/ProfileLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCity,
  faHome,
  faEnvelope,
  faUser,
  faSackDollar,
  faPhoneAlt,
  faPhoneOffice,
  faMailbox,
  faMapSigns,
  faPaperPlane,
  faCalendarWeek,
} from "@fortawesome/pro-regular-svg-icons";

interface ExistingPartnerResponse {
  exists: boolean;
  registrationnumber: string;
  id: string;
  email: string;
  name: string;
  dob: string;
}

const PartnerPage: React.FC<any> = () => {
  const [partner, setPartner] = useState<PartnerDetails | null>(null);
  const [registerPartner, setRegisterPartner] = useState<boolean>(false);
  const [partnerExistingRegistration, setPartnerExistingRegistration] =
    useState<boolean>(false);
  const [editHoverButton, setEditHoverButton] = useState<boolean>(false);
  const [existingEmail, setExistingEmail] = useState<string | null>(null);
  const [existingDOB, setExistingDOB] = useState<string | null>(null);

  const fetchPartner = async () => {
    const response = await xhrRequest<PartnerDetails>("GET", {
      endPoint: "/user/steps/partner",
    });
    if (response) {
      setPartner(response.data);
    }
  };

  const fetchExistingPartner = async () => {
    const params = { email: existingEmail, dob: existingDOB };

    const response = await xhrRequest<ExistingPartnerResponse>("GET", {
      endPoint: "/user/steps/partner/existing",
      query: params,
    });
    if (response) {
      requestPartnerConnection(response.data.id);
    }
  };

  const requestPartnerConnection = async (guid: string) => {
    const response = await xhrRequest<ExistingPartnerResponse>("GET", {
      endPoint: "/user/steps/partner/existing",
      query: { partner: guid },
    });
    if (response) {
      //console.log(response)
    }
  };

  const updatePartner = async () => {
    const response = await xhrRequest<any>("PUT", {
      endPoint: "/user/steps/partner",
      data: partner,
    });
    if (response) {
      // console.log(response)
    }
  };

  useEffect(() => {
    if (partner === null) {
      fetchPartner();
    }
  }, [partner]);

  return (
    <ProfileLayout title="Uw partner">
      {partner && (
        <section className="space-y-8 text-gray-500">
          <h2 className="font-semibold text-xl md:text-2xl 2xl:text-4xl text-limeade">
            Zoekt u samen met een partner?
          </h2>

          <div className="border rounded-md py-4 px-4 lg:px-8 shadow-sm">
            <h2 className="text-xl lg:text-2xl text-limeade font-medium mb-4">
              Wilt u zich samen met iemand anders inschrijven?
            </h2>
            <p className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="registerPartner"
                className=""
                onChange={(evt) => setRegisterPartner(evt.target.checked)}
              />
              <label htmlFor="registerPartner">
                {registerPartner ? "Jaa" : "Nee"}
              </label>
            </p>
          </div>

          {registerPartner && (
            <div className="border rounded-md py-4 px-4 lg:px-8 shadow-sm">
              <h2 className="text-xl lg:text-2xl text-limeade font-medium mb-4">
                Heeft uw partner al een inschrijving?
              </h2>
              <p className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="partnerExistingRegistration"
                  className=""
                  onChange={(evt) =>
                    setPartnerExistingRegistration(evt.target.checked)
                  }
                />
                <label htmlFor="partnerExistingRegistration">
                  {partnerExistingRegistration ? "Jaa" : "Nee"}
                </label>
              </p>
            </div>
          )}

          {registerPartner && partnerExistingRegistration && (
            <div className="border rounded-md py-4 px-4 lg:px-8 shadow-sm">
              <h2 className="text-xl lg:text-2xl text-limeade font-medium mb-4">
                Wat is het e-mailadres en de geboortedatum van uw partner?
              </h2>

              <ul className="space-y-2">
                <li className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
                  <p className="flex items-center space-x-3">
                    <FontAwesomeIcon
                      className="text-limeade"
                      icon={faEnvelope}
                    />
                    <span>E-mailadres</span>
                  </p>
                  <p>
                    <input
                      type="email"
                      name="email"
                      onChange={(evt) => setExistingEmail(evt.target.value)}
                      className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full"
                      required
                    />
                  </p>
                </li>

                <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="flex items-center space-x-3">
                    <FontAwesomeIcon
                      className="text-limeade"
                      icon={faCalendarWeek}
                    />
                    <span>Geboortedatum</span>
                  </p>
                  <p>
                    {}
                    <input
                      type="date"
                      name="dob"
                      onChange={(evt) => setExistingDOB(evt.target.value)}
                      className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full"
                      required
                    />
                  </p>
                </li>
              </ul>
            </div>
          )}

          {registerPartner && !partnerExistingRegistration && (
            <div className="space-y-8">
              <div className="border rounded-md py-4 px-4 lg:px-8 shadow-sm">
                <h2 className="text-xl lg:text-2xl text-limeade font-medium mb-4">
                  Wat zijn de gegevens van uw partner?
                </h2>

                <ul className="space-y-2">
                  <li className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
                    <p className="flex items-center space-x-3">
                      <FontAwesomeIcon className="text-limeade" icon={faUser} />
                      <span>Spreek mij aan als *</span>
                    </p>
                    <p>
                      <select
                        name="letterhead"
                        onChange={(evt) => {
                          const value = evt.target.value;
                          setPartner((prevState) => {
                            return { ...prevState, letterhead: value };
                          });
                        }}
                        className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full">
                        <option
                          value="M"
                          selected={partner.letterhead == "M" ? true : false}>
                          M
                        </option>
                        <option
                          value="F"
                          selected={partner.letterhead == "F" ? true : false}>
                          F
                        </option>
                        <option
                          value="B"
                          selected={partner.letterhead == "B" ? true : false}>
                          B
                        </option>
                      </select>
                    </p>
                  </li>

                  <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="flex items-center space-x-3">
                      <FontAwesomeIcon className="text-limeade" icon={faUser} />
                      <span>Voorletters *</span>
                    </p>
                    <p>
                      <input
                        type="text"
                        name="initials"
                        value={partner.initials}
                        onChange={(evt) => {
                          const value = evt.target.value;
                          setPartner((prevState) => {
                            return { ...prevState, initials: value };
                          });
                        }}
                        className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full"
                      />
                    </p>
                  </li>

                  <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="flex items-center space-x-3">
                      <FontAwesomeIcon className="text-limeade" icon={faUser} />
                      <span>Achternaam *</span>
                    </p>
                    <p>
                      <input
                        type="text"
                        name="lastname"
                        value={partner.lastname}
                        onChange={(evt) => {
                          const value = evt.target.value;
                          setPartner((prevState) => {
                            return { ...prevState, lastname: value };
                          });
                        }}
                        className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full"
                      />
                    </p>
                  </li>

                  <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        className="text-limeade"
                        icon={faCalendarWeek}
                      />
                      <span>Geboortedatum *</span>
                    </p>
                    <p>{partner.dob}</p>
                  </li>
                </ul>
              </div>

              <div className="border rounded-md py-4 px-4 lg:px-8 shadow-sm">
                <h2 className="text-xl lg:text-2xl text-limeade font-medium mb-4">
                  Wat zijn de contactgegevens van uw partner?
                </h2>

                <ul className="space-y-2">
                  <li className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
                    <p className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        className="text-limeade"
                        icon={faEnvelope}
                      />
                      <span>E-mailadres</span>
                    </p>
                    <p>
                      <input
                        type="email"
                        name="email"
                        value={partner.email}
                        onChange={(evt) => {
                          const value = evt.target.value;
                          setPartner((prevState) => {
                            return { ...prevState, email: value };
                          });
                        }}
                        className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full"
                      />
                    </p>
                  </li>

                  <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        className="text-limeade"
                        icon={faPaperPlane}
                      />
                      <span>Mail ook naar</span>
                    </p>
                    <p>
                      <input
                        type="text"
                        name="cc_email"
                        value={partner.cc_email}
                        onChange={(evt) => {
                          const value = evt.target.value;
                          setPartner((prevState) => {
                            return { ...prevState, cc_email: value };
                          });
                        }}
                        className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full"
                      />
                    </p>
                  </li>

                  <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        className="text-limeade"
                        icon={faPhoneAlt}
                      />
                      <span>Telefoonnummer</span>
                    </p>
                    <p>
                      <input
                        type="text"
                        name="mobile"
                        value={partner.phone.mobile}
                        onChange={(evt) => {
                          const value = evt.target.value;
                          setPartner((prevState) => {
                            return { ...prevState, phone: { mobile: value } };
                          });
                        }}
                        className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full"
                      />
                    </p>
                  </li>

                  <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        className="text-limeade"
                        icon={faPhoneOffice}
                      />
                      <span>Telefoonnummer 2</span>
                    </p>
                    <p>
                      <input
                        type="text"
                        name="landline"
                        value={partner.phone.landline}
                        onChange={(evt) => {
                          const value = evt.target.value;
                          setPartner((prevState) => {
                            return { ...prevState, phone: { landline: value } };
                          });
                        }}
                        className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full"
                      />
                    </p>
                  </li>

                  <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        className="text-limeade"
                        icon={faMailbox}
                      />
                      <span>Postcode</span>
                    </p>
                    <p>
                      <input
                        type="text"
                        name="zipcode"
                        value={partner.zipcode}
                        onChange={(evt) => {
                          const value = evt.target.value;
                          setPartner((prevState) => {
                            return { ...prevState, zipcode: value };
                          });
                        }}
                        className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full"
                      />
                    </p>
                  </li>

                  <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="flex items-center space-x-3">
                      <FontAwesomeIcon className="text-limeade" icon={faHome} />
                      <span>Huisnummer</span>
                    </p>
                    <p>
                      <input
                        type="text"
                        name="housenumber"
                        value={partner.housenumber}
                        onChange={(evt) => {
                          const value = evt.target.value;
                          setPartner((prevState) => {
                            return { ...prevState, housenumber: value };
                          });
                        }}
                        className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full"
                      />
                    </p>
                  </li>

                  <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        className="text-limeade"
                        icon={faMapSigns}
                      />
                      <span>Straat</span>
                    </p>
                    <p>
                      <input
                        type="text"
                        name="street"
                        value={partner.street}
                        onChange={(evt) => {
                          const value = evt.target.value;
                          setPartner((prevState) => {
                            return { ...prevState, partner: value };
                          });
                        }}
                        className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full"
                      />
                    </p>
                  </li>

                  <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="flex items-center space-x-3">
                      <FontAwesomeIcon className="text-limeade" icon={faCity} />
                      <span>Woonplaats</span>
                    </p>
                    <p>
                      <input
                        type="text"
                        name="city"
                        value={partner.city}
                        onChange={(evt) => {
                          const value = evt.target.value;
                          setPartner((prevState) => {
                            return { ...prevState, city: value };
                          });
                        }}
                        className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full"
                      />
                    </p>
                  </li>
                </ul>
              </div>

              <div className="border rounded-md py-4 px-4 lg:px-8 shadow-sm">
                <h2 className="text-xl lg:text-2xl text-limeade font-medium mb-4">
                  Wat is uw inkomen?
                </h2>

                <ul className="space-y-2">
                  <li className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
                    <p className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        className="text-limeade"
                        icon={faSackDollar}
                      />
                      <span>Mijn inkomen per jaar</span>
                    </p>
                    <p className="relative">
                      <input
                        type="number"
                        min="0"
                        value={partner.income}
                        onChange={(evt) => {
                          const value = parseInt(evt.target.value);
                          setPartner((prevState) => {
                            return { ...prevState, income: value };
                          });
                        }}
                        className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full"
                      />
                      <span className="absolute top-1 left-1.5 text-lg">
                        &euro;
                      </span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              className={`border ${
                editHoverButton
                  ? "bg-limeade text-white"
                  : "border-limeade text-limeade"
              } py-2 px-4 w-full md:w-1/3 xl:w-1/4 rounded-md`}
              onMouseOver={() => setEditHoverButton(true)}
              onMouseLeave={() => setEditHoverButton(false)}
              onClick={() => {
                partnerExistingRegistration
                  ? fetchExistingPartner()
                  : updatePartner();
              }}>
              {editHoverButton ? "Opslaan" : "Bewerk"}
            </button>
          </div>
        </section>
      )}
    </ProfileLayout>
  );
};

export default PartnerPage;
