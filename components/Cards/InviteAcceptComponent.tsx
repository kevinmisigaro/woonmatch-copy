import React, { useEffect, useRef, useState } from "react";
import { DocumentsListComponent } from "../Documents/DocumentsListComponent";
import { ProgressSpinner } from "../ui/ProgressSpinner";
import { QuestionComponet } from "./QuestionsCompoent";
import { showNotifications } from "../../lib/notification";

export const InviteAcceptComponent = ({
  details,
  documents,
  willAttendMeeting = true,
  onAccept = undefined,
}) => {
  const [information, setInformation] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [otherDetails, setOtherDetails] = useState([]);
  const [questionAnswers, setQuestionAnswers] = useState({});
  const [actionAboutToHappen, setActionAboutToHappen] = useState('een aanbieding te accepteren');
  const [step, setStep] = useState("questions");
  //const [step, setStep] = useState("documents");

  const ref = useRef(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const documentFilter = [];

  if(details.letter.letterData.advert.reaction.requirements.missingDocuments !== null) {
    details.letter.letterData.advert.reaction.requirements.missingDocuments.map((document) => {
        documentFilter.push(document.group);
    });
  }


  function setLetterOptions() {
    console.log("details", details);
    //let letter = sampleLetter;
    let letter = details.letter;

    switch(letter.letterData.type) {
        case "mra_invite_group":
        case "mra_invite_current":
          setActionAboutToHappen('U staat op het punt om een uitnodiging voor een bezichtiging te accepteren');
          break;

        case "mra_followup_group":
        case "mra_followup_current":
          setActionAboutToHappen('U geeft aan nog interesse te hebben in de woning');
          break;

        default:
          setActionAboutToHappen('U staat op het punt om een aanbieding te accepteren');
          break;
    }


    let _information = [];
    let _document = [];
    let _questions = [];
    let _otherInfo = [];
    for (let i = 0; i < letter.letterData.advert.reaction.requirements.daQuestions.length; i++) {
      let question =
        letter.letterData.advert.reaction.requirements.daQuestions[i];
      switch (question.type) {
        case "Informatie":
          _information.push(question);
          break;
        case "Nummerveld":
          _questions.push(question);
          break;
        case "Toggle":
          _questions.push(question);
          break;
        case "Textveld":
          _questions.push(question);
          break;

        default:
          _otherInfo.push(question);
      }
    }

    setQuestions(arrangeQuestionsToOneArray(_questions));
    setInformation(_information);
    setOtherDetails(_otherInfo);
  }

  const arrangeQuestionsToOneArray = (questions: any[]) => {
    let questionArray = [];

    for (let i = 0; i < questions.length; i++) {
      questionArray.push({
        ...questions[i],
        children: null,
        parentId: null,
        level: 1,
        index: i + 1,
      });

      if (questions[i].children?.length > 0) {
        let childQuestions = questions[i].children;
        for (let j = 0; j < childQuestions.length; j++) {
          questionArray.push({
            ...childQuestions[j],
            children: null,
            parentId: questions[i].id,
            level: 2,
            index: `${i + 1}.${j + 1}`,
          });

          if (childQuestions[j].children?.length > 0) {
            let childQuestions2 = childQuestions[j].children;
            for (let k = 0; k < childQuestions.length; k++) {
              questionArray.push({
                ...childQuestions2[k],
                children: null,
                parentId: childQuestions2[j].id,
                level: 3,
                index: `${i + 1}.${j + 1}.${k + 1}`,
              });
            }
          }
        }
      }
    }
    return questionArray;
  };

  const onAnswerChange = (questionId: string, answer: any) => {
    setQuestionAnswers((previous) => {
      for (let i = 0; i < questions.length; i++) {
        if (questions[i]?.parentId == questionId) {
          if (questions[i]?.parentAnswer != answer) {
            previous[questions[i].id] = null;
          }
        }
      }

      let qA = {
        ...previous,
        [questionId]: answer,
      };
      return qA;
    });
  };

  useEffect(() => {
    setLetterOptions();
    if (questions?.length == 0) {
      setStep("questions");
    }
    return () => {};
  }, []);

  const verifyAnswers = () => {
    let confirmed = confirmQuestionAnswers();

    if (confirmed) {
      setErrorMessage("");
      setStep("documents");
      ref.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      setErrorMessage("All vragen met een sterretje(*) zijn verplicht.");
    }
  };

  const submit = async () => {
    let letterId = details?.letter?.letterData.letter;
    if (!isSubmitting) {
      const data = {
        data: {
          ...removeNulls(questionAnswers),
        },
        id: letterId,
        willAttendMeeting,
      };

      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(data),
      };

      setIsSubmitting(true);

      try {
        const response = await fetch(
          (process.env.NEXT_PUBLIC_API_URL ||
            "https://acceptatie.woonmatchwaterland.nl/api_neo/v3/index.cfm?endpoint=") +
            `/letter/${letterId}/data`,
          options
        );

        if (response.status == 200) {
          onAccept("success");
          showNotifications({
            message: "Success",
            type: "info",
          });
          location.reload();
        } else {
          setIsSubmitting(false);
          const json_response = await response.json();
          if (!json_response.success) {
            setErrorMessage("Error: " + json_response?.errors[0]?.text);
          }
        }
      } catch (e) {
        setIsSubmitting(false);
        setErrorMessage(
          "Error: Sorry, an error has occured, please try again later"
        );
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

  const removeNulls = (object: any) => {
    return Object.fromEntries(
      Object.entries(object).filter(([_, v]) => v != null && v != "")
    );
  };

  const confirmQuestionAnswers = () => {
    let unAnsweredQuestions = [];
    let qA = removeNulls(questionAnswers);

    setQuestionAnswers((prev) => qA);

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].required) {
        if (questions[i].parentId == null) {
          if (!qA[questions[i].id]) {
            unAnsweredQuestions.push(questions[i].id);
          }
        } else if (
          qA[questions[i].parentId] &&
          qA[questions[i].id] == undefined &&
          qA[questions[i].parentId] == questions[i].parentValue
        ) {
          unAnsweredQuestions.push(questions[i].id);
        }
      }
    }
    if (unAnsweredQuestions.length == 0) {
      return true;
    }
    return false;
  };

  const canShowQuestion = (question: any) => {
    if (question.parentId != null) {
      if (
        question?.parentValue != null &&
        question?.parentValue == questionAnswers[question.parentId]
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  return (
    <div ref={ref}>
      <div className="flex flex-row bg-white">
        <div
          className="basis-1/5 bg-primary bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage:
              "url(/bg-images/brooke-cagle-xcgh5_-QIXc-unsplash.png)",
          }}></div>

        <div className="basis-4/5">
          <div className="bg-tertiary h-20 w-full"></div>
          <div className="p-10">
            <div className="text-3xl font-medium mt-20 mb-10">
              {actionAboutToHappen}
            </div>
            <div className="mb-10">
              <p>
                Dit betekent dat u verder wilt gaan met het proces van deze woning. Mogelijk moet u hiervoor nog een aantal zaken in orde brengen, zoals documenten uploaden of vragen beantwoorden. Deze zaken vindt u hieronder.
              </p>
            </div>
          </div>

          <div className="p-10">
            {step == "questions" && (
              <>
                {information.length > 0 && (
                  <>
                    {information.map((question) => (
                      <div key={question.id}>
                        <div className="text-xl font-medium ">
                          {question.title}
                        </div>
                        <div
                          className="text-base space-y-4 font-light letter-text my-5"
                          dangerouslySetInnerHTML={{
                            __html: question.text,
                          }}></div>
                      </div>
                    ))}
                  </>
                )}

                {questions.length > 0 && (
                  <>
                    <div className="text-3xl font-medium mt-20 mb-10">
                      Vragen
                    </div>
                    {questions.map((question, index) => (
                      <div key={question.id}>
                        {canShowQuestion(question) && (
                          <QuestionComponet
                            onAnswerChange={onAnswerChange}
                            question={question}
                            answer={question.answer}
                          />
                        )}
                      </div>
                    ))}
                  </>
                )}
                {otherDetails.length > 0 && (
                  <>
                    <div className="text-3xl font-medium mt-20">
                      Andere informatie
                    </div>
                    {otherDetails.map((question, index) => (
                      <div key={index}>
                        <div className="text-xl ">{question.title}</div>
                        <div
                          className="text-base font-light my-5"
                          dangerouslySetInnerHTML={{
                            __html: question.text,
                          }}></div>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
            { step == "documents" && (
              details.letter.letterData.advert.reaction.requirements.missingDocuments !== null ? (
                <>
                  <div className="text-3xl font-medium my-10">Documenten</div>
                  <div className="mb-10 text-gray-400">
                    <p>
                       Om deze woning te accepteren moet u een aantal documenten uploaden. Hieronder ziet u welke documenten dit zijn.
                    </p>
                  </div>
                  <DocumentsListComponent documents={documents} filter={documentFilter} />
                </>
              ) : (
                <>
                  <div className="text-3xl font-medium my-10">Documenten</div>
                  <div className="mb-10">
                    <p>
                      U heeft alle benodigde documenten al aangeleverd, of er zijn geen documenten nodig op dit moment.
                    </p>
                  </div>
                </>
              )
            )}
            <div className="mt-24">
              {errorMessage.length > 0 && (
                <div className="border border-red-600 bg-red-100 text-red-600 text-center p-3 rounded">
                  {errorMessage}
                </div>
              )}
            </div>
            <div className="flex flex-row mt-5 justify-end">
              {step == "questions" && (
                <button
                  onClick={() => {
                    verifyAnswers();
                  }}
                  className="bg-tertiary px-10 py-3 text-white rounded-md">
                  <div>Upload je documenten</div>
                </button>
              )}
              {step == "documents" && (
                <button
                  onClick={submit}
                  className="bg-tertiary px-10 py-3 text-white rounded-md">
                  {isSubmitting && (
                    <ProgressSpinner text="Bezig..." colorClass="text-white" />
                  )}
                  {!isSubmitting && <div>Accepteren</div>}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
