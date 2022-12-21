import { useEffect, useState } from "react";

export interface ISearchInputProps {
  onKeywordChange?: Function;
  onSearchClick?: Function;
}

export function SearchInput({
  onKeywordChange,
  onSearchClick,
}: ISearchInputProps) {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (onKeywordChange) {
      onKeywordChange(keyword);
    }
  }, [keyword]);

  return (
    <div className="flex w-full">
      <div className="relative flex w-full rounded text-fuscous-gray-300">
        <div className="flex items-center flex-1 bg-white input_box_size justify-center rounded-l-md">
          <div className="ml-[20px]">
            <img src="/images/search.svg" className="text-tertiary" />
          </div>
          <input
            type="text"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            placeholder="Zoeken naar een woning"
            className="
                   
                  grow w-full 
                  appearance-none 
                  focus:outline-none 
                  text-secondary
                  placeholder-fuscous-gray-300 
                    rounded-r-none  ml-[20px] pr-6"
          />
        </div>
        <button
          onClick={() => {
            onSearchClick();
          }}
          className="
                    flex-none 
                    w-[100px]
                    md:w-[180px]
                    3xl:w-[230px]
                    bg-tertiary
                    rounded-r-md 
                    rounded-l-none 
                    text-white">
          zoek
        </button>
      </div>
    </div>
  );
}
