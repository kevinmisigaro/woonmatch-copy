import "react-confirm-alert/src/react-confirm-alert.css";
import { EnergyScore } from "../Card";
import { useEffect, useState } from "react";
import { PopUp } from "../ui/PopUp";
import Link from "next/link";
import { InviteAcceptComponent } from "./InviteAcceptComponent";
import moment from "moment";
import { RefuseInvite } from "../modals/house-reaction/refuse-invite-content";
import { ProgressSpinner } from "../ui/ProgressSpinner";
import { showNotifications } from "../../lib/notification";

type Prop = {
  contentObject: any;
  documents: any[];
  isArchive?: boolean;
};

const InviteCard: React.FC<any> = ({ contentObject, documents }: Prop) => {
  const [showAcceptPopUp, setShowAcceptPopUp] = useState<boolean>(false);
  const [showRejectPopUp, setShowRejectPopUp] = useState<boolean>(false);
  const [deleteModelVisible, setdeleteModelVisible] = useState<boolean>(false);
  const [willAttendMeeting, setwillAttendMeeting] = useState<boolean>(false);
  useState<boolean>(false);
  const [modalIsLoading, setmodalIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [inCardErrorMessage, setInCardErrorMessage] = useState<string>();
  const [showRefuseReasesons, setShowRefuseReasons] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdatingAttendance, setIsUpdatingAttendance] = useState(false);

  const [refusalReasons, setRefusalReasons] = useState([]);

  const onDocumentAccept = async () => {
    setShowAcceptPopUp(false);
  };

  useEffect(() => {
    console.log("contentObject", contentObject);
    setwillAttendMeeting(
      contentObject?.letter?.letterData?.advert.reaction.status
        .willAttendMeeting
    );
    setShowRefuseReasons(false);
    transformRefusalReasons(
      contentObject?.letter?.letterData?.advert.reaction.requirements
        .refusalReasons
    );
  }, []);

  const transformRefusalReasons = (reasons: any[]) => {
    setRefusalReasons(
      reasons?.map((reason) => ({ key: reason.name, value: reason.id }))
    );
  };

  const closeAccept = async () => {
    setShowAcceptPopUp(false);
  };

  const confirmDeleteReaction = async () => {
    setShowRejectPopUp(false);
    setdeleteModelVisible(true);
    if (!modalIsLoading) {
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

  const submitRefusal = async (data: any) => {
    if (!isSubmitting) {
      setErrorMessage(null);

      let letterId = contentObject?.letter?.letterData.letter;

      let token = await getToken();

      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      };

      setIsSubmitting(true);

      try {
        let response = await fetch(
          (process.env.NEXT_PUBLIC_API_URL ||
            "https://acceptatie.woonmatchwaterland.nl/api_neo/v3/index.cfm?endpoint=") +
            `/letter/${letterId}/data`,
          options
        );

        const text_response = await response.text();
        if (text_response) {
          location.reload();
          showNotifications({
            message: "Success",
            type: "info",
          });
        } else {
          setIsSubmitting(false);
          setErrorMessage(
            "Error: Sorry, an error has occured, please try again later"
          );
        }
      } catch (e) {
        setIsSubmitting(false);
        setErrorMessage(
          "Error: Sorry, an error has occured, please try again later"
        );
      }
    }
  };

  const updateMeetingAtendance = async (willAttendMeeting: boolean) => {
    if (!isUpdatingAttendance) {
      setInCardErrorMessage(null);

      let letterId = contentObject?.letter?.letterData.letter;

      let token = await getToken();

      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          willAttendMeeting,
        }),
      };

      setIsUpdatingAttendance(true);

      try {
        const response = await fetch(
          (process.env.NEXT_PUBLIC_API_URL ||
            "https://acceptatie.woonmatchwaterland.nl/api_neo/v3/index.cfm?endpoint=") +
            `/letter/${letterId}/data`,
          options
        );

        if (response.status == 200) {
          setwillAttendMeeting(willAttendMeeting);
          showNotifications({
            message: "Meeting attendance successfully updated",
            type: "info",
          });
        } else {
          const json_response = await response.json();
          if (!json_response.success) {
            setErrorMessage("Error: " + json_response?.errors[0]?.text);
          }
        }
      } catch (e) {
        setInCardErrorMessage("Unknow error");
      }
      setIsUpdatingAttendance(false);
    }
  };

  const getAcceptButtonTextByLetterType = (letterType: string) => {
    switch (letterType) {
      case "mra_followup_group":
      case "mra_invite_current":
      case "mra_followup_current":
        return "Ik accepteer";

      case "offer_with_meeting":
      case "offer_without_meeting":
        return "ik accepteer definitief";
        
      default:
        return "Ik kom naar de bezichtiging";
    }
  };

  const getRejectButtonTextByLetterType = (letterType: string) => {
    switch (letterType) {
      case "mra_followup_group":
      case "mra_followup_current":
        return "Ik weiger";

      case "mra_invite_group":
      case "mra_invite_current":
        return "ik weiger en kom niet kijken";

      case "offer_with_meeting":
      case "offer_without_meeting":
        return "ik weiger definitief";

      default:
        return "Ik kom niet";
    }
  };

  const getAcceptButWontComeToSeeButtonTextByLetterType = (
    letterType: string
  ) => {
    switch (letterType) {
      case "mra_invite_group":
      case "mra_invite_current":
        return "ik accepteer en kom niet kijken";

      default:
        return "Accepteren zonder bezichtiging";
    }
  };

  return (
    <>
      {contentObject && (
        <div className={` overflow-hidden  rounded-md`}>
          <div>
            <div className={`grid grid-cols-1 lg:grid-cols-5   `}>
              <div
                className={` bg-white col-span-2  shadow-lg overflow-hidden`}>
                <div
                  className="relative  h-full w-full"
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
                        (label, index) => (
                          <div key={index} className="card-tag">
                            {label}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-3 flex-col flex justify-between">
                <div className="  bg-white overflow-hidden shadow-sm">
                  <div className="flex justify-between items-center py-4 px-4 lg:px-8 bg-gray-200">
                    <h2 className=" 3xl:text-[30px] xl:text-[22px]  text-primary text-[15px] font-medium">
                      {contentObject?.address?.street}{" "}
                      {contentObject?.address?.number},{" "}
                      {contentObject?.address?.city}
                    </h2>
                  </div>

                  <div>
                    <ul className="">
                      <li className="adv-list-item-justified">
                        <span className="font-medium">Woningtype</span>
                        <span className="font-light">
                          {contentObject?.details.type}
                        </span>
                      </li>
                      <li className="adv-list-item-justified">
                        <span className="font-medium">Aantal slaapkamer</span>
                        <span className="font-light">
                          {contentObject?.details.bedrooms}
                        </span>
                      </li>
                      <li className="adv-list-item-justified">
                        <span className="font-medium">Energielabel</span>
                        {contentObject?.details?.energylabel && (
                          <div className=" flex">
                            <EnergyScore
                              value={contentObject?.details.energylabel}
                            />
                          </div>
                        )}
                      </li>
                      <li className="adv-list-item-justified">
                        <span className="font-medium"> Woningoppervlakte</span>
                        <span className="font-light">
                          {contentObject?.details.surface} m<sup>2</sup>
                        </span>
                      </li>
                      <li className="adv-list-item-justified">
                        <span className="font-medium">Huurprijs</span>
                        <span className="font-light">
                          {parseFloat(
                            contentObject?.details.grossrent
                          ).toLocaleString("nl-NL", {
                            minimumFractionDigits: 2,
                          })}{" "}
                          per maand
                        </span>
                      </li>
                      <li className="adv-list-item-justified">
                        <span className="font-medium">Servicekosten</span>
                        <span className="font-light">
                          {parseFloat(
                            contentObject?.details.servicecosts
                          ).toLocaleString("nl-NL", {
                            minimumFractionDigits: 2,
                          })}{" "}
                          per maand
                        </span>
                      </li>

                      {contentObject?.letter?.letterData?.advert.reaction?.meeting?.date !== undefined && (
                          <li className="adv-list-item-justified">
                            <span className="font-medium">Datum bezichtiging</span>
                            <span className="font-light">
                              {contentObject?.letter?.letterData?.advert.reaction
                                ?.meeting?.date
                                ? moment(
                                    contentObject?.letter?.letterData?.advert
                                      .reaction?.meeting?.date
                                  ).format("DD MMMM YYYY [om] HH:mm")
                                : ""}
                            </span>
                          </li>
                        )}
                      <li className="adv-list-item-justified">
                        <span className="font-medium">
                          Uiterste reactiedatum
                        </span>
                        <span className="font-light">
                          {contentObject?.letter?.letterData?.advert.reaction
                            ?.maxResponseDate
                            ? moment(
                                contentObject?.letter?.letterData?.advert
                                  .reaction?.maxResponseDate
                              ).format("DD MMMM YYYY")
                            : ""}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {inCardErrorMessage && (
              <div className="bg-gray-200 px-4 pt-4 text-red-600 text-center">
                {inCardErrorMessage}
              </div>
            )}
            {contentObject?.letter?.letterData?.advert.reaction.status
              .canReact && (
              <div className="items-center text-center bg-gray-200 gap-3 p-4 grid grid-cols-3">
                <>
                  {!contentObject?.letter?.letterData?.advert.reaction.status
                    .hasReacted && (
                    <>
                      {contentObject?.letter?.letterData?.advert.reaction.status
                        .canAccept && (
                        <button
                          className="bg-tertiary text-white rounded p-3"
                          onClick={() => {
                            setShowAcceptPopUp(true);
                            setwillAttendMeeting(true);
                          }}>
                          {getAcceptButtonTextByLetterType(
                            contentObject?.letter?.letterData?.type
                          )}
                        </button>
                      )}
                      <button
                        className="bg-white  text-tertiary p-3 rounded border border-tertiary"
                        onClick={() => {
                          setShowRejectPopUp(true);
                        }}>
                        {getRejectButtonTextByLetterType(
                          contentObject?.letter?.letterData?.type
                        )}
                      </button>
                      {contentObject?.letter?.letterData?.advert.reaction.status
                        .canAccept &&
                        (contentObject?.letter?.letterData?.type ==
                          "mra_invite_group" ||
                          contentObject?.letter?.letterData?.type ==
                            "offer_with_meeting") && (
                          <button
                            className="bg-white text-tertiary p-3 rounded border border-tertiary"
                            onClick={() => {
                              setShowAcceptPopUp(true);
                              setwillAttendMeeting(false);
                            }}>
                            {getAcceptButWontComeToSeeButtonTextByLetterType(
                              contentObject?.letter?.letterData?.type
                            )}
                          </button>
                        )}
                    </>
                  )}
                </>

                {contentObject?.letter?.letterData?.type == "mra_invite_group" &&
                  contentObject?.letter?.letterData?.advert.reaction.status.hasReacted &&
                    contentObject?.letter?.letterData?.advert.reaction.status.hasRefused !== true && (
                    <button
                      className="bg-white text-tertiary p-3 rounded border border-tertiary"
                      onClick={() => {
                        updateMeetingAtendance(!willAttendMeeting);
                      }}>
                      {!isUpdatingAttendance ? (
                        <span>
                          {willAttendMeeting ? (
                            <span>Ik ben toch niet niet bij de bezichtiging</span>
                          ) : (
                            <span>Ik ben toch bij de bezichtiging</span>
                          )}
                        </span>
                      ) : (
                        <ProgressSpinner
                          text="Bezig..."
                          colorClass="text-primary"
                        />
                      )}
                    </button>
                  )}
              </div>
            )}
          </div>

          {showAcceptPopUp && (
            <div className="fixed inset-0 z-50 overflow-auto overscroll-contain  p-5 bg-black/40">
              <div className="rounded-md relative overflow-hidden">
                <div className="absolute right-4 top-4 ">
                  <button onClick={closeAccept} className="p-4  cursor-pointer">
                    <img src="/images/close-x.svg" />
                  </button>
                </div>
                <InviteAcceptComponent
                  details={contentObject}
                  documents={documents}
                  onAccept={onDocumentAccept}
                  willAttendMeeting={willAttendMeeting}
                />
              </div>
            </div>
          )}

          <PopUp
            onClose={() => {
              setShowRefuseReasons(false);
              setShowRejectPopUp(false);
              setErrorMessage(null);
            }}
            show={showRejectPopUp}
            className={"w-[90%] sm:w-1/2 md:w-[70%] p-2 text-center"}
            titleClassName={"text-center mt-2"}
            title={""}>
            <RefuseInvite
              refusalWarning={
                contentObject?.letter?.letterData?.advert.reaction
                  .refusalWarning
              }
              letterType={contentObject?.letter?.letterData?.type}
              refusalReasons={refusalReasons}
              submitRefusal={submitRefusal}
              isSubmitting={isSubmitting}
              errorMessage={errorMessage}
              onClose={() => {
                setShowRejectPopUp(false);
              }}
            />
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
        </div>
      )}
    </>
  );
};

export default InviteCard;
