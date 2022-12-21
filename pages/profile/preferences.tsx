import { useState, useEffect } from "react";
import { xhrRequest } from "../../network/network";
import { Preferences } from "../../interfaces/index";
import ProfileLayout from "../../components/Layouts/ProfileLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCity,
  faBedAlt,
  faBells,
  faDrawCircle,
  faTags,
  faHouse,
} from "@fortawesome/pro-regular-svg-icons";

const WoonwensenPage: React.FC<any> = () => {
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [editHoverButton, setEditHoverButton] = useState<boolean>(false);

  const fetchPreferences = async () => {
    const response = await xhrRequest<Preferences>("GET", {
      endPoint: "/user/steps/preferences",
    });
    if (response) {
      setPreferences(response.data);
    }
  };

  const updatePreferences = async () => {
    const response = await xhrRequest<Preferences>("POST", {
      endPoint: "/user/steps/preferences",
      data: preferences,
    });
    if (response) {
      // console.log(response.data);
    }
  };

  useEffect(() => {
    if (preferences === null) {
      fetchPreferences();
    }
  }, [preferences]);

  return (
    <ProfileLayout title="Uw Woonwensen">
      {preferences && (
        <section className="space-y-8 text-gray-500">
          <div>
            <h2 className="font-semibold text-xl md:text-2xl 2xl:text-4xl text-limeade mb-8">
              Wat zoekt u naar?
            </h2>
            <p className="text-gray-500 text-justify">
              In Woonmatch proberen wij het vinden van een passende woning zo
              gemakkelijk mogelijk te maken. U kunt daar zelf bij helpen door uw
              woonwensen hier zo duidelijk mogelijk aan te geven. De woningen
              die passen bij uw woonwensen staan dan altijd bovenaan.
            </p>
          </div>

          <div className="border rounded-md py-4 px-4 lg:px-8 shadow-sm">
            <h2 className="text-xl lg:text-2xl text-limeade font-medium mb-4">
              Mijn woonwensen
            </h2>

            <ul className="space-y-2">
              <li className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
                <p className="flex items-center space-x-3">
                  <FontAwesomeIcon className="text-limeade" icon={faCity} />
                  <span>Plaats</span>
                </p>
                <p>
                  {preferences.cities.map((city) => (
                    <span className="pr-2 py-0.5">{city.text}</span>
                  ))}
                </p>
              </li>

              <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="flex items-center space-x-3">
                  <FontAwesomeIcon
                    className="text-limeade"
                    icon={faDrawCircle}
                  />
                  <span>In een straal van</span>
                </p>
                <p>{preferences.radius} km</p>
              </li>

              <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="flex items-center space-x-3">
                  <FontAwesomeIcon className="text-limeade" icon={faTags} />
                  <span>Gewenste huurprijs</span>
                </p>
                <p>
                  &euro;{" "}
                  {preferences.rent.min.toLocaleString("nl-NL", {
                    minimumFractionDigits: 2,
                  })}
                  to{" "}
                  {preferences.rent.max.toLocaleString("nl-NL", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </li>

              <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="flex items-center space-x-3">
                  <FontAwesomeIcon className="text-limeade" icon={faHouse} />
                  <span>Type van de woning</span>
                </p>
                <p>
                  {preferences.models.map((model) => (
                    <span className="pr-2 py-0.5">{model.text}</span>
                  ))}
                </p>
              </li>

              <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="flex items-center space-x-3">
                  <FontAwesomeIcon className="text-limeade" icon={faBedAlt} />
                  <span>Minimaal Aantal kamers</span>
                </p>
                <p>{preferences.rooms}</p>
              </li>
            </ul>
          </div>

          <div className="border rounded-md py-4 px-4 lg:px-8 shadow-sm">
            <h2 className="text-xl lg:text-2xl text-limeade font-medium mb-4">
              Tip services
            </h2>

            <ul className="space-y-2">
              <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="flex items-center space-x-3">
                  <FontAwesomeIcon className="text-limeade" icon={faBells} />
                  <span>Ik wil getipt worden</span>
                </p>
                <p>{preferences.tipme ? "Jaa" : "Nee"}</p>
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
              onClick={() => updatePreferences()}>
              {editHoverButton ? "Opslaan" : "Bewerk"}
            </button>
          </div>
        </section>
      )}
    </ProfileLayout>
  );
};

export default WoonwensenPage;
