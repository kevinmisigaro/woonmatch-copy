import axios from "axios";
import React, { useEffect, useState } from "react";

export interface Question {
  question: string;
  sections: string[];
  id: string;
  answer: string;
}

export default function Faq({ show = false, onClose = null, setShow }) {
  const [home, setHome] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answer, setAnswer] = useState({
    title: "",
    content: "",
  });

  const openNewModal = (title: string, content: string) => {
    console.log("open");

    setAnswer({
      ...answer,
      title: title,
      content: content,
    });
    setHome(false);
    setWhatsWoon(true);
  };

  const [whatsWoon, setWhatsWoon] = useState(false);

  const showWhatIsWoon = () => {
    setHome(false);
    setWhatsWoon(true);
  };

  const goBack = () => {
    console.log("go back");

    onClose();

    setHome(true);
    setWhatsWoon(false);
    setShow(false);
  };

  useEffect(() => {
    axios
      .get(
        `${
          process.env.NEXT_PUBLIC_BASE_UR ||
          "https://acceptatie.woonmatchwaterland.nl/api_neo/v3/index.cfm?endpoint="
        }/faq`
      )
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {show && (
        <div
          className={`fixed z-50 inset-0 py-1 flex flex-col items-center justify-center ${
            whatsWoon ? "bg-gray-100/0" : "bg-gray-100/95"
          }`}>
          <div
            className={`w-11/12 relative min-h-min overflow-x-hidden overflow-y-visible  text-black rounded-md shadow-lg`}>
            <button
              onClick={() => {
                goBack();
                onClose();
              }}
              className="absolute top-0 right-0 h-10 grid place-content-center aspect-square ">
              <img src="/images/close-x.svg" className="w-3" />
            </button>
            <div className={`w-full`}>
              {/* start of content */}

              {home && (
                <>
                  <div className="h-3/6 w-full py-20 text-center bg-faq text-white">
                    <div className="w-7/12 mx-auto">
                      <div className="flex flex-col justify-between gap-y-5">
                        <p className="text-6xl">Hoe kunnen we helpen?</p>
                        <p className="text-base">
                          Je kan ook de topics hieronder bekijken om antwoord op
                          de vraag krijgen
                        </p>
                        <div className="mx-10 mt-10 flex flex-row">
                          <input
                            className="py-2 rounded-l-md w-full placeholder:pl-6 placeholder:text-xs placeholder:text-gray-400"
                            placeholder="Type je vraag"
                          />
                          <button className="bg-tertiary px-8 text-sm rounded-r-md">
                            zoek
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-16 pb-10 bg-gray-100/95 grid grid-cols-3 gap-x-12 gap-y-10">
                    {/* start of card */}
                    <div className="shadow-lg z-5 mx-1 bg-white rounded-2xl w-full basis-1/3">
                      <div className="text-left pl-8 pt-8">
                        <img src="/images/address.svg" className="mb-5 w-16" />
                        <p className="text-3xl text-primary font-light">App</p>
                      </div>

                      {questions
                        .filter((x: Question) => x.sections.includes("App"))
                        .slice(0, 4)
                        .map((x) => (
                          <div
                            key={x.id}
                            onClick={() => openNewModal(x.question, x.answer)}
                            className="flex mt-8 flex-row justify-between pl-8 pr-12 text-lg pb-4 border-b border-gray-200 cursor-pointer">
                            <div className="text-gray-500">{x.question}</div>
                            <div className="text-primary font-thin">{`>`}</div>
                          </div>
                        ))}
                    </div>
                    {/* end of card */}

                    {/* start of card */}
                    <div className="shadow-lg z-5 mx-1 bg-white rounded-2xl w-full basis-1/3">
                      <div className="text-left pl-8 pt-8">
                        <img src="/images/address.svg" className="mb-5 w-16" />
                        <p className="text-3xl text-primary font-light">
                          General
                        </p>
                      </div>

                      {questions
                        .filter((x: Question) => x.sections.includes("General"))
                        .slice(0, 4)
                        .map((x) => (
                          <div
                            key={x.id}
                            className="flex mt-8 flex-row justify-between pl-8 pr-12 text-lg pb-4 border-b border-gray-200 cursor-pointer">
                            <div className="text-gray-500">{x.question}</div>
                            <div className="text-primary font-thin">{`>`}</div>
                          </div>
                        ))}
                    </div>
                    {/* end of card */}

                    {/* start of card */}
                    <div className="shadow-lg z-5 mx-1 bg-white rounded-2xl w-full basis-1/3">
                      <div className="text-left pl-8 pt-8">
                        <img src="/images/address.svg" className="mb-5 w-16" />
                        <p className="text-3xl text-primary font-light">Naw</p>
                      </div>

                      {questions
                        .filter((x: Question) => x.sections.includes("Naw"))
                        .slice(0, 4)
                        .map((x) => (
                          <div
                            key={x.id}
                            className="flex mt-8 flex-row justify-between pl-8 pr-12 text-lg pb-4 border-b border-gray-200 cursor-pointer">
                            <div className="text-gray-500">{x.question}</div>
                            <div className="text-primary font-thin">{`>`}</div>
                          </div>
                        ))}
                    </div>
                    {/* end of card */}

                    {/* start of card */}
                    <div className="shadow-lg z-5 mx-1 bg-white rounded-2xl w-full basis-1/3">
                      <div className="text-left pl-8 pt-8">
                        <img src="/images/address.svg" className="mb-5 w-16" />
                        <p className="text-3xl text-primary font-light">
                          Summary
                        </p>
                      </div>

                      {questions
                        .filter((x: Question) => x.sections.includes("Summary"))
                        .slice(0, 4)
                        .map((x) => (
                          <div
                            key={x.id}
                            className="flex mt-8 flex-row justify-between pl-8 pr-12 text-lg pb-4 border-b border-gray-200 cursor-pointer">
                            <div className="text-gray-500">{x.question}</div>
                            <div className="text-primary font-thin">{`>`}</div>
                          </div>
                        ))}
                    </div>
                    {/* end of card */}

                    {/* start of card */}
                    <div className="shadow-lg z-5 mx-1 bg-white rounded-2xl w-full basis-1/3">
                      <div className="text-left pl-8 pt-8">
                        <img src="/images/address.svg" className="mb-5 w-16" />
                        <p className="text-3xl text-primary font-light">
                          Situation
                        </p>
                      </div>

                      {questions
                        .filter((x: Question) =>
                          x.sections.includes("Situation")
                        )
                        .slice(0, 4)
                        .map((x) => (
                          <div
                            key={x.id}
                            className="flex mt-8 flex-row justify-between pl-8 pr-12 text-lg pb-4 border-b border-gray-200 cursor-pointer">
                            <div className="text-gray-500">{x.question}</div>
                            <div className="text-primary font-thin">{`>`}</div>
                          </div>
                        ))}
                    </div>
                    {/* end of card */}

                    {/* start of card */}
                    <div className="shadow-lg z-5 mx-1 bg-white rounded-2xl w-full basis-1/3">
                      <div className="text-left pl-8 pt-8">
                        <img src="/images/address.svg" className="mb-5 w-16" />
                        <p className="text-3xl text-primary font-light">
                          Documents
                        </p>
                      </div>

                      {questions
                        .filter((x: Question) =>
                          x.sections.includes("Documents")
                        )
                        .slice(0, 4)
                        .map((x) => (
                          <div
                            key={x.id}
                            className="flex mt-8 flex-row justify-between pl-8 pr-12 text-lg pb-4 border-b border-gray-200 cursor-pointer">
                            <div className="text-gray-500">{x.question}</div>
                            <div className="text-primary font-thin">{`>`}</div>
                          </div>
                        ))}
                    </div>
                    {/* end of card */}

                    {/* start of card */}
                    <div className="shadow-lg z-5 mx-1 bg-white rounded-2xl w-full basis-1/3">
                      <div className="text-left pl-8 pt-8">
                        <img src="/images/address.svg" className="mb-5 w-16" />
                        <p className="text-3xl text-primary font-light">
                          Preferences
                        </p>
                      </div>

                      {questions
                        .filter((x: Question) =>
                          x.sections.includes("Preferences")
                        )
                        .slice(0, 4)
                        .map((x) => (
                          <div
                            key={x.id}
                            className="flex mt-8 flex-row justify-between pl-8 pr-12 text-lg pb-4 border-b border-gray-200 cursor-pointer">
                            <div className="text-gray-500">{x.question}</div>
                            <div className="text-primary font-thin">{`>`}</div>
                          </div>
                        ))}
                    </div>
                    {/* end of card */}

                    {/* start of card */}
                    <div className="shadow-lg z-5 mx-1 bg-white rounded-2xl w-full basis-1/3">
                      <div className="text-left pl-8 pt-8">
                        <img src="/images/address.svg" className="mb-5 w-16" />
                        <p className="text-3xl text-primary font-light">
                          Family
                        </p>
                      </div>

                      {questions
                        .filter((x: Question) => x.sections.includes("Family"))
                        .slice(0, 4)
                        .map((x) => (
                          <div
                            key={x.id}
                            className="flex mt-8 flex-row justify-between pl-8 pr-12 text-lg pb-4 border-b border-gray-200 cursor-pointer">
                            <div className="text-gray-500">{x.question}</div>
                            <div className="text-primary font-thin">{`>`}</div>
                          </div>
                        ))}
                    </div>
                    {/* end of card */}

                    {/* start of card */}
                    <div className="shadow-lg z-5 mx-1 bg-white rounded-2xl w-full basis-1/3">
                      <div className="text-left pl-8 pt-8">
                        <img src="/images/address.svg" className="mb-5 w-16" />
                        <p className="text-3xl text-primary font-light">
                          Partner
                        </p>
                      </div>

                      {questions
                        .filter((x: Question) => x.sections.includes("Partner"))
                        .slice(0, 4)
                        .map((x) => (
                          <div
                            key={x.id}
                            className="flex mt-8 flex-row justify-between pl-8 pr-12 text-lg pb-4 border-b border-gray-200 cursor-pointer">
                            <div className="text-gray-500">{x.question}</div>
                            <div className="text-primary font-thin">{`>`}</div>
                          </div>
                        ))}
                    </div>
                    {/* end of card */}
                  </div>
                </>
              )}

              {/* end of content */}
            </div>
          </div>
        </div>
      )}

      {whatsWoon && (
        <div className="h-screen">
          <div className="h-3/6 w-full py-20 text-center  bg-faq text-white">
            <div className="w-7/12 mx-auto">
              <div className="flex flex-col justify-between gap-y-5">
                <p className="text-6xl">{answer.title}</p>
                {/* <p className="text-base">
                  Je kan ook de topics hieronder bekijken om antwoord op de
                  vraag krijgen
                </p> */}
              </div>
            </div>
          </div>
          <div className="pt-16 bg-gray-100/95 px-16 pb-10">
            <div className="flex flex-row justify-start gap-x-6 pb-8 items-center">
              <div
                onClick={onClose}
                className="font-light text-xl text-gray-400 cursor-pointer">
                About Woonmatch
              </div>

              <div>
                <img src="/images/caret-right.svg" className="text-black" />
              </div>

              <div className="font-light text-xl text-primary">
                {answer.title}
              </div>
            </div>

            <hr className="bg-gray-300 h-0.5" />

            <div className="mt-5 flex flex-row justify-end">
              <div className="w-3/4">
                <p className="font-light text-base text-gray-400">
                  {answer.content}
                </p>
                <div className="mt-6 flex flex-row justify-end">
                  <div
                    onClick={() => console.log("ppen")}
                    className="border cursor-pointer border-tertiary w-1/3 rounded-sm px-4 text-center py-3 text-tertiary">
                    Go back to help center
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div />
        </div>
      )}
    </>
  );
}
