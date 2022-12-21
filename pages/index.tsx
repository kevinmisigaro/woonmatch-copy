import React, { useEffect, useRef } from "react";
import Layout from "../components/Layouts/SiteLayout";
import { SearchFilter } from "../components/Home/Search/Search";
import { fetchHouses, getFilters } from "../lib/house";
import { HomepageContent } from "../components/Home/HomepageContent";
import { FloatingScrollDownButton } from "../components/ui/FLoatingScrollDownButton";
import RegisterOrProfileBanner from "../components/Banners/RegisterOrProfileBanner";
import { getUserLetterOptions, letterType } from "../lib/letters";
import { showNotifications } from "../lib/notification";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  let houses = await fetchHouses(context.req);
  let filters = await getFilters();
  let letters = await getUserLetterOptions(context.req);
  return { props: { houses, filters, letters } };
}

const IndexPage = ({ houses, filters, letters }) => {
  const offersRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (letters) {
        if (letters.length == 1) {
          showNotifications({
            message: `Je hebt een nieuw bericht, klik hier!`,
            type: "letter",
            onClick: () => {
              router.push(`/letters/${letters[0].letter}`);
            },
          });
        } else if (letters.length > 1) {
          showNotifications({
            message: `Je hebt nieuwe berichten, klik hier!`,
            type: "letter",
            onClick: () => {
              router.push(`/letters`);
            },
          });
        }
      }
    }, 2000);
  }, []);

  return (
    <Layout title="WoonMatch" footerBanner={<RegisterOrProfileBanner />}>
      <div>
        <div className="relative bg-home-hero h-[100vh] -mt-[85px] flex items-center">
          <div
            style={{ zIndex: 0 }}
            className="absolute left-0 z-0 right-[10%] top-0 bottom-0 bg-gradient-to-r from-blue-gray to-transparent"></div>
          <div style={{ zIndex: 1 }} className="container z-1  mx-auto ">
            <SearchFilter
              filters={filters}
              onFiltersChange={(filters) => {
                //console.log(filters);
              }}
            />
            <div className="absolute bottom-[35px] ">
              <FloatingScrollDownButton
                targetRef={offersRef}
                text=" Bekijk meer aanbod op Woonmatch"
              />
            </div>
          </div>
        </div>
        <HomepageContent houses={houses} offersRef={offersRef} />
      </div>
    </Layout>
  );
};

export default IndexPage;
