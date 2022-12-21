import React from "react";

export const PopUp = ({
  className = "",
  title = "",
  children,
  titleClassName = "",
  show = false,
  onClose = null,
}) => {
  return (
    <>
      {show && (
        <div className="fixed z-50 inset-0 overflow-y-auto overscroll-contain flex flex-col items-center justify-center bg-black/80">
          <div
            className={`${className}  relative   text-white bg-gradient-to-r from-tertiary to-primary rounded-[5px] shadow-lg`}>
            <button
              onClick={() => {
                onClose();
              }}
              className="absolute top-0 right-0 h-10 grid place-content-center aspect-square ">
              <img src="/images/close-x.svg" className="w-3" />
            </button>
            <div className={` ${titleClassName} font-bold p-6 `}>{title}</div>
            <div className={`w-full  items-center  `}>
              <div className="mx-auto">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
