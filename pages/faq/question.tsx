import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/SiteLayout";

export default function Question() {
  const router = useRouter();
  const [answer, setAnswer] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const { question, content } = router.query;
    setAnswer({
      ...answer,
      title: question as string,
      content: content as string,
    });
  }, []);

  return (
    <Layout title="Question">
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
              onClick={() => {
                router.back();
              }}
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
                  onClick={() => {
                    router.back();
                  }}
                  className="border cursor-pointer border-tertiary w-1/3 rounded-sm px-4 text-center py-3 text-tertiary">
                  Go back to help center
                </div>
              </div>
            </div>
          </div>
        </div>
        <div />
      </div>
    </Layout>
  );
}
