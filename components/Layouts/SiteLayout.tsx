import React, { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import NavigationBar, { NavigationMessageDrawer } from "./NavigationBar";
import Footer from "./Footer";
import { ChatButton } from "../ChatButton/ChatButton";
import { NotificationMessage } from "../Notifications/NotificationMessage";

type Props = {
  children?: ReactNode;
  title?: string;
  footerBanner?: ReactNode;
  bgColor?: string
};

const SiteLayout = ({
  children,
  title = "WoonMatch",
  footerBanner = null,
  bgColor = null
}: Props) => {
  const [navRef, setNavRef] = useState(null);
  const [right_nav_dimensions2, setRightNavDimensions2] = useState(null);

  return (
    <div className={`relative font-rubik font-light ${bgColor}`}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <div className="h-[55px] 3xl:h-[85px]">
          <div className="fixed top-0 left-0 right-0 z-50 ">
            <NavigationBar
              onRefSet={(ref) => {
                setNavRef(ref);
              }}
            />
          </div>
        </div>
        {/* <div className="hidden lg:block relative  mx-auto z-30">
          <NavigationMessageDrawer
            message={`Belangrijk bericht voor\nwoningzoekenden`}
            right_nav_ref={navRef}
          />
        </div> */}
      </header>

      <div className="text-fuscous-gray-600">
        <div></div>
        {children}
      </div>
      <Footer>{footerBanner}</Footer>
      <div className="fixed block right-5 bottom-5">
        <ChatButton />
      </div>
      <div className="fixed block right-0 bottom-5 z-50">
        <NotificationMessage />
      </div>
    </div>
  );
};

export default SiteLayout;
