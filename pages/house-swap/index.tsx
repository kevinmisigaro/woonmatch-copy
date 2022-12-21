import React from "react";
import RegisterBanner from "../../components/Banners/RegisterBanner";
import { HomepageContent } from "../../components/Home/HomepageContent";
import { fetchHouses, getFilters } from "../../lib/house";
import Layout from "../../components/Layouts/SiteLayout";
import HouseSwapSlider from "../../components/HouseSwapSlider";
import RegisterOrProfileBanner from "../../components/Banners/RegisterOrProfileBanner";

export async function getServerSideProps(context) {
  let houses: any[] = await fetchHouses(context.req);

  if (houses.length > 4) {
    houses = houses.splice(0, 4);
  }

  let filters = await getFilters();
  return { props: { houses, filters } };
}

const SwapMyHousePage = ({ houses, filters }) => {
  return (
    <Layout title="Ruil mijn woning" footerBanner={<RegisterOrProfileBanner />}>
      <div className="container mx-auto py-5 lg:py-20  ">
        <div className="xl:flex justify-between items-center "></div>
        <div className="flex  lg:mt-0 items-center space-x-2">
          <h1 className="section-hedaer text-primary">
            Aanbod ruil mijn woning
          </h1>
          {/* <button
            title="Lees voor"
            className="p-2 bg-gray-100 rounded-md drop-shadow">
            <img
              src="/images/speaker.svg"
              className="h-[20px] lg:h-[25px] 3xl:h-[50px] w-auto"
            />
          </button> */}
        </div>
      </div>
      <div className="mx-auto  overflow-hidden mb-20">
        <div className="relative container">
          <HouseSwapSlider houses={houses} />
        </div>
      </div>
      <HomepageContent houses={houses} offersRef={filters} />
    </Layout>
  );
};

export default SwapMyHousePage;
