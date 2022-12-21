import { useEffect, useState } from "react";
import { ToggleGroup, ToggleSwitchItem } from "../ui/ToggleGroup";

export const QuestionComponet = ({
  question,
  onAnswerChange,
  answer = null,
}) => {
  const [switchState, setToggleAnswer] = useState(answer);

  useEffect(() => {
    if (question.type != "Toggle") {
      onAnswerChange(question.id, question.answer);
    }
  }, []);

  useEffect(() => {
    if (question.type == "Toggle") {
      onAnswerChange(question.id, switchState);
    }
  }, [switchState]);

  return (
    <div className="grid grid-cols-2 gap-16 mb-10 align-top">
      <div className="text-primary flex   text-base">
        <div className="">
          <div>
            {question.title}
            {question.required && <span>*</span>}
          </div>
          <div
            className="text-18 leading-5 text-gray-400  "
            dangerouslySetInnerHTML={{
              __html: question.text,
            }}></div>
        </div>
      </div>
      <div>
        {question.type == "Nummerveld" ? (
          <input
            placeholder="Noteer hier uw antwoord"
            type="number"
            className="input-field"
            value={question.answer}
            onWheel={(e) => e.currentTarget.blur()}
            onChange={(evt) => {
              question.answer = evt.target.value;
              onAnswerChange(question.id, evt.target.value);
            }}
          />
        ) : question.type == "Toggle" ? (
          <div className="flex align-top">
            <div className="flex items-center flex-row gap-5 ml-1">
              <ToggleGroup
                selectedValue={switchState}
                onClick={(clicked: ToggleSwitchItem) => {
                  console.log(clicked);
                  setToggleAnswer(clicked.value);
                }}
                items={[
                  { value: "1", label: "Ja" },
                  { value: "0", label: "Nee" },
                ]}
              />
            </div>
          </div>
        ) : (
          <textarea
            placeholder="Noteer hier uw antwoord"
            value={question.answer}
            onChange={(evt) => {
              question.answer = evt.target.value;
              onAnswerChange(question.id, evt.target.value);
            }}
            className="input-field"></textarea>
        )}
      </div>
    </div>
  );
};
