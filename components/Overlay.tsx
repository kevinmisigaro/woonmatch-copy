import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  show?: boolean;
  width?: string;
};

const Overlay = ({ children, show = false, width }: Props) => {
  return (
    <>
      {show && (
        <div className="fixed z-50 inset-0 grid place-content-center bg-fuscous-gray bg-opacity-60 overflow-hidden">
          <div>{children}</div>
        </div>
      )}
    </>
  );
};

export default Overlay;
