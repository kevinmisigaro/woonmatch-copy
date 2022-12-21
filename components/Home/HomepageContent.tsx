import Link from "next/link";
import React, { useEffect, useState } from "react";
import { offer_options, offer_options_others } from "../../constants/values";
import DropDownButton from "../Buttons/DropDownButton";
import Card from "../Card";
import Slider from "../Slider";
import { showNotifications } from "../../lib/notification";

export const HomepageContent = ({ houses, offersRef }) => {
  console.log(houses);
  return (
    <>
      <div className="bg-gray-100" ref={offersRef}>
        <div className="container mx-auto py-10 lg:py-20 space-y-10 md:space-y-16">
          <div className="xl:flex justify-between items-center xl:space-x-4">
            <div className="flex mt-10 lg:mt-0 items-center space-x-2">
              <h2 className="section-hedaer text-primary">
                Aanbod in Woonmatch
              </h2>
              {/* <button
                title="Lees voor"
                className="p-2 bg-gray-100 rounded-md drop-shadow">
                <img
                  src="/images/speaker.svg"
                  className="h-[20px] lg:h-[25px] 3xl:h-[50px] w-auto"
                />
              </button> */}
            </div>
            {/* <div className="hidden md:flex  mt-10 xl:mt-0">
              <OffersFilterButtons onSelect={undefined} />
            </div> */}
          </div>

          {houses && (
            <div>
              {houses.length && (
                <div className="house-list">
                  {houses.map((house) => (
                    <Card house={house} isPublic={true} key={house.advert} />
                  ))}
                </div>
              )}

              <div className="flex justify-center w-full py-10  mt-10">
                <Link href="/houses">
                  <a className="button-primary w-1/2">Meer woningen zien</a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative pb-[15%] overflow-hidden ">
        <div className="relative  ">
          <div className="absolute top-0 left-0 right-[15%] 3xl:right-[20%]  rounded-r-lg bottom-0 bg-gradient-to-r from-apple  to-lime-400 -z-10"></div>
          <div className="container flex z-1">
            <div className="flex-1">
              <div
                className="
                pr-[30px] sm:pr-[80px]  lg:pr-[100px] 3xl:pr-[140px] 
                py-[40px] lg:py-[90px] 3xl:py-[140px]  
                 lg:leading-[14px] xl:leading-[18px] 3xl:leading-[30px] 5xl:leading-[50px]
                space-y-4 3xl:space-y-5 text-white ">
                <h2 className="">WIE WE ZIJN</h2>

                <div className="3xl:w-[110%] pb-2">
                  <h3 className="section-hedaer leading-8 5xl:leading-[60px]">
                    Vind via Woonmatch de fijnste plek om te wonen
                  </h3>
                </div>

                <p>
                  Via Woonmatch bieden woningcorporaties hun woningen en overige
                  verhuurpanden te huur aan.
                </p>

                <p>
                  Via een heel mooie en vriendelijke website kunnen
                  woningzoekenden gemakkelijk en snel online Zoeken én Vinden.
                  Woonmatch heeft een heel modern en zeer uitgebreid Portaal
                  voor de Zoeker.
                </p>
                <p>
                  Dit portaal ontwikkelt zich constant verder en heeft veel
                  functies beschikbaar om het Zoeken en Vinden voor elke
                  woningzoekende heel eenvoudig en snel te maken.
                </p>

                <p>
                  Woonmatch biedt elke woningzoekende een heel fijne beleving in
                  het gebruik. En de Zoeker wordt optimaal geholpen bij snel
                  Vinden.
                </p>
                <p>Dat wil toch elke woningcorporatie?</p>

                <div className="pt-[30px] w-[95%]  ">
                  <Link href="/informatie">
                    <a className="btn-outline">Meer weten over Woonmatch</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-1/3 md:w-auto flex-none md:flex-1 relative">
              <div className="absolute bottom-0 h-[82%] w-[140%]">
                <img
                  src="/images/who-we-are-1080x1080.png"
                  className="h-full w-full object-cover rounded-l-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[50%]  ">
          <div className="absolute top:0 lg:top-5 left-[30px] sm:left-[30px] md:-left-[50px] lg:-left-[80px] 3xl:-left-[130px] grid place-content-center right-0 bottom-0 ">
            <div className="absolute grid place-content-center rounded-full -top-[100px] sm:top-0 w-[650%] sm:w-[195%] md:w-[155%] lg:w-[140%] xl:w-[116%] 3xl:w-[120%]  aspect-square border-[1px] border-[#F1F3F4] ">
              <div className="absolute w-[96%] top-[1.5%] left-[1.5%] sm:w-[94%]  sm:top-[3%] sm:left-[3%] rounded-full aspect-square border-[1px] border-[#F1F3F4]">
                <div className="absolute w-[96%] top-[1.5%] left-[1.5%] sm:w-[94%] sm:top-[3%] sm:left-[3%] rounded-full aspect-square border-[1px] border-[#F1F3F4]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative container mx-auto  
         lg:-mt-20 xl:-mt-[100px] 3xl:-mt-[15%]  3xl:pt-[130px]
         mb-10  xl:mb-[90px] 3xl:mb-[130px]">
        <h2 className="text-apple ">ONTWIKKELINGEN</h2>
        <h3 className="section-hedaer text-primary mt-3">
          Meer nieuws & updates
        </h3>
      </div>
      <div className="mx-auto overflow-hidden mb-20">
        <div className="relative container">
          <Slider />
        </div>
      </div>
    </>
  );
};

export const OffersFilterButtons = ({ onSelect }) => {
  const allSelctor = "all";
  const [selected, setSelected] = useState([allSelctor]);
  const [options, setOptions] = useState(offer_options);
  const [othersOptions, setOthesOptions] = useState(offer_options_others);

  const handleSelection = (id: string): void => {
    let _selected = [...selected];
    let pos = _selected.indexOf(id);

    if (pos === -1) {
      _selected.push(id);
    } else {
      _selected.splice(pos, 1);
    }

    if (_selected.length == 0) {
      _selected.push(allSelctor);
    }

    if (_selected.length > 1 && _selected.indexOf(allSelctor) > -1) {
      id = allSelctor;
      let pos = _selected.indexOf(id);

      _selected.splice(pos, 1);
    }
    setSelected(_selected);
  };

  useEffect(() => {
    let _seleted_options = options.map((option) => ({
      ...option,
      isSelected: selected.indexOf(option.id) === -1 ? false : true,
    }));

    let _seleted_others = othersOptions.map((option) => ({
      ...option,
      isSelected: selected.indexOf(option.id) === -1 ? false : true,
    }));

    setOptions(_seleted_options);
    setOthesOptions(_seleted_others);
  }, [selected]);

  return (
    <ul className="flex   space-x-[2px] text-gray-400">
      {options.map((option, index) => (
        <li
          onClick={() => {
            handleSelection(option.id);
          }}
          key={index}
          className={`cursor-pointer py-2   ${
            index == 0 ? "rounded-l px-[30px]" : "px-[6px]"
          } ${
            option.isSelected ? "bg-apple text-white" : "text-gray-400 bg-white"
          }   `}>
          {option.title}
        </li>
      ))}
      <li className=" bg-white z-10 rounded-r">
        <DropDownButton
          title="Overig"
          multiple
          className={`py-2 px-4`}
          wraperClassNames={`lg:h-[40px]`}
          options={othersOptions.map((option) => ({
            value: option.id,
            key: option.title,
            checked: option.isSelected,
          }))}
          onSelect={(items: unknown) => {}}
        />
      </li>
    </ul>
  );
};
