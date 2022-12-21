import React, { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import moment from "moment";

type Props = {
  children?: ReactNode;
};

const Footer = ({ children = null }: Props) => {
  const [height, setHeight] = useState(400);
  const controlRef = useRef(null);

  const time = moment().format("YYYY");

  const doOnWindowResize = () => {
    if (controlRef?.current) {
      setHeight(controlRef.current.offsetHeight);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      doOnWindowResize();
    });
    doOnWindowResize();
  }, []);

  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Informatie",
      link: "/informatie",
    },
    {
      title: "Veelgestelde vragen",
      link: "/faq",
    },
    {
      title: "Verantwoording",
      link: "/accountability",
    },
    {
      title: "Privacy en disclaimer",
      link: "/privacy",
    },
  ];
  return (
    <footer className="text-secondary">
      <div
        style={{ marginBottom: -height / 2 }}
        ref={controlRef}
        className="relative container mx-auto ">
        <div>{children}</div>
      </div>
      <div className="bg-fuscous-gray-100  pb-10 ">
        <div
          style={{ paddingTop: height / 2 + 80 }}
          className="container  mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2 mb-10">
              <div className="pr-20 ">
                <a href="/" className="mb-[80px]">
                  <img
                    src="/images/woonmatch-waterland-colored.png"
                    className="h-[50px] 3xl:h-[70px] w-auto mb-[30px] 3xl:mb-[55px]"
                  />
                </a>
                <p className="font-light text-sm">
                  Woonmatch biedt je de huurwoningen aan van woningcorporaties.
                </p>
                <p className="mt-4 3xl:mt-8 font-light text-sm">
                  Je vindt hier sociale huur, vrije sector of flexwoningen, maar
                  ook andere verhuurtypen zoals studentenkamers, garages of
                  woonwagens
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-title mb-[30px] 3xl:mb-[40px]">
                Handige links
              </h2>

              <ul className="space-y-2.5 font-semibold">
                {links.map((link, index) => (
                  <li key={index}>
                    <BottomLink {...link} />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-title mb-[30px] 3xl:mb-[40px]">
                Contactgegevens
              </h2>

              <ul className="space-y-[10px]">
                <li>
                  <a
                    href="tel://0881718190"
                    className="flex items-center space-x-3 hover:text-primary">
                    <img
                      src="/images/phone.svg"
                      className="h-[12px] 3xl:h-[18px]"
                    />
                    <span className="footer-text">088 - 17 18 190</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto://info@woonmatch.com"
                    className="flex items-center space-x-3 hover:text-primary">
                    <img
                      src="/images/mail.svg"
                      className="h-[12px] 3xl:h-[18px]"
                    />
                    <span className="footer-text">info@woonmatch.nl</span>
                  </a>
                </li>

                <li className="flex items-center space-x-3 hover:text-primary ">
                  <img
                    src="/images/address.svg"
                    className="h-[12px] 3xl:h-[18px]"
                  />
                  <span className="footer-text">West Friesland 45</span>
                </li>
              </ul>

              {/* <div className="sm:hidden lg:hidden md:block mt-10">
                <DownloadApps />
              </div> */}
            </div>

            {/* <div className="hidden md:hidden lg:flex sm:flex flex-col lg:items-end">
              <DownloadApps />
            </div> */}
          </div>
        </div>
      </div>
      <div className="bg-tertiary py-2 text-white 2xl:text-lg">
        <div className="container md:text-[14px]">
          Copyright &copy; {time} Woonmatch
        </div>
      </div>
    </footer>
  );
};

export const DownloadApps = () => {
  return (
    <>
      <h2 className="text-title mb-[30px] 3xl:mb-[40px]">Download de app</h2>

      <div>
        <a href="tel://0714226212">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Google_Play_Store_badge_FR.svg/1200px-Google_Play_Store_badge_FR.svg.png"
            className="w-[130px] 3xl:w-[200px]"
          />
        </a>
      </div>
      <div className="mt-[15px]">
        <a href="#">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1200px-Download_on_the_App_Store_Badge.svg.png"
            className="w-[130px] 3xl:w-[200px]"
          />
        </a>
      </div>
    </>
  );
};

export const BottomLink = ({ link, title }) => {
  const [isOver, setIsOver] = useState(false);

  const handleOnMouseOver = (isOver) => {
    setIsOver(isOver);
  };
  return (
    <Link href={link}>
      <a
        onMouseOver={() => handleOnMouseOver(true)}
        onMouseOut={() => handleOnMouseOver(false)}
        className="flex items-center  hover:text-primary mb-[15px] ">
        <div
          style={{
            paddingLeft: isOver ? 10 : 0,
          }}
          className=" w-[20px] aspect-square flex items-center transition-all duration-500">
          <img src="/images/caret-right.svg" className="h-[10px] 3xl:h-auto" />
        </div>
        <div className="flex-1 footer-text">{title}</div>
      </a>
    </Link>
  );
};

export default Footer;
