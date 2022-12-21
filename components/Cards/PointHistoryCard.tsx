import moment from "moment";
import { useRef } from "react";
import {
  EventCategory,
  PointsCalculations,
  RelatedEvent,
} from "../../interfaces/points copy";

import EventEmitter from "../../lib/EventEmitter";
export const PointHistoryCard = ({
  pointsCalculation,
}: {
  pointsCalculation: PointsCalculations;
}) => {
  return (
    <div className="w-ful  mt-8">
      <div className="w-ful mb-3">
        <div className="flex justify-between">
          <div className="text-20 text-primary">
            {moment(pointsCalculation.metadata.calculationDate).format(
              "DD MMMM YYYY"
            )}
          </div>
          <div className="text-18">
            U heeft deze maand{" "}
            <span
              className={`${
                pointsCalculation.points.totalNewThisMonth > 0
                  ? "text-primary"
                  : "text-[#DA1E27]"
              }`}>
              {Math.abs(pointsCalculation.points.totalNewThisMonth)}
            </span>{" "}
            punt{Math.abs(pointsCalculation.points.totalNewThisMonth) === 1 ?'' : 'en'} {pointsCalculation.points.totalNewThisMonth >= 0 ? 'opgebouwd' : 'verloren'}
          </div>
        </div>
      </div>
      <div className=" w-full border-2 border-primary rounded-lg overflow-hidden ">
        <div className="flex  first-letter: bg-primary p-3">
          <div className="point-card-description text-white flex-1  text-20">
            Wij hebben uw puntensaldo bijgewerkt
            <br />
            Uw puntentotaal voor de maand{" "}
            {moment(pointsCalculation.metadata.calculationDate).format(
              "MMMM"
            )}{" "}
            is
          </div>
          <div className="point-card-points text-right">
            <div className="text-18 text-white/70">Punten</div>
            <div className="text-20 text-white">
              {pointsCalculation.points.total}
            </div>
          </div>
        </div>
        {pointsCalculation.eventCategories.map((eventCategory, i) => (
          <PointHistoryItem key={i} eventCategory={eventCategory} />
        ))}
      </div>
    </div>
  );
};

const PointHistoryItem = ({
  eventCategory,
}: {
  eventCategory: EventCategory;
}) => {
  const itemRef = useRef(null);

  const totalPoints =
    eventCategory.pointChanges.search +
    eventCategory.pointChanges.situation +
    eventCategory.pointChanges.start;

  let icon = "";

  switch (eventCategory.type.code) {
    case "PZO":
      icon = "search3.svg";
      break;
    case "REA":
      icon = "reaction-points.svg";
      break;
    case "PST":
      icon = "starting-points.svg";
      break;
    default:
      icon = "";
      break;
  }

  const selectItem = (relatedEvents: RelatedEvent[]) => {
    let top = itemRef?.current?.getBoundingClientRect().y;

    EventEmitter.emit("pointHistoryItemSelected", { top, relatedEvents });
  };

  return (
    <div
      ref={itemRef}
      onClick={() => selectItem(eventCategory.relatedEvents)}
      className={`flex justify-between p-3 bg-white my-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#E1E3DD]`}>
      <div className="point-card-description-hi text-20 ">
        <div className="text-gray-400 text-18">Actie</div>
        <div className="flex items-start mt-3">
          {icon && (
            <img src={`/images/${icon}`} className="h-[20px] mr-2 mt-[3px]" />
          )}
          <div className="text-20">{eventCategory.type.name}</div>
        </div>
      </div>
      <div className="point-card-points text-right">
        <div className="text-gray-400 text-18">Punten</div>
        <div
          className={`text-20 mt-3 ${
            totalPoints > 0 ? "text-primary" : "text-[#DA1E27]"
          }`}>
          {totalPoints > 0
            ? "+" + totalPoints
            : totalPoints == 0
            ? 0
            : totalPoints}
        </div>
      </div>
    </div>
  );
};
