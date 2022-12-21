import Link from "next/link";
import { MouseEventHandler } from "react";

type ButtonType = {
  type: "link" | "button";
  link?: string;
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

type Props = {
  image: string;
  title: string;
  subtitle: string;
  buttons: ButtonType[];
};

const FooterBanner: React.FC<any> = ({
  image,
  title,
  subtitle,
  buttons,
}: Props) => {
  return (
    <div className="relative pr-3 flex items-center bg-gradient-to-r from-tertiary to-primary py-5 xl:py-[30px]  3xl:py-[60px] rounded-lg">
      <div className="w-1/2 xl:w-[550px] 3xl:w-[650px]">
        <div className="grid place-content-center">
          <img src={image} className="h-[100px] xl:h-[250px] 3xl:h-auto" />
        </div>
      </div>
      <div className="w-full text-white">
        <div className="w-full sm:w-3/4">
          <h3 className="font-light text-base lg:text-lg 2xl:text-xl">
            {title}
          </h3>

          <h2 className="font-bold mt-3 xl:mt-[30px] xl:text-[30px] xl:leading-10 3xl:text-[50px]">
            {subtitle}
          </h2>
          <div className="md:flex mt-8 w-full md:space-x-3 space-y-3 md:space-y-0">
            {buttons.map((button, i) =>
              button.type == "link" ? (
                <Link key={i} href={button.link}>
                  <a className="btn-outline w-full ">{button.text}</a>
                </Link>
              ) : (
                <button
                  key={i}
                  onClick={button.onClick}
                  className="btn-outline w-full">
                  {button.text}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;
