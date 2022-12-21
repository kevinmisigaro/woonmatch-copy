import React, { useEffect, useRef, useState } from "react";

interface props {
  isOn: any;
  onChange: Function;
}

const SlidingSwitchButton = ({
  isOn = false,
  onChange,
  hasNeutral = false,
}) => {
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
      onClick={onChange}
      className={`relative flex items-center  rounded-full cursor-pointer 
    drop-shadow-md xl:drop-shadow-md  3xl:drop-shadow-lg
    w-[40px] xl:w-[62.25px] 3xl:w-[83px] 
    h-[13.7px] xl:h-[21px] 3xl:h-[28px] 
    outline-[3px] xl:outline-[4.5px] 3xl:outline-[6px] outline 
    transition-all duration-300
    ${
      isOn
        ? "bg-gradient-to-r from-tertiary to-primary outline-tertiary"
        : "bg-gray-300 outline-gray-300"
    }`}>
      {hasNeutral && (
        <div
          ref={buttonRef}
          style={{
            right: isOn ? 0 : switchWidth,
          }}
          className="absolute aspect-square bg-white h-[14px] xl:h-[22px] 3xl:h-[30px] transition-all duration-300 ease-in-out rounded-full"></div>
      )}
      {!hasNeutral && (
        <div
          ref={buttonRef}
          style={{
            right: isOn ? 0 : switchWidth,
          }}
          className="absolute aspect-square bg-white h-[14px] xl:h-[22px] 3xl:h-[30px] transition-all duration-300 ease-in-out rounded-full"></div>
      )}
    </div>
  );
};

export default SlidingSwitchButton;
