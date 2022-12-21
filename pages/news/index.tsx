import React, { useRef } from "react";
import Layout from "../../components/Layouts/SiteLayout";
import Slider from "../../components/Slider";

const IndexPage = ({ houses, filters }) => {
  const ref = useRef(null);

  return (
    <Layout title="News">
      <div>
        <div
          className={`md:w-full relative md:flex flex-col md:h-[calc(100vh_-_55px)] 3xl:h-[calc(100vh_-_85px)]`}>
          <div className="flex h-full">
            <div className=" w-[45%] overflow-hidden">
              <img src="/images/rings-news.svg" className="w-[90%] mt-5" />
            </div>
            <div className="text-center w-[55%] grid place-content-center overflow-hidden h-full rounded-bl-[20%] bg-gray-400">
              <img src="/images/news-2.png" className="scale-[2.1]" />
            </div>
          </div>
          <div className="absolute inset-0">
            <div className="flex items-center h-full">
              <div className="w-[60%] bg-primary text-50 font-medium rounded-r-3xl text-white">
                <div className="m-10">
                  Woonmatch heeft een modern en slim portaal dat woningzoekenden
                  een heel prettige gebruikerservaring geeft.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="" ref={ref}>
          <div className="h-[100px] items-center flex bg-gray-100">
            <div className="container flex text-20 space-x-8">
              <div className="flex space-x-3">
                <div>
                  <img src="/images/logo-icon.svg" />
                </div>
                <div>René (Woonmatch)</div>
              </div>
              <div className="flex space-x-3">
                <div>
                  <img src="/images/calendar.svg" />
                </div>
                <div>Dinsdag, 17 Juni 2021</div>
              </div>
              <div className="flex space-x-3">
                <img src="/images/tag.svg" />
                <div>Moderne website</div>
              </div>
            </div>
          </div>
        </div>
        <article className="container space-y-4 py-10">
          <p>
            Woonmatch staat voor een uitstekende zoekersbeleving. Wij zorgen
            ervoor dat elke Zoeker een heel prettig gevoel heeft in het gebruik
            en heel snel en intuïtief zich kan bewegen in de website.
          </p>
          <p>
            Het Woonmatch Portaal is perfect afgestemd het scherm van een
            telefoon, tablet of computer. De zoeker kan lekker Woonmatchen vanaf
            de bank, maar ook achter een bureau.
          </p>

          <p>
            Woonmatch levert het meest gebruiksvriendelijke, mooiste en
            modernste woningzoekendenportaal van Nederland.
          </p>

          <div className="flex space-x-3 py-10">
            <img
              src="/images/news-image-1.png"
              className="w-[40%] h-auto aspect-[737/579] border border-tertiary rounded-md overflow-hidden shadow-md"
            />
            <img
              src="/images/news-image-2.png"
              className="w-[55%] h-auto aspect-[967/579] border border-tertiary rounded-md overflow-hidden shadow-md"
            />
          </div>

          <p>
            Het content management systeem is super eenvoudig. Woningcorporaties
            en samenwerkende regio’s kunnen alles wat ze willen presenteren op
            de website. Woningzoekenden hebben ook een persoonlijke omgeving
            waar ze al hun woningzoekenden zaken kunnen regelen.
          </p>
        </article>
        <div className="mx-auto bg-gray-100 overflow-hidden pb-10 ">
          <div className="relative container">
            <h2 className="text-40 font-bold text-primary py-10">
              Meer nieuws & updates
            </h2>
            <Slider />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
