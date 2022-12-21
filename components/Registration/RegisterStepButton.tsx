import { BsArrowRight } from "react-icons/bs";

type Props = {
  text: string;
  action: any;
};

export const RegisterStepButton = ({ text, action }: Props) => {
  return (
    <button
      onClick={action}
      className="btn bg-tertiary items-center text-white font-light text-sm px-5 max-w-md flex flex-row justify-between gap-x-2 py-1.5 rounded">
      {text} <BsArrowRight size={15} />
    </button>
  );
};
