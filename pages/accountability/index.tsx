import Layout from "../../components/Layouts/SiteLayout";
import { getAccountability } from "../../lib/public-info";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

export async function getServerSideProps(context) {
  const accountabilities = await getAccountability(context.req);

  return { props: { accountabilities } };
}

const Accountability: React.FC<any> = ({
  accountabilities,
}: {
  accountabilities: any[];
}) => {
  const [height, setHeight] = useState(200);
  const contentRef = useRef(null);

  const doOnWindowResize = () => {
    try {
      if (contentRef?.current != null) {
        let { offsetHeight, offsetTop } = contentRef.current;

        setHeight(offsetHeight + offsetTop + 100);

        console.log("offsetHeight", offsetHeight);
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
    <Layout title="Verantwoording">
      <div style={{ height: height }}>
        <div className="bg-[url('/images/accountability.jpeg')] bg-cover  relative font-light h-[100vh] -mt-[200px] overflow-visible">
          <div className="z-10 w-full h-full bg-black/75  pt-[200px]">
            <section className="container text-18  mt-20 text-white ">
              <h1 className="text-50 font-medium ">Verantwoording</h1>
              <h2 className="font-medium text-primary mt-5 mb-[40px]">
                Woningmarktinformatie verhuurde woningen
              </h2>
              <p className="">
                Aan de hand van de zoekdatum van de nieuwe huurder en het aantal
                kandidaten dat heeft gereageerd kunt u afleiden wat uw kansen
                zijn op de woningmarkt. U vindt de woningen in deze
                verantwoording nadat de huurovereenkomst door de nieuwe huurder
                getekend is.
              </p>
            </section>

            <div className="container text-20 mb-20">
              <section
                ref={contentRef}
                className="mt-[40px] mx-10 rounded-t-md bg-white font-light">
                <div className="grid grid-cols-4  font-medium bg-primary text-white py-3 px-4 rounded-t-md">
                  <div>Aangeboden object</div>
                  <div className="text-center">Type</div>
                  <div className="text-center">Zoekdatum</div>
                  <div className="text-center">Aantal reacties</div>
                </div>
                <div className="border border-[#EFEFEF] border-t-0 rounded-b-md">
                  {accountabilities.map((accountability) => (
                    <div className="grid grid-cols-4  py-3 px-4 rounded-md odd:bg-[#EFEFEF] even:bg-white">
                      <div>{accountability.address}</div>
                      <div className="text-center">
                        {accountability.corporation}
                      </div>
                      <div className="text-center">
                        {accountability.contractdate
                          ? moment(accountability.contractdate).format(
                              "DD MMMM YYYY"
                            )
                          : accountability.contractdate}
                      </div>
                      <div className="text-center">
                        {accountability.reactioncount}
                      </div>
                    </div>
                  ))}
                  {/* <div className="flex justify-end px-10">
              <div className="flex items-center space-x-6 py-7">
                <div className="text-gray-400">1 of 10 Pages</div>
                <div className="flex items-center space-x-8">
                  <div>
                    <img
                      src="/images/caret-left-green.svg"
                      className="rotate-90  h-[14px]"
                    />
                  </div>
                  <div>
                    <img
                      src="/images/caret-right-green.svg"
                      className="-rotate-90 h-[14px]"
                    />
                  </div>
                </div>
              </div>
            </div> */}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Accountability;
