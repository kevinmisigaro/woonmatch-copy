import React, { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import NavigationBar, { NavigationMessageDrawer } from "./NavigationBar";
import Footer from "./Footer";
import { ChatButton } from "../ChatButton/ChatButton";
import Link from "next/link";

type Props = {
  children?: ReactNode;
  title?: string;
  footerBanner?: ReactNode;
};

const LetterLayout = ({
  children,
  title = "This is the default title",
  footerBanner = null,
}: Props) => {
  const [navRef, setNavRef] = useState(null);
  const [right_nav_dimensions2, setRightNavDimensions2] = useState(null);

  return (
    <div className="relative font-rubik">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <div className="h-[55px] 3xl:h-[85px]">
          <div className="fixed top-0 left-0 right-0 z-50 ">
            <div className="bg-white ">
              <div className="container mx-auto">
                <nav className="flex justify-between items-center py-2 text-gray-500 h-[55px] 3xl:h-[85px] font-medium">
                  <div className="flex justify-center md:justify-start text-white font-extrabold">
                    <Link href="/">
                      <a className=" ">
                        <img
                          src="/images/logo-colored.svg"
                          className="h-[30px] 3xl:h-[48px] w-auto"
                        />
                      </a>
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="text-fuscous-gray-600">
        <div></div>
        {children}
      </div>
      <Footer>{footerBanner}</Footer>
      <div className="fixed block right-5 bottom-5">
        <ChatButton />
      </div>
    </div>
  );
};

export default LetterLayout;
