import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HouseRegister from "../index";
import HelpSection from "../HelpSection";
import SlidingSwitchButton from "../../../components/ui/SlidingSwitchButton";
import HouseRegisterBackButton from "../HouseRegisterBackButton";
import { useAtom } from "jotai";
import { houseRegisterStep } from "../../../store/atoms/HouseRegisterAtom";
import { RegisterStepButton } from "../../../components/Registration/RegisterStepButton";
import RegisterInputSlider from "../../../components/Registration/RegisterInputSlider";
import { RegisterLoadingSpinner } from "../../../components/Registration/LoadingSpinner";
import Select from "react-dropdown-select";
import { concat, difference, filter, remove } from "lodash";

type CommunicationObj = {
  text: string;
  type: string;
  chosen: boolean;
  value: string;
};

export default function Sixth() {
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
  const [selectedNeighbourhoods, setSelectedNeighbourhoods] = useState([]);
  const [models, setModels] = useState([]);
  const [communicationOptions, setCommunicationOptions] =
    useState<CommunicationObj[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleModelChange = (id: string) => {
    let newState = [...models];
    let foundIndex = models.findIndex((m) => m.value == id);
    newState[foundIndex].chosen = !newState[foundIndex].chosen;
    setModels(newState);
  };

  const [_, setStep] = useAtom(houseRegisterStep);

  const router = useRouter();
  const changePage = () => {
    setStep((i) => i + 1);
    router.push("seventh");
  };

  const handleCityChange = (e) => {
    //check new array of cities if there is a city not in the list of selected cities
    const differenceresults = difference(selectedCities, e);
    console.log(differenceresults);

    let s = [...selectedNeighbourhoods];

    differenceresults.forEach((l) => {
      remove(s, (x) => x.cityid == l.value);
      setSelectedNeighbourhoods([...s]);
    });

    setSelectedCities(e);
  };

  const handleNeighbourhoodChange = (e) => {
    let f = [...selectedNeighbourhoods];

    //get first element
    let firstElement = e[0];

    let newArr = [];

    if (f.length > 0) {
      newArr = filter(f, (v) => v.cityid !== firstElement.cityid);
    }

    e.forEach((element) => {
      if (!newArr.includes(element)) {
        newArr.push(element);
        setSelectedNeighbourhoods([...newArr]);
      }
    });
  };

  const handleCommunicationOptionSelected = (c: string, e) => {
    let arr = [...communicationOptions];
    let findIndex = communicationOptions.findIndex((x) => x.value == c);
    arr[findIndex].chosen = !arr[findIndex].chosen;

    setCommunicationOptions([...arr]);
  };

  const handleSubmit = async () => {
    let mappedNeighbourhoods = selectedNeighbourhoods.map((x) => x.value);
    let mappedCities = selectedCities
      .filter((x) => x.value.length > 35)
      .map((x) => x.value);

    const newArr = concat(mappedCities, mappedNeighbourhoods);

    //communication options
    const comOptions = communicationOptions
      .filter((x) => x.chosen == true)
      .map((x) => x.value);

    setLoading(true);

    const data = {
      models: models.filter((m) => m.chosen == true).map((x) => x.value),
      cities: newArr,
      tipme: values.tiptime,
      radius: values.radius,
      rooms: values.rooms,
      rent: {
        min: values.minRent,
        max: values.maxRent,
      },
      communication: comOptions,
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
      changePage();
    } else {
      console.log(jsonResponse);
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

  const loadCities = async () => {
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
    setCommunicationOptions(json_response.data.communication);
  };

  useEffect(() => {
    loadCities();
  }, []);

  return (
    <HouseRegister>
      <div className="flex flex-row justify-between w-4/5">
        <h3 className="text-3xl font-medium">Waar zoekt u naar?</h3>
        <HelpSection />
      </div>

      <div>
        <p className="font-light text-base text-gray-400 pb-10 mt-3">
          In Woonmatch proberen wij het vinden van een passende woning zo
          gemakkelijk mogelijk te maken. U kunt daar zelf
          <br /> bij helpen door uw woonwensen hier zo duidelijk mogelijk aan te
          geven. De woningen die passen bij uw <br />
          woonwensen staan dan altijd bovenaan.
        </p>
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
                placeholder="Type om te zoeken"
                options={cities.map((c: any) => ({
                  value: c.value,
                  label: c.text,
                  id: c.value,
                  children: c.children,
                }))}
                values={selectedCities}
                multi
                color="#8EB429"
                style={{ width: "85%" }}
                onChange={handleCityChange}
              />
            </div>

            {selectedCities.filter((x) => x.children.length > 0).length > 0 && (
              <>
                {selectedCities
                  .filter((x) => x.children.length > 0)
                  .map((x, i) => (
                    <div key={i}>
                      <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                        <img src="/icons/004-building.svg" className="w-3" />
                        <span>{x.label} - Wijken</span>
                      </label>

                      <Select
                        placeholder="Type om te zoken"
                        options={x.children.map((c) => ({
                          value: c.value,
                          label: c.text,
                          cityid: x.value,
                        }))}
                        values={selectedNeighbourhoods.filter(
                          (n) => n.cityid == x.value
                        )}
                        multi
                        color="#8EB429"
                        style={{ width: "85%" }}
                        onChange={handleNeighbourhoodChange}
                      />
                    </div>
                  ))}
              </>
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
                <span>Huurprijs van</span>
              </label>
              <div className="relative">
                <small
                  className={`absolute top-1 ${
                    values.minRent > 0 ? "block" : "hidden"
                  }`}>
                  €
                </small>
                <input
                  type="number"
                  className={`border-b border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-5/6 py-1 ${
                    values.minRent > 0 ? "pl-3" : ""
                  }`}
                  onChange={handleMinRentChange}
                />
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                <img src="/icons/mailbox.svg" className="w-3" />
                <span>t/m</span>
              </label>

              <div className="relative">
                <small
                  className={`absolute top-1 ${
                    values.maxRent > 0 ? "block" : "hidden"
                  }`}>
                  €
                </small>
                <input
                  className="border-b border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-5/6 py-1 pl-3"
                  type="number"
                  onChange={handleMaxRentChange}
                />
              </div>
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
        <div className="flex flex-row justify-between gap-x-20 basis-3/4">
          <div className="flex flex-row gap-x-5">
            <SlidingSwitchButton
              onChange={handleTipTimeChange}
              isOn={values.tiptime}
            />
            <p>{values.tiptime ? "Ja graag" : "Nee hoor"}</p>
          </div>

          {values.tiptime && (
            <div className="mt-0  w-full flex flex-row gap-5 mb-10">
              {communicationOptions.map((c) => (
                <div key={c.value} className="flex items-center mb-4">
                  <input
                    type="radio"
                    checked={c.chosen}
                    onChange={(e) =>
                      handleCommunicationOptionSelected(c.value, e)
                    }
                    className="h-4 w-4 focus:ring-2 focus:ring-primary accent-primary"
                  />
                  <label className="text-sm font-medium text-gray-900 ml-2 block">
                    {c.text}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-row justify-between mt-0 pb-8">
        <HouseRegisterBackButton />

        <div className="flex flex-row justify-end items-end mr-28">
          {loading ? (
            <div className="btn bg-tertiary items-center text-white font-light text-sm px-16 max-w-md flex flex-row justify-between gap-x-2 py-1.5 rounded">
              <RegisterLoadingSpinner />
            </div>
          ) : (
            <RegisterStepButton text="Samenvatting" action={handleSubmit} />
          )}
        </div>
      </div>
    </HouseRegister>
  );
}
