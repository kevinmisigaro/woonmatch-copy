import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { RegisterLoadingSpinner } from "../Registration/LoadingSpinner";

export default function MyReactionsCard({ details }) {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadData = async () => {
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
        }/houses/archive`,
        config
      )
      .then((res) => {
        console.log(res.data);
        setContent(res.data.onSite);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    loadData();
  }, []);

  return (
    <>
      <div className="block w-full bg-white rounded-md shadow-md mb-7 relative overflow-hidde">
        <div className="py-4 pl-4 rounded-t-md bg-tertiary text-base text-white">
          Mijn reacties
        </div>
        {loading ? (
          <div className="flex flex-row items-center h-2/3 justify-center">
            <RegisterLoadingSpinner />
          </div>
        ) : (
          <div className="text-sm px-6 py-4 text-black font-normal items-center flex flex-row gap-x-24 justify-between">
            <div>
              {/*Huurwoning
          <br />
          <span className="font-light">
            Eigenaar: {details.initials} {details.lastname} <br />
            Sinds: {moment(details.ownedSince).format("DD-MM-YYYY")} <br />
          </span>
          <br />*/}
              {content?.length > 0 && (
                <div className="flex flex-col">
                  {content.map((c, i) => (
                    <span className="text-sm italic font-light" key={i}>
                      {console.log(c.address)}
                      {c.address.street} {c.address.number}, {c.address.city}
                    </span>
                  ))}
                </div>
              )}
              <Link href="/react">
                <div className="text-sm  mt-5 group text-primary flex items-center flex-row justify-start gap-x-1 font-light cursor-pointer hover:underline">
                  Bekijken{" "}
                  <span className="hidden group-hover:block underline">
                    <BsArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </div>

            <div className="absolute -bottom-2 -right-2">
              <img src="/bg-images/profile/Mijnreacties.svg" className="w-40" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
