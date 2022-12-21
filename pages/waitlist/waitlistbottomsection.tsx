import axios from "axios";
import _, { map } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsArrowUpShort } from "react-icons/bs";

export default function WaitlistBottomSection() {
  const router = useRouter();
  const [faqData, setFaq] = useState([]);

  const loaddata = () => {
    const config = {
      headers: {
        "Content-Type": `application/json`,
      },
    };

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/faq`, config).then((res) => {
      switch (router.pathname) {
        case "/houseregister/steps/seventh":
          setFaq(res.data.filter((x) => x.type == "Summary")[0].questions);
          break;

        case "/houseregister/steps/situatie":
          setFaq(res.data.filter((x) => x.type == "Situation")[0].questions);
          break;

        case "/houseregister/steps/sixth":
          setFaq(res.data.filter((x) => x.type == "Preferences")[0].questions);
          break;

        case "/houseregister/steps/second":
          setFaq(res.data.filter((x) => x.type == "Partner")[0].questions);
          break;

        case "/houseregister/steps/first":
          setFaq(res.data.filter((x) => x.type == "Naw")[0].questions);
          break;

        case "/houseregister/steps/fifth":
          setFaq(res.data.filter((x) => x.type == "Family")[0].questions);
          break;

        default:
          setFaq(res.data.filter((x) => x.type == "General")[0].questions);
          break;
      }
    });
  };

  useEffect(() => {
    loaddata();
  }, []);

  return (
    <div>
      <div className="text-2xl tracking-normal font-medium" id="help">
        Meest relevante vragen & antwoorden
      </div>

      {map(faqData, (x, i) => (
        <div className="mt-10" key={i}>
          <div className="font-normal text-base text-gray-400">
            {x.question}
          </div>
          <div
            className="font-light text-base text-gray-400 mt-4 text-justify"
            dangerouslySetInnerHTML={{ __html: x.answer }}
          />
        </div>
      ))}

      {/* <div className="mt-14">
        <p className="font-light text-primary text-xs">
          Antwoord niet gevonden?
        </p>
      </div> */}

      <div className="pt-16 pb-10 flex flex-row justify-end">
        <div
          onClick={() => {
            document
              .getElementById("stepper")
              .scrollIntoView({ behavior: "smooth" });
          }}
          className="shadow-2xl rounded-full p-5 cursor-pointer"
          style={{ backgroundColor: "#8EB42924" }}>
          <BsArrowUpShort className="text-tertiary" size={40} />
        </div>
      </div>
    </div>
  );
}
