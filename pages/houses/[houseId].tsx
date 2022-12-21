import Link from "next/link";
import { House } from "../../interfaces/index";
import Layout from "../../components/Layouts/SiteLayout";
import ReactBanner from "../../components/Banners/ReactBanner";
import { fetchHouses, fetchSimilarHouses } from "../../lib/house";
import Card, { EnergyScore, ReactButton } from "../../components/Card";
import { BGWrapper } from "../../components/BGWrapper";
import { PhotoGallery } from "../../components/PhotoGallery";
import { useEffect, useRef, useState } from "react";
import MapView from "../../components/MapView";
import { useRouter } from "next/router";
import moment from "moment";

export async function getServerSideProps(context) {
  let houseId = null;
  let houseDetail = null;
  let similarHouses = null;

  houseId = context.params.houseId;
  houseDetail = await fetchHouses(context.req, houseId);
  similarHouses = await fetchSimilarHouses(context.req, houseId);

  return { props: { houseDetail, similarHouses } };
}

const HouseDetailPage: React.FC<any> = ({
  houseDetail,
  similarHouses,
}: {
  houseDetail: House;
  similarHouses: House[];
}) => {
  const [height, setHeight] = useState(400);
  const controlRef = useRef(null);
  const router = useRouter();

  const doOnWindowResize = () => {
    if (controlRef?.current) {
      setHeight(controlRef.current.offsetHeight);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      doOnWindowResize();
    });
    doOnWindowResize();
  }, []);

  const handleReaction = () => {
    router.push(`/react/${houseDetail.advert}`);
  };

  console.log("houseDetail", houseDetail);

  const getFacilityIcon = (facilityIcon) => {
    return `/facility-icons/${facilityIcon}.svg`;
  };

  if (houseDetail) {
    return (
      <Layout
        title={`${houseDetail?.details.title} in ${houseDetail.address.city}`}>
        <div className="bg-fuscous-gray-100">
          <div
            className={`md:w-full md:flex flex-col md:h-[calc(100vh_-_55px)] 3xl:h-[calc(100vh_-_85px)]`}>
            <BGWrapper image={houseDetail.files.thumbnail} className={"grow"}>
              <div className="container grid place-content-center h-[calc(100vh_-_55px)] md:h-full items-center md:flex md:justify-between text-white ">
                <div className="flex text-white ">
                  <div className="md:pr-3 xl:pr-10 3xl:pr-20">
                    <h1 className="text-[48px] xl:text-[75px] 3xl:text-[100px] mb-8 xl:leading-[75px]  3xl:leading-[100px]">
                      {houseDetail.details.title}
                    </h1>

                    <div className="flex space-x-4 xl:space-x-8 mb-16">
                      {/* <ReactButton onClick={handleReaction} /> */}
                      <button
                        onClick={handleReaction}
                        className="bg-[#3AA935]/80 border-primary border-[1px] text-white text-lg rounded-md py-2 px-20">
                        Reageren
                      </button>
                    </div>

                    <div className="space-y-4">
                      <p className="flex items-center space-x-4">
                        <img
                          src="/images/location_marker.svg"
                          className="w-[12px] xl:w-[18px] 2xl:w-[25px]"
                        />
                        <span className="font-bold">
                          {houseDetail.address.street}{" "}
                          {houseDetail.address.number}{" "}
                          {houseDetail.address.city}
                        </span>
                      </p>

                      <p>
                        <span className="text-tertiary pr-4">Huurprijs:</span>
                        <span className="font-bold">
                          &euro;{" "}
                          {parseFloat(houseDetail.details.rent).toLocaleString(
                            "nl-NL",
                            {
                              minimumFractionDigits: 2,
                            }
                          )}{" "}
                          per maand
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:h-full  w-full md:w-auto md:grid place-content-center">
                  <div className="bg-white w-full md:w-[316px] items-center xl:w-[333px] 3xl:w-[445px] drop-shadow-md xl:mt-[75px] mt-[48px] 3xl:mt-[100px] rounded-[5px] overflow-hidden ">
                    <div className="text-gray-600 text-center px-4 py-2">
                      <div className="text-center text-lg">
                        Overgebleven tijd om te reageren
                      </div>
                      <div className="font-medium text-[25px] xl:text-[38px] 3xl:text-[50px]">
                        {houseDetail.period.runtime}
                      </div>
                    </div>
                    <div className="flex  xl:text-[15px]  3xl:text-[20px]">
                      {/* <div className="bg-tertiary px-3 py-2 flex-auto">
                      <div>Aantal reacties</div>
                      <div className="font-bold">
                        {houseDetail.reactionCount} reacties
                      </div>
                    </div> */}
                      {houseDetail?.match?.barometer && (
                        <div className="bg-primary px-3 py-2 flex-auto text-center">
                          <div>Uw positie</div>
                          <div className="font-bold">
                            Positie{" "}
                            {houseDetail?.match?.barometer
                              ? houseDetail.match.barometer
                              : 0}{" "}
                            van {houseDetail.reactionCount + 1}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </BGWrapper>

            <section className="flex-none grid grid-cols-2 lg:grid-cols-4 bg-white lg:h-[165px] xl:h-[255px] 3xl:h-[340px]">
              <HeroInfoCard
                className=""
                image={"/images/address.svg"}
                label={"Type"}
                value={houseDetail.details.type}
              />

              <HeroInfoCard
                image={"/images/bed.svg"}
                label={"Slaapkamers"}
                value={houseDetail.details.bedrooms}
              />
              <HeroInfoCard
                image={"/images/house-construction.svg"}
                label={"Bouwjaar"}
                value={houseDetail.details.buildYear}
              />
              <HeroInfoCard
                image={"/images/house-plan.svg"}
                label={"Woonoppervlakte"}
                value={
                  <>
                    {houseDetail.surface.total} m<sup>2</sup>
                  </>
                }
              />
            </section>
          </div>

          <section className="container lg:flex gap-8 pt-10">
            {/* Large Side */}
            <section className="lg:flex-1 space-y-8">
              <PhotoGallery
                images={houseDetail.files.images}
                className="w-full aspect-[1069/928]"
                rightButton={
                  houseDetail.files.documents.length > 0 ? (
                    <a
                      href={houseDetail.files.documents[0].url}
                      target={"_blank"}
                      className="">
                      <div className="flex items-center space-x-2 p-2">
                        <div>Bekijk plattegrond (3)</div>
                        <div className="h-[2px] 3xl:h-[3px] w-[44px] xl:w-[67px] 3xl:w-[90px] bg-primary"></div>
                      </div>
                    </a>
                  ) : null
                }
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                <HouseOptions
                  optionName={"Verwarming & energie"}
                  optionsList={
                    houseDetail.details.options["Verwarming & energie"] || []
                  }
                />
                <HouseOptions
                  optionName={"Woningkenmerken"}
                  optionsList={
                    houseDetail.details.options["Woningkenmerken"] || []
                  }
                />
                <div className="col-span-2 ">
                  <HouseOptions
                    optionName={"Extra’s"}
                    optionsList={houseDetail.details.options["Extra’s"] || []}
                  />
                </div>
              </div>

              {houseDetail.details.youtubeEmbedCode && (
                <VideoPlayer
                  link={""}
                  embedCode={houseDetail.details.youtubeEmbedCode}
                  coverImage={houseDetail.files.thumbnail}
                />
              )}

              <div className="house-description with-links">
                <h2 className="text-primary text-base md:text-lg xl:text-xl font-medium mb-4">
                  Beschrijving
                </h2>

                {houseDetail?.details.description?.object?.map(
                  (description, i) => (
                    <>
                      {description.type == "header" && (
                        <h2
                          key={i}
                          className="mb-2 text-30 font-bold"
                          dangerouslySetInnerHTML={{
                            __html: description.data.text,
                          }}></h2>
                      )}
                      {description.type == "paragraph" && (
                        <p
                          key={i}
                          className="mb-5"
                          dangerouslySetInnerHTML={{
                            __html: description.data.text,
                          }}></p>
                      )}
                    </>
                  )
                )}
              </div>

              {houseDetail.requirements.household.min |
                houseDetail.requirements.household.max |
                houseDetail.requirements.age.min |
                houseDetail.requirements.age.max && (
                <div className="border border-fuscous-gray-200 shadow-lg rounded-md px-6 py-8 space-y-8 text-sm xl:text-[15px] 3xl:text-[20px]">
                  <h2 className="text-primary text-base md:text-lg xl:text-xl font-medium mb-4">
                    Voorwaarden en/of vereisten
                  </h2>

                  {houseDetail.requirements.household.min |
                    houseDetail.requirements.household.max && (
                    <div className="flex items-start space-x-3 mb-4">
                      <img src="/images/people.svg" className="limits-icon" />
                      <div className="flex-1 ">
                        <h3 className="font-medium mb-1.5 text-base">
                          Aantal personen in uw huishoden
                        </h3>
                        <div className="rid-cols-1 grid md:grid-cols-3">
                          <div className="col-span-2">
                            <p className="text-secondary-200">
                              Lorem ipsum dolor sit amet, consetetur sadipscing
                              elitr, sed diam nonumy eirmod tempor invidunt ut
                              labore et{" "}
                            </p>
                          </div>
                          <div>
                            <strong>
                              {houseDetail.requirements.household.min} t/m{" "}
                              {houseDetail.requirements.household.max}
                              personen
                              {houseDetail.requirements.household.enforced && (
                                <span>&nbsp;(Verplicht)</span>
                              )}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {houseDetail.requirements.age.min |
                    houseDetail.requirements.age.max && (
                    <>
                      <div className="flex items-start space-x-3 mb-4">
                        <img src="/images/age.svg" className="limits-icon" />
                        <div className="flex-1 ">
                          <h3 className="font-medium mb-1.5 text-base">
                            Eisen aan de leeftijd
                          </h3>
                          <div className="rid-cols-1 grid md:grid-cols-3">
                            <div className="col-span-2">
                              <p className="text-secondary-200">
                                Lorem ipsum dolor sit amet, consetetur
                                sadipscing elitr, sed diam nonumy eirmod tempor
                                invidunt ut labore et{" "}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <div>
                                {houseDetail.requirements.age.min} -{" "}
                                {houseDetail.requirements.age.max}
                                {houseDetail.requirements.age.enforced && (
                                  <span>&nbsp;(Verplicht)</span>
                                )}
                              </div>
                              <div>
                                <img
                                  src="/images/warning.svg"
                                  className="limits-icon"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex bg-white items-center rounded-md p-3 mt-5 space-x-3 text-gray-400">
                        <img
                          src="/images/warning.svg"
                          className="limits-icon"
                        />
                        <p className="text-secondary-200">
                          Lorem ipsum dolor sit amet, consetetur sadipscing
                          elitr, sed diam nonumy
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}
              <div>
                <MapView
                  markerClickable={false}
                  dimensionsClassName="w-full aspect-square md:aspect-video mb-10"
                  houses={[houseDetail]}
                />
              </div>
              {houseDetail.details.advertTexts.length > 0 && (
                <div className=" bg-white border-2 with-links border-tertiary grid place-content-center rounded-md p-10">
                  {houseDetail.details.advertTexts.map((at, i) => (
                    <p
                      key={i}
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: at,
                      }}></p>
                  ))}
                </div>
              )}
            </section>

            {/* Mini Side */}
            <section className="mt-20 lg:mt-0 lg:w-[305px] xl:w-[450px] 3xl:w-[630px] space-y-10 text-secondary-200">
              {/* Advertise */}
              <div className="adv-card">
                <div className="adv-card-header">Advertentie</div>

                <div className="">
                  <ul className="">
                    <li className="adv-list-item">
                      <span>Advertentienummer:</span>
                      <span className="font-medium">
                        {houseDetail.details.code}
                      </span>
                    </li>
                    <li className="adv-list-item">
                      <span>Methode toewijzen:</span>
                      <span className="font-medium">
                        {houseDetail.friendlyAdvertType}
                      </span>
                    </li>
                    <li className="adv-list-item">
                      <span>Verwachte verhuurdatum:</span>
                      <span className="font-medium">
                        {moment(houseDetail.details.rentDate).format(
                          "DD MMMM YYYY"
                        )}
                      </span>
                    </li>
                    <li className="adv-list-item">
                      <span>Reageren t/m:</span>
                      <span className="font-medium">
                        {moment(houseDetail.period.end).format(
                          "DD MMMM YYYY [om] HH:mm"
                        )}
                      </span>
                    </li>
                    <li className="adv-list-item">
                      <span>Corporatie:</span>
                      <img
                        src={houseDetail.corporation.image}
                        alt={houseDetail.corporation.name}
                        className="h-5 w-auto"
                      />
                    </li>

                    <li className="adv-list-item flex items-baseline">
                      <div className=" whitespace-nowrap ">
                        Soort Bezichtiging:
                      </div>
                      <div>
                        {houseDetail?.details?.viewingDate && (
                          <span className="font-light">
                            groepsbezichtiging voor uitgenodigden op{" "}
                            {moment(houseDetail.details.viewingDate).format(
                              "DD MMMM YYYY"
                            )}
                            {" om "}
                            {moment(houseDetail.details.viewingDate).format(
                              "HH:mm"
                            )}
                            . U bent alleen welkom met een uitnodiging.
                          </span>
                        )}
                        {houseDetail?.details?.viewingType == "group" &&
                        !houseDetail?.details?.viewingDate ? (
                          <span className="font-light">
                            groepsbezichtiging op een nader te bepalen moment
                          </span>
                        ) : (
                          <span className="font-light">
                            {/* in overleg met de huidige bewoner */}
                          </span>
                        )}
                      </div>
                    </li>
                  </ul>
                  <hr className="mt-12 mb-8 mx-6 drop-shadow-md" />
                  <ul className="">
                    <li className="adv-list-item space-x-3">
                      <a
                        href="tel://0881718190"
                        className="flex items-center space-x-3 hover:text-primary">
                        <img
                          src="/images/phone.svg"
                          className="h-[10px] xl:h-[16px] 3xl:h-[22px] w-auto"
                        />
                        <span className="font-medium">Bel ons</span>
                      </a>
                    </li>
                    <li className="adv-list-item space-x-3">
                      <a
                        href="mailto://info@woonmatch.com"
                        className="flex items-center space-x-3 hover:text-primary">
                        <img
                          src="/images/mail.svg"
                          className="h-[10px] xl:h-[16px] 3xl:h-[22px] w-auto"
                        />
                        <span className="font-medium">Stuur een e-mail</span>
                      </a>
                    </li>
                    <li className="adv-list-item space-x-3">
                      <a
                        href="https://wa.me/+31652373832"
                        target="_blank"
                        className="flex items-center space-x-3 hover:text-primary">
                        <img
                          src="/images/whatsapp.svg"
                          className="h-[10px] xl:h-[16px] 3xl:h-[22px] w-auto"
                        />
                        <span className="font-medium">Stuur een WhatsApp</span>
                      </a>
                    </li>
                  </ul>
                  <div className="px-6 py-8">
                    <Link href="#">
                      <button
                        onClick={handleReaction}
                        className="button-primary w-full">
                        Reageren
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Detail */}
              <div className="adv-card">
                <div className="adv-card-header">Details</div>

                <ul className="">
                  <li className="adv-list-item space-x-3">
                    <span>Betreft:</span>
                    <span className="font-medium">
                      {houseDetail.details.title}
                    </span>
                  </li>
                  <li className="adv-list-item space-x-3">
                    <span>Type woning:</span>
                    <span className="font-medium">
                      {houseDetail.details.type}
                    </span>
                  </li>
                  <li className="adv-list-item space-x-3">
                    <span>Etage:</span>
                    <span className="font-medium">
                      {" "}
                      {houseDetail.details.floor === 0
                        ? "Begane grond"
                        : houseDetail.details.floor}
                    </span>
                  </li>
                  <li className="adv-list-item space-x-3">
                    <span>Energielabel:</span>
                    <EnergyScore value={houseDetail.details.energyScore} />
                  </li>
                  <li className="adv-list-item space-x-3">
                    <span>Perceel:</span>
                    {houseDetail.details.surface && (
                      <span className="font-medium">
                        {houseDetail.details.surface} m<sup>2</sup>
                      </span>
                    )}
                  </li>
                </ul>
              </div>

              {/* Price */}
              <div className="adv-card">
                <div className="adv-card-header">Prijs</div>

                <ul className="s">
                  <li className="adv-list-item space-x-3">
                    <span>Huurprijs (netto):</span>
                    <span className="font-medium">
                      &euro;{" "}
                      {parseFloat(houseDetail.details.rent).toLocaleString(
                        "nl-NL",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}
                    </span>
                  </li>
                  <li className="adv-list-item space-x-3">
                    <span>Servicekosten:</span>
                    <span className="font-medium">
                      &euro;{" "}
                      {parseFloat(
                        houseDetail.details.servicecosts
                      ).toLocaleString("nl-NL", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </li>
                  <li className="adv-list-item space-x-3">
                    <span>Huurprijs (bruto):</span>
                    <span className="font-medium">
                      &euro;{" "}
                      {parseFloat(houseDetail.details.grossrent).toLocaleString(
                        "nl-NL",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Informatie over de buurt */}
              <div className="adv-card">
                <div className="adv-card-header">Informatie over de buurt</div>
                <div className="grid grid-cols-3 p-6 gap-6">
                  {houseDetail.details.facilities.map((facility) => (
                    <div className="flex flex-col justify-between bg-white shadow rounded-md">
                      <div className="text-18 font-light text-center space-y-1 pt-3 py-1">
                        <img
                          src={getFacilityIcon(facility.icon)}
                          className="mx-auto h-[20px] xl:h-[48px]"
                        />
                        <div>{facility.name}</div>
                      </div>
                      <div className="text-18 py-1 font-medium bg-gray-100 text-gray-500 text-center sw-full">
                        {facility.distance < 1
                          ? facility.distance * 1000
                          : facility.distance}{" "}
                        {facility.distance < 1 ? "M" : "KM"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Indeling */}
              <div className="adv-card">
                <div className="adv-card-header">Indeling</div>

                <ul className="">
                  {houseDetail.surface.rooms.map((room, index) => (
                    <li
                      key={index}
                      className="adv-list-item space-x-3 justify-between">
                      <span>{room.name}</span>
                      <span className="font-medium">
                        {room.surface} m<sup>2</sup>
                      </span>
                    </li>
                  ))}
                  <li className="adv-list-item py-5 space-x-3 justify-between">
                    <span>Totale oppervlakte</span>
                    <span className="font-medium">
                      {houseDetail.surface.total} m<sup>2</sup>
                    </span>
                  </li>
                </ul>
              </div>
            </section>
          </section>
          <div
            style={{ height: height / 2, marginBottom: height / 2 }}
            className="relative container mx-auto mt-10 ">
            <div ref={controlRef}>
              <ReactBanner
                houseId={houseDetail.advert}
                handleReaction={handleReaction}
              />
            </div>
          </div>
        </div>
        <div className="h-1"></div>
        <div className="relative container mt-20 pb-40 mx-auto  ">
          <h2 className="section-hedaer text-primary">
            Vergelijkbare woningen
          </h2>
          <div className="mt-10 house-list">
            {similarHouses.map((house, i) => (
              <Card key={i} house={house} />
            ))}
          </div>
        </div>
      </Layout>
    );
  } else {
    return <div>Not found</div>;
  }
};

export const HouseOptions = ({
  optionName,
  optionsList,
}: {
  optionName: string;
  optionsList: any[];
}) => {
  const getIcon = (iconName: string) => {
    return `/house-icons/${iconName}.png`;
  };

  return (
    <div className="border border-fuscous-gray-200 rounded-md px-6 py-8">
      <h2 className="text-primary text-base md:text-lg xl:text-xl font-medium mb-4 tracking-tighter">
        {optionName}
      </h2>
      <ul className="space-y-3">
        {optionsList.map((option, index) => (
          <li
            key={index}
            className="flex items-center space-x-4 py-2 px-3 bg-white shadow rounded-md">
            <img
              src={getIcon(option.icon)}
              className="house-details-img"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/house-icons/house.svg";
              }}
            />
            <span>{option.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const HeroInfoCard = ({ className = "", image, label, value }) => {
  return (
    <div
      className={`grid p-5 lg:p-0 place-items-center border border-gray-200 px-4 ${className}`}>
      <div className="grid place-items-center space-y-[17px]  xl:space-y-[26px] 3xl:space-y-[35px]">
        <img src={image} className=" h-[48px] xl:h-[75px] 3xl:h-[100px]" />
        <h2 className="text-lg lg:text-xl font-semibold">{label}</h2>
        <p className="text-fuscous-gray-400">{value}</p>
      </div>
    </div>
  );
};

export const VideoPlayer = ({ embedCode, coverImage, link }) => {
  const [playMode, setPlayMode] = useState(false);

  return (
    <div
      className="border-2 border-transparent border-tertiary w-full aspect-video rounded-md"
      dangerouslySetInnerHTML={{
        __html: embedCode,
      }}></div>
  );
};

export default HouseDetailPage;
