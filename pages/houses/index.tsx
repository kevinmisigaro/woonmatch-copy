import React, { useState } from "react";
import Layout from "../../components/Layouts/SiteLayout";
import Card from "../../components/Card";
import { SearchFilter } from "../../components/Home/Search/Search";
import {
  fetchHousesByParams,
  fetchHousesOfTheWeek,
  getFilters,
  getSearchParams,
} from "../../lib/house";
import DropDownButton from "../../components/Buttons/DropDownButton";
import { sorter } from "../../constants/values";
import SlidingSwitchButton from "../../components/ui/SlidingSwitchButton";
import MapView from "../../components/MapView";
import { useRouter } from "next/router";
import RegisterOrProfileBanner from "../../components/Banners/RegisterOrProfileBanner";

export async function getServerSideProps(context) {
  let params = null;
  if (context.query) {
    params = getSearchParams(context.query);
  }

  let houses = await fetchHousesByParams(context.req, params);
  let housesOfTheWeek = await fetchHousesOfTheWeek(context.req);
  let filters = await getFilters();

  return { props: { houses, housesOfTheWeek, filters, params } };
}

const HousesPage: React.FC<any> = ({
  houses,
  housesOfTheWeek,
  filters,
  params,
}) => {
  const [isListView, setIsListView] = useState<boolean>(true);
  const router = useRouter();

  const sortHouse = (item: any) => {
    params["sort"] = item.value;

    let queryParams = new URLSearchParams(params).toString();
    router.push("/houses?" + queryParams);
  };

  return (
    <Layout title="Properties" footerBanner={<RegisterOrProfileBanner />}>
      <div>
        <div className="container relative mx-auto py-[37px] xl:py-[57px] 3xl:py-[77px] px-[45px] xl:px-[95px] 3xl:px-[70px] hidden md:flex">
          <SearchFilter
            defaultParams={params}
            filters={filters}
            onFiltersChange={(filters) => {
              //console.log(filters);
            }}
          />
        </div>
        <section className="bg-fuscous-gray-100">
          <div className="container py-10">
            <div className="flex flex-wrap md:flex-nowrap justify-between space-y-4 md:space-y-0 md:space-x-4">
              <h1 className="flex items-center  h-full text-base lg:text-lg ">
                <span className="font-bold">Resultaat:</span>
                <span className="text-primary font-bold">
                  &nbsp; Volledig overzicht &nbsp;
                </span>
                <span className="px-2 rounded-md bg-white">
                  {houses.length}
                </span>
                {/* <button
                  title="Lees voor"
                  className="ml-2 p-2 bg-gray-100 rounded-md drop-shadow">
                  <img
                    src="/images/speaker.svg"
                    className="h-[20px] lg:h-[28px] 3xl:h-[38px] w-auto"
                  />
                </button> */}
              </h1>

              <div className="flex z-10 items-center space-x-2">
                <div className="font-bold">Sorteren</div>
                <DropDownButton
                  title="Geen Sortering"
                  className={`drop-down-btn-search`}
                  wraperClassNames={`drop-down-btn-search-wrapper`}
                  options={sorter.map((item, i) => ({
                    value: item.value,
                    key: item.text,
                    checked: item.value == params?.sort,
                  }))}
                  onSelect={(items: any) => {
                    sortHouse(items);
                  }}
                />
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <div className="flex items-center space-x-2">
                <div className={'mr-1'}>Lijst</div>
                <SlidingSwitchButton
                  isOn={!isListView}
                  onChange={() => {
                    setIsListView(!isListView);
                  }}
                />
                <div className={'ml-2'}>Kaart</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Best House List */}
      <div className={isListView ? "" : "hidden"}>
        <div className="bg-gradient-to-r from-tertiary to-primary">
          <div className="container  py-10">
            <h2 className="font-semibold text-xl md:text-2xl 2xl:text-4xl text-white mb-10">
              Uw huis van de week
            </h2>
            {housesOfTheWeek && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <Card house={housesOfTheWeek} key={housesOfTheWeek.advert} />;
              </div>
            )}
          </div>
        </div>

        {/* General House List */}
        <div className="bg-fuscous-gray-100">
          <div className="container py-10 lg:py-20">
            {houses && (
              <div className="house-list">
                {houses.map((house) => (
                  <Card house={house} key={house.advert} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {isListView == false && (
        <div className="bg-fuscous-gray-100">
          <div className="container">
            <MapView houses={houses} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default HousesPage;
