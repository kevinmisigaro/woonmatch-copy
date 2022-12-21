import axios from "axios";
import React, {useEffect, useState} from "react";
import { RegisterLoadingSpinner } from "../Registration/LoadingSpinner";
import WoningnetSecondPopUp from "./WoningnetSecondPopUp";

export default function WoningnetFirstPopUp({
  className = "",
  show = false,
  onClose = null,
}) {
  const [showConnect, setShowConnect] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const handleSubmit = async () => {
    setLoading(true);
    setShowError(false);

    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) ||
      email.length == 0
    ) {
      setShowError(true);
      return setLoading(false);
    }

    const tokenOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const tokenResponse = await fetch(`/api/auth/getcookietoken`, tokenOptions);
    const json_tokenResponse = await tokenResponse.json();

    let token = json_tokenResponse.data;

    const config = {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        `${
          process.env.NEXT_PUBLIC_API_URL ||
          "https://acceptatie.woonmatchwaterland.nl/api_neo/v3/index.cfm?endpoint="
        }/mra/connect`,
        {
          wnUsername: email,
        },
        config
      )
      .then(() => {
        setShowConnect(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    e.persist();
    setEmail(e.target.value);
  };

  const loaddata = async () => {
    const tokenOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const tokenResponse = await fetch(`/api/auth/getcookietoken`, tokenOptions);
    const json_tokenResponse = await tokenResponse.json();

    let token = json_tokenResponse.data;

    const config = {
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${token}`,
      },
    };

    axios
        .get(
            `${
                process.env.NEXT_PUBLIC_API_URL ||
                "https://acceptatie.woonmatchwaterland.nl/api_neo/v3/index.cfm?endpoint="
            }/mra/connect`,
            config
        )
        .then((res) => {
          console.log(res.data.status);
          if(res.data.status === "confirmed" || res.data.status === "pending") {
            setShowConnect(true);
          }
        })
        .catch((err) => console.log(err));
  };

  useEffect(() => {
    loaddata();
  }, []);

  return (
    <>
      {show && (
        <div
          className={`${
            showConnect ? "hidden" : "block"
          } fixed z-50 inset-0 py-10 flex flex-col items-center justify-center bg-black/80`}>
          <div
            className={`${className} w-8/12 relative min-h-min overflow-x-hidden overflow-y-visible bg-white  text-black rounded-sm shadow-lg`}>
            <button
              onClick={() => {
                onClose();
              }}
              className="absolute top-6 right-0 h-10 grid place-content-center aspect-square ">
              <img src="/images/close-x.svg" className="w-3" />
            </button>

            <div className={`w-full h-full bg-primary`}>
              <div className="flex flex-row">
                <div
                  className={`hidden md:block md:basis-1/6 bg-register`}></div>
                <div className="md:basis-5/6">
                  <div className={`h-2 text-white font-normal py-12`}></div>
                  <div className="py-8 px-20">
                    <div className="text-3xl pb-10 pt-5 font-medium text-white">
                      Koppel mijn WoningNet account
                    </div>

                    <div>
                      <p className="text-white">
                        Vul hier uw WoningNet gebruikersnaam in
                      </p>

                      <input
                        value={email}
                        type="email"
                        onChange={handleEmailChange}
                        className="border-b border-white bg-transparent text-white placeholder-gray-500 focus:border-b-white focus:outline-none text-sm focus:bg-transparent w-1/2 py-1 mt-7"
                      />
                      {showError && (
                        <p className="text-white text-xs">
                          Voer uw juiste gebruikersnaam in
                        </p>
                      )}

                      {loading ? (
                        <div
                          onClick={handleSubmit}
                          className="rounded mb-20 cursor-pointer text-primary bg-white py-3 px-10 flex flex-row justify-center w-1/2 mt-10">
                          <RegisterLoadingSpinner />
                        </div>
                      ) : (
                        <div
                          onClick={handleSubmit}
                          className="rounded mb-20 cursor-pointer text-primary bg-white py-3 px-10 text-center w-1/2 mt-10">
                          Haal mijn account op
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConnect && (
        <WoningnetSecondPopUp
          show={showConnect}
          closePastModal={onClose}
          onClose={() => setShowConnect(false)}
        />
      )}
    </>
  );
}
