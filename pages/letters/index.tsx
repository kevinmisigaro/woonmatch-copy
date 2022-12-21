import Layout from "../../components/Layouts/SiteLayout";
import { useEffect, useRef, useState } from "react";
import { getUserLetterOptions, letterType } from "../../lib/letters";
import moment from "moment";

export interface UserLetter {
  regdate: string;
  attachments: any[];
  advert: any;
  type: string;
  letter: string;
  name: string;
}

export async function getServerSideProps(context) {
  const letters: UserLetter[] = await getUserLetterOptions(context.req);

  return { props: { letters } };
}

const Leter: React.FC<any> = ({ letters }: { letters: UserLetter[] }) => {
  const [height, setHeight] = useState(200);
  const contentRef = useRef(null);

  const doOnWindowResize = () => {
    try {
      if (contentRef?.current != null) {
        let { offsetHeight, offsetTop } = contentRef.current;

        setHeight(offsetHeight + offsetTop + 100);
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (contentRef != null) {
      window.addEventListener("resize", doOnWindowResize);
      doOnWindowResize();
      return () => {
        document.removeEventListener("resize", doOnWindowResize);
      };
    }
  }, [contentRef?.current?.offsetWidth]);

  return (
    <Layout title="Mijn berichten">
      <div style={{ height: height }}>
        <div className="bg-[url('/images/accountability.jpeg')] bg-cover  relative font-light h-[100vh] -mt-[200px] overflow-visible">
          <div className="z-10 w-full h-full bg-black/75  pt-[200px]">
            <section className="container text-18  mt-20 text-white ">
              <h1 className="text-50 font-medium ">Mijn berichten</h1>
              {/* <p className="">Lorem Ipsum til the wheels fall off</p> */}
            </section>
            <div className="container text-20 mb-20">
              <section
                ref={contentRef}
                className="mt-[40px] mx-10 rounded-t-md bg-white font-light ">
                <div className="grid grid-cols-4  font-medium bg-primary text-white py-3 px-4 rounded-t-md">
                  <div className=" col-span-2">Soort brief</div>
                  <div className="text-center">Type</div>
                  <div className="text-right">Datum</div>
                </div>
                <div className="border  min-h-[70vh] border-[#EFEFEF] border-t-0 rounded-b-md">
                  {letters.map((userLetter: UserLetter, index: number) => (
                    <a
                      key={index}
                      href={`letters/${userLetter.letter}`}
                      className="grid grid-cols-4  py-3 px-4 rounded-md odd:bg-[#EFEFEF] even:bg-white">
                      <div className=" col-span-2 text-tertiary">
                        {userLetter.name}
                      </div>
                      <div className="text-center">
                        {letterType[userLetter.type]
                          ? letterType[userLetter.type]
                          : userLetter.type}
                      </div>
                      <div className="text-right">
                        {moment(userLetter.regdate).format(
                          "DD MMMM YYYY [om] HH:mm"
                        )}
                        {}
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Leter;
