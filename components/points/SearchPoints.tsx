import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { PopUp } from "../../components/ui/PopUp";
import { MraReactions } from "../../interfaces/mra-reactions";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const data = [
  {
    name: "Dec",
    point: 1,
  },
  {
    name: "Jan",
    point: 2,
  },
  {
    name: "Feb",
    point: 3,
  },
  {
    name: "Mar",
    point: 4,
  },
  {
    name: "Apr",
    point: 5,
  },
  {
    name: "May",
    point: 6,
  },
  {
    name: "Jun",
    point: 7,
  },
  {
    name: "Jul",
    point: 8,
  },
  {
    name: "Aug",
    point: 9,
  },
  {
    name: "Sep",
    point: 9,
  },
  {
    name: "Oct",
    point: 8,
  },
  {
    name: "Nov",
    point: 9,
  },
  {
    name: "Dec",
    point: 10,
  },
];

const CustomizedDot = (props) => {
  const { cx, cy, stroke, payload, value } = props;

  if (value < 5) {
    return (
      <svg
        x={cx - 7}
        y={cy - 7}
        width={15}
        height={15}
        viewBox="0 0 17 17"
        fill="none">
        <g>
          {/* <text
            x={cx - 7}
            y={cy - 7}
            width={15}
            height={15}
            font-size="38"
            fill="#8EB429">
            {value}
          </text> */}
          <circle cx="8.5" cy="8.5" r="8.5" fill="#8EB429" />
        </g>
      </svg>
    );
  }

  return null;
};

