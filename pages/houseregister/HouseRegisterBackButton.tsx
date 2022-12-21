import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React from "react";
import { houseRegisterStep } from "../../store/atoms/HouseRegisterAtom";

export default function HouseRegisterBackButton() {
  const router = useRouter();
  const [step, setStep] = useAtom(houseRegisterStep);

  const goBack = () => {
    if (step == 0) {
      router.back();
    } else {
      setStep((i) => i - 1);
      router.back();
    }
  };

  return (
    <div>
      <p
        onClick={goBack}
        className="text-primary font-light text-base mt-20 cursor-pointer hover:underline">
        Terug
      </p>
    </div>
  );
}
