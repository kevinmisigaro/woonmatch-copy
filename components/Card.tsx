import Link from "next/link";
import { House } from "../interfaces/index";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";

type Props = {
  house: House;
  isPrivate: boolean;
  horizontal: boolean;
};

const Card: React.FC<any> = ({
  house,
  isPrivate = false,
  horizontal = false,
}: Props) => {
  const [isOver, setIsOver] = useState(false);
  const handleOnMouseOver = (isOver) => {
    setIsOver(isOver);
  };

  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/houses/${house.advert}`);
      }}
      onMouseOver={() => handleOnMouseOver(true)}
      onMouseOut={() => handleOnMouseOver(false)}
      className={`overflow-hidden ${
        horizontal ? "rounded-r-md" : "rounded-b-md shadow-xl"
      }`}>
      <div
        className={`overflow-hidden cursor-pointer ${
          horizontal ? "sm:flex" : ""
        }`}>
        {/* Card Header */}
        <div
          className={`relative aspect-video ${
            horizontal ? "w-full sm:w-[48%]" : "w-full"
          } `}>
          <div
            className={`w-full h-full grid place-content-center  overflow-hidden`}>
            <img
              style={{
                transform: isOver ? "scale(1.1)" : "scale(1)",
                transition: "transform .3s ease-out",
              }}
              src={`${house.files.thumbnail}`}
            />
          </div>
          <div
            className={`absolute top-0 house-card-bg right-0 bottom-0 left-0 flex flex-col justify-between w-full h-full text-white  2xl:p-[30px] p-[15px] xl:p-[20px]`}>
            <div className="flex justify-between space-x-4 ">
              <div className="space-y-[5px] xl:space-y-[7.5px] 3xl:space-y-[10px]">
                {house.details?.mraSituationPointsApplicable && (
                  <div className="card-tag">Situatiepunten</div>
                )}
                {house.details.bannerlist.map((label) => (
                  <div className="card-tag">{label}</div>
                ))}
              </div>
              {/* {!horizontal && <ReactButton />} */}
            </div>
            <div className="flex lg:flex-nowrap justify-between items-center  md:space-x-4 ">
              <a href="#" className="flex items-center space-x-3">
                <img
                  src="/images/location_marker.svg"
                  className="w-[12px] xl:w-[18px] 2xl:w-[25px]"
                />
                <div className="border-b-[1px] text-[12px]  xl:text-[16px] 2xl:text-[20px] border-transparent hover:border-white leading-none transition duration-500 ease-in-out">
                  {house.address.street} {house.address.number}{" "}
                  {house.address.city}
                </div>
              </a>
              <div className="card-tag">
                Reageren t/m{" "}
                {moment(house.period.end.split(" ")[0]).format("DD MMMM YYYY")}
              </div>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div
          className={`bg-white divide-y flex flex-1 flex-col divide-fuscous-gray-100  text-gray-400`}>
          <div
            className={`flex flex-col flex-1 justify-between space-y-[16px] ${
              horizontal
                ? "justify-between px-[8%] py-[4%] "
                : "space-y-[5px] 3xl:space-y-[22px]  p-[15px] 2xl:p-[30px] xl:p-[20px]  pb-4 pt-2 "
            }`}>
            <div className="flex justify-between items-center space-x-4">
              <Link href={`/houses/${house.advert}`}>
                <a className="text-gray-500 hover:text-primary font-semibold">
                  <h2 className="text-title">{house.details.type}</h2>
                </a>
              </Link>
              {!horizontal && <EnergyScore value={house.details.energyScore} />}
            </div>

            <p className="text-primary text-title font-normal ">
              &euro;{" "}
              {parseFloat(house.details.grossrent).toLocaleString("nl-NL", {
                minimumFractionDigits: 2,
              })}{" "}
              per maand
            </p>

            <p className="pr-[15%] ">
              {house.details.title ? house.details.title : house.details.type}
            </p>

            <div className="flex flex-wrap ">
              <div className="flex items-center space-x-2 mr-6">
                <img src="/images/bed.svg" className="h-[20px] 2xl:h-[25px]" />
                <span>{house.details.bedrooms}</span>
              </div>
              <div className="flex items-center space-x-2 mr-6">
                <img
                  src="/images/house-plan.svg"
                  className="h-[20px] 2xl:h-[25px]"
                />
                <span>
                  {house.details.surface} m<sup>2</sup>
                </span>
              </div>

              {/* <div className="flex space-x-2 shadow-sm shadow-bay-of-many xl:shadow-md xl:shadow-bay-of-many xl:border-bay-of-many bg-white items-center border  py-[4px] xl:py-[7px] 3xl:py-[10px] px-2 rounded-[2px] xl:rounded-[4px] 3xl:rounded-[5px] ">
                <img
                  src="/images/comments.svg"
                  className="h-[13px] xl:h-[21px] 3xl:h-[28px]"
                />
                <span>Zeer veel reacties: {house.reactionCount}</span>
              </div> */}
            </div>
          </div>
          <div className="flex flex-wrap justify-between items-center mt-2 md:space-x-4 py-[8px] xl:py-[12px] 3xl:py-[16px] px-4 xl:px-6">
            <div>
              {house?.match?.barometer && (
                <p className="text-primary text-20">
                  Positie {house?.match?.barometer ? house.match.barometer : 0}{" "}
                  van {house.reactionCount + 1}
                </p>
              )}
            </div>

            <img
              src={house.corporation.image}
              alt={house.corporation.name}
              className="w-auto h-[22px] 3xl:h-[35px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReactButton = ({ isReacted = false, onClick = undefined }) => {
  const [isOver, setIsOver] = useState(false);

  const handleOnMouseOver = (isOver) => {
    setIsOver(isOver);
  };

  return (
    <button
      onClick={() => {
        onClick ? onClick() : undefined;
      }}
      onMouseOver={() => handleOnMouseOver(true)}
      onMouseOut={() => handleOnMouseOver(false)}
      className="drop-shadow-lg flex justify-center items-center rounded-md h-[32px] xl:h-[50px] 3xl:h-[66px] aspect-square bg-white">
      <svg
        style={{
          transform: isOver ? "scale(.6)" : "scale(.7)",
          transition: "transform .3s ease-out",
        }}
        width="100%"
        height="100%"
        viewBox="0 0 48.926 42.577">
        <path
          d="M206.936-2208.215a12.136,12.136,0,0,1,2.028,2.625,12.153,12.153,0,0,1,1.214,2.965,12.384,12.384,0,0,1,.4,3.135,12.25,12.25,0,0,1-.4,3.123,12.192,12.192,0,0,1-1.214,2.953,12.138,12.138,0,0,1-2.028,2.625l-19.819,19.553L167.3-2190.79a12.138,12.138,0,0,1-2.028-2.625,12.192,12.192,0,0,1-1.214-2.953,12.251,12.251,0,0,1-.4-3.123,12.385,12.385,0,0,1,.4-3.135,12.153,12.153,0,0,1,1.214-2.965,12.135,12.135,0,0,1,2.028-2.625,12.6,12.6,0,0,1,4.055-2.671,12.466,12.466,0,0,1,4.766-.927,12.465,12.465,0,0,1,4.766.927,12.6,12.6,0,0,1,4.056,2.671l2.178,2.173,2.177-2.173a12.6,12.6,0,0,1,4.056-2.671,12.465,12.465,0,0,1,4.766-.927,12.465,12.465,0,0,1,4.766.927A12.6,12.6,0,0,1,206.936-2208.215Z"
          transform="translate(-162.654 2212.813)"
          stroke="#3aa935"
          strokeLinejoin="round"
          strokeWidth="2"
          style={{
            fill: isOver ? "#3aa935" : "#ffffff",
            transition: "fill .3s ease-out",
          }}
        />
      </svg>
    </button>
  );
};

export const EnergyScore = ({ value }) => {
  const getColor = (value) => {
    switch (value) {
      case "A":
      case "B":
        return "#49BF49";
      case "C":
        return "#8FB23E";
      case "D":
        return "#9FB23E";
      case "E":
        return "#F5A52E";
      case "F":
        return "#F55A2E";

      default:
        return "#6A6A66";
    }
  };

  return (
    <div className="relative grid  place-content-center">
      <div className="w-[25px] xl:w-[39px] 3xl:w-[52px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 52.262 32">
          <path
            id="Icon_material-label"
            data-name="Icon material-label"
            d="M44.742,9.42A5.886,5.886,0,0,0,40.258,7.5L10,7.523c-3.026,0-5.5,2.034-5.5,4.549V34.929c0,2.514,2.476,4.549,5.5,4.549l30.257.023a5.886,5.886,0,0,0,4.484-1.92L56.762,23.5Z"
            transform="translate(-4.5 -7.5)"
            fill={getColor(value)}
          />
        </svg>
      </div>
      <div className="absolute grid place-content-center h-full w-[82%]  text-white text-[80%]  font-bold">
        {value}
      </div>
    </div>
  );
};

export default Card;
