import { useAtom } from "jotai";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import HouseRegister from "..";
import { RegisterLoadingSpinner } from "../../../components/Registration/LoadingSpinner";
import Rekunhelp from "../../../components/Registration/Modals/Rekunhelp";
import Tax from "../../../components/Registration/Modals/Tax";
import { RegisterStepButton } from "../../../components/Registration/RegisterStepButton";
import { houseRegisterStep } from "../../../store/atoms/HouseRegisterAtom";
import HelpSection from "../HelpSection";
import HouseRegisterBackButton from "../HouseRegisterBackButton";

export default function Fifth() {
  const [_, setStep] = useAtom(houseRegisterStep);
  const router = useRouter();

  const changePage = () => {
    setStep((i) => i + 1);

    if ("shorter" == localStorage.getItem("process")) {
      router.push("seventh");
    } else {
      router.push("situatie");
    }
  };

  const relations = ["Kind", "Ouder", "Ander persoon"];

  const handleSubmit = async () => {
    if (people.length == 0) {
      return changePage();
    }

    setLoading(true);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        people: people,
      }),
    };

    const response = await fetch("/api/auth/registersteps/fourth", options);
    const json_response = await response.json();
    console.log(json_response);

    if (json_response.success) {
      setLoading(false);
      changePage();
    } else {
      console.log(json_response.message);
      setLoading(false);
    }
  };

  const deletePerson = (i) => {
    console.log(i);
    let content = [...people];
    content.splice(i, 1);
    setPeople([...content]);
  };

  const [selectedValues, setSelectedValues] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [myData, setMyData] = useState({
    regNumber: "",
    lastname: "",
    initials: "",
    street: "",
    housenumber: "",
  });

  const [people, setPeople] = useState([]);
  const [peopleInfo, setPeopleInfo] = useState({
    income: "",
    relation: "",
    dob: "",
  });
  const [partnerDetails, setPartnerDetails] = useState({
    regNumber: "",
    lastName: "",
    initials: "",
    exists: false,
  });

  const newPersonAddition = () => {
    setPeopleInfo({
      ...peopleInfo,
      income: "",
      relation: "",
      dob: "",
    });

    setNewPersonAdded(true);
  };

  const addPersonToArray = () => {
    if (peopleInfo.relation !== "") {
      setPeople([
        ...people,
        {
          income: peopleInfo.income.length > 0 ? peopleInfo.income : "0",
          dob: moment(peopleInfo.dob).format("DD-MM-YYYY"),
          relation: peopleInfo.relation,
        },
      ]);
    }

    setPeopleInfo({
      ...peopleInfo,
      income: "",
      relation: "",
      dob: "",
    });

    setNewPersonAdded(true);
    setSelectedValues([]);
  };

  const handleIncomeChange = (e) => {
    e.persist();
    setPeopleInfo({
      ...peopleInfo,
      income: e.target.value,
    });
  };

  const handleIncomeWithCalculator = (c) => {
    setPeopleInfo({
      ...peopleInfo,
      income: c,
    });
  };

  const handleRelationChange = (e) => {
    setPeopleInfo({
      ...peopleInfo,
      relation: e.length > 0 ? e[0].value : "",
    });

    setSelectedValues(e);
  };

  const handleDOBChange = (e) => {
    e.persist();
    setPeopleInfo({
      ...peopleInfo,
      dob: e.target.value,
    });
  };

  const [apiPeople, setApiPeople] = useState([]);
  const [showLookingModal, setShowLookingModal] = useState<boolean>(false);
  const [showIncomeModal, setShowIncomeModal] = useState<boolean>(false);

  const loadData = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const pResponse = await fetch("/api/profile/partner", options);
    const pjson_response = await pResponse.json();

    console.log(pjson_response.data);

    if (pjson_response.success) {
      setPartnerDetails({
        ...partnerDetails,
        regNumber: pjson_response.data.registrationnumber,
        lastName: pjson_response.data.lastname,
        initials: pjson_response.data.initials,
        exists: pjson_response.data.exists,
      });
    }

    const response = await fetch("/api/auth/user", options);
    const json_response = await response.json();

    if (json_response.success) {
      setMyData({
        ...myData,
        regNumber: json_response.data.registrationnumber,
        lastname: json_response.data.lastname,
        initials: json_response.data.initials,
        housenumber: json_response.data.housenumber,
        street: json_response.data.street,
      });
    } else {
      console.log("user data load error");
    }

    const peopleResponse = await fetch(
      "/api/auth/registersteps/fourth",
      options
    );
    const jsonPeopleResponse = await peopleResponse.json();

    console.log(jsonPeopleResponse.data);

    if (jsonPeopleResponse.data.extraPeople.count > 0) {
      setApiPeople([...jsonPeopleResponse.data.extraPeople.info]);
      setAddPerson(true);
      setNewPersonAdded(true);

      console.log(jsonPeopleResponse.data.extraPeople);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const [addPerson, setAddPerson] = useState(false);
  const [newPersonAdded, setNewPersonAdded] = useState(false);

  const inputClasses: string =
    "border-b border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-5/6 py-1";

  return (
    <>
      <HouseRegister>
        <div className="flex flex-row justify-between w-4/5">
          <h3 className="text-3xl font-medium">Wie verhuizen er mee?</h3>
          <HelpSection />
        </div>

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
            </div>
          </div>
        </div>

        {partnerDetails.exists && (
          <div className="flex flex-row gap-x-20 mt-20 pb-5">
            <p className="text-primary font-light text-base basis-1/4">
              Partner
            </p>

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
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-row gap-x-20 mt-8 pb-5">
          <div className="text-primary font-light text-base basis-1/4">
            Verhuizen er nog <br /> andere personen mee?
          </div>

          <div className="basis-3/4">
            <p className="font-light text-base text-gray-400 pb-4 mt-3">
              Om te bepalen welke woningen passend zijn, is ook het aantal
              personen van het huishouden van belang. U kunt hier invullen welke
              personen nog meer mee verhuizen, zoals bijvoorbeeld inwonende
              kinderen, inwonende ouders, of andere huisgenoten.
            </p>

            {!addPerson && (
              <div
                onClick={() => {
                  setAddPerson(true);
                  setNewPersonAdded(true);
                }}
                className="border border-tertiary text-center rounded w-11/12 py-1 text-primary cursor-pointer hover:bg-tertiary hover:text-white">
                Voeg persoon toe
              </div>
            )}
          </div>
        </div>

        {addPerson && (
          <div className="flex flex-row gap-x-20 mt-8 pb-5">
            <div className="text-primary font-light text-base basis-1/4">
              Voeg een relatie toe
            </div>

            <div className="basis-3/4">
              {apiPeople.length > 0 &&
                apiPeople.map((p, i) => (
                  <div key={i} className="mb-10">
                    <div className="grid grid-cols-2 gap-x-7 gap-y-8 w-full mt-3">
                      <div className="mb-2">
                        <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                          <img
                            src="/icons/002-calendar.svg"
                            className="w-3.5"
                          />
                          <span>Geboortedatum</span>
                        </label>
                        <input
                          value={p.dob}
                          readOnly
                          className={inputClasses}
                        />
                      </div>

                      <div className="mb-2">
                        <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                          <img
                            src="/icons/002-calendar.svg"
                            className="w-3.5"
                          />
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

              {people.length > 0 &&
                people.map((p, index) => (
                  <div key={p.dob} className="mb-10">
                    <div className="grid grid-cols-2 gap-x-7 gap-y-8 w-full mt-3">
                      <div className="mb-0">
                        <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                          <img
                            src="/icons/002-calendar.svg"
                            className="w-3.5"
                          />
                          <span>Geboortedatum</span>
                        </label>
                        <input
                          value={p.dob}
                          readOnly
                          className={inputClasses}
                        />
                      </div>

                      <div className="mb-0">
                        <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                          <img
                            src="/icons/002-calendar.svg"
                            className="w-3.5"
                          />
                          <span>Relatie</span>
                        </label>
                        <input
                          value={p.relation}
                          readOnly
                          className={inputClasses}
                        />
                        {p.income == 0 && (
                          <div className="flex flex-row justify-end w-10/12 mt-2">
                            <small
                              className="text-xs text-red-400 font-light"
                              onClick={() => deletePerson(index)}>
                              Verwijderen
                            </small>
                          </div>
                        )}
                      </div>
                    </div>
                    {p.income > 0 && (
                      <div className="w-full mt-3">
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
                    {p.income > 0 && (
                      <div className="flex flex-row justify-end w-11/12 mt-2">
                        <small
                          className="text-xs text-red-400 font-light"
                          onClick={() => deletePerson(index)}>
                          Verwijderen
                        </small>
                      </div>
                    )}
                  </div>
                ))}

              <div
                className={`grid grid-cols-2 gap-x-7 gap-y-8 w-full ${
                  apiPeople.length > 0 || people.length > 0 ? "mt-14" : "mt-3"
                }`}>
                <div>
                  <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                    <img src="/icons/002-calendar.svg" className="w-3.5" />
                    <span>Geboortedatum</span>
                  </label>
                  <input
                    value={peopleInfo.dob}
                    onChange={handleDOBChange}
                    className={inputClasses}
                    type="date"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                    <img src="/icons/group.svg" className="w-3" />
                    <span>Relatie</span>
                  </label>
                  <Select
                    options={relations.map((x) => ({
                      value: x,
                      label: x,
                    }))}
                    placeholder="Kies.."
                    color="green"
                    style={{
                      width: "83%",
                    }}
                    values={selectedValues}
                    onChange={handleRelationChange}
                  />
                </div>
              </div>

              {(peopleInfo.relation == "Ouder" ||
                peopleInfo.relation == "Ander persoon") && (
                <div className="w-full mt-5">
                  <label className="flex items-center space-x-1 mb-1 font-medium text-sm">
                    <img src="/icons/group.svg" className="w-3.5" />
                    <span>Inkomen</span>
                  </label>
                  <div className="relative">
                    <small
                      className={`absolute top-1 ${
                        peopleInfo.income.length > 0 ? "block" : "hidden"
                      }`}>
                      €
                    </small>
                    <input
                      type="number"
                      onChange={handleIncomeChange}
                      value={peopleInfo.income}
                      className={` ${peopleInfo.income.length > 0 ? "pl-3" : ""}
            border-b pl-3 border-gray-500 text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none text-sm focus:bg-green-50 w-11/12 py-1
            `}
                    />
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
              )}

              {newPersonAdded ? (
                <div
                  onClick={addPersonToArray}
                  className="border mt-8 border-tertiary text-center rounded w-11/12 py-1 text-primary cursor-pointer hover:bg-tertiary hover:text-white">
                  Opslaan
                </div>
              ) : (
                <div
                  onClick={newPersonAddition}
                  className="border mt-5 border-tertiary text-center rounded w-11/12 py-1 text-primary cursor-pointer hover:bg-tertiary hover:text-white">
                  Voeg persoon toe
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-row justify-between mt-0 pb-8 w-full">
          <HouseRegisterBackButton />
          <div className="flex flex-row justify-end items-end mr-16">
            {loading ? (
              <div className="btn bg-tertiary items-center text-white font-light text-sm px-5 max-w-lg flex flex-row justify-between gap-x-2 py-1.5 rounded">
                <RegisterLoadingSpinner />
              </div>
            ) : (
              <RegisterStepButton text="Uw situatie" action={handleSubmit} />
            )}
          </div>
        </div>
      </HouseRegister>

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
