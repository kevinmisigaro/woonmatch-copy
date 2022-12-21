import React from "react";

export const ProfilePopUp = ({
  className = "",
  title = "",
  children,
  show = false,
  onClose = null,
  bgClass = "",
}) => {
  return (
    <>
      {show && (
        <div className="fixed z-50 inset-0 py-10 flex flex-col items-center justify-center bg-black/80">
          <div
            className={`${className} w-11/12 relative min-h-min overflow-x-hidden overflow-y-visible bg-white  text-black rounded-sm shadow-lg`}>
            <button
              onClick={() => {
                onClose();
              }}
              className="absolute top-6 right-0 h-10 grid place-content-center aspect-square ">
              <img src="/images/close-x.svg" className="w-3" />
            </button>

            <div className={`w-full h-full`}>
              <div className="flex flex-row">
                <div
                  className={`hidden md:block md:basis-1/6 ${bgClass}`}></div>
                <div className="md:basis-5/6">
                  <div
                    className={`h-2 text-white font-normal py-12 bg-tertiary`}></div>
                  <div className="py-2 px-8">
                    <div className="text-3xl pb-10 pt-5 font-medium">
                      {title}
                    </div>
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
