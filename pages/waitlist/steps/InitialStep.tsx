import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React from "react";
import { RegisterStepButton } from "../../../components/Registration/RegisterStepButton";
import { waitlistStepAtom } from "../../../store/atoms/waitlistAtom";
import BackButton from "../BackButton";
import Waitlist from "../index";

export default function InitialStep() {
  const router = useRouter();
  const [_, setStep] = useAtom(waitlistStepAtom);
  const changePage = () => {
    setStep(i => i + 1)
    router.push("first")
  }
  return (
    <Waitlist>
      <div className="grid grid-cols-2 justify-items-start w-full">
        <div>
          <p className="text-primary font-light text-xl">Uw huidige status</p>
          <p className="font-light text-base text-gray-400">
            U Staat NIET op de watchtlijst
          </p>
        </div>

        <div className="flex flex-row justify-end w-1/3">
            <p className="text-sm font-normal">Blijf je status invullen</p>
          </div>
      </div>

      <div className="grid grid-cols-2 justify-items-start pb-8">
        <div>
          <BackButton />
        </div>

        <div className="flex flex-row justify-end w-1/3 items-end">
          <RegisterStepButton text="Inschrijven" action={changePage} />
        </div>
      </div>
    </Waitlist>
  );
}
