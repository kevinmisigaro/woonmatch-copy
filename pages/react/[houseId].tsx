import { useState, useEffect } from "react";
import Link from "next/link";
import { clientRequest } from "../../network/network";
import { House } from "../../interfaces/index";
import Layout from "../../components/Layouts/SiteLayout";
import { fetchHouses } from "../../lib/house";
import useUser from "../../lib/useUser";
import Card from "../../components/Card";
import { PopUp } from "../../components/ui/PopUp";
import { ProgressSpinner } from "../../components/ui/ProgressSpinner";
import { getUserSummary } from "../../lib/user-details";
import { useRouter } from "next/router";
import moment from "moment";

export async function getServerSideProps(context) {
  const houseId = context.params.houseId;
  const houseDetail = await fetchHouses(context.req, houseId);
  const userDetails = await getUserSummary(context.req);

  return { props: { houseDetail, userDetails } };
}

const ReactPage: React.FC<any> = ({ houseDetail, userDetails }) => {
  const router = useRouter();
  const [reactModelVisible, setReactModelVisible] = useState<boolean>(false);
  const [isReacting, setIsReacting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const user = useUser();

  const reactToAdvert = async (advert: string) => {
    if (!isReacting) {
      setErrorMessage("");
      setIsReacting(true);

      const results = await clientRequest<House>("POST", {
        path: "/houses/react",
        data: { house: advert },
      });

      setIsReacting(false);

      if (results.data.success) {
        setReactModelVisible(true);
      } else {
        console.log(results.data.data);
        try {
          if (
            results.data.data.errors[0].text.indexOf(
              "Maximum Concurrent Reactions Reached"
            )
          ) {
            setErrorMessage(
              `U heeft het maximum aantal reacties bereikt. U kunt maximaal ${
                results.data.data.errors[0].text.split(":").reverse()[0]
              } reacties tegelijkertijd hebben.`
            );
          } else {
            setErrorMessage(results.data.data.errors[0].text);
          }
        } catch (e: any) {
          setErrorMessage("Unknown error");
        }
      }
    }
  };

  return (
    <Layout title="Samenvatting">
      <div>
        <div className="bg-fuscous-gray-100 ">
          <section className="relative container mx-auto py-10">
            <h2 className="font-semibold text-xl md:text-2xl 2xl:text-4xl text-limeade mb-10">
              Samenvatting
            </h2>
            <Card house={houseDetail} horizontal />
          </section>
          <div className="container pb-10">
            <PointsSummary
              totalPoints={
                houseDetail.details.mraSituationPointsApplicable
                  ? userDetails.person.pointspec.points.total +
                    userDetails.person.pointspec.points.situation
                  : userDetails.person.pointspec.points.total
              }
              waitingPoints={Math.floor(
                userDetails.person.pointspec.points.wait
              )}
              searchPoints={userDetails.person.pointspec.points.search}
              situationPoints={userDetails.person.pointspec.points.situation}
              situationPointsApplicable={
                houseDetail.details.mraSituationPointsApplicable
              }
            />
          </div>
        </div>

        <section className="relative container mx-auto py-5">
          <div className="flex flex-wrap md:flex-nowrap space-y-4 md:space-y-0 sm:space-x-2">
            <Link href="/houses">
              <button className="button-outline w-full sm:w-1/2">
                Terug naar overzicht
              </button>
            </Link>
            <button
              disabled={isReacting || houseDetail.match.hasReacted}
              className={`w-full button-primary sm:w-1/2 ${
                isReacting || houseDetail.match.hasReacted
                  ? "button-primary-disabled"
                  : ""
              }`}
              onClick={() => reactToAdvert(houseDetail.advert)}>
              {isReacting ? (
                <ProgressSpinner text="Reageren..." />
              ) : (
                <span>
                  {houseDetail.match.hasReacted
                    ? "U heeft al gereageerd op deze woning"
                    : "Reageren op deze woning"}
                </span>
              )}
            </button>
          </div>
        </section>

        <section className="relative container mx-auto  py-10 space-y-10">
          <div className="border-b border-l border-r rounded-md overflow-hidden shadow-sm">
            <div className="flex justify-between items-center py-4 px-4 lg:px-8 bg-limeade">
              <h2 className="text-white text-xl lg:text-2xl font-medium">
                Uw huidige gegevens
              </h2>
              <Link href="/profile">
                <a className="border border-transparent  text-white border-white hover:border-limeade-600 focus:outline-none py-3 px-5 rounded-md">
                  Profiel aanpassen
                </a>
              </Link>
            </div>
            <ul className="divide-y divide-[#EFEFEF] text-gray-500 px-4">
              <UserInfoListItem
                icon={"register.svg"}
                infoField="Inschrijfnummer"
                infoValue={user?.registrationnumber}
              />
              <UserInfoListItem
                icon={"avatar.svg"}
                infoField="Naam"
                infoValue={user ? user.initials + " " + user.lastname : ""}
              />
              <UserInfoListItem
                icon={"residential-address.svg"}
                infoField="Adres"
                infoValue={
                  user
                    ? user.street + " " + user.housenumber + " " + user.city
                    : ""
                }
              />
              <UserInfoListItem
                icon={"phone.svg"}
                infoField="Telefoonnummer"
                infoValue={user?.phone.mobile}
              />
              <UserInfoListItem
                icon={"phone.svg"}
                infoField="Telefoonnummer 2"
                infoValue={user?.phone.landline}
              />
              <UserInfoListItem
                icon={"mail.svg"}
                infoField="Email"
                infoValue={user?.email}
              />
              <UserInfoListItem
                icon={"calendar.svg"}
                infoField="Geboortedatum"
                infoValue={moment(user?.dob).format("DD MMMM YYYY")}
              />
              <UserInfoListItem
                icon={"coins.svg"}
                infoField="Bruto jaarinkomen"
                infoValue={user?.income}
              />
              <UserInfoListItem
                icon={"avatar.svg"}
                infoField="Aantal personen"
                infoValue={houseDetail.requirements.household.max}
              />
            </ul>
          </div>

          <p className="text-gray-400 lg:text-lg">
            * Uw gegevens kunnen van belang zijn voor uw positie op de
            kandidatenlijst. Controleer ze dus goed en pas de gegevens zo nodig
            aan door te klikken op
            <span className="text-primary pl-1.5">'Profiel aanpassen'</span>. U
            bent zelf verantwoordelijke voor de juistheid.
          </p>

          <div className="text-center">
            {errorMessage && (
              <div className="text-yellow-400 text-sm mb-2">
                <b>Error: </b>
                {errorMessage}
              </div>
            )}
          </div>

          <div className="flex flex-wrap md:flex-nowrap space-y-4 md:space-y-0 sm:space-x-2">
            <Link href="/houses">
              <button className="button-outline w-full sm:w-1/2">
                Terug naar overzicht
              </button>
            </Link>
            <button
              disabled={isReacting || houseDetail.match.hasReacted}
              className={`w-full button-primary sm:w-1/2 ${
                isReacting || houseDetail.match.hasReacted
                  ? "button-primary-disabled"
                  : ""
              }`}
              onClick={() => reactToAdvert(houseDetail.advert)}>
              {isReacting ? (
                <ProgressSpinner text="Reageren..." />
              ) : (
                <span>
                  {houseDetail.match.hasReacted
                    ? "U heeft al gereageerd op deze woning"
                    : "Reageren op deze woning"}
                </span>
              )}
            </button>
          </div>
        </section>
      </div>

      <PopUp
        onClose={() => {
          setIsReacting(false);
          setErrorMessage("");
          setReactModelVisible(false);
          router.push("/houses");
        }}
        show={reactModelVisible}
        className={"w-[90%] sm:w-1/2 p-2 text-center"}
        titleClassName={"text-center mt-2"}
        title={"Wij hebben uw reactie op deze woning ontvangen!"}>
        <div className="flex place-content-center mt-5">
          <img
            src="/images/reaction-img.png"
            className="w-[97px] xl:w-[150px] 3xl:w-[202px] aspect-[101/92] -rotate-[30deg] hover:rotate-0 duration-300 ease-in transition-all shadow-lg  rounded-full   mb-8"
          />
        </div>

        {houseDetail.details.mraSituationPointsApplicable == true && (
          <p className="text-base md:text-lg mb-8">
            U heeft gereageerd met uw eventuele situatiepunten
            {/* <br />
            Uw puntentotaal voor deze woning is X */}
          </p>
        )}

        {houseDetail.details.mraSituationPointsApplicable == false && (
          <p className="text-base md:text-lg mb-8">
            Uw eventuele situatiepunten zijn voor deze woning niet inzetbaar en
            tellen niet mee in uw puntentotaal.
          </p>
        )}

        <div className="flex flex-col items-center justify-center space-y-4">
          <div>
            <Link href="/react">
              <a className="button-outline-white w-full md:w-3/4">
                Mijn reacties
              </a>
            </Link>
          </div>
          <Link href="/houses">
            <a className="button-plane font-semibold">MIJN WONINGAANBOD</a>
          </Link>
        </div>
      </PopUp>
    </Layout>
  );
};

const UserInfoListItem = ({ icon, infoField, infoValue }) => {
  return (
    <li className="grid grid-cols-8 items-center space-x-4 lg:space-x-8 px-2 lg:px-4">
      <div className="flex whitespace-nowrap col-span-4 sm:col-span-3 items-center space-x-3 w-auto md:w-1/3 lg:w-1/5 py-2 font-medium">
        <img
          src={"/images/" + icon}
          className="h-[10px] xl:h-[16px] 3xl:h-[22px] w-auto"
        />
        <span>{infoField}:</span>
      </div>
      <div className="col-span-4 sm:col-span-5 text-left">
        <p className="">{infoValue}</p>
      </div>
    </li>
  );
};

export const PointsSummary = ({
  totalPoints,
  waitingPoints,
  searchPoints,
  situationPoints,
  situationPointsApplicable,
}) => {
  const pointsSummary = [
    {
      title: "Totaal Punten",
      number: totalPoints,
      isTotal: true,
      situationPointsApplicable: situationPointsApplicable,
    },
    {
      title: "Wachtpunten",
      number: waitingPoints,
      icon: "/images/hourglass.svg",
      situationPointsApplicable: situationPointsApplicable,
    },
    {
      title: "Zoekpunten",
      number: searchPoints,
      icon: "/images/points-search.svg",
      situationPointsApplicable: situationPointsApplicable,
    },
    {
      title: "Situatiepunten",
      number: situationPoints,
      icon: "/images/file-p.svg",
      situationPointsApplicable: situationPointsApplicable,
      isSituation: true,
    },
  ];
  return (
    <div className="w-full relative">
      <div className="grid grid-cols-1 sm:grid-cols-4 ">
        {pointsSummary.map((point, i) => (
          <PointCard key={i} {...point} />
        ))}
      </div>
    </div>
  );
};

const PointCard = ({
  title,
  number,
  icon = "",
  isTotal = false,
  isSituation = false,
  situationPointsApplicable = false,
}) => {
  return (
    <div className="sm:flex items-center">
      {!isTotal && (
        <div className="h-6 w-[1px] sm:h-[1px] mx-auto sm:w-6 bg-tertiary"></div>
      )}
      <div
        className={`${
          isTotal
            ? "text-white, bg-tertiary !text-white"
            : " border-tertiary text-primary shadow-lg bg-white"
        }  flex-1 justify-between px-4 pt-4 pb-2 rounded-md border`}>
        <div className="flex">
          {icon && (
            <div className="mr-3">
              <img
                src={icon}
                className="h-[16px] xl:h-[24px] 3xl:h-[33px] w-auto"
              />
            </div>
          )}
          <div
            className={`${
              isTotal ? "text-white" : "text-gray-900"
            } font-semibold `}>
            {title}
            {!situationPointsApplicable && (
              <span className={`font-thin`}>
                <br />
                {isSituation && "Telt niet mee voor deze woning"}
              </span>
            )}
          </div>
        </div>
        <div className="text-5xl  text-right">{number}</div>
      </div>
      {isTotal && (
        <div className="h-8 w-[1px] sm:h-[1px] mx-auto sm:w-8 bg-tertiary"></div>
      )}
    </div>
  );
};

export default ReactPage;
