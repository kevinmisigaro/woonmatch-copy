import { useState, useEffect } from "react";
import Layout from "../../components/Layouts/SiteLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { RegisterLoadingSpinner } from "../../components/Registration/LoadingSpinner";

export interface Section {
  icon: string;
  name: string;
  type: string;
  questions: Question[];
}

export interface Question {
  question: string;
  answer: string;
  id: string;
}

const FAQPage: React.FC<any> = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const nextPage = (title: string, content: string) => {
    push({
      pathname: "/faq/question",
      query: {
        question: title,
        content: content,
      },
    });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${
          process.env.NEXT_PUBLIC_API_URL ||
          "https://acceptatie.woonmatchwaterland.nl/api_neo/v3/index.cfm?endpoint="
        }/faq`
      )
      .then((res) => {
        setLoading(false);
        setSections(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout title="Faq">
      <div>
        <section className="bg-faq-home text-white">
          <div className="h-3/6 w-full py-20 text-center bg-faq text-white">
            <div className="w-7/12 mx-auto">
              <div className="flex flex-col justify-between gap-y-5">
                <p className="text-6xl">Hoe kunnen we helpen?</p>
                <p className="text-base">
                  Je kan ook de topics hieronder bekijken om antwoord op de
                  vraag krijgen
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

          <div className="mt-16 pb-10 px-20 pt-10 bg-gray-100/95 grid grid-cols-3 gap-x-12 gap-y-10">
            {loading ? (
              <div className="w-full text-center flex flex-row justify-center items-center py-5 text-primary">
                <RegisterLoadingSpinner />
              </div>
            ) : (
              sections.map((s: Section) => (
                <div
                  key={s.name}
                  className="shadow-lg z-5 mx-1 bg-white rounded-2xl w-full basis-1/3">
                  <div className="text-left pl-8 pt-8">
                    <img src="/images/address.svg" className="mb-5 w-16" />
                    <p className="text-3xl text-primary font-light">{s.name}</p>
                  </div>

                  {s.questions.slice(0, 4).map((q: Question) => (
                    <div
                      key={q.id}
                      onClick={() => nextPage(q.question, q.answer)}
                      className="flex mt-8 flex-row justify-between pl-8 pr-12 text-lg pb-4 border-b border-gray-200 cursor-pointer">
                      <div className="text-gray-500">{q.question}</div>
                      <div className="text-primary font-thin">{`>`}</div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default FAQPage;
