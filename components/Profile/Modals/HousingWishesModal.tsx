import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { RegisterLoadingSpinner } from "../../Registration/LoadingSpinner";
import RegisterInputSlider from "../../Registration/RegisterInputSlider";
import SlidingSwitchButton from "../../ui/SlidingSwitchButton";
import { ProfilePopUp } from "../ProfilePopUp";

export default function HousingWishesModal({ show, handleClose }) {
  const [values, setValues] = useState({
    tiptime: false,
    location: "",
    radius: 1,
    maxRent: 0,
    minRent: 0,
    rooms: 0,
  });

  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [neighbourhoods, setNeighbourhoods] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleModelChange = (id: string) => {
    let newState = [...models];
    let foundIndex = models.findIndex((m) => m.value == id);
    newState[foundIndex].chosen = !newState[foundIndex].chosen;
    setModels(newState);
  };

  const handleCityChange = (citydata: any) => {
    console.log(citydata);

    setSelectedCities(citydata);
    setNeighbourhoods([]);

    let content = [...neighbourhoods];

    citydata.forEach((city) => {
      if (city.children.length > 0) {
        content.concat(city.children);
        console.log(content);
      }
    });

    setNeighbourhoods(content);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const data = {
      models: models.filter((m) => m.chosen == true).map((x) => x.value),
      tipme: values.tiptime,
      radius: values.radius,
      rooms: values.rooms,
      rent: {
        min: values.minRent,
        max: values.maxRent,
      },
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      "/api/auth/registersteps/preferences",
      options
    );
    const jsonResponse = await response.json();

    if (jsonResponse.success) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handleRadiusChange = (r) => {
    setValues({
      ...values,
      radius: r == 6 ? 10 : r,
    });
  };

  const handleRoomChange = (r) => {
    setValues({
      ...values,
      rooms: r,
    });
  };

  const handleMaxRentChange = (e) => {
    e.persist();
    setValues({
      ...values,
      maxRent: e.target.value,
    });
  };

  const handleMinRentChange = (e) => {
    e.persist();
    setValues({
      ...values,
      minRent: e.target.value,
    });
  };

  const handleTipTimeChange = (e) => {
    e.persist();
    setValues({
      ...values,
      tiptime: !values.tiptime,
    });
  };

  const loadData = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      "/api/auth/registersteps/preferences",
      options
    );
    const json_response = await response.json();
    setModels(json_response.data.models);
    setCities(json_response.data.cities);
    console.log(json_response.data);

    setValues({
      ...values,
      minRent: json_response.data.rent.min,
      maxRent: json_response.data.rent.max,
      rooms: json_response.data.rooms,
      radius: json_response.data.radius,     
    })
    
  };

  useEffect(() => {
    loadData();
  }, []);

  const inputClasses: string =
    "border-b border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-5/6 py-1";

  return (
    <ProfilePopUp
      title="Wat zoekt u naar?"
      show={show}
      onClose={handleClose}
      bgClass="bg-profile-three">
      <div className="text-gray-400 text-base font-extralight w-5/6 mb-12">
        In Woonmatch proberen wij het vinden van een passende woning zo
        gemakkelijk mogelijk te maken. U kunt daar zalf bij helpen door uw
        woonwensen hier zo duidelijk mogelijk aan te geven. De woningen die
        passen bij uw woonwensen staan dan altijd bovenaan.
      </div>

      <div className="flex flex-row gap-x-20 mt-20 pb-5">
        <p className="text-primary font-light text-base basis-1/4">
          Mijn woonwensen
        </p>
        <div>
          <div className="grid grid-cols-2 gap-x-7 gap-y-8 w-full">
            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                <img src="/icons/004-building.svg" className="w-3" />
                <span>Plaats</span>
              </label>

              <Select
                placeholder="Type om te zoken"
                options={cities.map((c: any) => ({
                  value: c.value,
                  label: c.text,
                  children: c.children,
                }))}
                values={[]}
                multi
                color="#8EB429"
                style={{ width: "85%" }}
                onChange={(value) => handleCityChange(value)}
              />
            </div>

            {neighbourhoods.length > 0 && (
              <div>
                <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                  <img src="/icons/004-building.svg" className="w-3" />
                  <span>Neighbourhoods</span>
                </label>

                <Select
                  placeholder="Type om te zoken"
                  options={neighbourhoods.map((n: any) => ({
                    value: n.value,
                    label: n.text,
                  }))}
                  values={[]}
                  multi
                  color="#8EB429"
                  style={{ width: "85%" }}
                  onChange={(value) => console.log(value)}
                />
              </div>
            )}

            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                <img src="/icons/mailbox.svg" className="w-3" />
                <span>In een straal van</span>
              </label>

              <RegisterInputSlider
                measurement={"KM"}
                rangevals={[0, 1, 2, 3, 4, 5, 10]}
                onchange={handleRadiusChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-7 gap-y-8 w-full mt-10">
            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                <img src="/icons/mailbox.svg" className="w-3" />
                <span>Van</span>
              </label>
              <input className={inputClasses} value={values.minRent} onChange={handleMinRentChange} />
            </div>

            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                <img src="/icons/mailbox.svg" className="w-3" />
                <span>t/m</span>
              </label>
              <input className={inputClasses} value={values.maxRent} onChange={handleMaxRentChange} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-7 gap-y-8 w-full mt-10">
            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                <img src="/icons/003-home (1).svg" className="w-3.5" />
                <span>Type van de woning</span>
              </label>
              <div className="grid grid-cols-2 gap-x-8 mt-2">
                {models?.length > 0 &&
                  models.map((m: any) => (
                    <div className="flex items-center mb-4" key={m.value}>
                      <input
                        type="checkbox"
                        onChange={() => handleModelChange(m.value)}
                        value={m.chosen}
                        className="w-3 h-3 text-primary accent-primary bg-gray-100 rounded border-gray-300 focus:ring-primary dark:focus:ring-primary"
                      />
                      <label className="ml-2 text-xs font-light text-gray-400">
                        {m.text}
                      </label>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                <img src="/icons/mailbox.svg" className="w-3" />
                <span>Minimaal aantal kamers</span>
              </label>
              <RegisterInputSlider
                measurement={"Meer"}
                rangevals={[1, 2, 3, 4]}
                onchange={handleRoomChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-x-20 mt-20 pb-5">
        <p className="text-primary font-light text-base basis-1/4">
          Tips services
        </p>
        <div className="flex flex-row gap-5 basis-3/4">
          <SlidingSwitchButton
            onChange={handleTipTimeChange}
            isOn={values.tiptime}
          />
          <p>{values.tiptime ? "Ja graag" : "Nee hoor"}</p>
        </div>
      </div>

      <div className="flex flex-row justify-end items-end mr-28 mb-20">
        {loading ? (
          <div className="btn bg-tertiary items-center text-white font-light text-sm px-16 max-w-md flex flex-row justify-between gap-x-2 py-1.5 rounded">
            <RegisterLoadingSpinner />
          </div>
        ) : (
          <div className="bg-tertiary text-white px-4 py-2 mt-3 rounded text-sm">
            Opslaan
          </div>
        )}
      </div>
    </ProfilePopUp>
  );
}
