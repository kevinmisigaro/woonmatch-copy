import React, { useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import NewsItem from "./NewsItem";

const Slider = () => {
  const parentRef = useRef(null);
  const [viewportRef, embla] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  const news = [
    {
      title: "Woonmatch heeft modern en slim portaal",
      date: "Dinsdag, 17 januari 2022",
      category: "Moderne Website",
      thumbnail: "news-2.png",
    },
    {
      title: "Wat kunt u doen om uw woning te verbeteren?",
      date: "Vrijdag, 14 mei 2021",
      category: "Moderne Website",
      thumbnail: "news-1.png",
    },
    {
      title: "Woonmatch heeft modern en slim portaal",
      date: "Dinsdag, 17 Jjnuari 2022",
      category: "Moderne Website",
      thumbnail: "news-2.png",
    },
  ];

  return (
    <div className="relative" ref={parentRef}>
      <div className="" ref={viewportRef}>
        <div className="embla__container">
          {news.map((news_item, index) => (
            <div key={index} className="">
              <NewsItem {...news_item} parentRef={parentRef} />
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute -right-[65px] sm:-right-[45px] scale-[20%] sm:scale-[30%]  lg:scale-[40%] 3xl:scale-100 -top-[35px] sm:top-[1%] md:top-[5%] lg:mt-[2%] 3xl:top-[22%] hover:pl-10 transition-all duration-500 w-[150px] h-[150px] z-10 grid place-content-center bg-tertiary rounded-full"
        onClick={scrollNext}>
        <img src="/images/arrow-right.svg" />
      </button>
    </div>
  );
};

export default Slider;
