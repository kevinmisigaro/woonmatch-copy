import { useState, useEffect } from "react";
import { xhrRequest } from "../../network/network";
import { User } from "../../interfaces/index";
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

const PersonalPage: React.FC<any> = () => {
  const [personal, setPersonal] = useState<User | null>(null);
  const [editHoverButton, setEditHoverButton] = useState<boolean>(false);

  const fetchPersonalData = async () => {
    const response = await xhrRequest<User>("GET", {
      endPoint: "/user/steps/naw",
    });
    if (response) {
      setPersonal(response.data);
    }
  };

  const updatePersonal = async () => {
    const response = await xhrRequest<User>("POST", {
      endPoint: "/user/steps/naw",
      data: personal,
    });
    if (response) {
      //console.log(response.data)
    }
  };

  useEffect(() => {
    if (personal === null) {
      fetchPersonalData();
    }
  }, [personal]);

  return (
    <ProfileLayout title="Uw persoonlijke gegevens">
      {personal && (
        <section className="space-y-8 text-gray-500">
          <h2 className="font-semibold text-xl md:text-2xl 2xl:text-4xl text-limeade">
            Wie bent u?
          </h2>

          <div className="border rounded-md py-4 px-4 lg:px-8 shadow-sm">
            <h2 className="text-xl lg:text-2xl text-limeade font-medium mb-4">
              Wat zijn uw gegevens?
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
                      setPersonal((prevState) => {
                        return { ...prevState, letterhead: value };
                      });
                    }}
                    className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full">
                    <option
                      value="M"
                      selected={personal.letterhead == "M" ? true : false}>
                      M
                    </option>
                    <option
                      value="F"
                      selected={personal.letterhead == "F" ? true : false}>
                      F
                    </option>
                    <option
                      value="B"
                      selected={personal.letterhead == "B" ? true : false}>
                      B
                    </option>
                  </select>
                </p>
              </li>
              <li className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
                <p className="flex items-center space-x-3">
                  <FontAwesomeIcon className="text-limeade" icon={faUser} />
                  <span>Voorletters *</span>
                </p>
                <p>
                  <input
                    type="text"
                    name="initials"
                    value={personal.initials}
                    onChange={(evt) => {
                      const value = evt.target.value;
                      setPersonal((prevState) => {
                        return { ...prevState, initials: value };
                      });
                    }}
                    className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full"
                  />
                </p>
              </li>
              <li className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
                <p className="flex items-center space-x-3">
                  <FontAwesomeIcon className="text-limeade" icon={faUser} />
                  <span>Achternaam *</span>
                </p>
                <p>
                  <input
                    type="text"
                    name="lastname"
                    value={personal.lastname}
                    onChange={(evt) => {
                      const value = evt.target.value;
                      setPersonal((prevState) => {
                        return { ...prevState, lastname: value };
                      });
                    }}
                    className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full"
                  />
                </p>
              </li>
              <li className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
                <p className="flex items-center space-x-3">
                  <FontAwesomeIcon
                    className="text-limeade"
                    icon={faCalendarWeek}
                  />
                  <span>Geboortedatum *</span>
                </p>
                <p>{personal.dob}</p>
              </li>
            </ul>
          </div>

          <div className="border rounded-md py-4 px-4 lg:px-8 shadow-sm">
            <h2 className="text-xl lg:text-2xl text-limeade font-medium mb-4">
              Hoe kunnen we u bereiken?
            </h2>

            <ul className="space-y-2">
              <li className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
                <p className="flex items-center space-x-3">
                  <FontAwesomeIcon className="text-limeade" icon={faEnvelope} />
                  <span>E-mailadres</span>
                </p>
                <p>
                  <input
                    type="email"
                    name="e-mail"
                    value={personal.email}
                    onChange={(evt) => {
                      const value = evt.target.value;
                      setPersonal((prevState) => {
                        return { ...prevState, email: value };
                      });
                    }}
                    className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full"
                  />
                </p>
              </li>
              <li className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
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
                    name="cc_mail"
                    value={personal.cc_email}
                    onChange={(evt) => {
                      const value = evt.target.value;
                      setPersonal((prevState) => {
                        return { ...prevState, cc_email: value };
                      });
                    }}
                    className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full"
                  />
                </p>
              </li>
              <li className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
                <p className="flex items-center space-x-3">
                  <FontAwesomeIcon className="text-limeade" icon={faPhoneAlt} />
                  <span>Telefoonnummer</span>
                </p>
                <p>
                  <input
                    type="text"
                    name="mobile"
                    value={personal.phone.mobile}
                    onChange={(evt) => {
                      const value = evt.target.value;
                      setPersonal((prevState) => {
                        return { ...prevState, phone: { mobile: value } };
                      });
                    }}
                    className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full"
                  />
                </p>
              </li>
              <li className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
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
                    name="lamdline"
                    value={personal.phone.landline}
                    onChange={(evt) => {
                      const value = evt.target.value;
                      setPersonal((prevState) => {
                        return { ...prevState, phone: { landline: value } };
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
              Waar woont u nu?
            </h2>

            <ul className="space-y-2">
              <li className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
                <p className="flex items-center space-x-3">
                  <FontAwesomeIcon className="text-limeade" icon={faMailbox} />
                  <span>Postcode</span>
                </p>
                <p>
                  <input
                    type="text"
                    name="zipcode"
                    value={personal.zipcode}
                    onChange={(evt) => {
                      const value = evt.target.value;
                      setPersonal((prevState) => {
                        return { ...prevState, zipcode: value };
                      });
                    }}
                    className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full"
                  />
                </p>
              </li>
              <li className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
                <p className="flex items-center space-x-3">
                  <FontAwesomeIcon className="text-limeade" icon={faHome} />
                  <span>Huisnummer</span>
                </p>
                <p>
                  <input
                    type="text"
                    name="housenumber"
                    value={personal.housenumber}
                    onChange={(evt) => {
                      const value = evt.target.value;
                      setPersonal((prevState) => {
                        return { ...prevState, housenumber: value };
                      });
                    }}
                    className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full"
                  />
                </p>
              </li>
              <li className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
                <p className="flex items-center space-x-3">
                  <FontAwesomeIcon className="text-limeade" icon={faMapSigns} />
                  <span>Straat</span>
                </p>
                <p>
                  <input
                    type="text"
                    name="street"
                    value={personal.street}
                    onChange={(evt) => {
                      const value = evt.target.value;
                      setPersonal((prevState) => {
                        return { ...prevState, street: value };
                      });
                    }}
                    className="appearance-none border border-white focus:border-gray-200 focus:outline-none rounded-md px-6 py-1.5 w-full"
                  />
                </p>
              </li>
              <li className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
                <p className="flex items-center space-x-3">
                  <FontAwesomeIcon className="text-limeade" icon={faCity} />
                  <span>Woonplaats</span>
                </p>
                <p>
                  <input
                    type="text"
                    name="city"
                    value={personal.city}
                    onChange={(evt) => {
                      const value = evt.target.value;
                      setPersonal((prevState) => {
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
                    value={personal.income}
                    onChange={(evt) => {
                      const value = parseInt(evt.target.value);
                      setPersonal((prevState) => {
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

          <div className="flex justify-end">
            <button
              className={`border ${
                editHoverButton
                  ? "bg-limeade text-white"
                  : "border-limeade text-limeade"
              } py-2 px-4 w-full md:w-1/3 xl:w-1/4 rounded-md`}
              onMouseOver={() => setEditHoverButton(true)}
              onMouseLeave={() => setEditHoverButton(false)}
              onClick={() => updatePersonal()}>
              {editHoverButton ? "Opslaan" : "Bewerk"}
            </button>
          </div>
        </section>
      )}
    </ProfileLayout>
  );
};
export default PersonalPage;
