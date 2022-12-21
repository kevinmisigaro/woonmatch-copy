import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";

const HouseSwapSlider = ({ houses }) => {
  const parentRef = useRef(null);
  const [viewportRef, embla] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true,
  });

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  return (
    <div className="relative" ref={parentRef}>
      <div className="" ref={viewportRef}>
        <div className="embla__container">
          {houses.map((house, index) => (
            <div key={index} className="">
              <HouseSwapItem key={index} house={house} parentRef={parentRef} />
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute -right-[30px] sm:-right-[45px] scale-[50%] sm:scale-[30%]  lg:scale-[40%] 3xl:scale-100 top-[35%] sm:top-[30%] md:top-[35%]  xl:top-[35%] 3xl:top-[40%] hover:pl-10 transition-all duration-500 w-[150px] h-[150px] z-10 grid place-content-center bg-tertiary rounded-full"
        onClick={scrollNext}>
        <img src="/images/arrow-right.svg" />
      </button>
    </div>
  );
};

export const HouseSwapItem = ({ house, parentRef }: any) => {
  const [isOver, setIsOver] = useState(false);
  const [width, setWidth] = useState(400);
  const handleOnMouseOver = (isOver) => {
    setIsOver(isOver);
  };

  const doOnWindowResize = () => {
    if (parentRef?.current) {
      if (parentRef.current.offsetWidth > 1000) {
        setWidth(parentRef.current.offsetWidth / 2 - 30);
      } else if (parentRef.current.offsetWidth > 668) {
        setWidth(parentRef.current.offsetWidth / 1.3 - 30);
      } else if (parentRef.current.offsetWidth > 639) {
        setWidth(parentRef.current.offsetWidth / 2 - 30);
      } else {
        setWidth(parentRef.current.offsetWidth - 30);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      doOnWindowResize();
    });
    doOnWindowResize();
  }, []);

  return (
    <div
      onMouseOver={() => handleOnMouseOver(true)}
      onMouseOut={() => handleOnMouseOver(false)}
      style={{ width: width }}
      className="relative drop-shadow-lg rounded-md overflow-hidden h-[calc(100vh_-_180px)] sm:h-[500px] lg:h-[600px] md:h-[700px] xl:h-[calc(100vh_-_85px)] 3xl:h-[calc(100vh_-_130px)] mr-[30px]">
      <div className={`w-full h-full bg-gray-400  grid place-content-center `}>
        <img
          className={`${
            isOver
              ? "xl:scale-[3.2] md:scale-[3.4] sm:scale-[2.4] scale-[3.2]"
              : "xl:scale-[2.8] md:scale-[3] sm:scale-[2] scale-[2.8]"
          } transform duration-300`}
          src={`${house.files.thumbnail}`}
        />
      </div>
      <div className="absolute flex flex-col justify-end inset-0 bg-gradient-to-t from-black/100 via-black/10 to-black/0">
        <div className="text-white p-8">
          <div className="space-y-1 mb-5">
            <div className="text-30">{house.details.type}</div>
            <div className="text-30 font-bold">
              € {house.details.grossrent} p.m
            </div>
            <div className="flex font-light">
              <div className="pr-2 border-r border-r-white">
                {house.details.bedrooms} Kamers
              </div>
              <div className="ml-2 font-light">
                {house.address.street} {house.address.number}{" "}
                {house.address.city}
              </div>
            </div>
          </div>
          <div
            className={` ${
              isOver ? "h-[50px] mb-0" : "h-0 -mb-5"
            } overflow-hidden font-bold translate-all transition-all duration-300`}>
            <Link href={`/houses/${house.advert}`}>
              <a className="">
                <h2 className="text-title text-35">Naar Woningruil</h2>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseSwapSlider;
