import { useEffect, useRef, useState } from "react";
import DropDownButton from "../../Buttons/DropDownButton";
import DropDownButtonWithCustomComponent from "../../Buttons/DropdownWithCustomComponent";
import { SearchInput } from "./SearchInput";
import { useRouter } from "next/router";
import { roomOptions } from "../../../constants/values";
import { min } from "moment";

interface Filter {
  text: string | number;
  value: string | number;
}

interface Filters {
  cities: Array<Filter>;
  types: Array<Filter>;
}
interface ISearchFilterProps {
  filters: Filters;
  onFiltersChange: Function;
  defaultParams?: any;
}

export function SearchFilter({
  filters,
  onFiltersChange,
  defaultParams,
}: ISearchFilterProps) {
  const [cities, setCities] = useState([]);
  const [types, setTypes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState("");
  const [selectedPlaces, setSelectedPlaces] = useState("");
  const [selectedRooms, setSelectedRooms] = useState("");
  const [selecteTypes, setSelectedTypes] = useState("");
  const [rentMin, setMinPrice] = useState("");
  const [rentMax, setMaxPrice] = useState("");
  const [keyword, setKeyword] = useState("");
  const [displayedPriceRange, setDisplayedPriceRange] = useState("Huurprijs");

  const searchFilterRef = useRef();
  const router = useRouter();

  useEffect(() => {
    let _page = location.pathname.substring(1).trim();
    if (!_page) _page = "home";
    setPage(_page);
  }, []);

  useEffect(() => {
    setCities(
      setOptionItems(filters.cities, defaultParams ? defaultParams.city : [])
    );
    setTypes(
      setOptionItems(filters.types, defaultParams ? defaultParams.type : [])
    );
    setRooms(
      setOptionItems(roomOptions, defaultParams ? [defaultParams.rooms] : [])
    );
  }, [defaultParams]);

  useEffect(() => {
    onFiltersChange({
      city: selectedPlaces,
      type: selecteTypes,
      rooms: selectedRooms,
      rentMin,
      rentMax,
      keyword,
    });
  }, [selectedPlaces, selectedRooms, selecteTypes, rentMin, rentMax, keyword]);

  const onSearchClick = () => {
    router.push("/houses?" + createSearchQuery());
  };

  const setDisplayedText = () => {
    return rentMin + " - " + rentMax;
  };

  const createSearchQuery = () => {
    return new URLSearchParams({
      city: selectedPlaces,
      type: selecteTypes,
      rooms: selectedRooms,
      rentMin,
      rentMax,
      keyword,
    }).toString();
  };

  const setOptionItems = (
    options: Array<Filter>,
    defaultValues: Array<string>
  ) => {
    return options.map((option: Filter) => ({
      value: option.value,
      key: option.text,
      checked: defaultValues.includes(option.value.toString()),
    }));
  };

  return (
    <div className={`w-full ${page == "home" ? "sm:w-[85%] md:w-[77%]" : ""}`}>
      {page == "home" && (
        <h2 className="text-white leading-[50px] text-[40px] lg:text-[40px] 2xl:text-[80px] 3xl:text-[100px] lg:mb-[70px] mb-[40px] 3xl:mb-[100px]">
          Zoek een huurwoning
        </h2>
      )}
      <div
        ref={searchFilterRef}
        className="flex items-center flex-wrap sm:flex-nowrap sm:space-x-3 ">
        {page != "home" && (
          <div className="font-bold text-secondary">Filters</div>
        )}
        <div
          className={`w-1/2 z-40 pr-2 sm:pr-0 ${
            page == "home" ? "sm:w-1/4" : "sm:w-1/5"
          } py-2 `}>
          <DropDownButton
            darkTheme={page != "home"}
            title={
              `Plaats` +
              (selectedPlaces.length > 0
                ? " (" + selectedPlaces.length + ")"
                : "")
            }
            multiple
            className={`drop-down-btn-search`}
            wraperClassNames={`drop-down-btn-search-wrapper`}
            options={cities}
            onSelect={(items) => {
              setSelectedPlaces(
                items.filter((item) => item.checked).map((item) => item.value)
              );
            }}
          />
        </div>
        <div
          className={`w-1/2 z-30 pr-2 sm:pr-0 ${
            page == "home" ? "sm:w-1/4" : "sm:w-1/5"
          } py-2 `}>
          <DropDownButtonWithCustomComponent
            currentMinPrice={rentMin}
            currentMaxPrice={rentMax}
            darkTheme={page != "home"}
            onSet={(data) => {
              setMinPrice(data.rentMin);
              setMaxPrice(data.rentMax);
              setDisplayedPriceRange(
                "€ " +
                  parseFloat(data.rentMin).toLocaleString("en-US") +
                  " - " +
                  parseFloat(data.rentMax).toLocaleString("en-US")
              );
            }}
            parentRef={searchFilterRef}
            className={`drop-down-btn-search`}
            wraperClassNames={`drop-down-btn-search-wrapper`}
            title={displayedPriceRange}
          />
        </div>
        <div
          className={`w-1/2 z-20 pr-2 sm:pr-0 ${
            page == "home" ? "sm:w-1/4" : "sm:w-1/5"
          } py-2 `}>
          <DropDownButton
            darkTheme={page != "home"}
            title="Kamers"
            className={`drop-down-btn-search`}
            wraperClassNames={`drop-down-btn-search-wrapper`}
            options={rooms}
            onSelect={(item) => {
              setSelectedRooms(item.value);
            }}
          />
        </div>
        <div
          className={`w-1/2 z-20 pr-2 sm:pr-0 ${
            page == "home" ? "sm:w-1/4" : "sm:w-1/5"
          } py-2 `}>
          <DropDownButton
            darkTheme={page != "home"}
            title={
              `Type` +
              (selecteTypes.length > 0 ? " (" + selecteTypes.length + ")" : "")
            }
            multiple
            className={`drop-down-btn-search`}
            wraperClassNames={`drop-down-btn-search-wrapper`}
            options={types}
            onSelect={(items) => {
              setSelectedTypes(
                items.filter((item) => item.checked).map((item) => item.value)
              );
            }}
          />
        </div>
        {page != "home" && (
          <button
            onClick={onSearchClick}
            className="grid w-[55px] xl:w-[85px] 3xl:w-[114px] place-content-center font-bold text-secondary bg-tertiary rounded-md input_box_size ">
            <img
              src="/images/search2.svg"
              className="h-[14px] xl:h-[22px] 3xl:h-[30px] aspect-square"
            />
          </button>
        )}
      </div>

      {page == "home" && (
        <div className="mt-5 md:mt-[17px] xl:mt-[26px] 3xl:mt-[35px]">
          <SearchInput
            onKeywordChange={setKeyword}
            onSearchClick={onSearchClick}
          />
        </div>
      )}
    </div>
  );
}
