import Link from "next/link";
import { useRouter } from "next/router";
import "react-confirm-alert/src/react-confirm-alert.css";
import { clientRequest, xhrRequest } from "../../network/network";
import { House, SubmissionStatus } from "../../interfaces/index";
import { EnergyScore } from "../Card";
import { useEffect, useState } from "react";
import { PopUp } from "../ui/PopUp";
import { ProgressSpinner } from "../ui/ProgressSpinner";
import moment from "moment";

type Prop = {
  contentObject: any;
  mini: boolean;
  isArchive?: boolean;
  parentRef?: any;
  reactionStatus?: string;
};

const ReactedCard: React.FC<any> = ({
  contentObject,
  isArchive = false,
  mini = true,
  reactionStatus,
  parentRef = null,
}: Prop) => {
  const router = useRouter();
  const [width, setWidth] = useState(400);
  const [deleteModelVisible, setdeleteModelVisible] = useState<boolean>(false);
  const [confirmDeleteModelVisible, setConfirmDeleteModelVisible] =
    useState<boolean>(false);
  const [modalIsLoading, setmodalIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const doOnWindowResize = () => {
    if (isArchive)
      if (parentRef?.current) {
        setWidth(parentRef.current.offsetWidth / 2 - 30);
      }
  };

  useEffect(() => {
    if (isArchive) {
      window.addEventListener("resize", () => {
        doOnWindowResize();
      });
      doOnWindowResize();
    }
  }, []);

  const confirmDeleteReaction = async () => {
    setdeleteModelVisible(false);
    if (!modalIsLoading) {
      setErrorMessage("");
      setmodalIsLoading(true);

      const results = await clientRequest<House>("DELETE", {
        path: "/houses/react",
        data: { advert: contentObject.advert },
      });

      setmodalIsLoading(false);

      if (!results.isAxiosError) {
        setConfirmDeleteModelVisible(false);
        setdeleteModelVisible(true);
      } else {
        let errors = results.response.data.data?.errors;
        let message = "";

        if (errors?.length > 0) {
          message = errors[0].text;
        } else {
          message = "Unknown error";
        }

        setErrorMessage(message);
      }
    }
  };

  const getToken = async () => {
    const tokenOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const tokenResponse = await fetch(`/api/auth/getcookietoken`, tokenOptions);
    const json_tokenResponse = await tokenResponse.json();

    let token = json_tokenResponse.data;
    return token;
  };

  const updateMeetingAtendance = async (letter: any) => {

    const letterId = letter.letter;
    const willAttendMeeting = !letter.advert.reaction.status.willAttendMeeting;
    const token = await getToken();

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        willAttendMeeting,
      })
    };

    const response = await fetch(
        (process.env.NEXT_PUBLIC_API_URL ||
            "https://acceptatie.woonmatchwaterland.nl/api_neo/v3/index.cfm?endpoint=") +
          `/letter/${letterId}/data`,
        options
    );

    if (response.status == 200) {
      router.reload();
      //window.location.reload(false);
    }
  };

  return (
    <div
      className={`mb-20 ${
        isArchive ? "mr-[30px] w-[300px] xl:w-[462px] 3xl:w-[616px]" : ""
      } `}>
      <div
        className={`${
          isArchive ? "" : "grid grid-cols-1 lg:grid-cols-5 gap-2 mb-5"
        }`}>
        {/* Image Card */}
        <div
          className={`${
            !mini ? "rounded-b-md" : ""
          } bg-white col-span-2  shadow-lg overflow-hidden`}>
          <div
            className="relative aspect-[685/473] w-full"
            style={{
              backgroundImage: `url(${contentObject?.img})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundColor: "#878787",
              backgroundBlendMode: "multiply",
            }}>
            <div className="flex flex-col justify-between w-full h-full text-white p-4">
              <div className="space-y-4">
                {contentObject.details?.mraSituationPointsApplicable && (
                  <div className="card-tag">Situatiepunten</div>
                )}
                {contentObject?.details?.bannerlist?.map(
                  (label, index: number) => (
                    <div key={index} className="card-tag">
                      {label}
                    </div>
                  )
                )}
              </div>

              <div className="flex justify-end items-center text-sm 2xl:text-base">
                <Link href={`/houses/${contentObject.advert}`}>
                  <a className="card-tag !bg-tertiary ">
                    Bekijk details woning
                  </a>
                </Link>
              </div>
            </div>
          </div>

          {!mini && (
            <div className="p-4 lg:p-8 space-y-10 ">
              <div className="space-y-2">
                <div className="text-gray-400">Huurprijs</div>
                <div className="text-primary">
                  {parseFloat(contentObject?.details.grossrent).toLocaleString(
                    "nl-NL",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}{" "}
                  per maand
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-gray-400">Servicekosten</div>
                <div className="text-primary text-[15px] xl:text-[23px] 3xl:text-[30px]">
                  {parseFloat(
                    contentObject?.details.servicecosts
                  ).toLocaleString("nl-NL", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  per maand
                </div>
              </div>
            </div>
          )}
        </div>

        {isArchive && (
          <div className="rounded-b-md bg-white overflow-hidden border-2 border-gray-200">
            <div className="bg-gray-200 rounded-b-md adv-list-item-justified !flex">
              <h2 className="text-gray-500 3xl:text-[25px] xl:text-[18px] text-[12px] font-medium">
                {contentObject?.address.street}{" "}
                {contentObject?.address.housenumber},{" "}
                {contentObject?.address.city}
              </h2>
            </div>
            <ul className="">
              <li className="adv-list-item-justified grid-cols-5">
                <span className="font-medium col-span-3">
                  U bent geëindigd op positie
                </span>
                <span className="col-span-2">{contentObject?.position}</span>
              </li>

              <li className="adv-list-item-justified grid-cols-5">
                <span className="font-medium col-span-3">
                  Advertentie gesloten
                </span>
                <span className="col-span-2">
                  {moment(contentObject?.periodEnd).format("DD MMMM YYYY")}
                </span>
              </li>
            </ul>
          </div>
        )}

        {/* Content Card */}

        {!isArchive && (
          <div className="col-span-3 flex-col flex justify-between">
            <div className="border-b   rounded-md bg-white overflow-hidden shadow-sm">
              <div className="flex justify-between items-center py-4 px-4 lg:px-8 bg-primary">
                <h2 className="text-white 3xl:text-[30px] xl:text-[22px] text-[15px] font-medium">
                  {contentObject?.address.street}{" "}
                  {contentObject?.address.number}, {contentObject?.address.city}
                </h2>
              </div>

              {mini ? (
                <ul className="">
                  <li className="adv-list-item-justified">
                    <span className="font-medium">Uw postie</span>
                    <span>{contentObject?.position}</span>
                  </li>
                  <li className="adv-list-item-justified">
                    <span className="font-medium">
                      Looptijd van de advertentie
                    </span>
                    <p className="flex-grow">{contentObject?.runtime}</p>
                  </li>
                  <li className="adv-list-item-justified">
                    <span className="font-medium">
                      Advertentie staat op de site tot
                    </span>
                    <p className="flex-grow">
                      {moment(contentObject?.periodEnd).format("DD MMMM YYYY")}
                    </p>
                  </li>
                  <li className="adv-list-item-justified">
                    <span className="font-medium">Uw motivate</span>
                    <p className="flex-grow">{contentObject?.position}</p>
                  </li>
                </ul>
              ) : (
                <div className="border-2 border-gray-200 border-t-0 rounded-b-md">
                  <ul className="">
                    <li className="adv-list-item-justified">
                      <span className="font-medium">Uw huidige positie</span>
                      <span>{contentObject?.position}</span>
                    </li>
                    <li className="adv-list-item-justified">
                      <span className="font-medium">
                        Totaal aantal reacties
                      </span>
                      <span>{contentObject?.totalReactions}</span>
                    </li>
                    <li className="adv-list-item-justified">
                      <span className="font-medium">
                        Methode van toewijzing
                      </span>
                      <span>
                        {contentObject?.adverttype}
                      </span>
                    </li>
                    <li className="adv-list-item-justified">
                      <span className="font-medium">
                        Advertentie {contentObject?.runtime === undefined ? 'stond' : 'staat'} online tot en met
                      </span>
                      <span>
                        {moment(contentObject?.periodEnd).format(
                          "DD MMMM YYYY"
                        )}
                      </span>
                    </li>
                    <li className="adv-list-item-justified items-start !border-b-0">
                      <span className="font-medium">
                        Aantal dagen dat advertentie nog online staat
                      </span>
                      <span>
                        <span>
                          {contentObject?.runtime === undefined ? "De advertentie staat niet meer online" : contentObject?.runtime}

                        </span>
                        <div className="text-14">
                          {reactionStatus == "online" && (
                            <i>
                              Als u in aanmerking komt voor deze woning,
                              ontvangt u per e-mail een voorlopige aanbieding
                            </i>
                          )}
                          {reactionStatus == "offline" && (
                            <i>
                              Bij intrekken van uw reactie krijgt u afbouw van
                              punten
                            </i>
                          )}
                        </div>
                      </span>
                    </li>
                  </ul>

                  <hr className="my-4  mx-6 drop-shadow-md" />

                  <ul className="">
                    <li className="adv-list-item-justified">
                      <span className="font-medium">Woningtype</span>
                      <span>{contentObject?.details.type}</span>
                    </li>
                    <li className="adv-list-item-justified">
                      <span className="font-medium">Aantal slaapkamer</span>
                      <span>{contentObject?.details.bedrooms}</span>
                    </li>
                    <li className="adv-list-item-justified">
                      <span className="font-medium">Energielabel</span>
                      <div className=" flex">
                        <EnergyScore
                          value={contentObject.details.energylabel}
                        />
                      </div>
                    </li>
                    <li className="adv-list-item-justified !border-b-0">
                      <span className="font-medium"> Woningoppervlakte</span>
                      <span>
                        {" "}
                        {contentObject?.details.surface} m<sup>2</sup>
                      </span>
                    </li>
                  </ul>
                  <hr className="my-4  mx-6 drop-shadow-md" />
                  {contentObject?.letters && contentObject?.letters.length > 0 && (
                    <ul className="">
                      <li className="adv-list-item-justified">
                        <span className="font-medium">Ontvangen Berichten betreffende deze advertentie</span>
                      </li>
                      {contentObject?.letters.map((letter, index) => (
                        <li className={`adv-list-item-justified`} key={index}>
                            <span className="font-medium">
                                {letter?.name}
                            </span>
                          {letter?.advert.reaction !== null ? (
                              <span>
                                  {letter?.advert.reaction.status.hasReacted ? (
                                      <span>
                                          U heeft positief gereageerd
                                      </span>
                                  ) : (
                                      <span>
                                          U heeft nog niet gereageerd
                                      </span>
                                  )}
                              </span>
                              ) : (
                                <span>
                                    Geen reactie nodig
                                </span>
                              )}
                            <span>
                              Ontvangen op: {moment(letter?.regdate).format("DD MMMM YYYY [om] HH:mm")}
                            </span>
                          {
                            letter?.advert.reaction !== null &&
                            letter?.advert.reaction.status.hasReacted &&
                              letter?.type == "mra_invite_group" && (
                                <span>
                                  <div>
                                    {letter?.advert.reaction.status.willAttendMeeting ? (
                                        "U bent wel aanwezig bij de bezichtiging op " + moment(letter?.advert.reaction.meeting.date).format("DD MMMM YYYY [om] HH:mm") + " uur"
                                      ) : (
                                        "U bent niet aanwezig bij de bezichtiging " + moment(letter?.advert.reaction.meeting.date).format("DD MMMM YYYY [om] HH:mm") + " uur"
                                    )}
                                  </div>
                                  {!letter?.advert.reaction.meeting.meetingHappened && (
                                    <div>
                                      <button className={`button-primary button-small w-full text-xs px-4 py-2 mt-1`} onClick={() => {
                                        updateMeetingAtendance(letter)
                                      }}>
                                          {letter?.advert.reaction.status.willAttendMeeting ? (
                                            "Ik ben toch niet aanwezig"
                                          ) : (
                                            "Ik ben toch wel aanwezig"
                                          )}
                                      </button>
                                    </div>
                                  )}
                                </span>
                            )
                          }
                          {
                            letter?.advert.reaction !== null &&
                            !letter?.advert.reaction.status.hasReacted && (
                              <span>
                                <button className={`button-primary button-small w-full text-xs px-4 py-2 mt-1`} onClick={() => {
                                  // navigate(`/reageren/${letter?.advert.id}`)
                                    router.push(`/letters/${letter?.letter}`)
                                }}>
                                  Reageer nu!
                                </button>
                              </span>
                            )
                          }
                        </li>
                      ))}
                    </ul>
                  )}
                  {console.log(contentObject)}
                  {console.log(reactionStatus)}
                  <div className="p-6">
                    <button
                      disabled={contentObject.canBeRedacted === false ? true : false}
                      className={`w-full button-primary ${
                          contentObject.canBeRedacted === false
                          ? "button-primary-disabled"
                          : ""
                      }`}
                      onClick={() => setConfirmDeleteModelVisible(true)}>
                      {contentObject.canBeRedacted === false ?
                          "U kunt uw reactie niet meer verwijderen" : "Mijn reactie verwijderen"
                        }

                    </button>
                  </div>
                </div>
              )}
            </div>
            {mini && (
              <button
                className="w-full button-primary"
                onClick={() => setConfirmDeleteModelVisible(true)}>
                Mijn reactie verwijderen
              </button>
            )}
          </div>
        )}
      </div>

      {!isArchive && (
        <>
          <PopUp
            onClose={() => {
              setmodalIsLoading(false);
              setErrorMessage("");
              setConfirmDeleteModelVisible(false);
            }}
            show={confirmDeleteModelVisible}
            className={"w-[90%] sm:w-2/3  text-left"}
            titleClassName={"text-left mt-2"}
            title={"Wilt u uw reactie verwijderen?"}>
            <div className="text-fuscous-gray bg-white">
              <div className="space-y-4 py-8 px-4 lg:px-8">
                <section className="border-l border-r border-fuscous-gray-100 shadow-md rounded-md overflow-hidden">
                  <div className="bg-primary py-2 px-4">
                    <h2 className="text-white font-medium">
                      {contentObject?.address.street}{" "}
                      {contentObject?.address.number},{" "}
                      {contentObject?.address.city}
                    </h2>
                  </div>

                  <ul className="">
                    <li className="adv-list-item-justified">
                      <span className="font-medium">Reageren tot</span>
                      <span>nog 1 dag(en)</span>
                    </li>
                    <li className="adv-list-item-justified">
                      <span className="font-medium">Uw postie</span>
                      <span>{contentObject.position}</span>
                    </li>
                  </ul>
                </section>
                <p>
                  Weet u zeker dat u uw reactie wilt verwijderen? Indien u deze
                  reactie verwijderd kunt u tot{" "}
                  {moment(contentObject?.periodEnd).format("DD MMMM YYYY")}{" "}
                </p>
                {errorMessage && (
                  <div className="text-center text-red-500">
                    Error: <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0">
                <button
                  onClick={() => setConfirmDeleteModelVisible(false)}
                  className="bg-white text-tertiary border border-tertiary py-3 px-4">
                  Annuleren
                </button>

                <button
                  onClick={() => {
                    confirmDeleteReaction();
                  }}
                  className="bg-tertiary text-white border border-tertiary py-3 px-4">
                  {modalIsLoading ? (
                    <ProgressSpinner text="Bezig..." colorClass="text-white" />
                  ) : (
                    <span>Mijn reactie verwijderen</span>
                  )}
                </button>
              </div>
            </div>
          </PopUp>

          <PopUp
            onClose={() => {
              setdeleteModelVisible(false);
            }}
            show={deleteModelVisible}
            className={"w-[90%] sm:w-1/2 p-2 text-center"}
            titleClassName={"text-center mt-2"}
            title={""}>
            <div className="flex place-content-center mt-5 text-30 font-bold">
              Uw reactie is succesvol verwijderd!
            </div>
            <p className="text-20 mb-8 mt-4">
              volg uw reacties via het overzicht met uw reacties.
            </p>
            {errorMessage && (
              <div className="text-yellow-400 text-sm mb-2">
                <b>Error: </b>
                {errorMessage}
              </div>
            )}
            <div className="flex  items-center justify-center space-x-4  pb-20">
              <Link href="/houses">
                <a
                  onClick={() => setdeleteModelVisible(false)}
                  className=" text-18 rounded border px-8 py-3 border-white whitespace-nowrap ">
                  Mijn woningaanbod
                </a>
              </Link>
              <button
                onClick={() => setdeleteModelVisible(false)}
                className=" text-18 rounded border px-8 py-3 bg-white  border-white text-tertiary ">
                <span>Mijn reacties</span>
              </button>
            </div>
          </PopUp>
        </>
      )}
    </div>
  );
};

export default ReactedCard;
