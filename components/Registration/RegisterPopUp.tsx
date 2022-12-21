import React from "react";

export const RegisterPopUp = ({
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
        <div className="fixed z-50 inset-0 py-10 flex flex-col items-center justify-center bg-black/80">
          <div
            className={`${className} w-2/3 relative min-h-min overflow-x-hidden overflow-y-visible bg-white  text-black rounded-sm shadow-lg`}>
            <button
              onClick={() => {
                onClose();
              }}
              className="absolute top-0 right-0 h-10 grid place-content-center aspect-square ">
              <img src="/images/close-x.svg" className="w-3" />
            </button>
            <div
              className={` ${titleClassName} text-white font-normal py-6 pl-16 bg-gradient-to-r from-tertiary to-primary`}>
              {title}
            </div>
            <div className={`w-full`}>
              <div className="mx-auto">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
