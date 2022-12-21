import React, { useState } from "react";
import { letterType } from "../../../lib/letters";
import DropDownButton from "../../Buttons/DropDownButton";
import { ProgressSpinner } from "../../ui/ProgressSpinner";

export const RefuseInvite = ({
  refusalWarning,
  refusalReasons,
  submitRefusal,
  isSubmitting,
  errorMessage,
  letterType,
  onClose,
}) => {
  const [showRefuseReasesons, setShowRefuseReasons] = useState(false);
  const [refusalText, setRefusalText] = useState("");
  const [_errorMessage, setErrorMessage] = useState("");
  const [selectedRefusalReason, setSelectedRefusalReason] = useState(null);

  const getRefusalTitleByLetterType = (letterType: string) => {
    switch (letterType) {
      case "mra_followup_group":
      case "mra_followup_current":
      case "offer_without_meeting":
      case "offer_with_meeting":
        return "Weet u zeker dat u de woning wilt weigeren?";
      default:
        return "Weet u zeker dat u de uitnodiging wilt weigeren?";
    }
  };

  return (
    <div className="md:w-[750px] m-auto">
      <div className="text-50">{getRefusalTitleByLetterType(letterType)}</div>
      <div className="flex place-content-center mt-5">
        <img
          src="/images/confirm-refusal.png"
          className="w-[97px] xl:w-[150px] 3xl:w-[200px] aspect-square     mb-8"
        />
      </div>

      <p className="text-sm mb-8">{refusalWarning}</p>

      <div className="flex items-center justify-center space-x-2 mb-3">
        {!showRefuseReasesons && (
          <button
            className="button-outline-white flex-1"
            onClick={() => {
              onClose();
            }}>
            Nee, toch niet
          </button>
        )}
        <button
          onClick={() => {
            setShowRefuseReasons(true);
          }}
          className="button-white   flex-1 ">
          Ja, ik weiger
        </button>
      </div>
      {showRefuseReasesons && (
        <>
          <div className="mb-5">
            <DropDownButton
              maxHeight={"max-h-28"}
              darkTheme={true}
              title={`Geef een reden voor het weigeren`}
              className={`drop-down-btn-search`}
              wraperClassNames={`drop-down-btn-search-wrapper`}
              options={refusalReasons}
              onSelect={(selected: any) => {
                if (selected?.value) {
                  setSelectedRefusalReason(selected.value);
                } else {
                  setSelectedRefusalReason(null);
                }
              }}
            />
          </div>

          {selectedRefusalReason && (
            <div className="">
              <input
                placeholder="Verduidelijk uw antwoord"
                className="input-field  p-3"
                value={refusalText}
                onWheel={(e) => e.currentTarget.blur()}
                onChange={(evt) => {
                  setRefusalText(evt.target.value);
                }}
              />
            </div>
          )}
          {_errorMessage && (
            <div className="border mt-5 border-red-600 bg-red-100 text-red-600 text-center p-3 rounded">
              {_errorMessage}
            </div>
          )}
          {errorMessage && (
            <div className="border mt-5 border-red-600 bg-red-100 text-red-600 text-center p-3 rounded">
              {errorMessage}
            </div>
          )}
          {selectedRefusalReason && (
            <div className="flex items-center justify-end space-x-2 mt-5 mb-10">
              <button
                onClick={() => {
                  setErrorMessage("");
                  if (refusalText.trim()) {
                    submitRefusal({
                      refusal_id: selectedRefusalReason,
                      refusal_text: refusalText,
                    });
                  } else if (!refusalText) {
                    setErrorMessage(
                      "Geef alsjeblieft een reden op. We gebruiken deze informatie om onze advertenties te verbeteren."
                    );
                  }
                }}
                className="button-white px-20">
                {isSubmitting && (
                  <ProgressSpinner
                    text="Submiting..."
                    colorClass="text-tertiary"
                  />
                )}
                {!isSubmitting && <div>Bevestigen</div>}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
