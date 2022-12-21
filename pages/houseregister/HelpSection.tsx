import { useRouter } from "next/router";
import React, { useState } from "react";

export default function HelpSection() {
  const [show, setShow] = useState(false);
  const { push } = useRouter()

  return (
    <>
      <div className="flex flex-row justify-start">
        <div className="text-primary text-sm font-light mr-14">
          <p
            className="cursor-pointer hover:underline"
            onClick={() => {
              document
                .getElementById("help")
                .scrollIntoView({ behavior: "smooth" });
            }}>
            Help
          </p>
        </div>
        <div className="text-primary text-sm font-light">
          <p
            onClick={() => push('/')}
            className="cursor-pointer hover:underline">
            Opslaan en later invullen
          </p>
        </div>
      </div>

    </>
  );
}
