import React, { useEffect, useRef, useState } from "react";

interface props {
  state: 0 | null | 1;
  onClick: any;
}

const TristateSlidingSwitchButton = ({ state = null, onClick }: props) => {
  const [switchWidth, setSwitchWidth] = useState(0);
  const switchRef = useRef<any>();
  const buttonRef = useRef<any>();

  const doOnWindowResize = () => {
    if (switchRef?.current) {
      setSwitchWidth(
        switchRef.current.offsetWidth - buttonRef.current.offsetWidth
      );
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      doOnWindowResize();
    });
    doOnWindowResize();
  });

  return (
    <div
      ref={switchRef}
      className={`relative flex items-center  rounded-full 
    drop-shadow-md xl:drop-shadow-md  3xl:drop-shadow-lg
    w-[40px] xl:w-[62.25px] 3xl:w-[83px] 
    h-[13.7px] xl:h-[21px] 3xl:h-[28px] 
    outline-[3px] xl:outline-[4.5px] 3xl:outline-[6px] outline 
    transition-all duration-300
    ${
      state == 1
        ? "bg-gradient-to-r from-tertiary to-primary outline-tertiary"
        : state == null
        ? "bg-gray-300 outline-gray-300"
        : "bg-gradient-to-r from-[#f56a6a] to-[#e03434] outline-[#e03434]"
    }`}>
      <div
        ref={buttonRef}
        style={{
          right: state == 1 ? 0 : state == null ? switchWidth / 2 : switchWidth,
        }}
        className="absolute aspect-square bg-white h-[14px] xl:h-[22px] 3xl:h-[30px] transition-all duration-300 ease-in-out rounded-full"></div>
      <div className="absolute inset-0 grid grid-cols-2">
        <button onClick={() => onClick(0)} className="h-full"></button>
        <button onClick={() => onClick(1)} className="h-full"></button>
      </div>
    </div>
  );
};

export default TristateSlidingSwitchButton;
