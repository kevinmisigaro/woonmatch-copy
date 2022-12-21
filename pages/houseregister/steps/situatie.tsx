import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { FaInfoCircle } from "react-icons/fa";
import { RegisterLoadingSpinner } from "../../../components/Registration/LoadingSpinner";
import { RegisterPopUp } from "../../../components/Registration/RegisterPopUp";
import { RegisterStepButton } from "../../../components/Registration/RegisterStepButton";
import { houseRegisterStep } from "../../../store/atoms/HouseRegisterAtom";
import HelpSection from "../HelpSection";
import HouseRegisterBackButton from "../HouseRegisterBackButton";
import HouseRegister from "../index";

export default function Situatie() {
  const [_, setStep] = useAtom(houseRegisterStep);
  const router = useRouter();
  const changePage = () => {
    setStep((i) => i + 1);
    router.push("sixth");
  };
  const [landlords, setLandLords] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [show, handleShow] = useState<boolean>(false);

  const loadData = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/api/auth/registersteps/situation", options);
    const data = await response.json();
    setLandLords(data.data.situation.doorstromer.landlords);
  };

  useEffect(() => {
    loadData();
  }, []);

  const [values, setValues] = useState({
    rental: false,
    renter: false,
    buy: false,
    social: false,
    corp: null,
    buyNoChecked: false,
    buyYesChecked: false,
    renterYesChecked: false,
    renterNoChecked: false,
    rentalYesChecked: false,
    rentalNoChecked: false,
    socialYesChecked: false,
    socialNoChecked: false,
  });

  const handleCorpChange = (e) => {
    setValues({
      ...values,
      corp: e[0].value,
    });

    setSelectedValues(e);
  };

  const handleRentalChange = (vl: boolean) => {
    setValues({
      ...values,
      rental: vl,
      rentalNoChecked: !vl,
      rentalYesChecked: vl,
    });
  };

  const handleRenterChange = (vl: boolean) => {
    setValues({
      ...values,
      renter: vl,
      renterNoChecked: !vl,
      renterYesChecked: vl,
    });
  };

  const handleBuyChange = (vl: boolean) => {
    setValues({
      ...values,
      buy: vl,
      buyYesChecked: vl,
      buyNoChecked: !vl,
      renterYesChecked: false,
      renterNoChecked: false,
      rentalYesChecked: false,
      rentalNoChecked: false,
      socialYesChecked: false,
      socialNoChecked: false,
      rental: false,
      renter: false,
      social: false,
      corp: null,
    });

    setSelectedValues([]);
  };

  const handleSocialChange = (vl: boolean) => {
    setValues({
      ...values,
      social: vl,
      socialNoChecked: !vl,
      socialYesChecked: vl,
    });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rental: values.rental,
        renter: values.renter,
        buy: values.buy,
        social: values.social,
        corp: values.corp,
      }),
    };

    const response = await fetch("/api/auth/registersteps/situation", options);
    const jsonResponse = await response.json();

    console.log(jsonResponse);

    if (jsonResponse.success) {
      setLoading(false);
      changePage();
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <HouseRegister>
        <div className="flex flex-row justify-between w-4/5">
          <h3 className="text-3xl font-medium">Wat is uw situatie?</h3>
          <HelpSection />
        </div>

        <div>
          <p className="font-light text-base text-gray-400 pb-10 mt-3">
            In bepaalde situaties kan het zijn dat u op basis van aanvullende
            kenmerken over uw woon- en/of werksituatie extra voorrang kunt
            krijgen. Vul daarom onderstaande vragen in.
          </p>
        </div>

        <div className="flex flex-row gap-x-20 mt-16 pb-5">
          <p className="text-primary font-light text-base basis-1/4">
            Vragen over uw woonsituatie
          </p>

          <div className="basis-3/4 flex flex-col gap-y-8">
            {/* start of buy */}
            <div>
              <p className="text-sm font-normal">Woont u in een koopwoning?</p>
              <div className="mt-4 ml-1 flex flex-row gap-5">
                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    checked={values.buyYesChecked}
                    onChange={() => handleBuyChange(true)}
                    className="h-4 w-4 focus:ring-2 focus:ring-primary accent-primary"
                  />
                  <label className="text-sm font-medium text-gray-900 ml-2 block">
                    Ja
                  </label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    checked={values.buyNoChecked}
                    onChange={() => handleBuyChange(false)}
                    className="h-4 w-4 focus:ring-2 focus:ring-primary accent-primary"
                  />
                  <label className="text-sm font-medium text-gray-900 ml-2 block">
                    Nee
                  </label>
                </div>
              </div>
            </div>
            {/* end of buy */}

            {/* start of rental */}
            {values.buyNoChecked && !values.buy && (
              <div>
                <div className="flex flex-row gap-x-2">
                  <p className="text-sm font-normal">
                    Woont u in een huurwoning in Waterland?
                  </p>
                  <FaInfoCircle
                    className="cursor-pointer"
                    onClick={() => handleShow(true)}
                  />
                </div>
                <div className="mt-4 ml-1 flex flex-row gap-x-5">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={values.rentalYesChecked}
                      onChange={() => handleRentalChange(true)}
                      className="h-4 w-4 focus:ring-2 focus:ring-primary accent-primary"
                    />
                    <label className="text-sm font-medium text-gray-900 ml-2 block">
                      Ja
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={values.rentalNoChecked}
                      onChange={() => handleRentalChange(false)}
                      className="h-4 w-4 focus:ring-2 focus:ring-primary accent-primary"
                    />
                    <label className="text-sm font-medium text-gray-900 ml-2 block">
                      Nee
                    </label>
                  </div>
                </div>
              </div>
            )}
            {/* end of rental */}

            {/* start of social */}
            {values.buyNoChecked &&
              !values.buy &&
              values.rental &&
              values.rentalYesChecked && (
                <div>
                  <p className="text-sm font-normal">
                    Is uw woning een sociale huurwoning?
                  </p>
                  <div className="mt-4 ml-1 flex flex-row gap-x-5">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        checked={values.socialYesChecked}
                        onChange={() => handleSocialChange(true)}
                        className="h-4 w-4 focus:ring-2 focus:ring-primary accent-primary"
                      />
                      <label className="text-sm font-medium text-gray-900 ml-2 block">
                        Ja
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="radio"
                        checked={values.socialNoChecked}
                        onChange={() => handleSocialChange(false)}
                        className="h-4 w-4 focus:ring-2 focus:ring-primary accent-primary"
                      />
                      <label className="text-sm font-medium text-gray-900 ml-2 block">
                        Nee
                      </label>
                    </div>
                  </div>
                </div>
              )}
            {/* end of social */}

            {/* start of corp */}
            {values.buyNoChecked &&
              !values.buy &&
              values.rental &&
              values.social && (
                <div>
                  <p className="text-sm font-normal">Bij wie huurt u?</p>
                  <div className="mt-4 ml-1">
                    <Select
                      options={landlords.map((x) => ({
                        value: x.value,
                        label: x.text,
                      }))}
                      color="green"
                      style={{
                        width: "83%",
                      }}
                      values={selectedValues}
                      onChange={handleCorpChange}
                    />
                  </div>
                </div>
              )}
            {/* end of corp */}

            {/* start of renter */}
            {values.buy ||
              (values.social && (
                <div>
                  <p className="text-sm font-normal">
                    Laat u uw huidige woning leeg achter als u een andere woning
                    gaat huren
                  </p>
                  <div className="mt-4 ml-1 flex flex-col gap-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        checked={values.renterYesChecked}
                        onChange={() => handleRenterChange(true)}
                        className="h-4 w-4 focus:ring-2 focus:ring-primary accent-primary"
                      />
                      <label className="text-sm font-medium text-gray-900 ml-2 block">
                      Ja. Als ik verhuis zeg ik de huur op van, of verkoop ik mijn huidige woning.
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="radio"
                        checked={values.renterNoChecked}
                        onChange={() => handleRenterChange(false)}
                        className="h-4 w-4 focus:ring-2 focus:ring-primary accent-primary"
                      />
                      <label className="text-sm font-medium text-gray-900 ml-2 block">
                        Nee. Een van de huidige bewoners blijft in dit huis
                        wonen.
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            {/* end of renter */}
          </div>
        </div>

        <div className="flex flex-row justify-between mt-0 pb-8">
          <HouseRegisterBackButton />

          <div className="flex flex-row justify-end items-end mr-16">
            {loading ? (
              <div className="btn bg-tertiary items-center text-white font-light text-sm px-16 max-w-md flex flex-row justify-between gap-x-2 py-1.5 rounded">
                <RegisterLoadingSpinner />
              </div>
            ) : (
              <RegisterStepButton text="Uw woonwensen" action={handleSubmit} />
            )}
          </div>
        </div>
      </HouseRegister>

      <RegisterPopUp
        title="Gemeenten van Waterland"
        show={show}
        onClose={() => handleShow(false)}>
        <div className="p-10">
          <p className="font-bold mb-3 text-lg">
            Welke gemeenten behoren tot Waterland?
          </p>
          <p className="text-base">
            Dit zijn de gemeenten Broek in Waterland, Ilpendam, Katwoude,
            Marken, Monnickendam, Overleek, Purmer, Uitdam, Watergang en
            Zuiderwoude.
          </p>
        </div>
      </RegisterPopUp>
    </>
  );
}
