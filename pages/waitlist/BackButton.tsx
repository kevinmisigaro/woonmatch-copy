import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React from "react";
import { waitlistStepAtom } from "../../store/atoms/waitlistAtom";

export default function BackButton() {
  const router = useRouter();
  const [waitlistStep, setWaitlistStep] = useAtom(waitlistStepAtom);

  const goBack = () => {
    if (waitlistStep > 0) {
      setWaitlistStep((i) => i - 1);
    }
    router.back();
  };

  return (
    <p
      onClick={goBack}
      className="text-primary font-light text-base mt-20 cursor-pointer hover:underline">
      Terug
    </p>
  );
}
