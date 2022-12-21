import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { BGWrapper } from "../../components/BGWrapper";
import { Calendar } from "../../components/calendar/Calendar";
import { PointHistoryCard } from "../../components/Cards/PointHistoryCard";
import Layout from "../../components/Layouts/SiteLayout";
import { PointsSelector } from "../../components/points/PointsSelector";
import { SearchPoints } from "../../components/points/SearchPoints";
import { SituationPoints } from "../../components/points/SituationPoints";
import { TotalPoints } from "../../components/points/TotalPoints";
import { WaitPoints } from "../../components/points/WaitPoints";
import { MraReactions } from "../../interfaces/mra-reactions";
import { PointsCalculations, RelatedEvent } from "../../interfaces/points copy";
import EventEmitter from "../../lib/EventEmitter";
import { getPointsCalculations, getMraReactions } from "../../lib/points";
import { getUserSummary } from "../../lib/user-details";

export async function getServerSideProps(context) {
  let pointsCalculations: PointsCalculations[] = [];
  let mraReactions: MraReactions = null;
  const userDetails = await getUserSummary(context.req);
  const pointsCalcResults = await getPointsCalculations(context.req);
  const mraReactionsResults = await getMraReactions(context.req);

  if (pointsCalcResults?.data) {
    pointsCalculations = pointsCalcResults.data;
  }
  if (mraReactionsResults) {
    mraReactions = mraReactionsResults;
  }
  return { props: { userDetails, pointsCalculations, mraReactions } };
}

