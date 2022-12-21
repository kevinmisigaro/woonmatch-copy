import React from "react";

export const FloatingScrollDownButton = ({ targetRef, text }) => {
  return (
    <button
      onClick={() =>
        targetRef.current.scrollIntoView({
          block: "start",
          behavior: "smooth",
        })
      }
      className="flex items-center">
      <img
        src="/images/down_arrow.svg"
        className="h-[15px] animate-bounce md:h-[25px] 2xl:h-[30px]  aspect-square"
      />
      <span className="ml-5 text-[12px] md:text-[16px] md:font-bold text-white">
        {text}
      </span>
    </button>
  );
};
