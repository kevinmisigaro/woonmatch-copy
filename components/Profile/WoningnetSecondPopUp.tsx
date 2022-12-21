import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function WoningnetSecondPopUp({
  className = "",
  show = false,
  onClose = null,
  closePastModal,
}) {

  type wmConnectorData = {
    data?: {
      wnUsername: string;
      dateRequested: string;
      dateConfirmed: string;
      viaPartner: boolean
    },
    status: string
  }

  const router = useRouter();
  const [data, setData] = useState({ status: 'noConnection' } as wmConnectorData);

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
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loaddata();
  }, []);

  return (
    <>
      {show && (
        <div className="fixed z-50 inset-0 py-10 flex flex-col items-center justify-center bg-black/80">
          <div
            className={`${className} w-8/12 relative min-h-min overflow-x-hidden overflow-y-visible bg-white  text-black rounded-sm shadow-lg`}>
            <button
              onClick={() => {
                onClose();
                closePastModal();
              }}
              className="absolute top-6 right-0 h-10 grid place-content-center aspect-square ">
              <img src="/images/close-x.svg" className="w-3" />
            </button>

            <div className={`w-full bg-primary py-32`}>
              <div className="flex flex-col items-center gap-y-10">
                <p className="text-white text-4xl font-semibold">
                  De status van uw koppeling
                </p>

                <div className="rounded-full border-4 bg-blue-800 border-white h-44 w-44 flex flex-col items-center justify-center text-white">
                  {data?.status === "confirmed" && "Gekoppeld" }
                  {data?.status === "rejected" && "Afgewezen" }
                  {data?.status === "pending" && "Wacht op WoningNet" }
                  {data?.status === "noConnection" && "Geen Verbinding" }
                </div>

                <div
                  onClick={() => {
                    onClose();
                    closePastModal();
                    router.push("/profile");
                  }}
                  className="bg-white text-primary text-center py-3 px-20 rounded-md">
                  Terug naar mijn profiel
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
