import { truncateSync } from "fs";
import React, { useState, useEffect, Ref } from "react";
import AdvancedSearchBox from "../AdvancedSearchBox";
import { Chevron } from "./DropDownButton";

interface Props {
  darkTheme: boolean;
  currentMinPrice: number;
  currentMaxPrice: number;
  title: string;
  parentRef?: any;
  multiple: boolean;
  className?: string;
  wraperClassNames?: string;
  value?: string | number | string[] | number[];
  onSet?: (data: any) => void;
}
const DropDownButtonWithCustomComponent: React.FC<any> = ({
  darkTheme,
  title,
  parentRef,
  className,
  wraperClassNames,
  currentMinPrice,
  currentMaxPrice,
  onSet,
}: Props) => {
  const [opened, setOpened] = useState(false);
  const [pos, setPosition] = useState({ left: 0, width: 0 });
  const [mouseIsIn, setMouseIsIn] = useState(false);

  const doOnWindowResize = () => {
    try {
      if (parentRef?.current != null) {
        let { offsetLeft, offsetWidth } = parentRef.current;

        setPosition({
          left: offsetLeft,
          width: offsetWidth,
        });
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (parentRef != null) {
      window.addEventListener("resize", doOnWindowResize);
      doOnWindowResize();

      return () => {
        document.removeEventListener("resize", doOnWindowResize);
      };
    }
  }, [parentRef?.current?.offsetWidth]);

  const handleOutsideClicks = (e) => {
    let _mouseIsIn = null;

    setMouseIsIn((currentState) => {
      _mouseIsIn = currentState;
      return currentState;
    });

    if (!_mouseIsIn) {
      setOpened(false);
    }
  };
  useEffect(() => {
    if (opened) document.addEventListener("click", handleOutsideClicks);

    return () => {
      document.removeEventListener("click", handleOutsideClicks);
    };
  }, [opened]);

  const _onSubmit = (filters: any) => {
    setOpened(false);
    onSet ? onSet(filters) : null;
  };

  return (
    <div
      className={`drop-down-btn-search-wrapper  w-full bg-gray ${wraperClassNames}`}>
      <button
        onClick={() => setOpened(!opened)}
        className={`drop-down-btn rounded ${className} ${
          darkTheme ? "drop-down-btn-dark" : ""
        }`}>
        {title}
        <Chevron opened={opened} />
      </button>
      {opened && (
        <>
          <div
            onMouseEnter={() => {
              setMouseIsIn(true);
            }}
            onMouseLeave={() => {
              setMouseIsIn(false);
            }}
            style={{ left: pos.left }}
            className="absolute z-[10] mt-2">
            <div style={{ width: pos.width }} className="flex flex-wrap">
              <AdvancedSearchBox
                currentMaxPrice={currentMaxPrice}
                currentMinPrice={currentMinPrice}
                darkTheme={darkTheme}
                onSubmit={_onSubmit}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DropDownButtonWithCustomComponent;