const PointsPage: React.FC<any> = ({
  userDetails,
  pointsCalculations,
  mraReactions,
}: {
  userDetails: any;
  pointsCalculations: PointsCalculations[];
  mraReactions: MraReactions;
}) => {
  const sideRef = useRef(null);
  const [showCalender, setShowCalendar] = useState(false);
  const [currentInfo, setCurrentInfo] = useState("situationPoints");

  const toggleCalendar = () => {
    setShowCalendar(!showCalender);
  };

  return (
    <Layout title="My Points">
      <div className="mb-20">
        <div
          className={`md:w-full md:flex flex-col md:h-[calc(100vh_-_55px)] 3xl:h-[calc(100vh_-_85px)]`}>
          <BGWrapper
            gradientOverLay={false}
            image={"/images/points-bg-2.png"}
            className={""}>
            <div className="container grid place-content-center h-[calc(100vh_-_55px)] md:h-full items-center md:flex md:justify-between text-white ">
              <div className="flex text-white w-full">
                <div className=" flex-1">
                  <h1 className="text-[30px] xl:text-[40px] 3xl:text-[50px] mb-8 font-medium">
                    Mijn Punten
                  </h1>
                  <div className="3xl:h-[500px] xl:h-[350px] h-[243px] grid grid-cols-7 grid-rows-2 gap-3">
                    <div className="col-span-3 rounded-md flex flex-col justify-between ">
                      <TotalPoints
                        points={userDetails.person.pointspec.points.total}
                        lastUpdated={userDetails.person.pointspec.updated.slice(
                          0,
                          -9
                        )}
                      />
                    </div>
                    <div className="col-span-1 flex flex-col overflow-clip  rounded-md">
                      <PointsSelector
                        points={Math.floor(
                          userDetails.person.pointspec.points.wait
                        )}
                        label={"Wachtpunten"}
                        icon={"/images/hourglass.svg"}
                        click={() => {
                          setCurrentInfo("waitPoints");
                        }}
                        isActive={currentInfo == "waitPoints"}
                      />
                    </div>
                    <div className="col-span-1 flex flex-col overflow-clip  rounded-md">
                      <PointsSelector
                        points={userDetails.person.pointspec.points.search}
                        label={"Zoekpunten"}
                        icon={"/images/search3.svg"}
                        click={() => {
                          setCurrentInfo("searchPoints");
                        }}
                        isActive={currentInfo == "searchPoints"}
                      />
                    </div>
                    <div className="col-span-1 flex flex-col overflow-clip  rounded-md">
                      <PointsSelector
                        points={userDetails.person.pointspec.points.situation}
                        label={"Situatiepunten"}
                        icon={"/images/profile-exclamation.svg"}
                        click={() => {
                          setCurrentInfo("situationPoints");
                        }}
                        isActive={currentInfo == "situationPoints"}
                      />
                    </div>
                    <div className="col-span-4 col-start-4 row-start-1 row-span-2 overflow-hidden bg-white rounded-md">
                      {currentInfo == "situationPoints" && <SituationPoints />}
                      {currentInfo == "searchPoints" && (
                        <SearchPoints
                          mraReactions={mraReactions}
                          points={userDetails.person.pointspec.points.search}
                        />
                      )}
                      {currentInfo == "waitPoints" && <WaitPoints />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BGWrapper>

          <section className="flex overflow-x-clip  split-color-bg-gray-white lg:h-[55px] xl:h-[82px] 3xl:h-[110px] ">
            <div className="container h-full">
              <div className="flex w-full h-full">
                <div className="flex-1 bg-[#D6D6D6] flex points-container  items-center">
                  <div className="flex points-container justify-between items-center">
                    <div className="flex items-center">
                      <div className="font-bold 3xl:text-[20px] xl:text-[15px] text-[10px]">
                        Filter
                      </div>
                      <div className="flex realtive items-center ml-4 relative border border-white rounded-md p-2 space-x-2">
                        <div>
                          <img src="/images/calendar2.svg" />
                        </div>
                        <div
                          onClick={toggleCalendar}
                          className="3xl:text-[14px] cursor-pointer xl:text-[10px] text-[8px] ">
                          <div>15. 2. 2022 - 10. 3. 2022</div>
                        </div>
                        <div>
                          <img src="/images/caret_down_white.svg" />
                        </div>
                        <div
                          className={`absolute top-10 transition-all ${
                            showCalender ? "visible" : "invisible"
                          }`}>
                          <Calendar />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center  shadow-mdml-4 border border-white rounded-md p-2 space-x-2">
                      <div>
                        <img
                          src="/images/pdf-file.png"
                          className="3xl:h-[30px] xl:h-[22px] h-[15px]"
                        />
                      </div>
                      <div className="3xl:text-[20px] xl:text-[15px] text-[10px]">
                        Download
                      </div>
                    </div>
                  </div>
                </div>
                <div className="points-side-bar relative  h-full">
                  <div className="h-[5px] absolute left-0 w-[2000px] top-0 bg-white drop-shadow-lg"></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {pointsCalculations && (
          <section className="flex -mb-[100px] split-color-bg-light-gray-white  ">
            <div className="container ">
              <div className="flex w-full mb-[20px] ">
                <div className="flex-1 bg-[#FAFAFA]  flex points-container">
                  <div className="points-container  mb-[100px]">
                    {pointsCalculations?.map((pointsCalculation, i) => (
                      <PointHistoryCard
                        key={i}
                        pointsCalculation={pointsCalculation}
                      />
                    ))}
                  </div>
                </div>
                <div ref={sideRef} className="points-side-bar h-full relative ">
                  <MoreInfo parentRef={sideRef} />
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export const MoreInfo = ({ parentRef }) => {
  const [top, setTop] = useState(20);
  const [gebeurtenissen, setGebeurtenissen] = useState([]);
  const [height, setHeight] = useState(0);

  const childRef = useRef(null);

  useEffect(() => {
    const onSelectedItemEvent = (data: {
      top: number;
      relatedEvents: RelatedEvent[];
    }) => {
      let parentTop = parentRef.current.getBoundingClientRect().y;

      setTop(data.top - parentTop);
      setGebeurtenissen(data.relatedEvents);

      setTimeout(() => {
        setHeight(childRef.current?.offsetHeight);
      }, 10);
    };

    const linstener = EventEmitter.addListener(
      "pointHistoryItemSelected",
      onSelectedItemEvent
    );

    return () => {
      linstener.remove();
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      doOnWindowResize();
    });
    doOnWindowResize();
  }, []);

  const doOnWindowResize = () => {
    if (childRef?.current) {
      setHeight(childRef.current.offsetHeight);
    }
  };

  return (
    <>
      <div style={{ height: height + 200 }}>
        {gebeurtenissen.length > 0 && (
          <div
            ref={childRef}
            style={{ top: top - 35 }}
            className="absolute left-0 right-0 translate-all duration-300 bg-white p-4 rounded-lg">
            <div className="font-bold mb-4">Details activiteiten</div>
            {gebeurtenissen.map((relatedEvent, index) => (
              <MoreInfoItem
                relatedEvent={relatedEvent}
                isLast={gebeurtenissen.length - 1 == index}
                key={index}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export const MoreInfoItem = ({
  relatedEvent,
  isLast,
}: {
  relatedEvent: RelatedEvent;
  isLast: boolean;
}) => {
  const detailsType = relatedEvent.type.code;

  const isSuccess = [
    "REA",
    "IWH",
    "IWN",
    "INS",
    "TOE",
    "NIE",
    "GEW",
    "BSI",
    "BST",
    "GSI",
    "GSA",
  ].includes(relatedEvent.type.code);
  let icon = "dash.svg";

  if (["REA"].includes(relatedEvent.type.code)) {
    icon = "comment.svg";
  } else if (
    [
      "IWH",
      "IWN",
      "INS",
      "TOE",
      "NIE",
      "GEW",
      "BSI",
      "BST",
      "GSI",
      "GSA",
    ].includes(relatedEvent.type.code)
  ) {
    icon = "check.svg";
  } else if (["WEH", "WEN", "NOS"].includes(relatedEvent.type.code)) {
    icon = "x.svg";
  }

  return (
    <div className="flex ">
      <div className="flex-wrap mr-5 ">
        <div className="flex h-full flex-col">
          <div
            className={`w-[40px] grid place-items-center rounded-full aspect-square ${
              isSuccess ? "bg-primary" : "bg-red-500/50"
            } `}>
            <img src={`images/${icon}`} />
          </div>
          {!isLast && (
            <div className="w-[1px]  flex-1 m-auto bg-gray-200"></div>
          )}
        </div>
      </div>
      <div className="flex-1 pb-10">
        <div className="text-16 font-bold text-gray-900">
          {relatedEvent.type.friendlytext}
        </div>
        <div className="text-14 text-gray-900 mt-1">
          <p>
            {relatedEvent.address.street} {relatedEvent.address.housenumber}
          </p>
          <p>
            {relatedEvent.address.zipcode} in {relatedEvent.address.city}
          </p>
          {relatedEvent.metadata.origin !== null && (
            <p>Actie uitgevoerd in: {relatedEvent.metadata.origin}</p>
          )}
        </div>
        <div className="text-14 font-bold text-gray-500 mt-1">
          {moment(relatedEvent?.date).format("DD MMMM YYYY | HH:mm uur")}
        </div>
      </div>
    </div>
  );
};

export default PointsPage;