export const SearchPoints = ({
  points,
  mraReactions,
}: {
  points: number;
  mraReactions: MraReactions;
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showChart, setShowChart] = useState(false);
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-col justify-between text-black py-3 px-8">
          <div className="font-bold text-primary mt-4">Zoekpunten</div>
          <div className="text-gray-600 text-20">
            U bouwt zoekpunten op als u actief reageert op woningen. Reageert u
            in een maand niet op woningen dan gaan uw zoekpunten met één punt
            omlaag.
          </div>
        </div>
        <div className="flex-1 text-black  relative grid grid-cols-5  overflow-hidden">
          <div className="col-span-3 relative bg-gray-100">
            <div className="absolute top-5 left-8 right-8">
              <div>Totaal</div>
              <div className="text-tertiary text-3xl font-bold">{points}</div>
              <div>
                <LineChart width={500} height={200} data={data}>
                  <XAxis dataKey="name" />
                  <Line
                    strokeWidth={2}
                    markerWidth={20}
                    type="monotone"
                    dataKey="point"
                    stroke="#000000"
                    dot={<CustomizedDot />}
                  />
                </LineChart>
              </div>
            </div>
          </div>
          <div className="col-span-2 bg-primary grid place-content-center">
            <div className="text-white text-20 text-center mb-2">
              Deze maand
            </div>
            <div
              onClick={() => {
                setShowPopup(true);
              }}
              className="text-center cursor-pointer overflow-hidden flex flex-col bg-white rounded-lg shadow-md">
              <div className="flex-1 flex flex-col space-y-2 py-3">
                <img src="/images/award.svg" className="h-[60px] mt-2" />
                {mraReactions?.events?.thisMonth && (
                  <div className="text-20 font-medium text-gray-500">
                    u heeft
                    <span className="text-primary">
                      {" "}
                      {mraReactions.events.thisMonth.length}x{" "}
                    </span>
                    gereageerd!
                  </div>
                )}
                <div className="text-14 text-gray-500">
                  Nog {4 - mraReactions.events.thisMonth.length} reactie te gaan
                </div>
              </div>
              <div className="bg-tertiary text-20 p-1 text-white px-4">
                klik voor meer informatie
              </div>
            </div>
          </div>
        </div>
      </div>
      <PopUp
        onClose={() => {
          setShowPopup(false);
        }}
        show={showPopup}
        className={"lg:w-[80%] sm:w-2/3  text-left"}
        titleClassName={"text-left mt-2"}
        title={"Toelichting Zoekpunten"}>
        <div className="bg-white  text-gray-500 p-20 max-h-[70vh] overflow-auto">
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="border-2 flex flex-col rounded-b-sm overflow-hidden border-tertiary shadow-md">
              <div className="p-10 space-y-3 ">
                <h3 className="text-30 font-bold text-primary">
                  Uw reacties voor de maand {moment().format("MMMM")}
                </h3>
                <div className="divide-y ">
                  {mraReactions.events.thisMonth.map((monthEvent) => (
                    <div className="flex  items-center space-x-3 py-2">
                      <div>
                        {monthEvent.address.street}
                        {", "}
                        {monthEvent.address.housenumber}{" "}
                      </div>
                      {monthEvent.source == "Woonmatch" && (
                        <img
                          src="images/woonmatch-waterland-logo.png"
                          className="h-[30px]"
                        />
                      )}
                      {monthEvent.source == "WoningNet" && (
                        <img
                          src="images/woningNet-logo.svg"
                          className="h-[30px]"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-2 flex flex-col rounded-b-sm overflow-hidden border-tertiary shadow-md">
              <div className="p-10 flex-1 space-y-3">
                <h3 className="text-30 font-bold text-primary">
                  Reacties te gaan in {moment().format("MMMM")}
                </h3>
                {mraReactions.count.thisMonth < 4 && (
                  <p>
                    Met nog {4 - mraReactions.count.thisMonth} extra{" "}
                    {4 - mraReactions.count.thisMonth == 1
                      ? "reactie"
                      : "reacties"}{" "}
                    deze maand heeft u 4 reacties geplaatst! U ontvangt er dan 1
                    zoekpunt bij!
                  </p>
                )}
                {mraReactions.count.thisMonth >= 4 && (
                  <p>
                    U heeft 4 of meer reacties geplaatst deze maand! U ontvangt
                    volgende maand 1 zoekpunt!
                  </p>
                )}
              </div>
              <Link href={`/houses`}>
                <a className="bg-tertiary text-white p-2 text-center">
                  ga naar de advertenties
                </a>
              </Link>
            </div>
          </div>
          <section>
            <p className="mb-5">
              U kunt zoekpunten opbouwen door vier keer per maand te reageren op
              woningen. Reageert u in een maand niet op woningen dan gaan uw
              zoekpunten met één punt omlaag.
            </p>

            <h3 className="mt-5  font-bold">Opbouw van zoekpunten</h3>
            <ul className="list-disc list-inside ">
              <li>U ontvangt één zoekpunt per maand</li>
              <li>U kunt maximaal 30 zoekpunten opbouwen</li>
              <li>
                U bouwt één zoekpunt op wanneer u minimaal vier keer per maand
                reageert op een woning
              </li>
            </ul>

            <h3 className="mt-5  font-bold">Afbouw van zoekpunten</h3>
            <p>Er gaat een zoekpunt af wanneer:</p>
            <ul className="list-disc list-inside ">
              <li>
                U hebt geen belangstelling meer voor een woning, nadat de
                einddatum van de advertentie gesloten is
              </li>
              <li>U slaat een uitnodiging voor een bezichtiging af</li>
              <li>Na de bezichtiging ziet u af van de woning</li>
              <li>
                U heeft een maand lang niet gereageerd op het woningaanbod (bij
                één tot drie keer reageren blijven uw zoekpunten gelijk)
              </li>
            </ul>
            <h3 className="mt-5 font-bold">
              Er zijn twee situaties waarbij alle zoekpunten vervallen:
            </h3>
            <ol className="list-decimal list-inside ">
              <li>
                U heeft een uitnodiging gekregen voor een bezichtiging en u komt
                niet. Als u daar geen geldige reden voor kun geven dan vervallen
                alle zoekpunten
              </li>
              <li>
                U hebt twee keer een woning bekeken en twee keer een woning
                geweigerd. Ook dan vervallen al uw zoekpunten
              </li>
            </ol>
          </section>
        </div>
      </PopUp>
    </>
  );
};
